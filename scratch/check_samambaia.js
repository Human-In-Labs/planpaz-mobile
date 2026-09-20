const fs = require('fs');

const mp = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');
const paths = [...mp.matchAll(/<path[^>]+d="([^"]+)"[^>]*>/g)];
paths.forEach((p, idx) => {
  const d = p[1];
  // check if y is between 445 and 475
  const numbers = d.match(/[0-9]+\.?[0-9]*/g).map(Number);
  const yCoords = [];
  for (let i = 1; i < numbers.length; i += 2) {
    if (numbers[i] > 440 && numbers[i] < 480) {
      yCoords.push(numbers[i]);
    }
  }
  if (yCoords.length > 5) {
    const xCoords = [];
    for (let i = 0; i < numbers.length; i += 2) {
      xCoords.push(numbers[i]);
    }
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);
    console.log(`Path ${idx}: x=[${minX.toFixed(1)}, ${maxX.toFixed(1)}], y=[${minY.toFixed(1)}, ${maxY.toFixed(1)}] d=${d.substring(0, 60)}`);
  }
});
