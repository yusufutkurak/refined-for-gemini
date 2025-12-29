window.Midnight = window.Midnight || {};
window.Midnight.Atmospheres = window.Midnight.Atmospheres || {};

window.Midnight.Atmospheres.Flame = {
    id: 'midnight-flame-container',

    create: function () {
        if (document.getElementById(this.id)) return;

        const container = document.createElement('div');
        container.id = this.id;
        document.body.appendChild(container);

        const fragment = document.createDocumentFragment();

        // Tüm ekranı doldurması için 6-7 tane devasa parça yeterli
        const flameCount = 7;

        for (let i = 0; i < flameCount; i++) {
            const el = document.createElement('div');
            el.classList.add('midnight-fire-blob');

            // Konum: Ekranın HER YERİNDE olabilir (Sadece altta değil)
            el.style.left = (Math.random() * 100 - 20) + 'vw'; // -20 ile 120 arası (taşsın diye)
            el.style.top = (Math.random() * 100 - 20) + 'vh';  // -20 ile 120 arası

            // Boyut: Çok büyük (Ekranın yarısı kadar)
            const size = Math.random() * 50 + 40; // 40vw ile 90vw arası
            el.style.width = size + 'vw';
            el.style.height = size + 'vw'; // Yuvarlağa yakın başlasın

            // Animasyon: Hepsi farklı hızda süzülsün
            el.style.animationDelay = `-${Math.random() * 20}s`;
            el.style.animationDuration = (Math.random() * 20 + 20) + 's'; // Çok yavaş (20-40sn)

            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    },

    remove: function () {
        const el = document.getElementById(this.id);
        if (el) el.remove();
    }
};