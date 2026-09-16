const fs = require('fs');
const path = require('path');

const dir = 'docs/design/garden';

function inspectMinhaPlanta() {
  const mp = fs.readFileSync(path.join(dir, 'MinhaPlanta.svg'), 'utf8');
  const s1 = fs.readFileSync(path.join(dir, 'Minha planta-scroll1.svg'), 'utf8');
  const s2 = fs.readFileSync(path.join(dir, 'Minha planta-scroll2.svg'), 'utf8');
  
  console.log('--- MINHAPLANTA INSPECTION ---');
  // Check FAB in MinhaPlanta
  // Find rects near bottom-right (x > 300, y > 650)
  const rectRegex = /<rect[^>]+>/g;
  let m;
  console.log('Rects in MinhaPlanta:');
  while ((m = rectRegex.exec(mp)) !== null) {
    const r = m[0];
    const x = parseFloat(r.match(/x="([^"]+)"/)?.[1] || 0);
    const y = parseFloat(r.match(/y="([^"]+)"/)?.[1] || 0);
    const w = parseFloat(r.match(/width="([^"]+)"/)?.[1] || 0);
    const h = parseFloat(r.match(/height="([^"]+)"/)?.[1] || 0);
    if (x > 280 && y > 600) {
      console.log('Bottom right rect in MP:', r);
    }
    if (y >= 500 && y <= 850) {
      console.log('Stage or card rect:', { x, y, w, h, r: r.substring(0, 80) });
    }
  }

  // Check scroll2 for care cards rects
  console.log('Rects in scroll2 (care/reminders):');
  while ((m = rectRegex.exec(s2)) !== null) {
    const r = m[0];
    const x = parseFloat(r.match(/x="([^"]+)"/)?.[1] || 0);
    const y = parseFloat(r.match(/y="([^"]+)"/)?.[1] || 0);
    const w = parseFloat(r.match(/width="([^"]+)"/)?.[1] || 0);
    const h = parseFloat(r.match(/height="([^"]+)"/)?.[1] || 0);
    if (y >= 500 && y <= 750 && w > 80 && w < 200) {
      console.log('Care card in s2:', { x, y, w, h, rx: r.match(/rx="([^"]+)"/)?.[1] });
    }
  }
}

inspectMinhaPlanta();
