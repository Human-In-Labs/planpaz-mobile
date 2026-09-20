const fs = require('fs');
const content = fs.readFileSync('docs/design/home/HomeNotificacao.svg', 'utf8');

const rectRegex = /<rect[^>]+fill="black"[^>]*>/g;
console.log('Black rects:', content.match(rectRegex));

const opacityRegex = /<rect[^>]+opacity[^>]*>/g;
console.log('Opacity rects:', content.match(opacityRegex));
