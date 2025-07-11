const path = require('path');

module.exports = (Encore, configPaths) => configPaths.reduce((configs, configPath) => {
    Encore.reset();

    let loadedConfig = require(path.resolve(configPath));

    if (typeof loadedConfig === 'function') {
        loadedConfig = loadedConfig(Encore);
    }

    if (!Array.isArray(loadedConfig)) {
        loadedConfig = [loadedConfig];
    }

    return [ ...configs, ...loadedConfig ];
}, []);
