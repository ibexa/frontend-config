const path = require('path');
const ibexaCoreRtlCssPlugin = require('@ibexa/frontend-config/rtl/core-rtlcss-plugin');

module.exports = ({ rtlConfigs }) => ({
    apply(compiler) {
        compiler.hooks.done.tap('IbexaRtlCssPlugin', () => {
            const buildDir = compiler.options.output.path;
            const entrypointsFilePath = path.join(buildDir, 'entrypoints.json');

            ibexaCoreRtlCssPlugin({ buildDir, entrypointsFilePath, rtlConfigs });
        });
    },
});
