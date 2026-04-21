const { Compilation } = require('webpack');
const path = require('path');
const core = require('./core.rtlcss.plugin.js');

module.exports = (rtlConfigs) => ({
    apply(compiler) {
        compiler.hooks.afterEmit.tap('IbexaRtlCssPlugin', () => {
            const buildDir = compiler.options.output.path;
            const entrypointsFile = path.join(buildDir, 'entrypoints.json');

            core(buildDir, entrypointsFile, rtlConfigs);
        });
    },
});
