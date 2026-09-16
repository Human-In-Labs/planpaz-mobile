const fs = require('fs');

function inspectTabBar(filePath) {
    console.log('=== TabBar in ' + filePath + ' ===');
    const content = fs.readFileSync(filePath, 'utf8');

    // TabBar rect is at y ~ 750..770, width ~ 358, height ~ 66
    const rectMatch = content.match(/<rect[^>]+y="(?:759|760|761|762|763)"[^>]*\/>/);
    console.log('TabBar rect:', rectMatch ? rectMatch[0] : 'not found');

    // Find all icons / paths in y between 750 and 830
    const pathRegex = /<path\s+[^>]*d="([^"]+)"[^>]*>/g;
    let m;
    const items = [];
    while ((m = pathRegex.exec(content)) !== null) {
        const d = m[1];
        const matchM = d.match(/M\s*([0-9.]+)\s+([0-9.]+)/);
        if (matchM) {
            const x = parseFloat(matchM[1]);
            const y = parseFloat(matchM[2]);
            if (y >= 755 && y <= 825) {
                items.push({ x, y, tag: m[0].slice(0, 60) });
            }
        }
    }
    console.log(`Found ${items.length} paths in TabBar area.`);
    items.sort((a, b) => a.x - b.x);
    for (const it of items) {
        console.log(`Path at x=${it.x.toFixed(1)}, y=${it.y.toFixed(1)}`);
    }
}

inspectTabBar('docs/design/home/Home.svg');
inspectTabBar('docs/design/home/HomeNotificacao.svg');
