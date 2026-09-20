const fs = require('fs');
const path = require('path');
const icons = JSON.parse(fs.readFileSync(path.join(__dirname, 'stat_icons.json'), 'utf8'));

// Use our parseSvgPath to get exact bbox for each icon
const { parseSvgPath } = require('./parse_all_bboxes.js');

Object.entries(icons).forEach(([key, d]) => {
  // Let's compute bbox
  // We can write a quick bbox calc
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const numbers = d.match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g)?.map(Number) || [];
  // For absolute coords (M, C, etc), points are (x, y)
  // Let's just find min/max
  const cmdRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match, curX = 0, curY = 0;
  function update(x, y) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  while ((match = cmdRegex.exec(d)) !== null) {
    const cmd = match[1];
    const nums = match[2].trim().match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g)?.map(Number) || [];
    if (cmd === 'M' || cmd === 'L') {
      for (let i = 0; i < nums.length; i += 2) { curX = nums[i]; curY = nums[i+1]; update(curX, curY); }
    } else if (cmd === 'C') {
      for (let i = 0; i < nums.length; i += 6) { update(nums[i], nums[i+1]); update(nums[i+2], nums[i+3]); curX = nums[i+4]; curY = nums[i+5]; update(curX, curY); }
    } else if (cmd === 'H') {
      nums.forEach(x => { curX = x; update(curX, curY); });
    } else if (cmd === 'V') {
      nums.forEach(y => { curY = y; update(curX, curY); });
    }
  }
  console.log(key, { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY });
});
