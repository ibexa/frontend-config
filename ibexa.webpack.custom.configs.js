const path = require('path');

const fullEncoreDir = path.resolve(process.cwd(), 'var/encore');
const customConfigsPath = path.resolve(fullEncoreDir, 'ibexa.webpack.custom.config.js');
const customConfigs = require(customConfigsPath);

module.exports = customConfigs.reduce((configs, customConfigPath) => {
    let customConfig = require(path.resolve(process.cwd(), customConfigPath));

    if (!Array.isArray(customConfig)) {
        customConfig = [customConfig];
    }

    return [ ...configs, ...customConfig ];
}, []);
