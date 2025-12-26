window.Midnight = window.Midnight || {};
window.Midnight.Atmospheres = window.Midnight.Atmospheres || {};

window.Midnight.Atmospheres.Firefly = {
    id: 'midnight-firefly-container',

    create: function () {
        if (document.getElementById(this.id)) return;

        const container = document.createElement('div');
        container.id = this.id;
        document.body.appendChild(container);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.classList.add('midnight-firefly');
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = Math.random() * 100 + 'vh';

            const size = Math.random() * 3 + 2;
            el.style.width = size + 'px';
            el.style.height = size + 'px';

            el.style.setProperty('--move-x', (Math.random() * 100 - 50) + 'px');
            el.style.setProperty('--move-y', (Math.random() * 100 - 50) + 'px');

            el.style.animation = `midnight-firefly-float ${Math.random() * 10 + 10}s ease-in-out infinite`;
            el.style.animationDelay = `-${Math.random() * 10}s`;
            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    },

    remove: function () {
        const el = document.getElementById(this.id);
        if (el) el.remove();
    }
};