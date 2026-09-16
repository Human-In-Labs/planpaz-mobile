const fs = require('fs');
const path = require('path');

const dir = 'docs/design/garden';

function analyzeSvg(filename) {
  const content = fs.readFileSync(path.join(dir, filename), 'utf8');
  console.log(`\n========================================`);
  console.log(`FILE: ${filename}`);
  console.log(`========================================`);

  // Find colors used
  const fillMatches = content.match(/fill="([^"]+)"/g) || [];
  const fills = [...new Set(fillMatches.map(m => m.replace(/fill="|"/g, '')))];
  console.log('Fills:', fills.slice(0, 15));

  // Find images
  const images = content.match(/<image[^>]+>/g) || [];
  images.forEach((img, i) => {
    const w = img.match(/width="([^"]+)"/)?.[1];
    const h = img.match(/height="([^"]+)"/)?.[1];
    const x = img.match(/x="([^"]+)"/)?.[1];
    const y = img.match(/y="([^"]+)"/)?.[1];
    console.log(`Image ${i+1}: x=${x}, y=${y}, w=${w}, h=${h}`);
  });

  // Find prominent rectangles
  const rects = content.match(/<rect[^>]+>/g) || [];
  console.log(`Total rects: ${rects.length}`);
  rects.slice(0, 10).forEach(r => {
    const x = r.match(/x="([^"]+)"/)?.[1];
    const y = r.match(/y="([^"]+)"/)?.[1];
    const w = r.match(/width="([^"]+)"/)?.[1];
    const h = r.match(/height="([^"]+)"/)?.[1];
    const rx = r.match(/rx="([^"]+)"/)?.[1];
    const fill = r.match(/fill="([^"]+)"/)?.[1];
    console.log(`Rect: x=${x}, y=${y}, w=${w}, h=${h}, rx=${rx}, fill=${fill}`);
  });
}

['Jardim.svg', 'MinhaPlanta.svg', 'Minhaplanta-editar.svg', 'Biblioteca.svg', 'Biblioteca-planta.svg', 'AdicionarPlanta.svg'].forEach(analyzeSvg);
