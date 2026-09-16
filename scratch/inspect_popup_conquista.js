const fs = require('fs');
const content = fs.readFileSync('docs/design/profile/PopupConquista.svg', 'utf8');

// Rects
const rects = [...content.matchAll(/<rect([^>]+)>/g)].map(m => m[1]);
console.log('Rects:');
rects.forEach(r => console.log('  ' + r));

// Paths in the modal
// Modal is y=98 to 456
console.log('--- Paths in popup area ---');
const pathTags = [...content.matchAll(/<path([^>]+)>/g)].map(m => m[1]);
pathTags.forEach(p => {
    if (p.includes('fill="#115634"') || p.includes('fill="#03624C"') || p.includes('fill="black"') || p.includes('fill="#F1F7F6"')) {
        console.log('  ' + p.slice(0, 100));
    }
});
