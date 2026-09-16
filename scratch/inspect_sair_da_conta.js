const fs = require('fs');

const svg = fs.readFileSync('docs/design/profile/Configuracoes.svg', 'utf8');

// Find paths with fill="#911000"
const pathRegex = /<path\s+d="([^"]+)"\s+fill="#911000"/g;
let m;
while ((m = pathRegex.exec(svg)) !== null) {
  const d = m[1];
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
  let minY = 9999, maxY = 0, minX = 9999, maxX = 0;
  for (let i = 0; i < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i+1]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  console.log(`Sair da conta: x=[${minX.toFixed(1)}, ${maxX.toFixed(1)}], y=[${minY.toFixed(1)}, ${maxY.toFixed(1)}], w=${(maxX-minX).toFixed(1)}, h=${(maxY-minY).toFixed(1)}`);
}
