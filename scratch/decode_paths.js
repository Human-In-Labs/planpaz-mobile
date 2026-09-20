const fs = require('fs');

const svg = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');
const paths = [...svg.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];

[18, 21, 22, 23, 24, 26, 29].forEach(idx => {
  const p = paths[idx][0];
  const d = paths[idx][1];
  const numbers = d.match(/[0-9]+\.?[0-9]*/g).map(Number);
  const xVals = [];
  const yVals = [];
  for (let i = 0; i < numbers.length - 1; i += 2) {
    xVals.push(numbers[i]);
    yVals.push(numbers[i+1]);
  }
  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);
  const minY = Math.min(...yVals);
  const maxY = Math.max(...yVals);
  console.log(`\n--- Path ${idx}: x=[${minX.toFixed(1)}, ${maxX.toFixed(1)}], y=[${minY.toFixed(1)}, ${maxY.toFixed(1)}] ---`);
  // print first 200 chars of d
  console.log(d.substring(0, 200));
});
