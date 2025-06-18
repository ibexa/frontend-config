const path = require('path');

const ibexaConfigManager = require('./ibexa.webpack.config.manager.js');

const configBundlesPath = path.resolve('var/encore/ibexa.config.js');
const configManagerPath = path.resolve('var/encore/ibexa.config.manager.js');
const configSetupsPath = path.resolve('var/encore/ibexa.config.setup.js');
const bundles = require(configBundlesPath);
const configManagers = require(configManagerPath);
const configSetups = require(configSetupsPath);

module.exports = (Encore, modifyEncoreConfig, modifyOutputConfig) => {
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

    configSetups.forEach((configSetupPath) => {
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

    configManagers.forEach((configManagerPath) => {
        const configManager = require(path.resolve(configManagerPath));

        configManager(ibexaConfig, ibexaConfigManager);
    });

    if (typeof modifyOutputConfig === 'function') {
        modifyOutputConfig(ibexaConfig);
    }

    Encore.reset();

    return ibexaConfig;
};
