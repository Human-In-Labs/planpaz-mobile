const fs = require('fs');
const content = fs.readFileSync('docs/design/profile/Configuracoes-dropdown.svg', 'utf8');

// Find rect around y=436
const rects = [...content.matchAll(/<rect([^>]+)>/g)].map(m => m[1]);
console.log('Rects in dropdown:');
rects.forEach(r => {
    if (r.includes('436') || r.includes('216') || r.includes('269')) {
        console.log(r);
    }
});

// Find text or paths inside y=436..705
const groups = [...content.matchAll(/<g[^>]*>[\s\S]*?<\/g>/g)];
console.log('Groups count:', groups.length);
