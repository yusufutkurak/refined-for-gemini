window.Midnight = window.Midnight || {};

window.Midnight.AtmosphereManager = {
    // UI'dan gelen emirleri dağıtan merkez
    toggle: function (type, isActive) {
        // Tip ismini büyük harfe çevir (snow -> Snow)
        const moduleName = type.charAt(0).toUpperCase() + type.slice(1);
        const module = window.Midnight.Atmospheres[moduleName];

        if (module) {
            if (isActive) {
                module.create();
            } else {
                module.remove();
            }
        } else {
            console.warn(`Midnight: Atmosphere module '${type}' not found.`);
        }
    }
};