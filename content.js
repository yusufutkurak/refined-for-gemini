// content.js - FINAL (Tema Silinme Sorunu Giderildi)

function mainLoop() {
    // 1. Modüllerin yüklendiğinden emin ol
    if (!window.Midnight || !window.Midnight.Theme || !window.Midnight.UI) return;

    // --- KRİTİK DÜZELTME BAŞLANGICI ---
    // Gemini sayfayı yenilediğinde bizim tema class'ımızı siliyor.
    // Biz burada: "Bak bakalım kayıtlı tema body'de var mı? Yoksa hemen ekle!" diyoruz.
    const savedTheme = localStorage.getItem('midnight-active-theme') || 'theme-paper';

    if (!document.body.classList.contains(savedTheme)) {
        window.Midnight.Theme.loadSaved();
    }
    // --- KRİTİK DÜZELTME BİTİŞİ ---

    // 2. Dark Mode'u zorla ve gereksizleri temizle
    window.Midnight.Theme.forceDark();
    window.Midnight.Theme.cleanUp();

    // 3. Arayüzü (Butonları) Enjekte Et
    // ui.js içindeki inject fonksiyonu zaten hava durumunu vs. kontrol ediyor.
    window.Midnight.UI.inject();
}

// --- BAŞLANGIÇ ---

// Sayfa ilk açıldığında temayı yükle
if (window.Midnight && window.Midnight.Theme) {
    window.Midnight.Theme.loadSaved();
}

// Döngüyü Başlat
mainLoop();

// Değişiklikleri İzle (Gemini arka planda bir şeyleri silerse tekrar çalıştır)
const observer = new MutationObserver(() => mainLoop());
observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true
});