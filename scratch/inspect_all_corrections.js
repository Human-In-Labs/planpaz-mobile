const fs = require('fs');

function inspectMudarFoto() {
  console.log('=== MUDAR FOTO ===');
  const svg = fs.readFileSync('docs/design/profile/Configuracoes-mudarFoto.svg', 'utf8');
  // Find rects
  const rects = svg.match(/<rect[^>]*\/>/g) || [];
  rects.forEach(r => console.log('Rect:', r));
  // Find texts
  const texts = svg.match(/<text[^>]*>[\s\S]*?<\/text>/g) || [];
  texts.forEach(t => console.log('Text:', t.replace(/\n/g, ' ')));
}

function inspectSeguidoresPopup() {
  console.log('=== SEGUIDORES POPUP ===');
  const svg = fs.readFileSync('docs/design/profile/PerfilSeguidores-popup.svg', 'utf8');
  const rects = svg.match(/<rect[^>]*\/>/g) || [];
  rects.forEach(r => console.log('Rect:', r));
  const texts = svg.match(/<text[^>]*>[\s\S]*?<\/text>/g) || [];
  texts.forEach(t => console.log('Text:', t.replace(/\n/g, ' ')));
}

function inspectFollowersHeader() {
  console.log('=== FOLLOWERS HEADER ===');
  const svg1 = fs.readFileSync('docs/design/profile/PerfilMeusSeguidores.svg', 'utf8');
  const svg2 = fs.readFileSync('docs/design/profile/PerfilMeusSeguidores-scroll.svg', 'utf8');
  
  // Find rects near top of modal (modal starts at y=100)
  const rects1 = svg1.match(/<rect[^>]*\/>/g) || [];
  rects1.forEach(r => {
    const ym = r.match(/y="([^"]+)"/);
    if (ym && parseFloat(ym[1]) >= 90 && parseFloat(ym[1]) <= 250) {
      console.log('Modal/Header rect svg1:', r);
    }
  });

  const rects2 = svg2.match(/<rect[^>]*\/>/g) || [];
  rects2.forEach(r => {
    const ym = r.match(/y="([^"]+)"/);
    if (ym && parseFloat(ym[1]) >= 90 && parseFloat(ym[1]) <= 250) {
      console.log('Modal/Header rect svg2:', r);
    }
  });
}

inspectMudarFoto();
inspectSeguidoresPopup();
inspectFollowersHeader();
