const fs = require('fs');
const content = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');

const pathRegex = /<path[^>]+d="([^"]+)"[^>]*>/g;
let m;
while ((m = pathRegex.exec(content)) !== null) {
  const d = m[1];
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
  let nearCamera = false;
  for (let i = 0; i < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i+1]);
    if (x >= 140 && x <= 240 && y >= 110 && y <= 190) {
      nearCamera = true;
      break;
    }
  }
  if (nearCamera) {
    console.log('Camera path:', m[0].substring(0, 100));
  }
}
