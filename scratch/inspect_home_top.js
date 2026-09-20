const fs = require('fs');

const content = fs.readFileSync('docs/design/home/Home.svg', 'utf8');

// Find rects and paths around the header and location button (y between 0 and 150)
const rects = [...content.matchAll(/<rect([^>]+)>/g)].map(m => m[1]);
console.log('Rects in top area (y <= 200):');
rects.forEach(r => {
    const yMatch = r.match(/y="([^"]+)"/);
    const y = yMatch ? parseFloat(yMatch[1]) : 0;
    if (y <= 200) {
        console.log('  ' + r);
    }
});

// Let's also check groups or text or paths in y <= 150
const paths = [...content.matchAll(/<path[^>]*d="([^"]+)"[^>]*fill="([^"]+)"/g)];
console.log('\nPaths in top area:');
paths.forEach(p => {
    const d = p[1];
    const fill = p[2];
    const nums = [...d.matchAll(/([0-9]+\.?[0-9]*)/g)].map(m => parseFloat(m[1]));
    if (nums.length > 0) {
        const xs = nums.filter((_, idx) => idx % 2 === 0);
        const ys = nums.filter((_, idx) => idx % 2 === 1);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        if (minY <= 150 && maxY >= 20) {
            console.log(`  fill=${fill} x=[${minX.toFixed(1)}..${maxX.toFixed(1)}], y=[${minY.toFixed(1)}..${maxY.toFixed(1)}]`);
        }
    }
});
