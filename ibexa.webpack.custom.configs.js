const path = require('path');

const customConfigsPath = path.resolve('var/encore/ibexa.webpack.custom.config.js');
const customConfigs = require(customConfigsPath);

module.exports = customConfigs.reduce((configs, customConfigPath) => {
    let customConfig = require(path.resolve(customConfigPath));

    if (!Array.isArray(customConfig)) {
        customConfig = [customConfig];
    }

    return [ ...configs, ...customConfig ];
}, []);
