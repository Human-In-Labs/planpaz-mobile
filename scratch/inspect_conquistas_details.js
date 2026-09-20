const fs = require('fs');

function inspectDetails(path) {
    console.log('====================================');
    console.log('=== ' + path + ' ===');
    const content = fs.readFileSync(path, 'utf8');

    // Find paths inside the modal area (y between 90 and 460)
    // Let's find defs or patterns or texts
    // If text was converted to paths, let's look for any text or clip paths or group ids
    const groups = content.match(/<g[\s\S]*?<\/g>/g) || [];
    console.log('Groups total:', groups.length);

    // Let's search for any strings or aria-labels or id in content
    const ids = [...content.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
    console.log('IDs found:', ids);

    // Let's check fills used in this SVG
    const fills = [...new Set([...content.matchAll(/fill="([^"]+)"/g)].map(m => m[1]))];
    console.log('Fills used:', fills);

    // Let's check strokes used
    const strokes = [...new Set([...content.matchAll(/stroke="([^"]+)"/g)].map(m => m[1]))];
    console.log('Strokes used:', strokes);
}

inspectDetails('docs/design/profile/PopupConquista.svg');
inspectDetails('docs/design/profile/ListaConquistas.svg');
