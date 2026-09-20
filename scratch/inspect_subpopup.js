const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/PerfilSeguidores-popup.svg', 'utf8');
const startIdx = svg.indexOf('filter15_d_1782_374');
console.log('Total length:', svg.length, 'startIdx:', startIdx);
const slice = svg.substring(startIdx, startIdx + 15000);
const paths = slice.match(/<path[^>]*>/g) || [];
paths.forEach(p => {
  const f = p.match(/fill="([^"]+)"/)?.[1];
  console.log('fill:', f, 'len:', p.length);
});
