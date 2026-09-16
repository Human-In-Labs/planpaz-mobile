const fs = require('fs');

function inspectSvg(path) {
    console.log('=== ' + path + ' ===');
    const content = fs.readFileSync(path, 'utf8');
    const svgTag = content.match(/<svg[^>]+>/);
    console.log('SVG tag:', svgTag ? svgTag[0] : 'None');
    
    // Check texts
    const textMatches = [...content.matchAll(/<text[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*>([\s\S]*?)<\/text>/g)];
    console.log('Text elements found:', textMatches.length);
    textMatches.forEach(m => {
        const clean = m[3].replace(/<[^>]+>/g, ' ').trim();
        if (clean) console.log(`  [x=${m[1]}, y=${m[2]}]: "${clean}"`);
    });

    // Check rects
    const rectMatches = [...content.matchAll(/<rect[^>]+>/g)];
    console.log('Rect elements found:', rectMatches.length);
    rectMatches.slice(0, 15).forEach(m => {
        console.log('  ' + m[0]);
    });
}

inspectSvg('docs/design/profile/PerfilSeguidores-popup.svg');
inspectSvg('docs/design/profile/PopupConquista.svg');
inspectSvg('docs/design/profile/ListaConquistas.svg');
