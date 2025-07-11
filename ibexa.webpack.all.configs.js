const ibexaConfig = require('@ibexa/frontend-config/webpack-config/ibexa');
const richtextConfig = require('@ibexa/frontend-config/webpack-config/richtext');
const internalsConfig = require('@ibexa/frontend-config/webpack-config/internals');
const libsConfig = require('@ibexa/frontend-config/webpack-config/libs');

module.exports = [
    ibexaConfig,
    ...richtextConfig,
    ...internalsConfig,
    ...libsConfig,
];
