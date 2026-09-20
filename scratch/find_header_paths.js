const fs = require('fs');
const content = fs.readFileSync('docs/design/home/Home.svg', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<path d="M')) {
        // extract the first M command: M{x} {y}
        const m = line.match(/<path d="M([0-9.]+)\s+([0-9.]+)/);
        if (m) {
            const x = parseFloat(m[1]);
            const y = parseFloat(m[2]);
            if (y >= 20 && y <= 80) {
                console.log(`Path at (${x}, ${y}):`, line.substring(0, 100));
            }
        }
    }
}
