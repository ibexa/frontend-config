const { parseArgs } = require('util');
const path = require('path');
const ibexaCoreRtlCssPlugin = require('@ibexa/frontend-config/rtl/core-rtlcss-plugin');

const { values } = parseArgs({
    options: {
        'build-dir': { type: 'string' },
        'entrypoints-file': { type: 'string' },
        'rtl-configs': { type: 'string' },
    },
});

const buildDir = values['build-dir'] ?? path.resolve('./public/assets/ibexa/build');
const entrypointsFilePath = values['entrypoints-file'] ?? path.join(buildDir, 'entrypoints.json');
const rtlConfigs = values['rtl-configs']
    ? [values['rtl-configs']]
    : require(path.resolve('./var/encore/ibexa.rtl.config.js'));

ibexaCoreRtlCssPlugin({ buildDir, entrypointsFilePath, rtlConfigs });
