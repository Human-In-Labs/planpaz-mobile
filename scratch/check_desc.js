const fs = require('fs');

function inspectDescription() {
  const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');
  // find paths around x=40, y=470..560
  const paths = [...mp.matchAll(/<path[^>]+d="M(4[0-9]|5[0-9]|6[0-9])[^"]+"[^>]*>/g)].map(m => m[0]);
  console.log('Description paths around x=40..69:', paths.length);
  paths.slice(0, 10).forEach(p => console.log(p.substring(0, 120)));
}

inspectDescription();
