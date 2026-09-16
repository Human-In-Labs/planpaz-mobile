const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../docs/design/profile/Perfil.svg'), 'utf8');

// Let's find paths around the coordinates of statistic cards:
// Card 1: x=16..124, y=490..575 (Path #26: x=59.2, y=504.4)
// Card 2: x=140..248, y=490..575 (Path #27: x=184.5, y=504.5)
// Card 3: x=264..372, y=490..575 (Path #25: x=309, y=503)
// Card 4: x=16..124, y=591..676 (Path #34: x=58, y=605)
// Card 5: x=140..248, y=591..676 (Path #35: x=179.8, y=605.7)

const pathRegex = /<path\s+([^>]+)\/>/g;
let m;
while ((m = pathRegex.exec(content)) !== null) {
  const d = m[1].match(/d="([^"]+)"/)?.[1];
  const fill = m[1].match(/fill="([^"]+)"/)?.[1];
  if (!d) continue;

  // check if coordinates match
  if (d.includes('504.') || d.includes('503.') || d.includes('605.') || d.includes('357.') || d.includes('358.')) {
    console.log('Found icon path with fill=', fill, 'length=', d.length, 'preview=', d.slice(0, 80));
  }
}
