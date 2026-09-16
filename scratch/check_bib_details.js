const fs = require('fs');

const bib = fs.readFileSync('docs/design/garden/Biblioteca.svg', 'utf8');

// Find rects and paths around the card image (x around 16..170, y around 200..380)
const rects = [...bib.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
console.log('--- Rects in Biblioteca ---');
rects.filter(r => r.includes('Recomendada') || r.includes('rx=') || r.includes('width="358"')).forEach(r => console.log(r));

// Also find paths in Biblioteca that have "Recomendada" or fill with opacity
const paths = [...bib.matchAll(/<path[^>]+>/g)].map(m => m[0]);
console.log('Total paths in Biblioteca:', paths.length);
paths.filter(p => p.includes('opacity') || p.includes('rgba') || p.includes('fill="black"')).forEach(p => console.log(p.substring(0, 100)));
