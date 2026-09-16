const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/Configuracoes.svg', 'utf8');

// Find rects in y: 80..200
const rects = svg.match(/<rect[^>]*\/>/g) || [];
rects.forEach(r => {
  const ym = r.match(/y="([^"]+)"/);
  if (ym) {
    const y = parseFloat(ym[1]);
    if (y >= 80 && y <= 200) {
      console.log('Rect (y=80..200):', r);
    }
  }
});

// Also find filters applied to these rects
const filterRegex = /<filter[^>]*id="([^"]+)"[^>]*>[\s\S]*?<\/filter>/g;
let m;
while ((m = filterRegex.exec(svg)) !== null) {
  if (m[0].includes('y="100"') || m[0].includes('y="96"') || m[0].includes('y="102"')) {
    console.log('Filter for photo/desc:', m[0]);
  }
}
