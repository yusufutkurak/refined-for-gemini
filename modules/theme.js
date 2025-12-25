// modules/theme.js
window.Midnight = window.Midnight || {};

window.Midnight.Theme = {
    // YENİ TEMALAR LİSTEYE EKLENDİ
    list: [
        // --- 1. EN AÇIK & BEYAZ TEMALAR (Lightest) ---
        { id: 'theme-polar', name: 'Polar (Light)', image: 'images/polar.webp' },
        { id: 'theme-paper', name: 'Paper', image: 'images/paper.webp' },

        // --- 2. PASTEL & YUMUŞAK RENKLER (Soft Light) ---
        { id: 'theme-sky', name: 'Cloudy Sky', image: 'images/sky.webp' },
        { id: 'theme-mint', name: 'Mint Sorbet', image: 'images/mint.webp' },
        { id: 'theme-sakura', name: 'Sakura Pink', image: 'images/sakura.webp' },
        { id: 'theme-lilac', name: 'Soft Lilac', image: 'images/lilac.webp' },

        // --- 3. GEÇİŞ TONLARI (Mid-Tones) ---
        { id: 'theme-nord', name: 'Nord', image: 'images/nord.webp' },         // Soğuk Grimsi
        { id: 'theme-sunset', name: 'Sunset', image: 'images/sunset.webp' },   // Turuncu Akşamüstü

        // --- 4. KOYU RENKLİLER (Dark Colors) ---
        { id: 'theme-ocean', name: 'Deep Ocean', image: 'images/ocean.webp' }, // Koyu Mavi
        { id: 'theme-forest', name: 'Forest', image: 'images/forest.webp' },   // Koyu Yeşil
        { id: 'theme-coffee', name: 'Coffee', image: 'images/coffee.webp' },   // Koyu Kahve
        { id: 'theme-crimson', name: 'Crimson', image: 'images/crimson.webp' },// Koyu Kırmızı
        { id: 'theme-amber', name: 'Retro Amber', image: 'images/amber.webp' },// Siyah/Turuncu

        // --- 5. DERİN KARANLIK & NEON (Deep Dark / High Contrast) ---
        { id: 'theme-dracula', name: 'Dracula', image: 'images/dracula.webp' },
        { id: 'theme-nebula', name: 'Nebula', image: 'images/nebula.webp' },
        { id: 'theme-bloom', name: 'Midnight Bloom', image: 'images/midnight.webp' },
        { id: 'theme-cyberpunk', name: 'Cyberpunk', image: 'images/cyberpunk.webp' },
        { id: 'theme-2077', name: '2077 (Night City)', image: 'images/2077.webp' },
        { id: 'theme-matrix', name: 'The Matrix', image: 'images/matrix.webp' },
        { id: 'theme-obsidian', name: 'Obsidian', image: 'images/obsidian.webp' } // En Koyu (Simsiyah)
    ],

    forceDark: function () {
        const body = document.body;
        if (body.classList.contains('light-theme')) body.classList.remove('light-theme');
        if (!body.classList.contains('dark-theme')) body.classList.add('dark-theme');
    },

    cleanUp: function () {
        const garbageSelectors = ['.blur-bg', '.gradient-container', '.top-gradient', '.bottom-gradient'];
        garbageSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (!el.querySelector('.input-area') && !el.classList.contains('input-area')) {
                    el.remove();
                }
            });
        });

        document.querySelectorAll('.input-gradient').forEach(el => el.classList.remove('input-gradient'));

        const inputBox = document.querySelector('.input-area');
        const inputContainer = document.querySelector('.input-area-container');

        if (inputBox) {
            inputBox.style.setProperty('box-shadow', 'none', 'important');
            inputBox.style.setProperty('outline', 'none', 'important');
        }
        if (inputContainer) {
            inputContainer.style.setProperty('background', 'transparent', 'important');
            inputContainer.style.setProperty('box-shadow', 'none', 'important');
        }
        document.documentElement.style.setProperty('--bard-color-synthetic--chat-window-surface', 'transparent', 'important');
    },

    loadSaved: function () {
        const savedTheme = localStorage.getItem('midnight-active-theme') || 'theme-paper';
        this.list.forEach(t => document.body.classList.remove(t.id));
        document.body.classList.add(savedTheme);
        return savedTheme;
    }
};