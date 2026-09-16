const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const scratchDir = 'C:\\Users\\andre\\.gemini\\antigravity-ide\\brain\\832f25ab-c3bc-4d57-aab6-d0badcc1bb55\\scratch';
const files = [
  { svg: 'Jardim.svg', out: 'garden_jardim.png' },
  { svg: 'MinhaPlanta.svg', out: 'garden_minhaplanta.png' },
  { svg: 'Minha planta-scroll1.svg', out: 'garden_minhaplanta_scroll1.png' },
  { svg: 'Minha planta-scroll2.svg', out: 'garden_minhaplanta_scroll2.png' },
  { svg: 'Minhaplanta-editar.svg', out: 'garden_minhaplanta_editar.png' },
  { svg: 'MinhaPlanta-editarAlterarFoto.svg', out: 'garden_minhaplanta_alterar_foto.png' },
  { svg: 'Biblioteca.svg', out: 'garden_biblioteca.png' },
  { svg: 'Biblioteca-planta.svg', out: 'garden_biblioteca_planta.png' },
  { svg: 'AdicionarPlanta.svg', out: 'garden_adicionar_planta.png' }
];

files.forEach(({ svg, out }) => {
  const svgUrl = `file:///c:/GITHUB/planpaz-mobile/docs/design/garden/${encodeURIComponent(svg)}`;
  const outPath = path.join(scratchDir, out);
  const cmd = `${edgePath} --headless=new --disable-gpu --window-size=390,844 --screenshot="${outPath}" "${svgUrl}"`;
  console.log(`Rendering ${svg}...`);
  try {
    execSync(cmd);
    if (fs.existsSync(outPath)) {
      console.log(`OK: ${out} (${fs.statSync(outPath).size} bytes)`);
    } else {
      console.error(`Failed: ${outPath} not found`);
    }
  } catch (err) {
    console.error(`Error ${svg}:`, err.message);
  }
});
