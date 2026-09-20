const fs = require('fs');
const path = require('path');

function parseSvg(filename) {
  const filePath = path.join(__dirname, '../docs/design/profile', filename);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\n================== ${filename} ==================`);

  // Extract texts
  const textMatches = [...content.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)];
  console.log(`--- Texts (${textMatches.length}) ---`);
  textMatches.forEach(m => {
    const fullTag = m[0];
    const textContent = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const x = fullTag.match(/x="([^"]+)"/)?.[1];
    const y = fullTag.match(/y="([^"]+)"/)?.[1];
    const fill = fullTag.match(/fill="([^"]+)"/)?.[1];
    const fontFamily = fullTag.match(/font-family="([^"]+)"/)?.[1];
    const fontSize = fullTag.match(/font-size="([^"]+)"/)?.[1];
    const fontWeight = fullTag.match(/font-weight="([^"]+)"/)?.[1];
    console.log(`[Text] "${textContent}" at (${x}, ${y}) fill=${fill} font=${fontFamily} size=${fontSize} weight=${fontWeight}`);
  });

  // Extract rects
  const rectMatches = [...content.matchAll(/<rect[^>]*\/>/g)];
  console.log(`--- Rects sample (${rectMatches.length}) ---`);
  rectMatches.slice(0, 30).forEach(m => {
    const tag = m[0];
    const x = tag.match(/x="([^"]+)"/)?.[1];
    const y = tag.match(/y="([^"]+)"/)?.[1];
    const w = tag.match(/width="([^"]+)"/)?.[1];
    const h = tag.match(/height="([^"]+)"/)?.[1];
    const rx = tag.match(/rx="([^"]+)"/)?.[1];
    const fill = tag.match(/fill="([^"]+)"/)?.[1];
    const stroke = tag.match(/stroke="([^"]+)"/)?.[1];
    console.log(`[Rect] (${x}, ${y}, ${w}x${h}, rx=${rx}) fill=${fill} stroke=${stroke}`);
  });
}

['Perfil.svg', 'PerfilMeusSeguidores.svg', 'PerfilMeusSeguidores-scroll.svg', 'Configuracoes.svg', 'Configuracoes-dropdown.svg'].forEach(parseSvg);
