const fs = require('fs');

function inspectStats() {
  console.log('--- Stats in MinhaPlanta.svg ---');
  const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');
  // find rect at y=823
  const rects = [...mp.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
  rects.filter(r => r.includes('823') || r.includes('width="358"')).forEach(r => console.log(r));

  console.log('--- Rects in Minha planta-scroll1.svg ---');
  const s1 = fs.readFileSync('docs/design/garden/Minha planta-scroll1.svg', 'utf8');
  const rectsS1 = [...s1.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
  rectsS1.filter(r => r.includes('width="358"') || r.includes('width="10') || r.includes('rx="')).slice(0, 20).forEach(r => console.log('S1 rect:', r));
}

inspectStats();
