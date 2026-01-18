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
                'font-size': '72px',
                'font-weight': '600',
                'margin': '60px 0 40px',
                'color': '#1d1d1f',
                'letter-spacing': '-0.022em',
                'line-height': '1.05'
            },
            'p': {
                'margin': '20px 0'
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
    }
};
