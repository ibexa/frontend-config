const { Compilation } = require('webpack');
const { RawSource } = require('webpack-sources');
const rtlcss = require('rtlcss');
const fs = require('fs');
const path = require('path');

const EXCLUDED_FILES = new Set([
    'ibexa-admin-ui-overwrite-rtl-css.css',
    'ibexa-admin-ui-overwrite-rtl-css.js',
]);
const EXCLUDED_ENTRYPOINTS = new Set(['ibexa-admin-ui-overwrite-rtl-css']);

const toRtlCssFilename = (file) => file.replace(/\.css$/, '-rtl.css');
const toRtlJsFilename  = (file) => file.replace(/-css\.js$/, '-css-rtl.js');

const makeAsset = (content) => new RawSource(content);

module.exports = (outputPath, excludedFiles = [], excludedEntrypoints = []) => {
    const excludedFilesSet = new Set([...EXCLUDED_FILES, ...excludedFiles]);
    const excludedEntrypointsSet = new Set([...EXCLUDED_ENTRYPOINTS, ...excludedEntrypoints]);
    
    const isCssFile = (file) => file.endsWith('.css') && !file.endsWith('-rtl.css') && !excludedFilesSet.has(file);
    const isCssJsFile = (file) => file.endsWith('-css.js') && !file.endsWith('-css-rtl.js') && !excludedFilesSet.has(file);
    
    const entrypointsFile = path.resolve(outputPath, 'entrypoints.json');

    return {
        apply(compiler) {
            compiler.hooks.thisCompilation.tap('IbexaRtlCssPlugin', (compilation) => {
                compilation.hooks.processAssets.tap(
                    {
                        name: 'IbexaRtlCssPlugin',
                        stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
                    },
                    (assets) => {
                        Object.keys(assets).forEach((filename) => {
                            if (isCssFile(filename)) {
                                const rtlCss = rtlcss.process(assets[filename].source());

                                compilation.emitAsset(toRtlCssFilename(filename), makeAsset(rtlCss));
                            } else if (isCssJsFile(filename)) {
                                const patched = assets[filename].source().replace(/-css/g, '-css-rtl');

                                compilation.emitAsset(toRtlJsFilename(filename), makeAsset(patched));
                            }
                        });
                    }
                );

                compiler.hooks.afterEmit.tap('IbexaRtlCssPlugin', () => {
                    const data = JSON.parse(fs.readFileSync(entrypointsFile, 'utf8'));
                    const { entrypoints } = data;

                    Object.entries(entrypoints).forEach(([key, value]) => {
                        const hasCss = value?.css?.some((file) => file.endsWith('.css'));
                        const hasCssJs = value?.js?.some((file) => file.endsWith('-css.js'));

                        if ((hasCss || hasCssJs) && !excludedEntrypointsSet.has(key)) {
                            entrypoints[`${key}-rtl`] = {
                                js: value.js.map((file) => isCssJsFile(file) ? toRtlJsFilename(file) : file),
                                css: value.css.map((file) => isCssFile(file)  ? toRtlCssFilename(file) : file),
                            };
                        }
                    });

                    fs.writeFileSync(entrypointsFile, JSON.stringify(data, null, 2));
                });
            });
        },
    };
};
