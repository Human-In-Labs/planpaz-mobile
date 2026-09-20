const fs = require('fs');

const svg = fs.readFileSync('docs/design/garden/MinhaPlanta-editar.svg', 'utf8');
const rects = [...svg.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
console.log('MinhaPlanta-editar rects:');
rects.filter(r => r.includes('rx=') || r.includes('width=')).forEach(r => console.log(r));
