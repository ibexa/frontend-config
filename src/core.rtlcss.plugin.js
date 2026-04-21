'use strict';

const rtlcss = require('rtlcss');
const fs = require('fs');
const path = require('path');

const getExcludedItems = (rtlConfigsPath) => rtlConfigsPath.reduce(
    (acc, configPath) => {
        const rtlConfig = require(path.resolve(configPath));

        return {
            excludedFiles: [...acc.excludedFiles, ...(rtlConfig.excludedFiles ?? [])],
            excludedEntrypoints: [...acc.excludedEntrypoints, ...(rtlConfig.excludedEntrypoints ?? [])],
        };
    },
    { excludedFiles: [], excludedEntrypoints: [] }
);

const run = (buildDir, entrypointsFilePath, rtlConfigsPath) => {
    const { excludedFiles, excludedEntrypoints } = getExcludedItems(rtlConfigsPath);
    const excludedFilesSet       = new Set(excludedFiles);
    const excludedEntrypointsSet = new Set(excludedEntrypoints);

    const toRtlCssFilename   = (file) => file.replace(/\.css$/, '-rtl.css');
    const toRtlCssJsFilename = (file) => file.replace(/-css\.js$/, '-css-rtl.js');
    const isCssFile   = (file) => file.endsWith('.css')    && !file.endsWith('-rtl.css')    && !excludedFilesSet.has(file);
    const isCssJsFile = (file) => file.endsWith('-css.js') && !file.endsWith('-css-rtl.js') && !excludedFilesSet.has(file);

    fs.readdirSync(buildDir).forEach((filename) => {
        if (isCssFile(filename)) {
            const src = fs.readFileSync(path.join(buildDir, filename), 'utf8');
            const rtlContent = rtlcss.process(src);

            fs.writeFileSync(path.join(buildDir, toRtlCssFilename(filename)), rtlContent, 'utf8');
        } else if (isCssJsFile(filename)) {
            const src = fs.readFileSync(path.join(buildDir, filename), 'utf8');
            const patched = src.replace(/-css/g, '-css-rtl');

            fs.writeFileSync(path.join(buildDir, toRtlCssJsFilename(filename)), patched, 'utf8');
        }
    });

    const data = JSON.parse(fs.readFileSync(entrypointsFilePath, 'utf8'));
    const { entrypoints } = data;

    Object.entries(entrypoints).forEach(([key, value]) => {
        if (key.endsWith('-rtl')) return;

        const hasCss   = value?.css?.some((file) => file.endsWith('.css'));
        const hasCssJs = value?.js?.some((file)  => file.endsWith('-css.js'));

        if ((hasCss || hasCssJs) && !excludedEntrypointsSet.has(key)) {
            entrypoints[`${key}-rtl`] = {};

            if (hasCssJs) {
                entrypoints[`${key}-rtl`].js = value.js.map((file) => isCssJsFile(file) ? toRtlCssJsFilename(file) : file);
            }

            if (hasCss) {
                entrypoints[`${key}-rtl`].css = value.css.map((file) => isCssFile(file) ? toRtlCssFilename(file) : file);
            }
        }
    });

    fs.writeFileSync(entrypointsFilePath, JSON.stringify(data, null, 2));
};

module.exports = run;

// --- CLI mode ---
// node src/core.rtlcss.plugin.js --build-dir=public/assets/ibexa/build

if (require.main === module) {
    const { parseArgs } = require('util');
    const { values } = parseArgs({
        options: {
            'build-dir':        { type: 'string' },
            'entrypoints-file': { type: 'string' },
            'rtl-configs':      { type: 'string' },
        },
    });

    const buildDir        = values['build-dir']        ?? path.resolve('./public/assets/ibexa/build');
    const entrypointsFile = values['entrypoints-file'] ?? path.join(buildDir, 'entrypoints.json');
    const rtlConfigsPath  = values['rtl-configs']
        ? [values['rtl-configs']]
        : require(path.resolve('./var/encore/ibexa.rtl.config.js'));

    run(buildDir, entrypointsFile, rtlConfigsPath);
}
