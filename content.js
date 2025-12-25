// content.js - Entry Point
// Orchestrates the modules loaded via manifest.json

function mainLoop() {
    // 1. Enforce Theme & Cleanup (From Theme Module)
    window.Midnight.Theme.forceDark();
    window.Midnight.Theme.cleanUp();

    // 2. Inject UI (From UI Module)
    window.Midnight.UI.inject();
}

// Initial Load
window.Midnight.Theme.loadSaved();
mainLoop();

// Watch for changes
const observer = new MutationObserver(() => mainLoop());
observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true
});
