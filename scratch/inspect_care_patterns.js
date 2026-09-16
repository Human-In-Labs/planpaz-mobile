const fs = require('fs');

const s2 = fs.readFileSync('docs/design/garden/Minha planta-scroll2.svg', 'utf8');

const rmatches = s2.match(/<rect[^>]+fill="url\(#pattern[^"]+\)"[^>]*>/g) || [];
console.log('Rects with patterns in scroll2:');
rmatches.forEach(r => console.log(r));

const addPlant = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');
const addMatches = addPlant.match(/<rect[^>]+fill="url\(#pattern[^"]+\)"[^>]*>/g) || [];
console.log('Rects with patterns in AdicionarPlanta:');
addMatches.forEach(r => console.log(r));
