const path = require('path');

const moduleAlias = require('module-alias');

const nodeModulesPath = path.resolve('node_modules');

moduleAlias.addPath(nodeModulesPath);

console.warn('\x1b[33m%s\x1b[0m', `Enabled symlinked bundles to use ${nodeModulesPath}. Use this only for development purposes!`);

module.exports = (ibexaConfig) => {
    ibexaConfig.resolve.modules = [nodeModulesPath];
};
