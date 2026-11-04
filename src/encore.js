const encoreModule = require('@symfony/webpack-encore');

// @symfony/webpack-encore 7+ is an ES module, older versions are CommonJS
const Encore = encoreModule.__esModule ? encoreModule.default : encoreModule;

// @symfony/webpack-encore 7+ returns the webpack config as a Promise, older versions return it directly
const whenConfigReady = (config, callback) => (typeof config?.then === 'function' ? config.then(callback) : callback(config));

module.exports = { Encore, whenConfigReady };
