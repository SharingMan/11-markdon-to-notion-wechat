// Vue 3 应用
const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

// Markdown 解析器配置
const markdownItLib = window.markdownit;
if (!markdownItLib) {
    console.error('markdown-it 未加载，请检查 CDN 链接');
}

const md = markdownItLib ? markdownItLib({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
}) : {
    render: (text) => text.replace(/\n/g, '<br>')
};

// 代码高亮插件
if (md && md.use) {
    md.use(function (md) {
        const fence = md.renderer.rules.fence;
        md.renderer.rules.fence = function (...args) {
            // 先检查 hljs 是否可用
            const hljs = window.hljs;

            const [tokens, idx] = args;
            const token = tokens[idx];
            const lang = token.info ? token.info.trim() : '';

            // 先获取默认渲染结果
            let result = fence.apply(this, args);

            // 如果 hljs 可用且语言有效，尝试高亮
            if (lang && hljs && typeof hljs.getLanguage === 'function' && hljs.getLanguage(lang)) {
                try {
                    const code = token.content ? token.content.trim() : '';
                    if (code && typeof hljs.highlight === 'function') {
                        const highlighted = hljs.highlight(code, { language: lang }).value;
                        result = `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
                    }
                } catch (err) {
                    // 如果高亮失败，使用默认渲染，不输出错误
                    // console.warn('代码高亮失败:', err);
                }
            }
            return result;
        };
    });
}

// Turndown 实例（用于 HTML 转 Markdown）
let turndownService = null;
if (window.TurndownService) {
    turndownService = new window.TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    });
}

// IndexedDB 图片存储
const DB_NAME = 'huasheng_editor_images';
const DB_VERSION = 1;
const STORE_NAME = 'images';

let db = null;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
}

// 图片处理函数
function compressImage(file, maxWidth = 1920, quality = 0.85) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function saveImageToDB(imageId, blob) {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(blob, imageId);
        request.onsuccess = () => resolve(imageId);
        request.onerror = () => reject(request.error);
    });
}

function getImageFromDB(imageId) {
    if (!db) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(imageId);
        request.onsuccess = () => {
            const blob = request.result;
            if (blob) {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            } else {
                resolve(null);
            }
        };
        request.onerror = () => reject(request.error);
    });
}

// 创建 Vue 应用
createApp({
    setup() {
        const markdownContent = ref('');
        const currentStyle = ref('default');
        const statusMessage = ref('');
        const statusType = ref('');
        const styles = ref(window.styles || {});

        // 渲染 HTML
        const renderedHTML = computed(() => {
            if (!markdownContent.value) return '';

            let html = md.render(markdownContent.value);

            // 处理图片短链接 img://img-xxx （在 updatePreview 中异步处理）
            // 这里先标记，实际替换在 updatePreview 中进行

            return html;
        });

        // 应用样式到预览区
        const applyPreviewStyles = () => {
            const style = styles.value[currentStyle.value];
            if (!style || !style.styles) return;

            const previewElement = document.querySelector(`#preview-${currentStyle.value}`);
            if (!previewElement) return;

            // 创建或更新样式标签
            let styleTag = document.getElementById('preview-style');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'preview-style';
                document.head.appendChild(styleTag);
            }

            // 生成 CSS
            let css = `#preview-${currentStyle.value} { `;
            const bodyStyles = style.styles.body || {};
            Object.entries(bodyStyles).forEach(([prop, value]) => {
                css += `${prop}: ${value}; `;
            });
            css += '}\n';

            // 为各个元素添加样式
            Object.entries(style.styles).forEach(([selector, props]) => {
                if (selector === 'body') return;
                css += `#preview-${currentStyle.value} ${selector} { `;
                Object.entries(props).forEach(([prop, value]) => {
                    css += `${prop}: ${value}; `;
                });
                css += '}\n';
            });

            styleTag.textContent = css;
        };

        // 更新预览
        const updatePreview = async () => {
            await nextTick();

            // 应用样式
            applyPreviewStyles();

            // 处理图片短链接，异步加载并替换
            const previewElement = document.querySelector(`#preview-${currentStyle.value}`);
            if (previewElement) {
                const imgRegex = /img:\/\/img-([a-zA-Z0-9]+)/g;
                const imagePlaceholders = previewElement.innerHTML.match(imgRegex);

                if (imagePlaceholders) {
                    for (const placeholder of imagePlaceholders) {
                        const imageId = placeholder.match(/img:\/\/img-([a-zA-Z0-9]+)/)[1];
                        const imageData = await getImageFromDB(imageId);
                        if (imageData) {
                            previewElement.innerHTML = previewElement.innerHTML.replace(
                                placeholder,
                                `<img src="${imageData}" alt="图片" style="max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 5px;" />`
                            );
                        }
                    }
                }
            }

            // 高亮代码块
            const hljs = window.hljs;
            if (hljs && hljs.highlightElement) {
                document.querySelectorAll(`#preview-${currentStyle.value} pre code`).forEach((block) => {
                    try {
                        hljs.highlightElement(block);
                    } catch (err) {
                        console.warn('代码高亮失败:', err);
                    }
                });
            }
        };

        // 处理文件上传
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            if (!file) return;

            if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    markdownContent.value = e.target.result;
                    updatePreview();
                    showStatus('文件上传成功！', 'success');
                };
                reader.readAsText(file);
            } else {
                showStatus('请上传 .md 或 .markdown 文件', 'error');
            }

            // 清空 input，允许重复选择同一文件
            event.target.value = '';
        };

        // 处理粘贴事件（图片）
        const handlePaste = async (event) => {
            const items = event.clipboardData.items;

            for (let item of items) {
                if (item.type.indexOf('image') !== -1) {
                    event.preventDefault();
                    const file = item.getAsFile();
                    await handleImagePaste(file);
                    break;
                }
            }

            // 处理 HTML 粘贴（从富文本编辑器）
            const htmlData = event.clipboardData.getData('text/html');
            if (htmlData && turndownService) {
                event.preventDefault();
                const markdown = turndownService.turndown(htmlData);
                const textarea = event.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = markdownContent.value;
                markdownContent.value = text.substring(0, start) + markdown + text.substring(end);
                textarea.setSelectionRange(start + markdown.length, start + markdown.length);
                updatePreview();
            }
        };

        // 处理图片粘贴
        const handleImagePaste = async (file) => {
            try {
                showStatus('正在处理图片...', 'success');

                const imageId = 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                const compressedBlob = await compressImage(file);
                await saveImageToDB(imageId, compressedBlob);

                // 插入图片短链接到编辑器（使用特殊的短链接格式）
                const textarea = document.querySelector('.editor-textarea');
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = markdownContent.value;
                const imageMarkdown = `\n![图片](img://img-${imageId})\n`;
                markdownContent.value = text.substring(0, start) + imageMarkdown + text.substring(end);

                // 更新光标位置
                const newPosition = start + imageMarkdown.length;
                textarea.setSelectionRange(newPosition, newPosition);
                textarea.focus();

                updatePreview();
                showStatus('图片已添加！', 'success');
            } catch (error) {
                console.error('图片处理失败:', error);
                showStatus('图片处理失败，请重试', 'error');
            }
        };

        // 复制到公众号
        const copyToWeChat = async () => {
            try {
                if (!markdownContent.value) {
                    showStatus('请先输入内容', 'error');
                    return;
                }

                let html = md.render(markdownContent.value);

                // 获取当前样式
                const style = styles.value[currentStyle.value];
                if (style) {
                    // 应用样式
                    const tempDiv = document.createElement('div');
                    tempDiv.id = 'temp-preview';
                    tempDiv.innerHTML = html;
                    document.body.appendChild(tempDiv);

                    // 获取计算后的样式
                    const computedStyle = window.getComputedStyle(tempDiv);

                    // 应用样式到 HTML
                    html = applyStyles(html, style);

                    document.body.removeChild(tempDiv);
                }

                // 处理图片：将短链接转换为 Base64
                html = await processImagesForWeChat(html);

                // 转换 Grid 为 Table（公众号兼容）
                html = convertGridToTable(html);

                // 内联所有样式
                html = inlineStyles(html);

                // 复制到剪贴板
                const blob = new Blob([html], { type: 'text/html' });
                const item = new ClipboardItem({ 'text/html': blob });
                await navigator.clipboard.write([item]);

                showStatus('已复制到剪贴板！可以粘贴到公众号编辑器了', 'success');
            } catch (error) {
                console.error('复制失败:', error);
                // 降级方案：使用传统复制方法
                try {
                    const textarea = document.createElement('textarea');
                    textarea.value = html;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    showStatus('已复制到剪贴板！', 'success');
                } catch (e) {
                    showStatus('复制失败，请手动复制', 'error');
                }
            }
        };

        // 处理图片转换为 Base64
        async function processImagesForWeChat(html) {
            const imgRegex = /img:\/\/img-([a-zA-Z0-9]+)/g;
            const matches = [...html.matchAll(imgRegex)];

            for (const match of matches) {
                const imageId = match[1];
                const imageData = await getImageFromDB(imageId);
                if (imageData) {
                    html = html.replace(match[0], imageData);
                }
            }

            // 替换所有 img 标签的 src 为 Base64
            html = html.replace(/<img[^>]+src="([^"]+)"[^>]*>/g, (match, src) => {
                if (!src.startsWith('data:')) {
                    // 如果不是 Base64，保持原样
                    return match;
                }
                return match;
            });

            return html;
        }

        // 转换 CSS Grid 为 Table（公众号兼容）
        function convertGridToTable(html) {
            // 简单的 Grid 转换逻辑
            // 这里需要根据实际需求实现
            return html;
        }

        // 内联样式
        function inlineStyles(html) {
            // 简单的样式内联逻辑
            // 这里需要根据实际需求实现
            return html;
        }

        // 应用样式
        function applyStyles(html, style) {
            // 根据 style 配置应用样式
            // 这里需要根据 styles.js 中的配置实现
            return html;
        }

        // 清空编辑器
        const clearEditor = () => {
            if (confirm('确定要清空所有内容吗？')) {
                markdownContent.value = '';
                updatePreview();
                showStatus('已清空', 'success');
            }
        };

        // 显示状态消息
        const showStatus = (message, type = 'success') => {
            statusMessage.value = message;
            statusType.value = type;
            setTimeout(() => {
                statusMessage.value = '';
            }, 3000);
        };

        // 监听样式变化
        watch(currentStyle, () => {
            updatePreview();
        });

        // 组件挂载时初始化
        onMounted(async () => {
            await initDB();

            // 监听编辑器粘贴事件
            const textarea = document.querySelector('.editor-textarea');
            if (textarea) {
                textarea.addEventListener('paste', handlePaste);
            }

            // 从 localStorage 恢复内容
            const savedContent = localStorage.getItem('huasheng_editor_content');
            if (savedContent) {
                markdownContent.value = savedContent;
            }

            const savedStyle = localStorage.getItem('huasheng_editor_style');
            if (savedStyle && styles.value[savedStyle]) {
                currentStyle.value = savedStyle;
            }

            // 自动保存
            watch(markdownContent, (newContent) => {
                localStorage.setItem('huasheng_editor_content', newContent);
            });

            watch(currentStyle, (newStyle) => {
                localStorage.setItem('huasheng_editor_style', newStyle);
            });

            // 初始更新预览
            updatePreview();
        });

        return {
            markdownContent,
            currentStyle,
            styles,
            renderedHTML,
            statusMessage,
            statusType,
            updatePreview,
            handleFileUpload,
            copyToWeChat,
            clearEditor
        };
    }
}).mount('#app');
