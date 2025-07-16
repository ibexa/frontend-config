const path = require('path');
const Encore = require('@symfony/webpack-encore');
const getWebpackConfigs = require('@ibexa/frontend-config/webpack-config/get-configs');
const libsConfigsPaths = require(path.resolve('./var/encore/ibexa.webpack.libs.config.js'));

module.exports = getWebpackConfigs(Encore, libsConfigsPaths);
