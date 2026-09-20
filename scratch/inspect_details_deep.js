const fs = require('fs');
const path = require('path');

const dir = 'docs/design/garden';

// 1. MinhaPlanta FAB icon and hero card
const mp = fs.readFileSync(path.join(dir, 'MinhaPlanta.svg'), 'utf8');

// Find paths near FAB x=318..374, y=682..738
console.log('--- FAB IN MINHAPLANTA ---');
const pathRegex = /<path[^>]+d="([^"]+)"[^>]*>/g;
let m;
while ((m = pathRegex.exec(mp)) !== null) {
  const d = m[1];
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
  let nearFab = false;
  for (let i = 0; i < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i+1]);
    if (x >= 320 && x <= 372 && y >= 685 && y <= 735) {
      nearFab = true;
      break;
    }
  }
  if (nearFab) {
    console.log('FAB path:', m[0]);
  }
}

// 2. Magnifying glass position near SAMAMBAIA
console.log('--- MAGNIFYING GLASS NEAR SAMAMBAIA ---');
while ((m = pathRegex.exec(mp)) !== null) {
  const d = m[1];
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
  let nearMag = false;
  for (let i = 0; i < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i+1]);
    if (x >= 230 && x <= 260 && y >= 430 && y <= 460) {
      nearMag = true;
      break;
    }
  }
  if (nearMag) {
    console.log('Mag path:', m[0]);
  }
}

// 3. Stage card image rects
console.log('--- STAGE CARD IMAGES IN MP ---');
const stageImgRegex = /<rect[^>]+fill="url\(#pattern[0-9]+_1976_645\)"[^>]*>/g;
while ((m = stageImgRegex.exec(mp)) !== null) {
  console.log('Stage img rect:', m[0]);
}
