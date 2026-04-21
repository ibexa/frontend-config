#!/usr/bin/env node
const path = require('path');
const ibexaCoreRtlCssPlugin = require('./src/core.rtlcss.plugin.js');

const BUILD_DIR = path.resolve('./public/assets/ibexa/build');
const ENTRYPOINTS = path.join(BUILD_DIR, 'entrypoints.json');
const RTL_CONFIGS = require(path.resolve('./var/encore/ibexa.rtl.config.js'));

ibexaCoreRtlCssPlugin(BUILD_DIR, ENTRYPOINTS, RTL_CONFIGS);
