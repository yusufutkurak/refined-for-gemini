window.Midnight = window.Midnight || {};
window.Midnight.Atmospheres = window.Midnight.Atmospheres || {};

window.Midnight.Atmospheres.Rain = {
    id: 'midnight-rain-container',

    create: function () {
        if (document.getElementById(this.id)) return;

        const container = document.createElement('div');
        container.id = this.id;
        document.body.appendChild(container);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 150; i++) {
            const el = document.createElement('div');
            el.classList.add('midnight-raindrop');
            el.style.left = Math.random() * 100 + 'vw';
            el.style.height = Math.random() * 30 + 20 + 'px';
            el.style.animation = `midnight-rain-fall ${Math.random() * 0.5 + 0.5}s linear infinite`;
            el.style.animationDelay = `-${Math.random() * 2}s`;
            el.style.opacity = Math.random() * 0.3 + 0.1;
            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    },

    remove: function () {
        const el = document.getElementById(this.id);
        if (el) el.remove();
    }
};