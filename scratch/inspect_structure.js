const fs = require('fs');
const path = require('path');

function inspectStructure(filename) {
  const filePath = path.join(__dirname, '../docs/design/profile', filename);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\n================== ${filename} ==================`);
  
  // Extract all id attributes
  const ids = [...content.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  console.log('IDs found:', ids.filter(id => !id.startsWith('pattern') && !id.startsWith('filter') && !id.startsWith('clip') && !id.startsWith('paint') && !id.startsWith('image')).slice(0, 50));

  // Extract comments or aria-label or title if any
  const comments = [...content.matchAll(/<!--([\s\S]*?)-->/g)].map(m => m[1].trim());
  if (comments.length) console.log('Comments:', comments);
}

['Perfil.svg', 'PerfilMeusSeguidores.svg', 'PerfilMeusSeguidores-scroll.svg', 'Configuracoes.svg', 'Configuracoes-dropdown.svg'].forEach(inspectStructure);
