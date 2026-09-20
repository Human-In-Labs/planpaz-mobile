const fs = require('fs');

function inspectSvg(filePath) {
    console.log('=== ' + filePath + ' ===');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for text elements
    const textMatches = content.match(/<text[^>]*>[\s\S]*?<\/text>/g) || [];
    for (const t of textMatches) {
        if (t.includes('Olá') || t.includes('Matheus') || t.includes('9:41')) {
            console.log('Text:', t.replace(/\n/g, ' '));
        }
    }

    // Look for notification bell button rect / paths
    // Usually a 37x37 or 40x40 rect or path
    const rectMatches = content.match(/<rect[^>]*\/>/g) || [];
    for (const r of rectMatches) {
        const yMatch = r.match(/y="([^"]+)"/);
        const wMatch = r.match(/width="([^"]+)"/);
        const hMatch = r.match(/height="([^"]+)"/);
        if (yMatch && parseFloat(yMatch[1]) < 120) {
            console.log('Rect:', r);
        }
    }
}

inspectSvg('docs/design/home/Home.svg');
inspectSvg('docs/design/home/HomeScroll.svg');
