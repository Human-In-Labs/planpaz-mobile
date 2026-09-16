const fs = require('fs');

function inspectLocation(filePath) {
    console.log('=== ' + filePath + ' ===');
    const content = fs.readFileSync(filePath, 'utf8');

    const rectRegex = /<rect\s+([^>]+)\/>/g;
    let m;
    while ((m = rectRegex.exec(content)) !== null) {
        const attr = m[1];
        const x = (attr.match(/x="([^"]+)"/) || [])[1];
        const y = (attr.match(/y="([^"]+)"/) || [])[1];
        const w = (attr.match(/width="([^"]+)"/) || [])[1];
        const h = (attr.match(/height="([^"]+)"/) || [])[1];
        const fill = (attr.match(/fill="([^"]+)"/) || [])[1];
        const rx = (attr.match(/rx="([^"]+)"/) || [])[1];
        if (parseFloat(w) > 300 || parseFloat(h) > 50 || x === '335' || x === '337') {
            console.log(`Rect at (${x}, ${y}) size ${w}x${h} rx=${rx} fill=${fill}`);
        }
    }
}

inspectLocation('docs/design/home/HomeLocation.svg');
inspectLocation('docs/design/home/HomeLocation-search.svg');
