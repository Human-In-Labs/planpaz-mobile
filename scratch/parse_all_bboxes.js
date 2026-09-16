const fs = require('fs');
const path = require('path');

function parseSvgPath(d) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let curX = 0, curY = 0;
  const cmdRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match;

  function updateBounds(x, y) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  while ((match = cmdRegex.exec(d)) !== null) {
    const cmd = match[1];
    const args = match[2].trim().match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g);
    const nums = args ? args.map(Number) : [];

    switch (cmd) {
      case 'M': case 'L':
        for (let i = 0; i < nums.length; i += 2) {
          curX = nums[i]; curY = nums[i+1]; updateBounds(curX, curY);
        }
        break;
      case 'm': case 'l':
        for (let i = 0; i < nums.length; i += 2) {
          curX += nums[i]; curY += nums[i+1]; updateBounds(curX, curY);
        }
        break;
      case 'H':
        for (let i = 0; i < nums.length; i++) { curX = nums[i]; updateBounds(curX, curY); }
        break;
      case 'h':
        for (let i = 0; i < nums.length; i++) { curX += nums[i]; updateBounds(curX, curY); }
        break;
      case 'V':
        for (let i = 0; i < nums.length; i++) { curY = nums[i]; updateBounds(curX, curY); }
        break;
      case 'v':
        for (let i = 0; i < nums.length; i++) { curY += nums[i]; updateBounds(curX, curY); }
        break;
      case 'C':
        for (let i = 0; i < nums.length; i += 6) {
          updateBounds(nums[i], nums[i+1]); updateBounds(nums[i+2], nums[i+3]);
          curX = nums[i+4]; curY = nums[i+5]; updateBounds(curX, curY);
        }
        break;
      case 'c':
        for (let i = 0; i < nums.length; i += 6) {
          updateBounds(curX + nums[i], curY + nums[i+1]); updateBounds(curX + nums[i+2], curY + nums[i+3]);
          curX += nums[i+4]; curY += nums[i+5]; updateBounds(curX, curY);
        }
        break;
    }
  }

  return {
    minX: Math.round(minX * 10) / 10,
    minY: Math.round(minY * 10) / 10,
    maxX: Math.round(maxX * 10) / 10,
    maxY: Math.round(maxY * 10) / 10,
    width: Math.round((maxX - minX) * 10) / 10,
    height: Math.round((maxY - minY) * 10) / 10
  };
}

function parseFile(filename) {
  const filePath = path.join(__dirname, '../docs/design/profile', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n================== ${filename} ==================`);
  
  const pathMatches = [...content.matchAll(/<path\s+([^>]+)\/>/g)];
  const paths = [];
  pathMatches.forEach((m, idx) => {
    const attrs = m[1];
    const d = attrs.match(/d="([^"]+)"/)?.[1];
    const fill = attrs.match(/fill="([^"]+)"/)?.[1] || 'none';
    const stroke = attrs.match(/stroke="([^"]+)"/)?.[1];
    if (d) {
      const bbox = parseSvgPath(d);
      paths.push({ idx, bbox, fill, stroke, dLen: d.length });
    }
  });

  paths.sort((a, b) => a.bbox.minY - b.bbox.minY);
  paths.forEach(p => {
    console.log(`y=${p.bbox.minY}, x=${p.bbox.minX}, size=${p.bbox.width}x${p.bbox.height}, fill=${p.fill}, stroke=${p.stroke}`);
  });
}

parseFile('Configuracoes.svg');
parseFile('PerfilMeusSeguidores.svg');
