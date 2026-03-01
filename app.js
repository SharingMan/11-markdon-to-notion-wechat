// Vue 3 应用
const { createApp, ref, computed, onMounted, onUnmounted, watch, nextTick } = Vue;

// 多图排版插件 - 处理 :::gallery 语法
const galleryPlugin = (md) => {
    const fence = md.renderer.rules.fence;
    md.renderer.rules.fence = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const info = token.info.trim();

        // 检查是否是 gallery 语法
        if (info === 'gallery' || info.startsWith('gallery ')) {
            const columns = info.includes('cols=') ? parseInt(info.match(/cols=(\d+)/)?.[1] || 2) : 2;
            const content = token.content.trim();

            // 解析图片链接
            const images = content.split('\n')
                .filter(line => line.trim())
                .map(line => {
                    // 匹配 ![alt](url) 格式
                    const match = line.match(/^!\[(.*?)\]\((.+?)\)$/);
                    if (match) {
                        return { alt: match[1], src: match[2] };
                    }
                    // 匹配纯 URL
                    return { alt: '', src: line.trim() };
                });

            if (images.length === 0) return '';

            // 生成 grid 布局
            const gridStyle = `display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 12px; margin: 20px 0;`;
            const imgStyle = 'width: 100%; height: 200px; object-fit: cover; border-radius: 8px;';

            const imagesHtml = images.map(img =>
                `<img src="${img.src}" alt="${img.alt}" style="${imgStyle}">`
            ).join('');

            return `<div class="gallery-grid" style="${gridStyle}" data-columns="${columns}">${imagesHtml}</div>`;
        }

        return fence.call(self, tokens, idx, options, env, self);
    };
};

// Markdown 解析器配置
const markdownItLib = window.markdownit;
if (!markdownItLib) {
    console.error('markdown-it 未加载，请检查 CDN 链接');
}

const escapeHtml = (text) => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// 解析简单 Markdown（后备方案）
const simpleMarkdown = (text) => {
    if (!text) return '';
    let content = escapeHtml(text);

    // 处理代码块
    const codeBlocks = [];
    content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        const safeCode = escapeHtml(code.trim());
        const className = lang ? ` class="language-${lang}"` : '';
        codeBlocks.push(`<pre><code${className}>${safeCode}</code></pre>`);
        return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
    });

    // 处理表格
    const tables = [];
    content = content.replace(/((?:^\|.*\|$\n?)+)/gm, (match) => {
        const lines = match.trim().split('\n').filter(l => l.trim());
        if (lines.length < 2) return match;

        // 检查是否是有效的表格（有分隔符行）
        const separatorLine = lines[1];
        if (!separatorLine.match(/^\|[\s\-:|]+\|$/)) {
            return match;
        }

        // 构建表格 HTML
        let tableHtml = '<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;line-height:1.5;border:1px solid #ddd;">';

        // 表头
        const headerCells = lines[0].split('|').filter(c => c.trim() !== '');
        tableHtml += '<thead><tr>';
        headerCells.forEach(cell => {
            tableHtml += `<th style="border:1px solid #ddd;padding:12px;background:#f8f9fa;font-weight:600;text-align:left;">${cell.trim()}</th>`;
        });
        tableHtml += '</tr></thead>';

        // 数据行（从第3行开始，跳过表头和分隔符）
        if (lines.length > 2) {
            tableHtml += '<tbody>';
            for (let i = 2; i < lines.length; i++) {
                const cells = lines[i].split('|').filter(c => c.trim() !== '');
                const bgColor = (i - 2) % 2 === 1 ? 'background:#fafafa;' : '';
                tableHtml += `<tr style="${bgColor}">`;
                cells.forEach(cell => {
                    tableHtml += `<td style="border:1px solid #ddd;padding:12px;">${cell.trim()}</td>`;
                });
                tableHtml += '</tr>';
            }
            tableHtml += '</tbody>';
        }

        tableHtml += '</table>';
        tables.push(tableHtml);
        return `@@TABLE_${tables.length - 1}@@`;
    });

    const lines = content.split('\n');
    const htmlLines = [];
    let inOrderedList = false;
    let inUnorderedList = false;

    const flushList = () => {
        if (inOrderedList) {
            htmlLines.push('</ol>');
            inOrderedList = false;
        }
        if (inUnorderedList) {
            htmlLines.push('</ul>');
            inUnorderedList = false;
        }
    };

    const applyInline = (line) => {
        let result = line;
        result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
        result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        return result;
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            flushList();
            continue;
        }

        // 跳过表格占位符
        if (line.startsWith('@@TABLE_')) {
            flushList();
            htmlLines.push(line);
            continue;
        }

        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            flushList();
            const level = headingMatch[1].length;
            htmlLines.push(`<h${level}>${applyInline(headingMatch[2])}</h${level}>`);
            continue;
        }

        const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
        if (orderedMatch) {
            if (inUnorderedList) {
                htmlLines.push('</ul>');
                inUnorderedList = false;
            }
            if (!inOrderedList) {
                htmlLines.push('<ol>');
                inOrderedList = true;
            }
            htmlLines.push(`<li>${applyInline(orderedMatch[2])}</li>`);
            continue;
        }

        const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
        if (unorderedMatch) {
            if (inOrderedList) {
                htmlLines.push('</ol>');
                inOrderedList = false;
            }
            if (!inUnorderedList) {
                htmlLines.push('<ul>');
                inUnorderedList = true;
            }
            htmlLines.push(`<li>${applyInline(unorderedMatch[1])}</li>`);
            continue;
        }

        flushList();
        htmlLines.push(`<p>${applyInline(line)}</p>`);
    }

    flushList();

    let html = htmlLines.join('\n');
    html = html.replace(/@@CODEBLOCK_(\d+)@@/g, (_, index) => codeBlocks[parseInt(index, 10)]);
    html = html.replace(/@@TABLE_(\d+)@@/g, (_, index) => tables[parseInt(index, 10)]);
    return html;
};

// 表格渲染插件 - 增强表格样式
const tablePlugin = (md) => {
    // 保存默认的表格渲染规则
    const defaultTableRender = md.renderer.rules.table_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.table_open = function(tokens, idx, options, env, self) {
        return '<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; line-height: 1.5;">';
    };

    md.renderer.rules.th_open = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const style = token.attrGet('style') || '';
        return `<th style="${style} border: 1px solid #ddd; padding: 12px; background: #f8f9fa; font-weight: 600; text-align: left;">`;
    };

    md.renderer.rules.td_open = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const style = token.attrGet('style') || '';
        return `<td style="${style} border: 1px solid #ddd; padding: 12px;">`;
    };

    md.renderer.rules.tr_open = function() {
        return '<tr style="border-bottom: 1px solid #ddd;">';
    };
};

const md = markdownItLib ? markdownItLib({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    // 启用表格支持
    table: true
}).use(galleryPlugin).use(tablePlugin) : {
    render: (text) => simpleMarkdown(text)
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
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        strongDelimiter: '**',
        emDelimiter: '*'
    });

    // 表格转换规则 - 确保正确转换 HTML 表格为 Markdown
    turndownService.keep(['table', 'tr', 'td', 'th']);

    // 自定义规则处理表格（Turndown 默认支持，这里增强处理）
    turndownService.addRule('tables', {
        filter: function(node) {
            return node.nodeName === 'TABLE';
        },
        replacement: function(content, node) {
            // 获取所有行
            const rows = Array.from(node.querySelectorAll('tr'));
            if (rows.length === 0) return '';

            // 解析每一行
            const tableData = rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td, th'));
                return cells.map(cell => {
                    // 获取单元格内容，保留基本格式
                    let text = turndownService.turndown(cell.innerHTML);
                    // 清理换行符
                    text = text.replace(/\n/g, ' ').trim();
                    // 转义管道符
                    text = text.replace(/\|/g, '\\|');
                    return text || ' ';
                });
            });

            if (tableData.length === 0 || tableData[0].length === 0) return '';

            // 构建 Markdown 表格
            let markdown = '\n';

            // 表头行
            const headerRow = tableData[0];
            markdown += '| ' + headerRow.join(' | ') + ' |\n';

            // 分隔符
            const separator = headerRow.map(() => '---').join(' | ');
            markdown += '| ' + separator + ' |\n';

            // 数据行
            for (let i = 1; i < tableData.length; i++) {
                // 补齐单元格数量
                const row = tableData[i];
                while (row.length < headerRow.length) {
                    row.push('');
                }
                markdown += '| ' + row.join(' | ') + ' |\n';
            }

            return markdown + '\n';
        }
    });

    // 处理代码块
    turndownService.addRule('codeBlocks', {
        filter: function(node) {
            return node.nodeName === 'PRE' && node.querySelector('code');
        },
        replacement: function(content, node) {
            const code = node.querySelector('code');
            const language = code.className.match(/language-(\w+)/)?.[1] || '';
            return '\n```' + language + '\n' + code.textContent.trim() + '\n```\n';
        }
    });

    // 处理图片
    turndownService.addRule('images', {
        filter: 'img',
        replacement: function(content, node) {
            const alt = node.alt || '';
            const src = node.getAttribute('src') || '';
            return '![' + alt + '](' + src + ')';
        }
    });

    // 处理链接
    turndownService.addRule('links', {
        filter: function(node) {
            return node.nodeName === 'A' && node.getAttribute('href');
        },
        replacement: function(content, node) {
            const href = node.getAttribute('href');
            const title = node.title ? ' "' + node.title + '"' : '';
            return '[' + content + '](' + href + title + ')';
        }
    });

    // 处理加粗
    turndownService.addRule('strong', {
        filter: ['strong', 'b'],
        replacement: function(content) {
            return '**' + content + '**';
        }
    });

    // 处理斜体
    turndownService.addRule('emphasis', {
        filter: ['em', 'i'],
        replacement: function(content) {
            return '*' + content + '*';
        }
    });

    // 处理删除线
    turndownService.addRule('strikethrough', {
        filter: 'del',
        replacement: function(content) {
            return '~~' + content + '~~';
        }
    });

    // 处理水平线
    turndownService.addRule('horizontalRule', {
        filter: 'hr',
        replacement: function() {
            return '\n---\n';
        }
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
        const manualCopyHtml = ref('');
        const isManualCopyOpen = ref(false);
        const manualCopyTextarea = ref(null);
        const viewMode = ref('desktop');

        // 视图模式标签
        const viewModeLabel = computed(() => {
            const labels = {
                'mobile': '手机 (375px)',
                'tablet': '平板 (768px)',
                'desktop': '桌面 (100%)'
            };
            return labels[viewMode.value] || '桌面';
        });

        // 设置视图模式
        const setViewMode = (mode) => {
            viewMode.value = mode;
        };

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

        // 预览更新节流（避免大文档输入卡顿）
        let previewUpdateTimer = null;
        const scheduleUpdatePreview = (delay = 120) => {
            if (previewUpdateTimer) clearTimeout(previewUpdateTimer);
            previewUpdateTimer = setTimeout(() => {
                previewUpdateTimer = null;
                updatePreview();
            }, delay);
        };

        // 清理定时器函数
        const clearUpdateTimer = () => {
            if (previewUpdateTimer) {
                clearTimeout(previewUpdateTimer);
                previewUpdateTimer = null;
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
                    scheduleUpdatePreview(0);
                    showStatus('文件上传成功！', 'success');
                };
                reader.readAsText(file);
            } else {
                showStatus('请上传 .md 或 .markdown 文件', 'error');
            }

            // 清空 input，允许重复选择同一文件
            event.target.value = '';
        };

        // 智能清理 HTML
        const cleanHtml = (html) => {
            // 创建临时 DOM
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // 移除不需要的元素和属性
            const removeSelectors = [
                'script', 'style', 'iframe', 'object', 'embed', 'meta',
                '[class*="comment"]', '[class*="ad-"]', '[class*="ads-"]'
            ];
            removeSelectors.forEach(selector => {
                tempDiv.querySelectorAll(selector).forEach(el => el.remove());
            });

            // 移除 style 属性（保留 turndown 处理的）
            tempDiv.querySelectorAll('[style]').forEach(el => {
                // 保留图片的尺寸样式
                if (el.tagName !== 'IMG') {
                    el.removeAttribute('style');
                }
            });

            return tempDiv.innerHTML;
        };

        // 处理粘贴事件（图片 + 富文本）
        const handlePaste = async (event) => {
            const items = event.clipboardData.items;
            const types = event.clipboardData.types;

            // 优先检查图片
            for (let item of items) {
                if (item.type.indexOf('image') !== -1) {
                    event.preventDefault();
                    const file = item.getAsFile();
                    await handleImagePaste(file);
                    showStatus('图片已粘贴', 'success');
                    return;
                }
            }

            // 处理富文本 HTML（来自飞书、Notion、Word、网页等）
            const htmlData = event.clipboardData.getData('text/html');
            const plainText = event.clipboardData.getData('text/plain');

            if (htmlData && turndownService) {
                event.preventDefault();

                try {
                    // 清理 HTML
                    const cleanedHtml = cleanHtml(htmlData);

                    // 转换为 Markdown
                    let markdown = turndownService.turndown(cleanedHtml);

                    // 后处理 - 清理多余空行
                    markdown = markdown
                        .replace(/\n{3,}/g, '\n\n')  // 3+ 空行变成 2 个
                        .replace(/^\n+/, '')         // 开头空行
                        .replace(/\n+$/, '');        // 结尾空行

                    // 插入到编辑器
                    const textarea = event.target;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = markdownContent.value;

                    markdownContent.value = text.substring(0, start) + markdown + text.substring(end);
                    textarea.setSelectionRange(start + markdown.length, start + markdown.length);
                    textarea.focus();

                    scheduleUpdatePreview(0);
                    showStatus('富文本已转换为 Markdown', 'success');
                } catch (error) {
                    console.error('粘贴转换失败:', error);
                    // 如果转换失败，使用纯文本
                    if (plainText) {
                        const textarea = event.target;
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const text = markdownContent.value;
                        markdownContent.value = text.substring(0, start) + plainText + text.substring(end);
                        textarea.setSelectionRange(start + plainText.length, start + plainText.length);
                        scheduleUpdatePreview(0);
                        showStatus('已粘贴纯文本', 'success');
                    }
                }
                return;
            }

            // 如果没有 HTML，让浏览器默认处理纯文本
        };

        // 处理图片粘贴
        const handleImagePaste = async (file) => {
            try {
                showStatus('正在处理图片...', 'success');

                const imageId = 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9) + '-' + performance.now().toString().replace('.', '');
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

                scheduleUpdatePreview(0);
                showStatus('图片已添加！', 'success');
            } catch (error) {
                console.error('图片处理失败:', error);
                showStatus('图片处理失败，请重试', 'error');
            }
        };

        // 复制到公众号
        const copyToWeChat = async () => {
            let html = '';
            try {
                if (!markdownContent.value) {
                    showStatus('请先输入内容', 'error');
                    return;
                }

                html = md.render(markdownContent.value);

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

                // 内联表格样式（确保公众号正确显示）
                html = inlineTableStyles(html);

                // 内联所有样式
                html = inlineStyles(html);

                // 复制到剪贴板
                const textContainer = document.createElement('div');
                textContainer.innerHTML = html;
                const plainText = textContainer.textContent || '';
                textContainer.remove();

                if (navigator.clipboard && navigator.clipboard.write) {
                    try {
                        const htmlBlob = new Blob([html], { type: 'text/html' });
                        const textBlob = new Blob([plainText], { type: 'text/plain' });
                        const item = new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob });
                        await navigator.clipboard.write([item]);
                    } catch (clipError) {
                        console.warn('Clipboard API failed, falling back to manual copy:', clipError);
                        openManualCopy(html);
                        showStatus('剪贴板API失败，已打开手动复制窗口', 'error');
                        return;
                    }
                } else {
                    openManualCopy(html);
                    showStatus('剪贴板不可用，已打开手动复制窗口', 'error');
                    return;
                }

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
                    showStatus('复制失败，已打开手动复制窗口', 'error');
                    openManualCopy(html);
                }
            }
        };

        const openManualCopy = (html) => {
            manualCopyHtml.value = html || '';
            isManualCopyOpen.value = true;
            nextTick(() => {
                if (manualCopyTextarea.value) {
                    manualCopyTextarea.value.focus();
                    manualCopyTextarea.value.select();
                }
            });
        };

        const closeManualCopy = () => {
            isManualCopyOpen.value = false;
        };

        const copyManualHtml = async () => {
            if (!manualCopyHtml.value) return;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(manualCopyHtml.value);
                    showStatus('已复制 HTML', 'success');
                }
            } catch (err) {
                // 忽略错误，用户可手动复制
            } finally {
                nextTick(() => {
                    if (manualCopyTextarea.value) {
                        manualCopyTextarea.value.focus();
                        manualCopyTextarea.value.select();
                    }
                });
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
            const container = document.createElement('div');
            container.innerHTML = html;

            const splitTemplate = (value) => {
                const result = [];
                let current = '';
                let depth = 0;
                for (let i = 0; i < value.length; i++) {
                    const ch = value[i];
                    if (ch === '(') depth += 1;
                    if (ch === ')') depth = Math.max(0, depth - 1);
                    if (ch === ' ' && depth === 0) {
                        if (current.trim()) result.push(current.trim());
                        current = '';
                        continue;
                    }
                    current += ch;
                }
                if (current.trim()) result.push(current.trim());
                return result;
            };

            const getColumnCount = (value) => {
                if (!value) return 0;
                const repeatMatch = value.match(/repeat\((\d+),/);
                if (repeatMatch) return parseInt(repeatMatch[1], 10);
                const parts = splitTemplate(value);
                return parts.length;
            };

            const getGapValue = (element) => {
                const gap = element.style.getPropertyValue('gap') || element.style.getPropertyValue('grid-gap');
                if (!gap) return '';
                return gap.split(' ')[0] || '';
            };

            const gridElements = container.querySelectorAll('[style*="display: grid"], [style*="display:grid"], [style*="grid-template"], .grid, [class*="grid"]');
            gridElements.forEach((gridEl) => {
                const template = gridEl.style.getPropertyValue('grid-template-columns');
                const columns = getColumnCount(template);
                if (!columns || columns <= 1) {
                    gridEl.style.display = 'block';
                    gridEl.style.removeProperty('grid-template-columns');
                    gridEl.style.removeProperty('gap');
                    gridEl.style.removeProperty('grid-gap');
                    return;
                }

                const gap = getGapValue(gridEl);
                const children = Array.from(gridEl.children);

                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                table.style.borderSpacing = '0';

                const tbody = document.createElement('tbody');
                for (let i = 0; i < children.length; i += columns) {
                    const tr = document.createElement('tr');
                    for (let j = 0; j < columns; j += 1) {
                        const td = document.createElement('td');
                        td.style.verticalAlign = 'top';
                        if (gap) td.style.padding = gap;

                        const child = children[i + j];
                        if (child) td.appendChild(child);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);

                gridEl.innerHTML = '';
                gridEl.style.display = 'block';
                gridEl.style.removeProperty('grid-template-columns');
                gridEl.style.removeProperty('gap');
                gridEl.style.removeProperty('grid-gap');
                gridEl.appendChild(table);
            });

            return container.innerHTML;
        }

        // 内联表格样式（公众号兼容）
        function inlineTableStyles(html) {
            const container = document.createElement('div');
            container.innerHTML = html;

            // 为所有表格添加样式
            container.querySelectorAll('table').forEach((table) => {
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                table.style.margin = '16px 0';
                table.style.fontSize = '14px';
                table.style.lineHeight = '1.5';
                table.style.border = '1px solid #ddd';

                // 处理表头
                table.querySelectorAll('th').forEach((th) => {
                    th.style.border = '1px solid #ddd';
                    th.style.padding = '12px';
                    th.style.backgroundColor = '#f8f9fa';
                    th.style.fontWeight = '600';
                    th.style.textAlign = 'left';
                });

                // 处理单元格
                table.querySelectorAll('td').forEach((td) => {
                    td.style.border = '1px solid #ddd';
                    td.style.padding = '12px';
                });

                // 处理行
                table.querySelectorAll('tr').forEach((tr, index) => {
                    tr.style.borderBottom = '1px solid #ddd';
                    // 斑马纹
                    if (index % 2 === 1) {
                        tr.style.backgroundColor = '#fafafa';
                    }
                });
            });

            return container.innerHTML;
        }

        // 内联样式
        function inlineStyles(html) {
            const container = document.createElement('div');
            container.innerHTML = html;

            // 移除 style/link，避免公众号忽略或污染
            container.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
                node.remove();
            });

            // 已内联样式时移除 class 以减少冲突
            container.querySelectorAll('[class]').forEach((node) => {
                node.removeAttribute('class');
            });

            return container.innerHTML;
        }

        // 应用样式
        function applyStyles(html, style) {
            if (!style || !style.styles) return html;

            const wrapper = document.createElement('div');
            wrapper.setAttribute('data-wechat-article', 'true');

            const content = document.createElement('div');
            content.innerHTML = html;

            const applyInlineProps = (element, props) => {
                Object.entries(props || {}).forEach(([prop, value]) => {
                    element.style.setProperty(prop, value);
                });
            };

            // 先应用 body 样式到容器
            applyInlineProps(wrapper, style.styles.body || {});

            // 按选择器应用样式到内容
            Object.entries(style.styles).forEach(([selector, props]) => {
                if (selector === 'body') return;
                content.querySelectorAll(selector).forEach((el) => {
                    applyInlineProps(el, props);
                });
            });

            // 将内容挂入容器
            while (content.firstChild) {
                wrapper.appendChild(content.firstChild);
            }

            return wrapper.outerHTML;
        }

        // 生成长图
        const generateImage = async () => {
            try {
                if (!markdownContent.value) {
                    showStatus('请先输入内容', 'error');
                    return;
                }

                // 检查 html2canvas 是否加载
                if (typeof html2canvas === 'undefined') {
                    showStatus('图片生成功能加载中，请稍候...', 'error');
                    // 尝试重新加载
                    const script = document.createElement('script');
                    script.src = 'https://cdn.staticfile.org/html2canvas/1.4.1/html2canvas.min.js';
                    script.onload = () => generateImage();
                    script.onerror = () => showStatus('无法加载图片生成库，请检查网络', 'error');
                    document.head.appendChild(script);
                    return;
                }

                showStatus('正在生成图片，请稍候...', 'success');

                await nextTick();

                // 获取当前样式配置
                const style = styles.value[currentStyle.value];
                const previewElement = document.querySelector(`#preview-${currentStyle.value}`);

                if (!previewElement) {
                    showStatus('预览内容为空', 'error');
                    return;
                }

                // 创建一个克隆节点
                const clone = previewElement.cloneNode(true);

                // 移除 ID 以避免与原有 CSS 冲突
                clone.removeAttribute('id');

                // 设置容器基础样式
                clone.style.width = '800px';
                clone.style.maxWidth = '800px';
                clone.style.position = 'fixed';
                clone.style.top = '0';
                clone.style.left = '-9999px';
                clone.style.zIndex = '-1';
                clone.style.boxSizing = 'border-box';
                clone.style.padding = '40px';
                clone.style.margin = '0';

                // 1. 应用 Body 样式到容器
                if (style && style.styles && style.styles.body) {
                    Object.entries(style.styles.body).forEach(([prop, value]) => {
                        // 转换 CSS 属性名（如 padding-left -> paddingLeft）
                        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        clone.style[camelProp] = value;
                    });
                }
                // 强制背景色，避免透明
                if (!clone.style.background && !clone.style.backgroundColor) {
                    clone.style.backgroundColor = '#fff';
                }

                // 2. 应用子元素样式
                if (style && style.styles) {
                    Object.entries(style.styles).forEach(([selector, props]) => {
                        if (selector === 'body') return;

                        const elements = clone.querySelectorAll(selector);
                        elements.forEach(el => {
                            Object.entries(props).forEach(([prop, value]) => {
                                const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                el.style[camelProp] = value;
                            });
                        });
                    });
                }

                document.body.appendChild(clone);

                // 等待图片加载
                const images = clone.querySelectorAll('img');
                await Promise.all(Array.from(images).map(img => {
                    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
                    return new Promise(resolve => {
                        const timeout = setTimeout(resolve, 5000); // 5秒超时
                        img.onload = () => {
                            clearTimeout(timeout);
                            resolve();
                        };
                        img.onerror = () => {
                            clearTimeout(timeout);
                            resolve(); // 即使失败也继续
                        };
                    });
                }));

                // 修复代码块样式（如果有）
                const preBlocks = clone.querySelectorAll('pre');
                preBlocks.forEach(pre => {
                    const computed = window.getComputedStyle(pre);
                    if (!pre.style.backgroundColor) pre.style.backgroundColor = computed.backgroundColor || '#f8f8f8';
                    if (!pre.style.padding) pre.style.padding = computed.padding || '15px';
                    if (!pre.style.borderRadius) pre.style.borderRadius = computed.borderRadius || '5px';
                });

                // 使用 html2canvas 生成图片
                const canvas = await html2canvas(clone, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: clone.style.backgroundColor || '#fff',
                    logging: false,
                    width: 800,
                    height: clone.scrollHeight,
                    windowWidth: 800,
                    windowHeight: clone.scrollHeight
                });

                document.body.removeChild(clone);

                // 创建下载链接
                const dataUrl = canvas.toDataURL('image/png', 0.95);
                const link = document.createElement('a');
                const timestamp = new Date().getTime();
                link.download = `文章长图-${timestamp}.png`;
                link.href = dataUrl;
                link.click();

                // 保存到剪贴板（如果支持）
                if (navigator.clipboard && navigator.clipboard.write) {
                    try {
                        const blob = await new Promise(resolve => {
                            canvas.toBlob(resolve, 'image/png', 0.95);
                        });
                        if (blob) {
                            await navigator.clipboard.write([
                                new ClipboardItem({ 'image/png': blob })
                            ]);
                            showStatus('图片已生成并复制到剪贴板！', 'success');
                        } else {
                            showStatus('图片生成成功！', 'success');
                        }
                    } catch (err) {
                        // 剪贴板复制失败，但图片已下载
                        showStatus('图片生成成功！', 'success');
                    }
                } else {
                    showStatus('图片生成成功！', 'success');
                }
            } catch (error) {
                console.error('生成图片失败:', error);
                showStatus('生成图片失败: ' + error.message, 'error');
            }
        };

        // 清空编辑器
        const clearEditor = () => {
            if (confirm('确定要清空所有内容吗？')) {
                markdownContent.value = '';
                scheduleUpdatePreview(0);
                showStatus('已清空', 'success');
            }
        };

        // 导出 HTML
        const exportHTML = async () => {
            if (!markdownContent.value) {
                showStatus('请先输入内容', 'error');
                return;
            }

            try {
                let html = md.render(markdownContent.value);

                // 应用当前样式
                const style = styles.value[currentStyle.value];
                if (style) {
                    html = applyStyles(html, style);
                }

                // 处理图片
                html = await processImagesForWeChat(html);

                // 转换 Grid 为 Table
                html = convertGridToTable(html);

                // 生成完整 HTML 文档
                const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>公众号文章</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;

                // 下载文件
                const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().slice(0, 10);
                link.download = `公众号文章-${timestamp}.html`;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);

                showStatus('HTML 导出成功！', 'success');
            } catch (error) {
                console.error('导出 HTML 失败:', error);
                showStatus('导出 HTML 失败', 'error');
            }
        };

        // 导出 PDF
        const exportPDF = async () => {
            if (!markdownContent.value) {
                showStatus('请先输入内容', 'error');
                return;
            }

            // 检查 html2canvas 是否加载
            if (typeof html2canvas === 'undefined') {
                showStatus('PDF 功能加载中，请稍候...', 'error');
                const script = document.createElement('script');
                script.src = 'https://cdn.staticfile.org/html2canvas/1.4.1/html2canvas.min.js';
                script.onload = () => exportPDF();
                script.onerror = () => showStatus('无法加载 PDF 生成库', 'error');
                document.head.appendChild(script);
                return;
            }

            try {
                showStatus('正在生成 PDF，请稍候...', 'success');

                await nextTick();

                const style = styles.value[currentStyle.value];
                const previewElement = document.querySelector(`#preview-${currentStyle.value}`);

                if (!previewElement) {
                    showStatus('预览内容为空', 'error');
                    return;
                }

                // 克隆节点
                const clone = previewElement.cloneNode(true);
                clone.removeAttribute('id');
                clone.style.width = '800px';
                clone.style.maxWidth = '800px';
                clone.style.position = 'fixed';
                clone.style.top = '0';
                clone.style.left = '-9999px';
                clone.style.zIndex = '-1';
                clone.style.boxSizing = 'border-box';
                clone.style.padding = '40px';
                clone.style.margin = '0';

                // 应用样式
                if (style && style.styles && style.styles.body) {
                    Object.entries(style.styles.body).forEach(([prop, value]) => {
                        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        clone.style[camelProp] = value;
                    });
                }
                if (!clone.style.background && !clone.style.backgroundColor) {
                    clone.style.backgroundColor = '#fff';
                }

                // 应用子元素样式
                if (style && style.styles) {
                    Object.entries(style.styles).forEach(([selector, props]) => {
                        if (selector === 'body') return;
                        const elements = clone.querySelectorAll(selector);
                        elements.forEach(el => {
                            Object.entries(props).forEach(([prop, value]) => {
                                const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                el.style[camelProp] = value;
                            });
                        });
                    });
                }

                document.body.appendChild(clone);

                // 等待图片加载
                const images = clone.querySelectorAll('img');
                await Promise.all(Array.from(images).map(img => {
                    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
                    return new Promise(resolve => {
                        const timeout = setTimeout(resolve, 5000);
                        img.onload = () => { clearTimeout(timeout); resolve(); };
                        img.onerror = () => { clearTimeout(timeout); resolve(); };
                    });
                }));

                const canvas = await html2canvas(clone, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: clone.style.backgroundColor || '#fff',
                    logging: false,
                    width: 800,
                    height: clone.scrollHeight,
                    windowWidth: 800,
                    windowHeight: clone.scrollHeight
                });

                document.body.removeChild(clone);

                // 转换为 PDF
                const imgData = canvas.toDataURL('image/png', 1.0);

                // 检查是否加载了 jsPDF
                if (typeof jspdf === 'undefined' || !window.jspdf) {
                    // 如果没有 jsPDF，直接下载图片
                    const link = document.createElement('a');
                    const timestamp = new Date().toISOString().slice(0, 10);
                    link.download = `公众号文章-${timestamp}.png`;
                    link.href = imgData;
                    link.click();
                    showStatus('已导出为图片（PDF库加载失败）', 'success');
                    return;
                }

                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

                let position = 0;
                let heightLeft = imgHeight;

                // 分页处理
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight * (pdfWidth / imgWidth));
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight * (pdfWidth / imgWidth));
                    heightLeft -= pdfHeight;
                }

                const timestamp = new Date().toISOString().slice(0, 10);
                pdf.save(`公众号文章-${timestamp}.pdf`);
                showStatus('PDF 导出成功！', 'success');

            } catch (error) {
                console.error('导出 PDF 失败:', error);
                showStatus('导出 PDF 失败: ' + error.message, 'error');
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
            scheduleUpdatePreview(0);
        });

        // 组件挂载时初始化
        onMounted(async () => {
            await initDB();

            // 从 localStorage 恢复内容
            const savedContent = localStorage.getItem('huasheng_editor_content');
            if (savedContent) {
                markdownContent.value = savedContent;
            }

            const savedStyle = localStorage.getItem('huasheng_editor_style');
            if (savedStyle && styles.value[savedStyle]) {
                currentStyle.value = savedStyle;
            }

            // 监听编辑器粘贴事件
            const textarea = document.querySelector('.editor-textarea');
            if (textarea) {
                textarea.addEventListener('paste', handlePaste);
            }

            // 初始更新预览
            scheduleUpdatePreview(100);
        });

        // 自动保存监听
        watch(markdownContent, (newContent) => {
            localStorage.setItem('huasheng_editor_content', newContent);
        });

        watch(currentStyle, (newStyle) => {
            localStorage.setItem('huasheng_editor_style', newStyle);
        });

        // 清理函数处理卸载
        onUnmounted(() => {
            // 清理事件监听器
            const textarea = document.querySelector('.editor-textarea');
            if (textarea) {
                textarea.removeEventListener('paste', handlePaste);
            }
            // 清理定时器
            clearUpdateTimer();
        });

        return {
            markdownContent,
            currentStyle,
            styles,
            renderedHTML,
            statusMessage,
            statusType,
            updatePreview,
            scheduleUpdatePreview,
            handleFileUpload,
            generateImage,
            copyToWeChat,
            clearEditor,
            manualCopyHtml,
            isManualCopyOpen,
            manualCopyTextarea,
            openManualCopy,
            closeManualCopy,
            copyManualHtml,
            clearUpdateTimer,
            viewMode,
            viewModeLabel,
            setViewMode,
            exportHTML,
            exportPDF
        };
    }
}).mount('#app');
