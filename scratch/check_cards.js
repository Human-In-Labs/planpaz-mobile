const fs = require('fs');

function checkCardImages() {
  console.log('--- Jardim.svg patterns ---');
  const jardim = fs.readFileSync('docs/design/garden/Jardim.svg', 'utf8');
  const pats = [...jardim.matchAll(/<(?:rect|path)[^>]+fill="url\(#pattern[^"]+\)"[^>]*>/g)].map(m => m[0]);
  pats.forEach(p => console.log('Jardim image elem:', p));
  const paths = [...jardim.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];
  // check if any path is inside the card
  console.log('Total paths in Jardim:', paths.length);
  // find paths with d starting with M16 or M20 or M24
  paths.filter(p => p[0].includes('url(#pattern')).forEach(p => console.log('Path pattern:', p[0]));
}

checkCardImages();

