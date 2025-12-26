// modules/ui.js
// v3.1 - Fixed Settings Icon & Updated Labels

window.Midnight = window.Midnight || {};

window.Midnight.UI = {
    inject: function () {
        if (document.getElementById('midnight-settings-btn')) return;

        // --- 1. AYARLAR BUTONU ---
        const btn = document.createElement('div');
        btn.id = 'midnight-settings-btn';
        // DÜZELTME: Daha kısa ve sağlam bir SVG kodu kullanıldı (Material Outline Settings)
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
        document.body.appendChild(btn);

        // --- 2. MODAL ---
        const modal = document.createElement('div');
        modal.id = 'midnight-settings-modal';

        // Tema Listesi
        const savedTheme = localStorage.getItem('midnight-active-theme') || 'theme-paper';
        let themeCardsHTML = '';
        window.Midnight.Theme.list.forEach(theme => {
            const isActive = theme.id === savedTheme ? 'active' : '';
            const imgUrl = chrome.runtime.getURL(theme.image);
            themeCardsHTML += `
                <div class="theme-card ${isActive}" data-theme-id="${theme.id}">
                    <img src="${imgUrl}" class="theme-preview" alt="${theme.name}">
                    <div class="theme-name">${theme.name}</div>
                </div>`;
        });

        // Hava Durumu Kayıtlı Veri
        const isSnow = localStorage.getItem('weather-snow') === 'true' ? 'checked' : '';
        const isRain = localStorage.getItem('weather-rain') === 'true' ? 'checked' : '';
        const isFirefly = localStorage.getItem('weather-firefly') === 'true' ? 'checked' : '';

        // HTML Yapısı
        modal.innerHTML = `
            <div class="midnight-header-wrapper">
                <div class="midnight-top-row">
                    <h2>Refined Settings</h2>
                    <button id="midnight-close-btn">&times;</button>
                </div>
                <div class="midnight-tabs">
                    <button class="midnight-tab-btn active" data-target="tab-themes">Themes</button>
                    <button class="midnight-tab-btn" data-target="tab-atmosphere">Atmosphere</button>
                </div>
            </div>

            <div class="midnight-content-area">
                <div id="tab-themes" class="midnight-tab-content active">
                    <div class="midnight-theme-grid">${themeCardsHTML}</div>
                </div>

                <div id="tab-atmosphere" class="midnight-tab-content">
                    <div class="atmosphere-item">
                        <div class="atmosphere-info"><span class="atmosphere-icon">❄️</span><span class="atmosphere-name">Snow Effect</span></div>
                        <label class="switch"><input type="checkbox" class="weather-toggle" data-effect="snow" ${isSnow}><span class="slider round"></span></label>
                    </div>
                    <div class="atmosphere-item">
                        <div class="atmosphere-info"><span class="atmosphere-icon">🌧️</span><span class="atmosphere-name">Rain Effect</span></div>
                        <label class="switch"><input type="checkbox" class="weather-toggle" data-effect="rain" ${isRain}><span class="slider round"></span></label>
                    </div>
                    <div class="atmosphere-item">
                        <div class="atmosphere-info"><span class="atmosphere-icon">✨</span><span class="atmosphere-name">Fireflies</span></div>
                        <label class="switch"><input type="checkbox" class="weather-toggle" data-effect="firefly" ${isFirefly}><span class="slider round"></span></label>
                    </div>
                </div>
            </div>

            <div class="midnight-footer">
                <div class="midnight-btn-group">
                    <button id="midnight-pdf-btn">Save PDF</button>
                    <a href="https://buymeacoffee.com/yusufcodes" target="_blank" id="midnight-coffee-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                        Buy Me a Coffee
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // --- 3. EVENT LISTENERS ---
        btn.addEventListener('click', (e) => { e.stopPropagation(); modal.style.display = (modal.style.display === 'block') ? 'none' : 'block'; });
        document.getElementById('midnight-close-btn').addEventListener('click', () => { modal.style.display = 'none'; });

        // Tablar
        const tabBtns = modal.querySelectorAll('.midnight-tab-btn');
        tabBtns.forEach(t => t.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            modal.querySelectorAll('.midnight-tab-content').forEach(c => c.classList.remove('active'));
            t.classList.add('active');
            document.getElementById(t.getAttribute('data-target')).classList.add('active');
        }));

        // Tema Seçimi
        modal.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                modal.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const newTheme = card.getAttribute('data-theme-id');
                window.Midnight.Theme.list.forEach(t => document.body.classList.remove(t.id));
                document.body.classList.add(newTheme);
                localStorage.setItem('midnight-active-theme', newTheme);
            });
        });

        // Modüler Hava Durumu Kontrolü (Manager)
        const weatherToggles = modal.querySelectorAll('.weather-toggle');
        weatherToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const currentEffect = e.target.getAttribute('data-effect');
                const isTurningOn = e.target.checked;

                if (isTurningOn) {
                    weatherToggles.forEach(otherToggle => {
                        if (otherToggle !== e.target) {
                            otherToggle.checked = false;
                            const otherEffect = otherToggle.getAttribute('data-effect');
                            localStorage.setItem(`weather-${otherEffect}`, 'false');
                            window.Midnight.AtmosphereManager.toggle(otherEffect, false);
                        }
                    });
                }

                localStorage.setItem(`weather-${currentEffect}`, isTurningOn);
                window.Midnight.AtmosphereManager.toggle(currentEffect, isTurningOn);
            });
        });

        // PDF
        document.getElementById('midnight-pdf-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            window.Midnight.PDF.export();
        });

        // Dışarı Tıklama
        document.addEventListener('click', (e) => {
            if (modal.style.display === 'block' && !modal.contains(e.target) && !btn.contains(e.target)) modal.style.display = 'none';
        });

        // Başlangıç Kontrolü
        const effects = ['snow', 'rain', 'firefly'];
        let activeFound = false;

        effects.reverse().forEach(effect => {
            if (localStorage.getItem(`weather-${effect}`) === 'true') {
                if (!activeFound) {
                    window.Midnight.AtmosphereManager.toggle(effect, true);
                    activeFound = true;
                } else {
                    localStorage.setItem(`weather-${effect}`, 'false');
                }
            }
        });
    }
};