const fs = require('fs');

const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');
const paths = [...mp.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];
console.log('Paths inside FAB:');
paths.forEach((p, idx) => {
  const d = p[1];
  const numbers = d.match(/[0-9]+\.?[0-9]*/g).map(Number);
  let inFab = false;
  for (let i = 0; i < numbers.length - 1; i += 2) {
    if (numbers[i] >= 318 && numbers[i] <= 374 && numbers[i+1] >= 682 && numbers[i+1] <= 738) {
      inFab = true;
      break;
    }
  }
  if (inFab) {
    console.log(`FAB Path ${idx}: ${p[0]}`);
  }
});
