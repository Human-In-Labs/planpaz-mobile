const fs = require('fs');

const s2 = fs.readFileSync('docs/design/garden/Minha planta-scroll2.svg', 'utf8');

console.log('--- Rects in Scroll2 ---');
const rects = [...s2.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
rects.filter(r => r.includes('width="358"') || r.includes('rx="')).slice(0, 20).forEach(r => console.log(r));

// Check text in Scroll2
console.log('\n--- Text or paths in Scroll2 ---');
const texts = [...s2.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
console.log('Total texts in s2:', texts.length);

// Let's check Biblioteca-planta.svg text too
const bp = fs.readFileSync('docs/design/garden/Biblioteca-planta.svg', 'utf8');
const textsBP = [...bp.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
console.log('Total texts in Biblioteca-planta:', textsBP.length);
