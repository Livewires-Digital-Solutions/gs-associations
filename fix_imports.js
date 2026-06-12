const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.next' || file === '.git') continue;
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walkDir(filepath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            let content = fs.readFileSync(filepath, 'utf8');
            if (content.includes('@/src/')) {
                const newContent = content.replace(/(['"])@\/src\//g, '$1@/');
                fs.writeFileSync(filepath, newContent, 'utf8');
                console.log(`Updated ${filepath}`);
            }
        }
    }
}

walkDir(__dirname);
