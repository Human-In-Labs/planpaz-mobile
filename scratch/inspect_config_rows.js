const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/Configuracoes.svg', 'utf8');

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
    if (y >= 180 && y <= 450) {
      console.log(`x=${x}, y=${y}, w=${w}, h=${h}, rect:`, r);
    }
  }
});
