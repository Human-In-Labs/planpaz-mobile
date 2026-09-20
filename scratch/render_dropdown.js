const { execSync } = require('child_process');
const path = require('path');
const edgePath = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const scratchDir = 'C:\\Users\\andre\\.gemini\\antigravity-ide\\brain\\832f25ab-c3bc-4d57-aab6-d0badcc1bb55\\scratch';

const svgUrl = `file:///c:/GITHUB/planpaz-mobile/docs/design/profile/Configuracoes-dropdown.svg`;
const outPath = path.join(scratchDir, 'configuracoes_dropdown.png');
const cmd = `${edgePath} --headless=new --disable-gpu --window-size=390,844 --screenshot="${outPath}" "${svgUrl}"`;
execSync(cmd);
console.log('Saved configuracoes_dropdown.png');
