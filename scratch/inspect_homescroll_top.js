const fs = require('fs');
const content = fs.readFileSync('docs/design/home/HomeScroll.svg', 'utf8');

const pathRegex = /<path\s+[^>]*d="([^"]+)"[^>]*>/g;
let match;
let count = 0;
while ((match = pathRegex.exec(content)) !== null) {
    const d = match[1];
    const m = d.match(/M\s*([0-9.]+)\s+([0-9.]+)/);
    if (m) {
        const y = parseFloat(m[2]);
        if (y < 90) {
            console.log(`Path at (${m[1]}, ${y}): ${match[0].slice(0, 100)}`);
            count++;
        }
    }
}
console.log('Total paths with y < 90:', count);
