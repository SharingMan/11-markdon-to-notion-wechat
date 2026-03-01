// 13 种样式主题配置
window.styles = {
    'default': {
        name: '默认',
        styles: {
            'body': {
                'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                'font-size': '16px',
                'line-height': '1.8',
                'color': '#333',
                'background': '#fff',
                'padding': '20px',
                'max-width': '800px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '24px',
                'font-weight': 'bold',
                'margin': '30px 0 20px',
                'color': '#333',
                'border-bottom': '2px solid #07c160',
                'padding-bottom': '10px'
            },
            'h2': {
                'font-size': '20px',
                'font-weight': 'bold',
                'margin': '25px 0 15px',
                'color': '#444'
            },
            'h3': {
                'font-size': '18px',
                'font-weight': 'bold',
                'margin': '20px 0 12px',
                'color': '#555'
            },
            'p': {
                'margin': '15px 0',
                'text-align': 'justify'
            },
            'code': {
                'background': '#f5f5f5',
                'padding': '2px 6px',
                'border-radius': '3px',
                'font-family': 'Monaco, Consolas, monospace',
                'font-size': '14px',
                'color': '#e83e8c'
            },
            'pre': {
                'background': '#f8f8f8',
                'padding': '15px',
                'border-radius': '5px',
                'overflow-x': 'auto',
                'border-left': '4px solid #07c160'
            },
            'blockquote': {
                'border-left': '4px solid #ddd',
                'padding-left': '20px',
                'margin': '20px 0',
                'color': '#666',
                'font-style': 'italic'
            },
            'a': {
                'color': '#07c160',
                'text-decoration': 'none'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '20px auto',
                'border-radius': '5px'
            },
            'ul, ol': {
                'margin': '15px 0',
                'padding-left': '30px'
            },
            'li': {
                'margin': '8px 0'
            },
            'strong': {
                'color': '#333',
                'font-weight': 'bold'
            },
            'em': {
                'color': '#666',
                'font-style': 'italic'
            },
            'table': {
                'width': '100%',
                'border-collapse': 'collapse',
                'margin': '16px 0',
                'font-size': '14px',
                'line-height': '1.5'
            },
            'th': {
                'border': '1px solid #ddd',
                'padding': '12px',
                'background': '#f8f9fa',
                'font-weight': '600',
                'text-align': 'left'
            },
            'td': {
                'border': '1px solid #ddd',
                'padding': '12px'
            },
            'tr': {
                'border-bottom': '1px solid #ddd'
            },
            'tr:nth-child(even)': {
                'background': '#fafafa'
            }
        }
    },

    'tech': {
        name: '技术',
        styles: {
            'body': {
                'font-family': '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                'font-size': '15px',
                'line-height': '1.7',
                'color': '#24292e',
                'background': '#fff',
                'padding': '30px',
                'max-width': '900px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '28px',
                'font-weight': '600',
                'margin': '30px 0',
                'color': '#0366d6',
                'border-bottom': '1px solid #eaecef',
                'padding-bottom': '10px'
            },
            'h2': {
                'font-size': '24px',
                'font-weight': '600',
                'margin': '25px 0',
                'color': '#24292e'
            },
            'code': {
                'background': '#f6f8fa',
                'padding': '2px 6px',
                'border-radius': '3px',
                'font-size': '85%',
                'color': '#e83e8c'
            },
            'pre': {
                'background': '#f6f8fa',
                'padding': '16px',
                'border-radius': '6px',
                'overflow-x': 'auto'
            },
            'blockquote': {
                'border-left': '4px solid #dfe2e5',
                'padding-left': '16px',
                'color': '#6a737d'
            }
        }
    },

    'elegant': {
        name: '优雅',
        styles: {
            'body': {
                'font-family': '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
                'font-size': '17px',
                'line-height': '2',
                'color': '#2c3e50',
                'background': '#fff',
                'padding': '40px',
                'max-width': '750px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '32px',
                'font-weight': '300',
                'margin': '40px 0 25px',
                'color': '#34495e',
                'letter-spacing': '1px'
            },
            'p': {
                'margin': '20px 0',
                'text-align': 'justify',
                'text-indent': '2em'
            },
            'blockquote': {
                'border-left': '3px solid #bdc3c7',
                'padding-left': '25px',
                'margin': '25px 0',
                'color': '#7f8c8d',
                'font-style': 'italic'
            }
        }
    },

    'magazine': {
        name: '杂志风格',
        styles: {
            'body': {
                'font-family': '"Times New Roman", Times, serif',
                'font-size': '18px',
                'line-height': '1.9',
                'color': '#1a1a1a',
                'background': '#fff',
                'padding': '50px',
                'max-width': '700px',
                'margin': '0 auto',
                'column-count': '1'
            },
            'h1': {
                'font-size': '36px',
                'font-weight': 'bold',
                'margin': '40px 0 25px',
                'color': '#000',
                'text-transform': 'uppercase',
                'letter-spacing': '2px'
            },
            'h2': {
                'font-size': '28px',
                'font-weight': 'bold',
                'margin': '30px 0 20px',
                'color': '#333'
            },
            'p': {
                'margin': '18px 0',
                'text-align': 'justify'
            },
            'p:first-letter': {
                'font-size': '300%',
                'float': 'left',
                'line-height': '1',
                'margin-right': '8px',
                'font-weight': 'bold'
            }
        }
    },

    'nytimes': {
        name: '纽约时报',
        styles: {
            'body': {
                'font-family': 'Georgia, "Times New Roman", Times, serif',
                'font-size': '20px',
                'line-height': '1.9',
                'color': '#333',
                'background': '#fff',
                'padding': '40px',
                'max-width': '750px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '40px',
                'font-weight': '700',
                'margin': '30px 0 25px',
                'color': '#000',
                'line-height': '1.2'
            },
            'p': {
                'margin': '22px 0',
                'text-align': 'left'
            }
        }
    },

    'ft': {
        name: '金融时报',
        styles: {
            'body': {
                'font-family': '"Metric", "Arial", sans-serif',
                'font-size': '18px',
                'line-height': '1.8',
                'color': '#333',
                'background': '#fff5ee',
                'padding': '35px',
                'max-width': '800px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '32px',
                'font-weight': '600',
                'margin': '30px 0',
                'color': '#ff6600',
                'border-bottom': '3px solid #ff6600',
                'padding-bottom': '10px'
            }
        }
    },

    'jony-ive': {
        name: 'Jony Ive',
        styles: {
            'body': {
                'font-family': '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                'font-size': '19px',
                'line-height': '1.7',
                'color': '#1d1d1f',
                'background': '#fff',
                'padding': '50px',
                'max-width': '680px',
                'margin': '0 auto',
                'letter-spacing': '-0.01em'
            },
            'h1': {
                'font-size': '56px',
                'font-weight': '600',
                'margin': '50px 0 30px',
                'color': '#1d1d1f',
                'letter-spacing': '-0.02em',
                'line-height': '1.1'
            }
        }
    },

    'wired': {
        name: 'Wired 连线',
        styles: {
            'body': {
                'font-family': '"GT America", "Helvetica Neue", Arial, sans-serif',
                'font-size': '18px',
                'line-height': '1.75',
                'color': '#333',
                'background': '#fff',
                'padding': '40px',
                'max-width': '720px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '48px',
                'font-weight': '700',
                'margin': '40px 0',
                'color': '#000',
                'text-transform': 'uppercase',
                'letter-spacing': '3px'
            }
        }
    },

    'medium': {
        name: 'Medium 长文',
        styles: {
            'body': {
                'font-family': '"Charter", "Georgia", "Times New Roman", serif',
                'font-size': '21px',
                'line-height': '1.58',
                'color': '#333',
                'background': '#fff',
                'padding': '60px',
                'max-width': '680px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '42px',
                'font-weight': '700',
                'margin': '35px 0',
                'color': '#292929',
                'line-height': '1.04',
                'letter-spacing': '-0.015em'
            },
            'p': {
                'margin': '25px 0'
            }
        }
    },

    'apple': {
        name: 'Apple 极简',
        styles: {
            'body': {
                'font-family': '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                'font-size': '17px',
                'line-height': '1.58824',
                'color': '#1d1d1f',
                'background': '#fff',
                'padding': '80px 40px',
                'max-width': '980px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '48px',
                'font-weight': '600',
                'margin': '60px 0 30px',
                'color': '#1d1d1f',
                'letter-spacing': '-0.003em',
                'line-height': '1.08349'
            },
            'h2': {
                'font-size': '32px',
                'font-weight': '600',
                'margin': '40px 0 20px',
                'color': '#1d1d1f',
                'letter-spacing': '0.004em'
            },
            'p': {
                'margin': '20px 0'
            },
            'a': {
                'color': '#0066cc',
                'text-decoration': 'none'
            },
            'a:hover': {
                'text-decoration': 'underline'
            },
            'blockquote': {
                'border-left': '4px solid #d2d2d7',
                'padding-left': '20px',
                'margin': '20px 0',
                'color': '#86868b'
            }
        }
    },

    'microsoft': {
        name: 'Microsoft 风格',
        styles: {
            'body': {
                'font-family': '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
                'font-size': '15px',
                'line-height': '1.6',
                'color': '#333',
                'background': '#fff',
                'padding': '40px',
                'max-width': '800px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '32px',
                'font-weight': '600',
                'margin': '36px 0 12px',
                'color': '#243a5e',
                'padding-bottom': '12px'
            },
            'h2': {
                'font-size': '24px',
                'font-weight': '600',
                'margin': '30px 0 10px',
                'color': '#0078d4'
            },
            'h3': {
                'font-size': '20px',
                'font-weight': '600',
                'margin': '24px 0 8px',
                'color': '#333'
            },
            'p': {
                'margin': '12px 0 16px',
                'text-align': 'justify'
            },
            'a': {
                'color': '#0078d4',
                'text-decoration': 'none'
            },
            'a:hover': {
                'text-decoration': 'underline'
            },
            'blockquote': {
                'border-left': '4px solid #0078d4',
                'background': '#f3f2f1',
                'padding': '16px 20px',
                'margin': '20px 0',
                'color': '#333'
            },
            'code': {
                'font-family': 'Consolas, "Courier New", monospace',
                'background': '#f3f2f1',
                'padding': '2px 6px',
                'border-radius': '3px',
                'color': '#a80000'
            },
            'pre': {
                'background': '#f3f2f1',
                'padding': '16px',
                'border-radius': '4px',
                'border': '1px solid #e1dfdd'
            }
        }
    },

    'google': {
        name: 'Google 风格',
        styles: {
            'body': {
                'font-family': '"Google Sans", Roboto, Arial, sans-serif',
                'font-size': '16px',
                'line-height': '1.625',
                'color': '#202124',
                'background': '#fff',
                'padding': '48px',
                'max-width': '720px',
                'margin': '0 auto'
            },
            'h1': {
                'font-family': '"Google Sans Display", "Google Sans", Roboto, Arial, sans-serif',
                'font-size': '32px',
                'font-weight': '400',
                'margin': '32px 0 16px',
                'color': '#202124',
                'line-height': '1.25'
            },
            'h2': {
                'font-family': '"Google Sans", Roboto, Arial, sans-serif',
                'font-size': '24px',
                'font-weight': '400',
                'margin': '28px 0 12px',
                'color': '#202124',
                'line-height': '1.33'
            },
            'h3': {
                'font-size': '18px',
                'font-weight': '500',
                'margin': '24px 0 10px',
                'color': '#202124'
            },
            'p': {
                'margin': '0 0 16px',
                'color': '#3c4043'
            },
            'a': {
                'color': '#1a73e8',
                'text-decoration': 'none',
                'font-weight': '500'
            },
            'a:hover': {
                'text-decoration': 'underline'
            },
            // Google blockquote with left border for WeChat compatibility
            'blockquote': {
                'border-left': '3px solid #4285f4',
                'padding-left': '20px',
                'margin': '24px 0',
                'color': '#5f6368',
                'font-style': 'italic'
            },
            'code': {
                'font-family': '"Roboto Mono", monospace',
                'background': '#f1f3f4',
                'color': '#c5221f',
                'padding': '2px 4px',
                'border-radius': '2px',
                'font-size': '14px'
            },
            'pre': {
                'background': '#f1f3f4',
                'padding': '16px',
                'border-radius': '8px',
                'overflow-x': 'auto',
                'color': '#202124'
            }
        }
    },

    'claude': {
        name: 'Anthropic Claude',
        styles: {
            'body': {
                'font-family': '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                'font-size': '16px',
                'line-height': '1.75',
                'color': '#1a1a1a',
                'background': '#ffffff',
                'padding': '48px',
                'max-width': '768px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '36px',
                'font-weight': '600',
                'margin': '32px 0 24px',
                'color': '#1a1a1a',
                'line-height': '1.3'
            },
            'h2': {
                'font-size': '28px',
                'font-weight': '600',
                'margin': '28px 0 20px',
                'color': '#1a1a1a'
            },
            'code': {
                'background': '#f5f5f5',
                'padding': '2px 6px',
                'border-radius': '4px',
                'font-family': '"SF Mono", Monaco, monospace',
                'font-size': '14px',
                'color': '#d73a49'
            },
            'pre': {
                'background': '#f6f8fa',
                'padding': '16px',
                'border-radius': '8px',
                'overflow-x': 'auto',
                'border': '1px solid #e1e4e8'
            },
            'blockquote': {
                'border-left': '4px solid #dfe2e5',
                'padding-left': '16px',
                'margin': '24px 0',
                'color': '#6a737d'
            }
        }
    },

    'ai-coder': {
        name: 'AI Coder 特调',
        styles: {
            'body': {
                'font-family': '"Fira Code", "Consolas", "Monaco", monospace',
                'font-size': '16px',
                'line-height': '1.8',
                'color': '#e6e6e6',
                'background': '#1e1e1e',
                'padding': '40px',
                'max-width': '900px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '32px',
                'font-weight': '600',
                'margin': '30px 0',
                'color': '#4fc3f7',
                'border-bottom': '2px solid #4fc3f7',
                'padding-bottom': '10px'
            },
            'h2': {
                'font-size': '26px',
                'font-weight': '600',
                'margin': '25px 0',
                'color': '#81c784'
            },
            'code': {
                'background': '#2d2d2d',
                'padding': '2px 6px',
                'border-radius': '3px',
                'color': '#f78c6c'
            },
            'pre': {
                'background': '#2d2d2d',
                'padding': '16px',
                'border-radius': '6px',
                'border': '1px solid #404040'
            },
            'a': {
                'color': '#82b1ff',
                'text-decoration': 'none'
            },
            'a:hover': {
                'text-decoration': 'underline'
            },
            'blockquote': {
                'border-left': '4px solid #ff9800',
                'padding-left': '20px',
                'margin': '20px 0',
                'color': '#b0bec5'
            }
        }
    },

    'deep-reading': {
        name: '深度阅读',
        styles: {
            'body': {
                'font-family': '"Noto Serif SC", "Source Han Serif SC", serif',
                'font-size': '18px',
                'line-height': '2.2',
                'color': '#2c2c2c',
                'background': '#fefefe',
                'padding': '60px',
                'max-width': '700px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '34px',
                'font-weight': '600',
                'margin': '45px 0 30px',
                'color': '#1a1a1a',
                'text-align': 'center'
            },
            'p': {
                'margin': '22px 0',
                'text-align': 'justify',
                'text-indent': '2em'
            },
            'blockquote': {
                'border-left': '4px solid #8b8b8b',
                'padding-left': '30px',
                'margin': '30px 0',
                'color': '#666',
                'background': '#f9f9f9',
                'padding': '20px 30px',
                'border-radius': '4px'
            }
        }
    },

    // ===== 新增样式 =====

    'mac-white': {
        name: 'Mac 白',
        styles: {
            'body': {
                'font-family': '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                'font-size': '17px',
                'line-height': '1.8',
                'color': '#1d1d1f',
                'background': '#ffffff',
                'padding': '60px 40px',
                'max-width': '780px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '40px',
                'font-weight': '700',
                'margin': '50px 0 30px',
                'color': '#1d1d1f',
                'letter-spacing': '-0.015em',
                'line-height': '1.2'
            },
            'h2': {
                'font-size': '28px',
                'font-weight': '600',
                'margin': '35px 0 20px',
                'color': '#1d1d1f',
                'letter-spacing': '-0.01em'
            },
            'h3': {
                'font-size': '21px',
                'font-weight': '600',
                'margin': '28px 0 15px',
                'color': '#333'
            },
            'p': {
                'margin': '20px 0',
                'text-align': 'justify'
            },
            'code': {
                'background': '#f5f5f7',
                'padding': '3px 8px',
                'border-radius': '6px',
                'font-family': '"SF Mono", "Monaco", "Consolas", monospace',
                'font-size': '14px',
                'color': '#d12b1f'
            },
            'pre': {
                'background': '#f5f5f7',
                'padding': '20px',
                'border-radius': '12px',
                'overflow-x': 'auto',
                'border': '1px solid #e8e8ed'
            },
            'blockquote': {
                'border-left': '4px solid #86868b',
                'padding-left': '24px',
                'margin': '25px 0',
                'color': '#86868b',
                'font-style': 'italic'
            },
            'a': {
                'color': '#0066cc',
                'text-decoration': 'none'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '25px auto',
                'border-radius': '12px'
            }
        }
    },

    'claude-oat': {
        name: 'Claude 燕麦色',
        styles: {
            'body': {
                'font-family': '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                'font-size': '16px',
                'line-height': '1.8',
                'color': '#3d3d3d',
                'background': '#faf9f7',
                'padding': '50px',
                'max-width': '780px',
                'margin': '0 auto',
                'border-radius': '16px'
            },
            'h1': {
                'font-size': '36px',
                'font-weight': '600',
                'margin': '40px 0 25px',
                'color': '#1a1a1a',
                'line-height': '1.25'
            },
            'h2': {
                'font-size': '26px',
                'font-weight': '600',
                'margin': '30px 0 18px',
                'color': '#2d2d2d'
            },
            'p': {
                'margin': '18px 0'
            },
            'code': {
                'background': '#f0eeeb',
                'padding': '3px 6px',
                'border-radius': '4px',
                'font-family': '"SF Mono", monospace',
                'font-size': '14px',
                'color': '#d73a49'
            },
            'pre': {
                'background': '#f5f4f2',
                'padding': '20px',
                'border-radius': '8px',
                'overflow-x': 'auto',
                'border': '1px solid #e8e6e3'
            },
            'blockquote': {
                'border-left': '4px solid #c4c1bb',
                'padding-left': '20px',
                'margin': '25px 0',
                'color': '#6b6966',
                'font-style': 'italic'
            },
            'a': {
                'color': '#b35d44',
                'text-decoration': 'none'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '24px auto',
                'border-radius': '8px'
            }
        }
    },

    'wechat-native': {
        name: '微信原生',
        styles: {
            'body': {
                'font-family': '-apple-system-font, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
                'font-size': '17px',
                'line-height': '1.75',
                'color': '#333',
                'background': '#fff',
                'padding': '20px',
                'max-width': '740px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '24px',
                'font-weight': '700',
                'margin': '30px 0 20px',
                'color': '#000',
                'line-height': '1.4'
            },
            'h2': {
                'font-size': '20px',
                'font-weight': '700',
                'margin': '24px 0 15px',
                'color': '#333'
            },
            'h3': {
                'font-size': '18px',
                'font-weight': '700',
                'margin': '20px 0 12px',
                'color': '#444'
            },
            'p': {
                'margin': '16px 0',
                'text-align': 'justify'
            },
            'code': {
                'background': '#f5f5f5',
                'padding': '2px 4px',
                'border-radius': '3px',
                'font-family': 'monospace',
                'font-size': '14px',
                'color': '#e83e8c'
            },
            'pre': {
                'background': '#f8f8f8',
                'padding': '15px',
                'border-radius': '4px',
                'overflow-x': 'auto',
                'border': '1px solid #e5e5e5'
            },
            'blockquote': {
                'border-left': '4px solid #07c160',
                'padding-left': '15px',
                'margin': '20px 0',
                'color': '#666'
            },
            'a': {
                'color': '#576b95',
                'text-decoration': 'none'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '20px auto'
            },
            'strong': {
                'font-weight': '700'
            }
        }
    },

    'cyberpunk': {
        name: 'Cyberpunk',
        styles: {
            'body': {
                'font-family': '"JetBrains Mono", "Fira Code", monospace',
                'font-size': '15px',
                'line-height': '1.7',
                'color': '#00ff9f',
                'background': '#0a0a0f',
                'padding': '40px',
                'max-width': '800px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '36px',
                'font-weight': '700',
                'margin': '40px 0 25px',
                'color': '#ff00ff',
                'text-shadow': '0 0 10px #ff00ff',
                'border-bottom': '2px solid #ff00ff',
                'padding-bottom': '15px',
                'text-transform': 'uppercase'
            },
            'h2': {
                'font-size': '26px',
                'font-weight': '700',
                'margin': '30px 0 18px',
                'color': '#00ffff',
                'text-shadow': '0 0 8px #00ffff'
            },
            'h3': {
                'font-size': '20px',
                'font-weight': '700',
                'margin': '24px 0 12px',
                'color': '#ff6b35'
            },
            'p': {
                'margin': '18px 0',
                'color': '#b8c5d6'
            },
            'code': {
                'background': '#1a1a2e',
                'padding': '3px 6px',
                'border-radius': '3px',
                'font-family': '"JetBrains Mono", monospace',
                'font-size': '14px',
                'color': '#f7df1e',
                'border': '1px solid #333'
            },
            'pre': {
                'background': '#1a1a2e',
                'padding': '20px',
                'border-radius': '8px',
                'overflow-x': 'auto',
                'border': '1px solid #ff00ff',
                'box-shadow': '0 0 10px rgba(255, 0, 255, 0.2)'
            },
            'blockquote': {
                'border-left': '4px solid #00ffff',
                'padding-left': '20px',
                'margin': '20px 0',
                'color': '#00ff9f',
                'background': 'rgba(0, 255, 159, 0.05)',
                'padding': '15px 20px'
            },
            'a': {
                'color': '#ff00ff',
                'text-decoration': 'none'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '20px auto',
                'border': '2px solid #00ffff',
                'border-radius': '4px',
                'box-shadow': '0 0 15px rgba(0, 255, 255, 0.3)'
            }
        }
    },

    'ink-wash': {
        name: '水墨风',
        styles: {
            'body': {
                'font-family': '"Noto Serif SC", "Source Han Serif SC", "SimSun", serif',
                'font-size': '18px',
                'line-height': '2.2',
                'color': '#2c2c2c',
                'background': '#fdfcfa',
                'padding': '50px',
                'max-width': '720px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '38px',
                'font-weight': '600',
                'margin': '40px 0 30px',
                'color': '#1a1a1a',
                'text-align': 'center',
                'border-bottom': '1px solid #d4d4d4',
                'padding-bottom': '20px',
                'letter-spacing': '0.1em'
            },
            'h2': {
                'font-size': '26px',
                'font-weight': '600',
                'margin': '35px 0 20px',
                'color': '#333',
                'border-left': '5px solid #666',
                'padding-left': '15px'
            },
            'p': {
                'margin': '22px 0',
                'text-align': 'justify',
                'text-indent': '2em'
            },
            'code': {
                'background': '#f5f5f0',
                'padding': '2px 6px',
                'border-radius': '3px',
                'font-family': '"Noto Sans SC", monospace',
                'font-size': '15px',
                'color': '#5d4e37'
            },
            'pre': {
                'background': '#f8f8f4',
                'padding': '20px',
                'border-radius': '6px',
                'overflow-x': 'auto',
                'border': '1px solid #e0e0d8'
            },
            'blockquote': {
                'border-left': '3px solid #888',
                'padding-left': '25px',
                'margin': '25px 0',
                'color': '#555',
                'font-style': 'italic',
                'background': '#f9f9f6',
                'padding': '18px 25px'
            },
            'a': {
                'color': '#4a4a4a',
                'text-decoration': 'underline',
                'text-decoration-color': '#999'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '25px auto',
                'border-radius': '4px',
                'border': '1px solid #ddd'
            }
        }
    },

    'midnight': {
        name: '午夜蓝',
        styles: {
            'body': {
                'font-family': '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                'font-size': '16px',
                'line-height': '1.8',
                'color': '#c9d1d9',
                'background': '#0d1117',
                'padding': '40px',
                'max-width': '800px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '32px',
                'font-weight': '600',
                'margin': '30px 0 20px',
                'color': '#f0f6fc',
                'border-bottom': '1px solid #30363d',
                'padding-bottom': '12px'
            },
            'h2': {
                'font-size': '24px',
                'font-weight': '600',
                'margin': '25px 0 15px',
                'color': '#58a6ff'
            },
            'code': {
                'background': '#161b22',
                'padding': '3px 6px',
                'border-radius': '6px',
                'font-family': '"SF Mono", monospace',
                'font-size': '14px',
                'color': '#ff7b72'
            },
            'pre': {
                'background': '#161b22',
                'padding': '20px',
                'border-radius': '8px',
                'overflow-x': 'auto',
                'border': '1px solid #30363d'
            },
            'blockquote': {
                'border-left': '4px solid #3fb950',
                'padding-left': '20px',
                'margin': '20px 0',
                'color': '#8b949e'
            },
            'a': {
                'color': '#58a6ff',
                'text-decoration': 'none'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '20px auto',
                'border-radius': '6px'
            }
        }
    },

    'minimalist': {
        name: '极简主义',
        styles: {
            'body': {
                'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
                'font-size': '18px',
                'line-height': '1.9',
                'color': '#222',
                'background': '#fff',
                'padding': '80px 60px',
                'max-width': '640px',
                'margin': '0 auto'
            },
            'h1': {
                'font-size': '42px',
                'font-weight': '300',
                'margin': '60px 0 40px',
                'color': '#000',
                'letter-spacing': '-0.02em',
                'line-height': '1.2'
            },
            'h2': {
                'font-size': '24px',
                'font-weight': '400',
                'margin': '40px 0 20px',
                'color': '#333'
            },
            'p': {
                'margin': '24px 0',
                'color': '#444'
            },
            'code': {
                'background': '#f7f7f7',
                'padding': '2px 4px',
                'border-radius': '2px',
                'font-size': '15px'
            },
            'pre': {
                'background': '#f7f7f7',
                'padding': '20px',
                'border-radius': '2px',
                'overflow-x': 'auto'
            },
            'blockquote': {
                'border-left': '2px solid #ccc',
                'padding-left': '20px',
                'margin': '24px 0',
                'color': '#666'
            },
            'a': {
                'color': '#000',
                'text-decoration': 'underline'
            },
            'img': {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '32px auto'
            }
        }
    }
};
