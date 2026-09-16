const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dir = path.join(__dirname, '../docs/design/profile');
const scratchDir = __dirname;

const svgs = [
  { name: 'perfil', file: 'Perfil.svg' },
  { name: 'seguidores', file: 'PerfilMeusSeguidores.svg' },
  { name: 'seguidores_scroll', file: 'PerfilMeusSeguidores-scroll.svg' },
  { name: 'configuracoes', file: 'Configuracoes.svg' },
  { name: 'configuracoes_dropdown', file: 'Configuracoes-dropdown.svg' },
  { name: 'mudar_foto', file: 'Configuracoes-mudarFoto.svg' },
  { name: 'seguidores_popup', file: 'PerfilSeguidores-popup.svg' },
];

svgs.forEach(({ name, file }) => {
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: white; width: 390px; height: 844px; overflow: hidden; }
  img { width: 390px; height: 844px; display: block; }
</style>
</head>
<body>
  <img src="../docs/design/profile/${file}" />
</body>
</html>`;
  
  const htmlPath = path.join(scratchDir, `${name}.html`);
  const pngPath = path.join(scratchDir, `${name}.png`);
  fs.writeFileSync(htmlPath, htmlContent);

  const cmd = `"${chromePath}" --headless --disable-gpu --window-size=390,844 --screenshot="${pngPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;
  console.log(`Rendering ${name}...`);
  execSync(cmd);
});

console.log('All rendered!');
