window.Midnight = window.Midnight || {};
window.Midnight.Atmospheres = window.Midnight.Atmospheres || {};

window.Midnight.Atmospheres.Snow = {
    id: 'midnight-snow-container',

    create: function () {
        if (document.getElementById(this.id)) return;

        const container = document.createElement('div');
        container.id = this.id;
        document.body.appendChild(container);

        // --- Slider Ayarlarını Okuyoruz ---
        const density = parseInt(localStorage.getItem('snow-density')) || 200;
        const speedMultiplier = parseFloat(localStorage.getItem('snow-speed')) || 1;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < density; i++) {
            const el = document.createElement('div');
            el.classList.add('midnight-snowflake');

            // KONUM:
            // Rüzgarla sola kayacağı için sağ tarafta fazladan pay bırakıyoruz (-10vw ile 120vw arası)
            el.style.left = (Math.random() * 130 - 10) + 'vw';

            // --- ŞEKİL (SENİN DOSYANDAKİ GİBİ UZUN) ---
            // Genişlik: Çok ince (0.5px ile 1.5px arası)
            el.style.width = (Math.random() * 1 + 0.5) + 'px';

            // Yükseklik: Bayağı uzun (15px ile 40px arası) -> "Hız Çizgisi" etkisi
            el.style.height = (Math.random() * 25 + 15) + 'px';

            // --- HIZ MANTIĞI ---
            // Senin dosyan 3sn-9sn arasıydı. 
            // Bunu Slider çarpanıyla bölüyoruz.
            const baseDuration = Math.random() * 6 + 3; // 3 ile 9 saniye arası doğal hız
            const finalDuration = baseDuration / speedMultiplier;

            el.style.animation = `midnight-gentle-slope ${finalDuration}s linear infinite`;

            // GECİKME:
            el.style.animationDelay = `-${Math.random() * 10}s`;

            // OPAKLIK:
            // Çok yoğun yağacağı için biraz şeffaf yapıyoruz (0.1 ile 0.5 arası)
            // Böylece arkadaki yazıyı kapatmaz, "sisli" görünür.
            el.style.opacity = Math.random() * 0.4 + 0.1;

            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    },

    remove: function () {
        const el = document.getElementById(this.id);
        if (el) el.remove();
    }
};