const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../docs/design/profile/Perfil.svg'), 'utf8');

// Target path (CO2)
const p1 = content.match(/d="(M70 504\.438[^"]+)"/)?.[1];
// Tree path (EcoScore)
const p2 = content.match(/d="(M201\.572 508\.911[^"]+)"/)?.[1];
// Calendar path (Dias no Planpaz)
const p3 = content.match(/d="(M325\.5 504\.5[^"]+)"/)?.[1];
// Chat bubble path (Posts)
const p4 = content.match(/d="(M80\.1538 605[^"]+)"/)?.[1];
// Plant path (Plantas cultivadas)
const p5 = content.match(/d="(M206\.958 606\.903[^"]+)"/)?.[1];
// Globe path (Planpaz)
const globe = content.match(/d="(M341\.491 384\.953[^"]+)"/)?.[1];

console.log('Target icon:', p1 ? p1.length : 'not found');
console.log('Tree icon:', p2 ? p2.length : 'not found');
console.log('Calendar icon:', p3 ? p3.length : 'not found');
console.log('Chat icon:', p4 ? p4.length : 'not found');
console.log('Plant icon:', p5 ? p5.length : 'not found');
console.log('Globe icon:', globe ? globe.length : 'not found');

fs.writeFileSync(path.join(__dirname, 'stat_icons.json'), JSON.stringify({
  target: p1,
  tree: p2,
  calendar: p3,
  chat: p4,
  plant: p5,
  globe: globe
}, null, 2));
