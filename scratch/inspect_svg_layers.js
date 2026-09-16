const fs = require('fs');

function inspectLayers(path) {
    console.log('====================================');
    console.log('=== ' + path + ' ===');
    const content = fs.readFileSync(path, 'utf8');

    // Find all g tags with id or clip-path
    const gTags = [...content.matchAll(/<g([^>]*)>/g)];
    console.log('Group count:', gTags.length);
    gTags.slice(0, 30).forEach((g, i) => {
        const idMatch = g[1].match(/id="([^"]+)"/);
        if (idMatch) {
            console.log(`  G[${i}] id="${idMatch[1]}"`);
        }
    });

    // Check all rects with positions and colors
    const rects = [...content.matchAll(/<rect([^>]+)>/g)];
    rects.forEach((r, i) => {
        const str = r[1];
        const x = str.match(/x="([^"]+)"/)?.[1] || '0';
        const y = str.match(/y="([^"]+)"/)?.[1] || '0';
        const w = str.match(/width="([^"]+)"/)?.[1] || '0';
        const h = str.match(/height="([^"]+)"/)?.[1] || '0';
        const fill = str.match(/fill="([^"]+)"/)?.[1] || '';
        const rx = str.match(/rx="([^"]+)"/)?.[1] || '';
        console.log(`  Rect[${i}]: x=${x}, y=${y}, w=${w}, h=${h}, rx=${rx}, fill=${fill}`);
    });
}

inspectLayers('docs/design/profile/PerfilSeguidores-popup.svg');
inspectLayers('docs/design/profile/PopupConquista.svg');
inspectLayers('docs/design/profile/ListaConquistas.svg');
