# Ibexa DXP Frontend Config

## Usage
This JS package should be used only with Ibexa DXP from root directory - for proper functioning it requires specific files structure provided by Ibexa DXP.

## Webpack
### Ibexa config
Usage:
```
const Encore = require('@symfony/webpack-encore');
const getIbexaConfig = require('@ibexa/frontend-config/webpack-config');
const ibexaConfig = getIbexaConfig(Encore, [modifyEncoreConfig], [modifyOutputConfig]);
```
Optional arguments:
`modifyEncoreConfig(Encore)`: function that takes Encore object and allows modifying its config, executes just before `Encore.getWebpackConfig()`;
`modifyOutputConfig(ibexaConfig)`: function that takes raw ibexaConfig object and allows modifying its config, executes just before return;

### Custom config
Usage:
```
const customConfigs = require('@ibexa/frontend-config/webpack-config/custom');
```

## Dev
### Symlinks
If you use symlinked Ibexa bundles for development purposes, you need to adjust nodeJS and webpack environment.
Usage:
```
const enableWebpackSymlinks = require('@ibexa/frontend-config/dev/enable-symlinks');

const ibexaConfig = getIbexaConfig(Encore, null, enableWebpackSymlinks);
```
`enableWebpackSymlinks(ibexaConfig)` takes one argument - raw ibexaConfig object and adds to webpack additional resolver for modules - `node_modules` directory from root Ibexa DXP directory;
`require('@ibexa/frontend-config/dev/enable-symlinks')` adds additional resolver for modules - `node_modules` directory from root Ibexa DXP directory out of the box.
Warning - use this feature with caution only for development purposes! It modifies nodeJS default module resolution behavior on runtime which may lead to unexpected module loading if not configured carefully.

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
