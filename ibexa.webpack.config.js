const path = require('path');

const ibexaConfigManager = require('./ibexa.webpack.config.manager.js');

module.exports = (Encore, { bundles, managers, setups }, modifyEncoreConfig) => {
    process.env.NODE_ENV ??= Encore.isProduction() ? 'production' : 'development';

    Encore.setOutputPath('public/assets/ibexa/build')
        .setPublicPath('/assets/ibexa/build')
        .addExternals({
            react: 'React',
            'react-dom': 'ReactDOM',
            moment: 'moment',
            'popper.js': 'Popper',
            alloyeditor: 'AlloyEditor',
            'prop-types': 'PropTypes',
        })
        .enableSassLoader()
        .enableTypeScriptLoader((tsConfig) => {
            tsConfig.configFile = path.resolve('tsconfig.json');
        })
        .enableForkedTypeScriptTypesChecking((tsConfig) => {
            tsConfig.async = true;
        })
        .enableReactPreset()
        .enableSingleRuntimeChunk();

    setups.forEach((configSetupPath) => {
        const setupConfig = require(path.resolve(configSetupPath));

        setupConfig(Encore);
    });

    bundles.forEach((configPath) => {
        const addEntries = require(path.resolve(configPath));

        addEntries(Encore);
    });

    if (typeof modifyEncoreConfig === 'function') {
        modifyEncoreConfig(Encore);
    }

    const ibexaConfig = Encore.getWebpackConfig();

    ibexaConfig.name = 'ibexa';

    ibexaConfig.module.rules[4].oneOf[1].use[1].options.url = false;
    ibexaConfig.module.rules[1].oneOf[1].use[1].options.url = false;

    managers.forEach((configManagerPath) => {
        const configManager = require(path.resolve(configManagerPath));

        configManager(ibexaConfig, ibexaConfigManager);
    });

    Encore.reset();

    return ibexaConfig;
};
