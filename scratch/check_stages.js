const fs = require('fs');

const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');

// find rects, paths or pattern fills near x=105..284, y=599..811
const pats = [...mp.matchAll(/<(?:rect|path)[^>]+fill="url\(#pattern[^"]+\)"[^>]*>/g)].map(m => m[0]);
console.log('Patterns in MinhaPlanta:');
pats.forEach(p => console.log(p));

// Also check paths in that region
const paths = [...mp.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];
console.log('\nChecking paths inside stage card:');
paths.forEach((p, idx) => {
  const d = p[1];
  if (d.includes(' 60') || d.includes(' 61') || d.includes(' 62') || d.includes(' 63') || d.includes(' 76') || d.includes(' 77') || d.includes(' 78')) {
    if (d.includes('M1') || d.includes('M2') || d.includes('M-') || d.includes('M3')) {
      console.log(`Path ${idx}: ${p[0].substring(0, 100)}`);
    }
  }
});
