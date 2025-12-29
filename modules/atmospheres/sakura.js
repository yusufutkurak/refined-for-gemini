window.Midnight = window.Midnight || {};
window.Midnight.Atmospheres = window.Midnight.Atmospheres || {};

window.Midnight.Atmospheres.Sakura = {
    id: 'midnight-sakura-container',

    create: function () {
        if (document.getElementById(this.id)) return;

        const container = document.createElement('div');
        container.id = this.id;
        document.body.appendChild(container);

        const fragment = document.createDocumentFragment();
        // 40 yaprak ideal (çok kalabalık olmasın, zarif dursun)
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.classList.add('midnight-petal');

            // Rastgele Başlangıç Konumu
            el.style.left = Math.random() * 100 + 'vw';

            // Rastgele Boyut (Bazıları yakında, bazıları uzakta gibi)
            const size = Math.random() * 10 + 10; // 10px ile 20px arası
            el.style.width = size + 'px';
            el.style.height = size + 'px';

            // Animasyon Süreleri (Düşüş hızı ve Salınım hızı farklı olsun)
            const fallDuration = Math.random() * 5 + 5; // 5-10 saniye arası düşüş
            const swayDuration = Math.random() * 3 + 2; // 2-5 saniye arası sağ-sol salınım

            el.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
            el.style.animationDelay = `-${Math.random() * 5}s`; // Hepsi aynı anda başlamasın

            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    },

    remove: function () {
        const el = document.getElementById(this.id);
        if (el) el.remove();
    }
};