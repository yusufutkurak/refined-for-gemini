window.Midnight = window.Midnight || {};
window.Midnight.Atmospheres = window.Midnight.Atmospheres || {};

window.Midnight.Atmospheres.Snow = {
    id: 'midnight-snow-container',

    create: function () {
        if (document.getElementById(this.id)) return;

        const container = document.createElement('div');
        container.id = this.id;
        document.body.appendChild(container);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 100; i++) {
            const el = document.createElement('div');
            el.classList.add('midnight-snowflake');
            el.style.left = Math.random() * 100 + 'vw';
            el.style.width = Math.random() * 2 + 1 + 'px';
            el.style.height = Math.random() * 20 + 10 + 'px';
            el.style.animation = `midnight-gentle-slope ${Math.random() * 5 + 5}s linear infinite`;
            el.style.animationDelay = `-${Math.random() * 5}s`;
            el.style.opacity = Math.random() * 0.5 + 0.1;
            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    },

    remove: function () {
        const el = document.getElementById(this.id);
        if (el) el.remove();
    }
};