// ==========================================================
// NEUROREHAB · GOOGLE ANALYTICS
// ==========================================================

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag("js", new Date());

// Esperar a que Google Analytics esté listo antes de configurar
function initGA() {
    if (typeof window.google_tag_manager !== "undefined") {
        gtag("config", "G-ZX2K9FYMMW");
    } else {
        setTimeout(initGA, 100);
    }
}

initGA();