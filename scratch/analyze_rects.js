const fs = require('fs');
const path = require('path');

function analyzeFile(filename) {
  const filePath = path.join(__dirname, '../docs/design/profile', filename);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\n================== ${filename} ==================`);
  
  // Find all rect tags
  const rects = [];
  const rectRegex = /<rect\s+([^>]+)\/>/g;
  let match;
  while ((match = rectRegex.exec(content)) !== null) {
    const attrs = match[1];
    const x = attrs.match(/x="([^"]+)"/)?.[1] || '0';
    const y = attrs.match(/y="([^"]+)"/)?.[1] || '0';
    const w = attrs.match(/width="([^"]+)"/)?.[1] || '0';
    const h = attrs.match(/height="([^"]+)"/)?.[1] || '0';
    const rx = attrs.match(/rx="([^"]+)"/)?.[1] || '0';
    const fill = attrs.match(/fill="([^"]+)"/)?.[1];
    const stroke = attrs.match(/stroke="([^"]+)"/)?.[1];
    rects.push({ x: parseFloat(x), y: parseFloat(y), w: parseFloat(w), h: parseFloat(h), rx, fill, stroke });
  }

  // Sort by y
  rects.sort((a, b) => a.y - b.y);
  rects.forEach(r => {
    console.log(`y=${r.y.toFixed(1)}, x=${r.x.toFixed(1)}, size=${r.w.toFixed(1)}x${r.h.toFixed(1)}, rx=${r.rx}, fill=${r.fill}, stroke=${r.stroke}`);
  });
}

analyzeFile('Perfil.svg');
analyzeFile('Configuracoes.svg');
analyzeFile('Configuracoes-dropdown.svg');
