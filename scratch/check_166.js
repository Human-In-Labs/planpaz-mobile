const fs = require('fs');

['Biblioteca-planta.svg', 'AdicionarPlanta.svg', 'MinhaPlanta-editar.svg'].forEach(file => {
  const svg = fs.readFileSync(`docs/design/garden/${file}`, 'utf8');
  console.log(`=== ${file} ===`);
  const matches = [...svg.matchAll(/<rect[^>]+166[^>]+>/g)].map(m => m[0]);
  matches.forEach(m => console.log('166 rect:', m));
  // check defs for linear gradient
  const grads = [...svg.matchAll(/<linearGradient[\s\S]*?<\/linearGradient>/g)].map(m => m[0]);
  grads.forEach(g => console.log('grad:', g));
});
