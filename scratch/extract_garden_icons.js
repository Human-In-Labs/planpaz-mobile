const fs = require('fs');
const path = require('path');

const dir = 'docs/design/garden';

function inspectIconsInSvg(file) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  console.log(`=== ICONS IN ${file} ===`);
  // Look for g tags with id containing icon or specific paths
  const gMatches = content.match(/<g[^>]*id="([^"]+)"[^>]*>/g) || [];
  gMatches.forEach(g => {
    if (g.toLowerCase().includes('icon') || g.toLowerCase().includes('phosphor') || g.toLowerCase().includes('vector')) {
      console.log('G:', g);
    }
  });
}

['Jardim.svg', 'MinhaPlanta.svg', 'Minhaplanta-editar.svg', 'Biblioteca.svg', 'Biblioteca-planta.svg', 'AdicionarPlanta.svg'].forEach(inspectIconsInSvg);
