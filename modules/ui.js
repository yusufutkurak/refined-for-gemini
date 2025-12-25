// modules/ui.js
// v2.2 - Clean Styles (Inline Styles Removed)

window.Midnight = window.Midnight || {};

window.Midnight.UI = {
    inject: function () {
        // Eğer buton zaten varsa tekrar ekleme
        if (document.getElementById('midnight-settings-btn')) return;

        // --- 1. AYARLAR BUTONU (Sol Alt Köşe) ---
        const btn = document.createElement('div');
        btn.id = 'midnight-settings-btn';
        // Dişli çark ikonu
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
        document.body.appendChild(btn);

        // --- 2. MODAL PENCERESİ (Açılır Menü) ---
        const modal = document.createElement('div');
        modal.id = 'midnight-settings-modal';

        // Modal Başlığı
        let modalContent = `
            <div class="midnight-header">
                <h2>Theme Catalog</h2>
                <button id="midnight-close-btn">&times;</button>
            </div>
            <div class="midnight-body">
                <div class="midnight-theme-grid">
        `;

        // Tema Listesini Oluştur
        const savedTheme = localStorage.getItem('midnight-active-theme') || 'theme-paper';
        const themeList = window.Midnight.Theme.list;

        themeList.forEach(theme => {
            const isActive = theme.id === savedTheme ? 'active' : '';
            const imgUrl = chrome.runtime.getURL(theme.image);
            modalContent += `
                <div class="theme-card ${isActive}" data-theme-id="${theme.id}">
                    <img src="${imgUrl}" class="theme-preview" alt="${theme.name}">
                    <div class="theme-name">${theme.name}</div>
                </div>`;
        });

        // --- 3. FOOTER (PDF + BAĞIŞ BUTONLARI) ---

        // Linkini buraya yaz
        const bmcLink = "https://buymeacoffee.com/yusufcodes";

        // DİKKAT: Buradaki 'style' kısımlarını temizledik. Artık CSS dosyasından yönetilecek.
        modalContent += `
                </div>
                <div class="midnight-footer" style="padding-top: 15px; display:flex; flex-direction:column; gap:10px;">
                    
                    <div style="display: flex; gap: 10px; width: 100%;">
                        <button id="midnight-pdf-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Save PDF
                        </button>

                        <a href="${bmcLink}" target="_blank" id="midnight-coffee-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                            Buy Coffee
                        </a>
                    </div>

                    <div style="font-size:10px; color:gray; opacity:0.5; font-family: monospace; text-align: center;">
                        Refined for Gemini v1.0
                    </div>
                </div>
            </div>`;

        modal.innerHTML = modalContent;
        document.body.appendChild(modal);

        // --- 4. OLAY DİNLEYİCİLERİ ---

        // Butona tıkla -> Modalı Aç/Kapa
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
        });

        // Çarpıya tıkla -> Kapat
        document.getElementById('midnight-close-btn').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Boşluğa tıkla -> Kapat
        document.addEventListener('click', (e) => {
            if (modal.style.display === 'block') {
                if (!modal.contains(e.target) && !btn.contains(e.target)) {
                    modal.style.display = 'none';
                }
            }
        });

        // Tema Değiştirme
        const cards = modal.querySelectorAll('.theme-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const newTheme = card.getAttribute('data-theme-id');
                themeList.forEach(t => document.body.classList.remove(t.id));
                document.body.classList.add(newTheme);
                localStorage.setItem('midnight-active-theme', newTheme);
            });
        });

        // PDF Butonu
        document.getElementById('midnight-pdf-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            window.Midnight.PDF.export();
        });
    }
};