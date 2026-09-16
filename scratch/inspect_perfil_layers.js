const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/Perfil.svg', 'utf8');

// Find all id="..." in Perfil.svg
const idRegex = /id="([^"]+)"/g;
let m;
const ids = [];
while ((m = idRegex.exec(svg)) !== null) {
  ids.push(m[1]);
}
console.log('IDs in Perfil.svg:', ids);

// Find comments
const comments = svg.match(/<!--[\s\S]*?-->/g) || [];
console.log('Comments:', comments);

// Check if any tags have data-name or name or class
const nameRegex = /name="([^"]+)"/g;
while ((m = nameRegex.exec(svg)) !== null) {
  console.log('Name:', m[1]);
}
