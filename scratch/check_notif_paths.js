const fs = require('fs');
const content = fs.readFileSync('docs/design/home/HomeNotificacao.svg', 'utf8');

// Find all paths in y 160 to 460
const pathRegex = /<path\s+[^>]*d="([^"]+)"[^>]*>/g;
let match;
let count = 0;
while ((match = pathRegex.exec(content)) !== null) {
    const d = match[1];
    const m = d.match(/M\s*([0-9.]+)\s+([0-9.]+)/);
    if (m) {
        const y = parseFloat(m[2]);
        const x = parseFloat(m[1]);
        if (y >= 100 && y <= 460 && x >= 40 && x <= 350) {
            // console.log(`Path at (${x}, ${y})`);
            count++;
        }
    }
}
console.log('Total text/icon paths in notification popup:', count);
