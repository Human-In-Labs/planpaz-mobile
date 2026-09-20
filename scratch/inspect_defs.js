const fs = require('fs');

function inspectSvgPathsAndTexts(filePath, title) {
  console.log(`=== ${title} ===`);
  const svg = fs.readFileSync(filePath, 'utf8');
  
  // Find masks and defs
  const defs = svg.match(/<defs>[\s\S]*?<\/defs>/);
  if (defs) {
    const masks = defs[0].match(/<mask[^>]*>[\s\S]*?<\/mask>/g) || [];
    masks.forEach(m => console.log('Mask:', m.substring(0, 200)));
    const linearGradients = defs[0].match(/<linearGradient[^>]*>[\s\S]*?<\/linearGradient>/g) || [];
    linearGradients.forEach(g => console.log('Gradient:', g));
    const filter = defs[0].match(/<filter[^>]*>[\s\S]*?<\/filter>/g) || [];
    filter.forEach(f => console.log('Filter:', f));
  }

  // Find all elements between y=100 and y=150 in scroll svg
  const tags = svg.match(/<[a-zA-Z]+[^>]*>/g) || [];
  tags.forEach(t => {
    if (t.includes('mask=') || t.includes('clip-path=')) {
      console.log('Uses mask/clip:', t);
    }
  });
}

inspectSvgPathsAndTexts('docs/design/profile/PerfilMeusSeguidores-scroll.svg', 'SEGUIDORES SCROLL');
inspectSvgPathsAndTexts('docs/design/profile/Configuracoes-mudarFoto.svg', 'MUDAR FOTO');
inspectSvgPathsAndTexts('docs/design/profile/PerfilSeguidores-popup.svg', 'SUBPOPUP');
