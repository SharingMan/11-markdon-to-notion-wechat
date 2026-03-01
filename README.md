# 公众号 Markdown 编辑器

一个专为微信公众号设计的 Markdown 编辑器

## 🌟 功能特点

### 🎨 30+ 种精美样式

| 分类 | 主题 |
|------|------|
| **经典公众号** | 默认、技术、优雅、深度阅读、微信原生 |
| **科技数码** | Mac 白、AI Coder 特调、极客 Pro、Cyberpunk、霓虹夜景、午夜蓝 |
| **媒体出版** | 杂志风格、纽约时报、金融时报、Wired 连线、Medium 长文、时尚杂志 |
| **品牌设计** | Apple 极简、Anthropic Claude、Claude 燕麦色、Jony Ive、Microsoft 风格、Google 风格 |
| **艺术风格** | 水墨风、复古怀旧、羊皮卷轴、文艺清新、日式简约、北欧设计 |
| **商务专业** | 商务专业、学术论文、极简主义 |
| **特色主题** | 海洋蓝调、森林绿野、奢华黑金、糖果甜心 |

### 📱 多端预览

* **手机视图** (375px) - 模拟 iPhone 显示效果
* **平板视图** (768px) - 模拟 iPad 显示效果
* **桌面视图** (100%) - 默认桌面显示效果

### 📸 智能图片处理

* **智能粘贴**：支持从任何地方粘贴图片（截图、浏览器、文件管理器）
* **自动压缩**：图片自动压缩到合理大小（最高压缩 80%+）
* **本地存储**：使用 IndexedDB 持久化存储，刷新不丢失
* **编辑友好**：编辑器中使用短链接（`img://img-xxx`），不会卡顿
* **完美兼容**：复制到公众号时自动转 Base64

### 🚀 强大功能

* **实时预览**：左侧编辑，右侧即时查看效果
* **一键复制**：直接粘贴到公众号编辑器，格式完美保留
* **智能粘贴**：支持从飞书、Notion、Word、网页等富文本应用直接粘贴，自动转换为纯净 Markdown
* **文件上传**：支持 .md / .markdown 文件
* **代码高亮**：优雅的代码块展示，支持多种语言
* **响应式设计**：完美适配桌面、平板、手机

### 📤 导出功能

* **导出 HTML**：导出完整 HTML 文件，包含样式
* **导出 PDF**：将文章导出为 PDF 格式
* **生成长图**：生成高清文章长图

### 🖼️ 多图网格排版

支持 `:::gallery` 语法实现多图并排：

```markdown
:::gallery cols=2
![图片1](url1)
![图片2](url2)
![图片3](url3)
:::
```

## 📖 使用指南

### 快速开始

1. 访问本地服务器（见下方启动方法）
2. 在左侧输入或粘贴 Markdown 内容
3. 选择喜欢的样式主题
4. 点击「复制到公众号」
5. 粘贴到微信公众号编辑器

### 本地运行

#### 方法一：使用 Python（推荐）

```bash
# Python 3
python3 -m http.server 8080

# 或使用别名（如果已配置）
python -m http.server 8080
```

#### 方法二：使用提供的脚本

```bash
# 给脚本执行权限
chmod +x start.sh

# 运行脚本
./start.sh
```

然后访问：http://localhost:8080

## 🛠️ 技术栈

* **Vue 3** - 渐进式前端框架
* **Markdown-it** - 强大的 Markdown 解析器
* **Highlight.js** - 代码语法高亮
* **IndexedDB** - 本地图片持久化存储
* **Canvas API** - 客户端图片压缩
* **Turndown** - HTML 转 Markdown（智能粘贴）
* **纯 CSS** - 无需构建工具，开箱即用

## 📂 项目结构

```
公众号编辑器/
├── index.html        # 主页面
├── app.js           # Vue 应用逻辑
├── styles.js        # 20+ 种样式主题配置
├── loader.js        # CDN 资源加载器
├── start.sh         # 启动脚本
├── README.md        # 项目说明
└── favicon.svg      # 网站图标

```

## 💡 核心特性

### ⭐ 图片处理系统

**技术架构**：

```
用户粘贴图片
    ↓
Canvas API 压缩（最大 1920px，质量 85%）
    ↓
IndexedDB 持久化存储
    ↓
编辑器显示短链接（img://img-xxx）
    ↓
预览区从 IndexedDB 加载显示
    ↓
复制时自动转 Base64
```

**核心优势**：

* ✅ **100% 成功率**：不依赖外部图床，完全本地化
* ✅ **编辑器流畅**：短链接不会造成卡顿
* ✅ **刷新不丢失**：IndexedDB 持久化存储
* ✅ **智能压缩**：平均压缩 50%-80%

### 公众号完美兼容

* ✅ 自动将 CSS Grid 转换为 Table 布局
* ✅ 所有样式转为内联样式
* ✅ 图片自动转 Base64
* ✅ 强制样式优先级（!important）

### 推荐样式

带有 ✨ 标识的样式是特别推荐的：

* **Anthropic Claude** - 优雅的技术文档风格
* **Claude 燕麦色** - 温暖舒适的长文阅读体验
* **Mac 白** - 苹果官方文档风格
* **水墨风** - 中国风传统美学
* **Cyberpunk** - 赛博朋克霓虹风格
* **金融时报** - 专业的财经风格
* **纽约时报** - 经典的新闻风格
* **技术风格** - 程序员最爱

## 📄 开源协议

本项目基于 MIT License 开源。

你可以自由地：

* ✅ 商业使用
* ✅ 修改
* ✅ 分发
* ✅ 私有使用

## 🙏 致谢

* 感谢原项目作者 [alchaincyf/huasheng_editor](https://github.com/alchaincyf/huasheng_editor) 的灵感
* 感谢所有贡献者和使用者

---

Made with ❤️ 

If you find this project useful, please give it a ⭐️ Star!

## ❓ 常见问题 (FAQ)

### 1. 为什么页面显示全是代码，没有渲染？
可能是因为国内网络无法访问默认的 CDN（jsdelivr）。
解决方法：我们在 `index.html` 中已经将 CDN 替换为国内稳定的 `staticfile.org`。如果你自己修改了代码，请确保使用国内可访问的 CDN 服务。

### 2. 如何将代码推送到 GitHub？
如果在推送时遇到 `Connection refused` (port 22) 错误，通常是因为网络/防火墙拦截了 SSH 端口。
**解决方法**：切换到 HTTPS 协议。

```bash
# 1. 切换远程仓库地址为 HTTPS
git remote set-url origin https://github.com/SharingMan/11-markdon-to-notion-wechat.git

# 2. 推送代码（可能需要输入 GitHub 用户名和密码/Token）
git push origin main
```
