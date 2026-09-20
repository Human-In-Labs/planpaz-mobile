const fs = require('fs');

function inspectFollowersModalHeader() {
  const svg1 = fs.readFileSync('docs/design/profile/PerfilMeusSeguidores.svg', 'utf8');
  const svg2 = fs.readFileSync('docs/design/profile/PerfilMeusSeguidores-scroll.svg', 'utf8');

  // Let's find the Title "Meus seguidores" in both SVGs
  // In svg1, modal rect is x=20, y=100, width=351, height=613, rx=32
  // Let's find all paths/rects between y=100 and y=160 in svg1 and svg2
  console.log('=== SVG1 (Normal) ===');
  findHeaderElements(svg1);

  console.log('=== SVG2 (Scroll) ===');
  findHeaderElements(svg2);
}

function findHeaderElements(svg) {
  // Find paths whose bounding box is in y: 100..150
  const pathRegex = /<path\s+d="([^"]+)"\s+fill="([^"]+)"/g;
  let m;
  while ((m = pathRegex.exec(svg)) !== null) {
    const d = m[1];
    const fill = m[2];
    const nums = d.match(/[\d\.]+/g) || [];
    let minY = 9999, maxY = 0, minX = 9999, maxX = 0;
    for (let i = 0; i < nums.length; i += 2) {
      const x = parseFloat(nums[i]);
      const y = parseFloat(nums[i+1]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    if (minY >= 95 && maxY <= 150) {
      console.log(`Path fill=${fill}, x=[${minX.toFixed(1)}, ${maxX.toFixed(1)}], y=[${minY.toFixed(1)}, ${maxY.toFixed(1)}], h=${(maxY-minY).toFixed(1)}`);
    }
  }

  // Find rects in y: 95..150
  const rectRegex = /<rect\s+([^>]+)>/g;
  while ((m = rectRegex.exec(svg)) !== null) {
    const attrs = m[1];
    const y = parseFloat(attrs.match(/y="([^"]+)"/)?.[1] || '0');
    if (y >= 95 && y <= 150) {
      console.log('Rect in range:', attrs);
    }
  }
}

inspectFollowersModalHeader();
