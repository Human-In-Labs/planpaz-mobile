const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/Configuracoes-dropdown.svg', 'utf8');

// Find all rects with width around 116 or 158
const rects = svg.match(/<rect[^>]*\/>/g) || [];
rects.forEach(r => {
  const ym = r.match(/y="([^"]+)"/);
  const xm = r.match(/x="([^"]+)"/);
  const wm = r.match(/width="([^"]+)"/);
  const hm = r.match(/height="([^"]+)"/);
  if (ym && xm && wm && hm) {
    const y = parseFloat(ym[1]);
    const x = parseFloat(xm[1]);
    const w = parseFloat(wm[1]);
    const h = parseFloat(hm[1]);
    if (w >= 100 && w <= 200 && y >= 390 && y <= 720) {
      console.log(`Dropdown/Field rect: x=${x}, y=${y}, w=${w}, h=${h}, rect:`, r);
    }
  }
});
