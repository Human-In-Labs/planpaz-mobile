const fs = require('fs');
const path = require('path');

const dir = 'docs/design/garden';
const files = fs.readdirSync(dir);

files.forEach(f => {
  const p = path.join(dir, f);
  const content = fs.readFileSync(p, 'utf8');
  const vbMatch = content.match(/viewBox=["']([^"']+)["']/);
  const wMatch = content.match(/width=["']([^"']+)["']/);
  const hMatch = content.match(/height=["']([^"']+)["']/);
  
  const textMatches = content.match(/<text[^>]*>([\s\S]*?)<\/text>/g) || [];
  const imageMatches = content.match(/<image[^>]*>/g) || [];
  
  console.log('--- ' + f + ' ---');
  console.log({
    viewBox: vbMatch ? vbMatch[1] : null,
    w: wMatch ? wMatch[1] : null,
    h: hMatch ? hMatch[1] : null,
    sizeKB: Math.round(content.length / 1024),
    textCount: textMatches.length,
    imageCount: imageMatches.length
  });
});
