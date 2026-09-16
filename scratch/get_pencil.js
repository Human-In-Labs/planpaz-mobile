const https = require('https');

function fetchSvg(name) {
  const url = `https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/${name}.svg`;
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`=== ${name} ===`);
      console.log(data);
    });
  }).on('error', err => console.error(err));
}

fetchSvg('pencil-simple');
fetchSvg('pencil');
fetchSvg('pencil-line');
