const path = require('path');
const { Encore } = require('@ibexa/frontend-config/helpers/encore');
const getWebpackConfigs = require('@ibexa/frontend-config/webpack-config/get-configs');
const internalConfigsPaths = require(path.resolve('./var/encore/ibexa.webpack.internal.config.js'));

module.exports = getWebpackConfigs(Encore, internalConfigsPaths);
