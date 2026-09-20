const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../docs/design/profile');
const files = [
  'Perfil.svg',
  'PerfilMeusSeguidores.svg',
  'PerfilMeusSeguidores-scroll.svg',
  'Configuracoes.svg',
  'Configuracoes-dropdown.svg'
];

files.forEach(f => {
  const filePath = path.join(dir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const width = content.match(/width="([^"]+)"/)?.[1];
  const height = content.match(/height="([^"]+)"/)?.[1];
  const viewBox = content.match(/viewBox="([^"]+)"/)?.[1];
  console.log(f, { width, height, viewBox, length: content.length });
});
