const fs = require('fs');

function inspectMinhaPlanta() {
  console.log('================ MinhaPlanta.svg ================');
  const svg = fs.readFileSync('docs/design/garden/MinhaPlanta.svg', 'utf8');

  // Let's find rects with width and height
  const rects = [...svg.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
  rects.forEach(r => {
    if (r.includes('318') || r.includes('682') || (r.includes('56') && r.includes('width'))) {
      console.log('FAB or similar rect:', r);
    }
  });

  // Check paths near x=318..374, y=682..738 (FAB area)
  // Let's find <g or <path in that bounding box
  const groups = [...svg.matchAll(/<g[^>]*>([\s\S]*?)<\/g>/g)];
  console.log('Looking for FAB elements...');

  // Search icon next to species name:
  // Let's find texts containing SAMAMBAIA
  const samambaiaMatch = svg.match(/<text[^>]*>[^<]*SAMAMBAIA[^<]*<\/text>/i);
  console.log('SAMAMBAIA text:', samambaiaMatch ? samambaiaMatch[0] : 'not found');

  // Find all <text> elements
  const allTexts = [...svg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
  console.log('\n--- Text samples in MinhaPlanta ---');
  allTexts.forEach(t => {
    const clean = t.replace(/\s+/g, ' ');
    if (clean.includes('SAMAMBAIA') || clean.includes('Samambaia') || clean.includes('Planta') || clean.includes('Estágio') || clean.includes('Luz') || clean.includes('dias') || clean.includes('Ideal')) {
      console.log(clean);
    }
  });
}

function inspectScroll1And2() {
  console.log('\n================ Minha planta-scroll1.svg ================');
  const s1 = fs.readFileSync('docs/design/garden/Minha planta-scroll1.svg', 'utf8');
  const allTexts1 = [...s1.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
  console.log('Total texts s1:', allTexts1.length);
  allTexts1.forEach(t => {
    console.log('S1 text:', t.replace(/\s+/g, ' '));
  });

  console.log('\n================ Minha planta-scroll2.svg ================');
  const s2 = fs.readFileSync('docs/design/garden/Minha planta-scroll2.svg', 'utf8');
  const allTexts2 = [...s2.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
  console.log('Total texts s2:', allTexts2.length);
  allTexts2.forEach(t => {
    console.log('S2 text:', t.replace(/\s+/g, ' '));
  });
}

function inspectBiblioteca() {
  console.log('\n================ Biblioteca.svg ================');
  const svg = fs.readFileSync('docs/design/garden/Biblioteca.svg', 'utf8');
  const allTexts = [...svg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
  console.log('Total texts Biblioteca:', allTexts.length);
  allTexts.slice(0, 20).forEach(t => console.log('Bib text:', t.replace(/\s+/g, ' ')));

  // find recommended rect or badge
  const rects = [...svg.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
  rects.forEach(r => {
    if (r.includes('fill="#') && (r.includes('width="7') || r.includes('width="8') || r.includes('width="9') || r.includes('width="10') || r.includes('width="11') || r.includes('rx="'))) {
      // check small rects
      const wMatch = r.match(/width="([^"]+)"/);
      const hMatch = r.match(/height="([^"]+)"/);
      if (wMatch && hMatch && parseFloat(wMatch[1]) < 150 && parseFloat(hMatch[1]) < 50) {
        console.log('Small badge/button rect:', r);
      }
    }
  });
}

function inspectAdicionarPlanta() {
  console.log('\n================ AdicionarPlanta.svg ================');
  const svg = fs.readFileSync('docs/design/garden/AdicionarPlanta.svg', 'utf8');
  const allTexts = [...svg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
  allTexts.forEach(t => console.log('AddPlant text:', t.replace(/\s+/g, ' ')));
}

function inspectBibliotecaPlanta() {
  console.log('\n================ Biblioteca-planta.svg ================');
  const svg = fs.readFileSync('docs/design/garden/Biblioteca-planta.svg', 'utf8');
  const allTexts = [...svg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[0]);
  allTexts.forEach(t => console.log('Bib-planta text:', t.replace(/\s+/g, ' ')));
}

inspectMinhaPlanta();
inspectScroll1And2();
inspectBiblioteca();
inspectAdicionarPlanta();
inspectBibliotecaPlanta();
