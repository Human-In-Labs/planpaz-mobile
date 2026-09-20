const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../docs/design/profile');
const files = ['Perfil.svg', 'PerfilMeusSeguidores.svg', 'Configuracoes.svg', 'Configuracoes-dropdown.svg'];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  console.log(`\n=== ${f} ===`);
  
  // Find all text elements
  const textMatches = [...content.matchAll(/<text[\s\S]*?<\/text>/g)];
  console.log('Text tags count:', textMatches.length);
  textMatches.forEach(t => console.log('  ', t[0].replace(/\s+/g, ' ')));

  // If no text tags, let's inspect clipPath, masks, images, embedded base64, etc.
  const images = [...content.matchAll(/<image[\s\S]*?\/>/g)];
  console.log('Images count:', images.length);
  images.forEach(img => {
    const w = img[0].match(/width="([^"]+)"/)?.[1];
    const h = img[0].match(/height="([^"]+)"/)?.[1];
    const x = img[0].match(/x="([^"]+)"/)?.[1];
    const y = img[0].match(/y="([^"]+)"/)?.[1];
    console.log(`  Image: (${x}, ${y}) ${w}x${h}`);
  });

  // Let's check path colors/fills
  const fills = {};
  const pathMatches = [...content.matchAll(/<path[\s\S]*?\/>/g)];
  console.log('Paths count:', pathMatches.length);
  pathMatches.forEach(p => {
    const fill = p[0].match(/fill="([^"]+)"/)?.[1] || 'none';
    fills[fill] = (fills[fill] || 0) + 1;
  });
  console.log('Fills:', fills);
});
