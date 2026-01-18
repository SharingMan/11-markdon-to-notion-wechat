#!/bin/bash

# 公众号 Markdown 编辑器启动脚本

PORT=8080

echo "🚀 启动公众号 Markdown 编辑器..."
echo "📝 端口: $PORT"
echo ""
echo "访问地址: http://localhost:$PORT"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 检查 Python 3
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m http.server $PORT
else
    echo "❌ 错误: 未找到 Python，请先安装 Python 3"
    exit 1
fi
