const fs = require('fs');

const svg2 = fs.readFileSync('docs/design/profile/PerfilMeusSeguidores-scroll.svg', 'utf8');

// Find all paths in svg2
const pathTags = svg2.match(/<path[^>]*\/>/g) || [];
pathTags.forEach((p, idx) => {
  const d = p.match(/d="([^"]+)"/)?.[1] || '';
  const fill = p.match(/fill="([^"]+)"/)?.[1] || '';
  if (d.includes('M141.726 115.228') || d.includes('115.228')) {
    console.log(`Title found in svg2! idx=${idx}, fill=${fill}`);
  }
});

// Find all rects in svg2
const rects = svg2.match(/<rect[^>]*\/>/g) || [];
rects.forEach(r => {
  const ym = r.match(/y="([^"]+)"/);
  if (ym && parseFloat(ym[1]) >= 95 && parseFloat(ym[1]) <= 150) {
    console.log('Rect in svg2:', r);
  }
});

// Let's check if there's any mask or clip-path in svg2 around the list
const clips = svg2.match(/<clipPath[^>]*>[\s\S]*?<\/clipPath>/g) || [];
clips.forEach(c => console.log('Clip in svg2:', c));
