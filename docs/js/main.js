document.addEventListener('DOMContentLoaded', () => {
    // フェードインアニメーション
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(f => appearOnScroll.observe(f));

    // ナビゲーションのスムーズスクロール（同一ページ内）
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href) return;
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                return;
            }
            try {
                const url = new URL(href, location.href);
                if (url.pathname === location.pathname && url.hash) {
                    e.preventDefault();
                    const target = document.querySelector(url.hash);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (err) {}
        });
    });

    // to-top ボタン：存在チェックしてイベント登録
    const toTopBtn = document.querySelector('.to-top-btn');
    if (toTopBtn) {
        const toggleToTop = () => toTopBtn.classList.toggle('visible', window.scrollY > 300);
        toggleToTop();
        window.addEventListener('scroll', toggleToTop, { passive: true });
        toTopBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
