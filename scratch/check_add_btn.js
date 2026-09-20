const fs = require('fs');

const svg = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');
const paths = [...svg.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];

// Path 16 has y around 717
console.log('Path 16 in AdicionarPlanta:');
console.log(paths[16][0].substring(0, 300));
