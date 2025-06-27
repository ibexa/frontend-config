const path = require('path');

module.exports = (Encore, customConfigs) => customConfigs.reduce((configs, customConfigPath) => {
    let customConfig = require(path.resolve(customConfigPath));

    if (typeof customConfig === 'function') {
        customConfig = customConfig(Encore);
    }

    if (!Array.isArray(customConfig)) {
        customConfig = [customConfig];
    }

    return [ ...configs, ...customConfig ];
}, []);
