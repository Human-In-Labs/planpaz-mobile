const fs = require('fs');

const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');

// find all paths in MinhaPlanta around y=440..560
const paths = [...mp.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];
const descPaths = paths.filter(p => {
  const d = p[1];
  return d.includes(' 48') || d.includes(' 49') || d.includes(' 50') || d.includes(' 51') || d.includes(' 52') || d.includes(' 53') || d.includes(' 54') || d.includes(' 55');
});

console.log('Desc paths found:', descPaths.length);
descPaths.forEach(p => {
  console.log(p[0].substring(0, 100));
});
