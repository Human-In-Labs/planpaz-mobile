const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/Configuracoes-dropdown.svg', 'utf8');
const idx = svg.indexOf('y="436"');
console.log('idx:', idx);
const section = svg.substring(idx - 100, idx + 8000);
console.log(section.substring(0, 2000));
