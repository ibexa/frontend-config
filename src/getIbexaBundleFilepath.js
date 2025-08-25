const fs = require('fs');
const path = require('path');

module.exports = (filename) => {
    const composer = JSON.parse(fs.readFileSync('./composer.json', 'utf-8'));
    const vendorDir = composer.config?.['vendor-dir'] || 'vendor';
    const fullPath = path.join(process.cwd(), vendorDir, 'ibexa', filename);

    return fullPath;
}
