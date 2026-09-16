const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const scratchDir = 'C:\\Users\\andre\\.gemini\\antigravity-ide\\brain\\832f25ab-c3bc-4d57-aab6-d0badcc1bb55\\scratch';

const files = [
  { svg: 'ListaConquistas.svg', out: 'lista_conquistas.png' },
  { svg: 'PopupConquista.svg', out: 'popup_conquista.png' },
  { svg: 'PerfilSeguidores-popup.svg', out: 'perfil_seguidores_popup.png' }
];

files.forEach(({ svg, out }) => {
  const svgUrl = `file:///c:/GITHUB/planpaz-mobile/docs/design/profile/${svg}`;
  const outPath = path.join(scratchDir, out);
  const cmd = `${edgePath} --headless=new --disable-gpu --window-size=390,844 --screenshot="${outPath}" "${svgUrl}"`;
  console.log(`Running for ${svg}`);
  try {
    execSync(cmd);
    console.log(`Done. Exists? ${fs.existsSync(outPath)}`);
  } catch (err) {
    console.error(`Error:`, err.message);
  }
});
