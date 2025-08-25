# Ibexa DXP Frontend Config

## Usage
This JS package should be used only with Ibexa DXP from root directory - for proper functioning it requires specific files structure provided by Ibexa DXP.

## Webpack
### Ibexa config
Usage:
```
const Encore = require('@symfony/webpack-encore');
const getIbexaConfig = require('@ibexa/frontend-config/webpack-config');

const bundles = require('./var/encore/ibexa.config.js');
const managers = require('./var/encore/ibexa.config.manager.js');
const setups = require('./var/encore/ibexa.config.setup.js');

const ibexaConfig = getIbexaConfig(Encore, { bundles, managers, setups }, modifyEncoreConfig);
```
Optional arguments:

`modifyEncoreConfig(Encore)`: function that takes Encore object and allows modifying its config, executes just before `Encore.getWebpackConfig()`;

### Custom config
Usage:
```
const Encore = require('@symfony/webpack-encore');
const getCustomConfigs = require('@ibexa/frontend-config/webpack-config/custom');

const customConfigsPaths = require('./var/encore/ibexa.webpack.custom.config.js');

const customConfigs = getCustomConfigs(Encore, customConfigsPaths);
```

## Helpers
### getIbexaBundleFilepath
Usage:
```
const getIbexaBundleFilepath = require('@ibexa/frontend-config/helpers/get-bundle-filepath');

Encore.addEntry('bundle-entry-js', [
    getIbexaBundleFilepath('admin-ui/src/bundle/Resources/public/js/scripts/helpers/browser.helper.js'),
]);
```

## COPYRIGHT
Copyright (C) 1999-2025 Ibexa AS (formerly eZ Systems AS). All rights reserved.

## LICENSE
This source code is available separately under the following licenses:

A - Ibexa Business Use License Agreement (Ibexa BUL),
version 2.4 or later versions (as license terms may be updated from time to time)
Ibexa BUL is granted by having a valid Ibexa DXP (formerly eZ Platform Enterprise) subscription,
as described at: https://www.ibexa.co/product
For the full Ibexa BUL license text, please see:
- LICENSE-bul file placed in the root of this source code, or
- https://www.ibexa.co/software-information/licenses-and-agreements (latest version applies)

AND

B - Ibexa Trial and Test License Agreement (Ibexa TTL),
version 2.2 or later versions (as license terms may be updated from time to time)
Trial can be granted by Ibexa, reach out to Ibexa AS for evaluation access: https://www.ibexa.co/about-ibexa/contact-us
For the full Ibexa TTL license text, please see:
- LICENSE file placed in the root of this source code, or
- https://www.ibexa.co/software-information/licenses-and-agreements (latest version applies)
