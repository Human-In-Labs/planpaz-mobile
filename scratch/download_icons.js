const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = [
  { name: 'crosshair-simple.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/crosshair-simple.svg' },
  { name: 'tree.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/tree.svg' },
  { name: 'calendar.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/calendar.svg' },
  { name: 'chat-teardrop.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/chat-teardrop.svg' },
  { name: 'globe-hemisphere-west.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/globe-hemisphere-west.svg' },
  { name: 'dots-three-vertical.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/dots-three-vertical.svg' },
  { name: 'arrow-left.svg', url: 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/arrow-left.svg' },
];

const destDir = path.join(__dirname, '../src/assets/icons');

async function download(item) {
  return new Promise((resolve, reject) => {
    https.get(item.url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${item.url}: status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const destPath = path.join(destDir, item.name);
        fs.writeFileSync(destPath, data.trim() + '\n');
        console.log(`Saved ${item.name} (${data.length} bytes)`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of icons) {
    await download(item);
  }
  console.log('All icons downloaded successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
