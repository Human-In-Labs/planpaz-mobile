const fs = require('fs');
const content = fs.readFileSync('docs/design/profile/ListaConquistas.svg', 'utf8');

// List all elements and positions
const rects = [...content.matchAll(/<rect([^>]+)>/g)].map(m => m[1]);
console.log('Rects:');
rects.forEach(r => console.log('  ' + r));

const paths = [...content.matchAll(/<path([^>]+)>/g)].map(m => m[1]);
console.log('Total paths:', paths.length);
