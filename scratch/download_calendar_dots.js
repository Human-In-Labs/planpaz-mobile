const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/calendar-dots.svg';
const targetPath = 'src/assets/icons/calendar-dots.svg';

https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error('Failed with status:', res.statusCode);
        return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync(targetPath, data);
        console.log('Saved', targetPath, 'length:', data.length);
        console.log(data);
    });
}).on('error', err => {
    console.error('Error:', err.message);
});
