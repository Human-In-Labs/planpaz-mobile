const fs = require('fs');
const content = fs.readFileSync('docs/design/home/HomeNotificacao.svg', 'utf8');

console.log('SVG length:', content.length);

// Find svg root width, height, viewBox
const svgMatch = content.match(/<svg[^>]+>/);
console.log('Root:', svgMatch ? svgMatch[0] : 'no svg tag');

// Find all rects
const rectRegex = /<rect\s+([^>]+)\/>/g;
let m;
console.log('=== Rects in HomeNotificacao.svg ===');
while ((m = rectRegex.exec(content)) !== null) {
    const attr = m[1];
    const x = (attr.match(/x="([^"]+)"/) || [])[1];
    const y = (attr.match(/y="([^"]+)"/) || [])[1];
    const w = (attr.match(/width="([^"]+)"/) || [])[1];
    const h = (attr.match(/height="([^"]+)"/) || [])[1];
    const fill = (attr.match(/fill="([^"]+)"/) || [])[1];
    const rx = (attr.match(/rx="([^"]+)"/) || [])[1];
    console.log(`Rect at (${x}, ${y}) size ${w}x${h} rx=${rx} fill=${fill}`);
}

// Find texts
const textRegex = /<text\s+[^>]*>([\s\S]*?)<\/text>/g;
console.log('=== Texts in HomeNotificacao.svg ===');
while ((m = textRegex.exec(content)) !== null) {
    console.log('Text:', m[0].replace(/\s+/g, ' '));
}
