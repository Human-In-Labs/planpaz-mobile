const fs = require('fs');
const path = require('path');

function getPathBBox(d) {
  // Simple approximation: extract all numbers that follow commands
  const commands = d.match(/[a-df-z][^a-df-z]*/gi) || [];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let curX = 0, curY = 0;

  commands.forEach(cmdStr => {
    const type = cmdStr[0];
    const args = cmdStr.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(parseFloat);
    
    if (type === 'M' || type === 'L') {
      for (let i = 0; i < args.length; i += 2) {
        curX = args[i];
        curY = args[i+1];
        if (!isNaN(curX)) { minX = Math.min(minX, curX); maxX = Math.max(maxX, curX); }
        if (!isNaN(curY)) { minY = Math.min(minY, curY); maxY = Math.max(maxY, curY); }
      }
    } else if (type === 'm' || type === 'l') {
      for (let i = 0; i < args.length; i += 2) {
        curX += args[i];
        curY += args[i+1];
        if (!isNaN(curX)) { minX = Math.min(minX, curX); maxX = Math.max(maxX, curX); }
        if (!isNaN(curY)) { minY = Math.min(minY, curY); maxY = Math.max(maxY, curY); }
      }
    } else if (type === 'H') {
      args.forEach(x => { curX = x; minX = Math.min(minX, curX); maxX = Math.max(maxX, curX); });
    } else if (type === 'h') {
      args.forEach(dx => { curX += dx; minX = Math.min(minX, curX); maxX = Math.max(maxX, curX); });
    } else if (type === 'V') {
      args.forEach(y => { curY = y; minY = Math.min(minY, curY); maxY = Math.max(maxY, curY); });
    } else if (type === 'v') {
      args.forEach(dy => { curY += dy; minY = Math.min(minY, curY); maxY = Math.max(maxY, curY); });
    } else if (type === 'C') {
      for (let i = 0; i < args.length; i += 6) {
        curX = args[i+4];
        curY = args[i+5];
        if (!isNaN(curX)) { minX = Math.min(minX, curX, args[i], args[i+2]); maxX = Math.max(maxX, curX, args[i], args[i+2]); }
        if (!isNaN(curY)) { minY = Math.min(minY, curY, args[i+1], args[i+3]); maxY = Math.max(maxY, curY, args[i+1], args[i+3]); }
      }
    } else if (type === 'c') {
      for (let i = 0; i < args.length; i += 6) {
        const x1 = curX + args[i];
        const y1 = curY + args[i+1];
        const x2 = curX + args[i+2];
        const y2 = curY + args[i+3];
        curX += args[i+4];
        curY += args[i+5];
        if (!isNaN(curX)) { minX = Math.min(minX, curX, x1, x2); maxX = Math.max(maxX, curX, x1, x2); }
        if (!isNaN(curY)) { minY = Math.min(minY, curY, y1, y2); maxY = Math.max(maxY, curY, y1, y2); }
      }
    }
  });

  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY,
  };
}

function parseFile(filename) {
  const filePath = path.join(__dirname, '../docs/design/profile', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n================== ${filename} ==================`);
  
  const pathRegex = /<path\s+([^>]+)\/>/g;
  let match;
  const paths = [];
  while ((match = pathRegex.exec(content)) !== null) {
    const attrs = match[1];
    const d = attrs.match(/d="([^"]+)"/)?.[1];
    const fill = attrs.match(/fill="([^"]+)"/)?.[1] || 'none';
    const stroke = attrs.match(/stroke="([^"]+)"/)?.[1];
    if (d) {
      const bbox = getPathBBox(d);
      paths.push({ bbox, fill, stroke, dLen: d.length });
    }
  }

  // Sort by y
  paths.sort((a, b) => a.bbox.y - b.bbox.y);
  paths.forEach((p, idx) => {
    console.log(`Path #${idx+1}: y=${p.bbox.y.toFixed(1)}, x=${p.bbox.x.toFixed(1)}, size=${p.bbox.w.toFixed(1)}x${p.bbox.h.toFixed(1)}, fill=${p.fill}, stroke=${p.stroke}`);
  });
}

parseFile('Perfil.svg');
