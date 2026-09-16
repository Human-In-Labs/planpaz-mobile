const fs = require('fs');
const content = fs.readFileSync('docs/design/profile/Configuracoes-dropdown.svg', 'utf8');

// The rect is y=436, h=269 (ends at y=705)
// Let's find all elements with y inside 436..705 and x inside 216..374
const elements = [...content.matchAll(/<([a-zA-Z]+)[^>]*?(?:y="([^"]+)"|d="([^"]+)")/g)];
console.log('Matches:', elements.length);

// Let's find all path bounding boxes in that region
const paths = [...content.matchAll(/<path[^>]*d="([^"]+)"[^>]*fill="([^"]+)"/g)];
console.log('Paths with fill:', paths.length);
paths.forEach((p, i) => {
    const d = p[1];
    const fill = p[2];
    const nums = [...d.matchAll(/([0-9]+\.?[0-9]*)/g)].map(m => parseFloat(m[1]));
    if (nums.length > 0) {
        const xs = nums.filter((_, idx) => idx % 2 === 0);
        const ys = nums.filter((_, idx) => idx % 2 === 1);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        if (minX >= 210 && maxX <= 380 && minY >= 430 && maxY <= 710) {
            console.log(`Path[${i}] fill=${fill} x=[${minX.toFixed(1)}..${maxX.toFixed(1)}], y=[${minY.toFixed(1)}..${maxY.toFixed(1)}]`);
        }
    }
});
