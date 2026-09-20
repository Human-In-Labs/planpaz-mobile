const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  'camera',
  'scissors',
  'ruler',
  'briefcase',
  'list-dashes',
  'shower',
  'sprout'
];

icons.forEach(name => {
  const url = `https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/${name}.svg`;
  const target = path.join('src', 'assets', 'icons', `${name}.svg`);
  https.get(url, res => {
    if (res.statusCode !== 200) {
      console.error(`Failed ${name}: status ${res.statusCode}`);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync(target, data);
      console.log(`Saved ${target} (${data.length} bytes)`);
    });
  }).on('error', err => {
    console.error(`Error ${name}:`, err.message);
  });
});
