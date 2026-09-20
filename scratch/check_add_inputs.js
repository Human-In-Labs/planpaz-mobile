const fs = require('fs');

const svg = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');

// Find all paths or rects in AdicionarPlanta around inputs
const paths = [...svg.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];
console.log('Total paths in AdicionarPlanta:', paths.length);

// Let's find texts/words inside inputs
// Check positions of rects
const rects = [...svg.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
rects.filter(r => r.includes('rx=') || r.includes('width=')).forEach(r => console.log(r));
