(() => {
    const loadScript = (src) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.head.appendChild(script);
    });

    const loadStyle = (href) => new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve(href);
        link.onerror = () => reject(new Error(`Failed to load: ${href}`));
        document.head.appendChild(link);
    });

    const loadWithFallback = async (vendorSrc, cdnSrc, loader) => {
        try {
            await loader(vendorSrc);
        } catch (err) {
            await loader(cdnSrc);
        }
    };

    const run = async () => {
        await loadWithFallback(
            'vendor/highlightjs-github.min.css',
            'https://cdn.staticfile.org/highlight.js/11.9.0/styles/github.min.css',
            loadStyle
        );

        await loadWithFallback(
            'vendor/vue.global.prod.min.js',
            'https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.min.js',
            loadScript
        );

        await loadWithFallback(
            'vendor/markdown-it.min.js',
            'https://cdn.staticfile.org/markdown-it/13.0.2/markdown-it.min.js',
            loadScript
        );

        await loadWithFallback(
            'vendor/turndown.min.js',
            'https://cdn.staticfile.org/turndown/7.1.2/turndown.min.js',
            loadScript
        );

        await loadWithFallback(
            'vendor/html2canvas.min.js',
            'https://cdn.staticfile.org/html2canvas/1.4.1/html2canvas.min.js',
            loadScript
        );

        await loadWithFallback(
            'vendor/highlight.min.js',
            'https://cdn.staticfile.org/highlight.js/11.9.0/highlight.min.js',
            loadScript
        );

        // Load styles first, then app.js which depends on window.styles
        await loadScript('styles.js');

        // Ensure styles are loaded before continuing
        if (!window.styles) {
            throw new Error('Styles failed to load');
        }

        await loadScript('app.js');
    };

    run().catch((err) => {
        console.error('Loader failed:', err);
    });
})();
