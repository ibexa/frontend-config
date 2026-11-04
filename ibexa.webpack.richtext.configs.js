const path = require('path');
const { Encore } = require('@ibexa/frontend-config/helpers/encore');
const getWebpackConfigs = require('@ibexa/frontend-config/webpack-config/get-configs');
const richtextConfigsPaths = require(path.resolve('./var/encore/ibexa.webpack.richtext.config.js'));

module.exports = getWebpackConfigs(Encore, richtextConfigsPaths);
