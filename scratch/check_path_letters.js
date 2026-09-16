const fs = require('fs');

const svg = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');
const paths = [...svg.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];

// Let's inspect P18, P21, P22, P23, P24, P26, P29, P31
[18, 21, 22, 23, 24, 26, 29, 31].forEach(idx => {
  console.log(`P${idx}: ${paths[idx][0]}`);
});
