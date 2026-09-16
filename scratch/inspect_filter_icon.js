const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('docs/design/garden/Jardim.svg', 'utf8');

// Find paths near x=342..374, y=155..187
const pathRegex = /<path[^>]+d="([^"]+)"[^>]*>/g;
let m;
while ((m = pathRegex.exec(content)) !== null) {
  const d = m[1];
  // extract coordinates in d
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
  let nearFilter = false;
  for (let i = 0; i < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i+1]);
    if (x >= 340 && x <= 375 && y >= 150 && y <= 190) {
      nearFilter = true;
      break;
    }
  }
  if (nearFilter) {
    console.log('Filter path:', m[0]);
  }
}
