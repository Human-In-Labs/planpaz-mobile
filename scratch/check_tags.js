const fs = require('fs');

function inspectMinhaPlantaTags() {
  const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');
  // find paths with y between 415 and 445
  const paths = [...mp.matchAll(/<path[^>]+>/g)].map(m => m[0]);
  const tagPaths = paths.filter(p => {
    return p.includes('421') || p.includes('422') || p.includes('423') || p.includes('424') || p.includes('425') || p.includes('426') || p.includes('427') || p.includes('428') || p.includes('429') || p.includes('430');
  });
  console.log('MinhaPlanta tag paths:', tagPaths.length);
  tagPaths.forEach(p => console.log(p));
}

inspectMinhaPlantaTags();
