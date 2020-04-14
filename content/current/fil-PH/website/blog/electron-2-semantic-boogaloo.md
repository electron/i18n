---
title: 'Electron 2.0 and Beyond - Semantic Versioning'
author: groundwater
date: '2017-12-06'
---

A new major version of Electron is in the works, and with it some changes to our versioning strategy. As of version 2.0.0, Electron will strictly adhere to Semantic Versioning.

---

This change means you'll see the major version bump more often, and it will usually be a major update to Chromium. Patch releases will also be more stable, as they will now only contain bug fixes with no new features.

**Mga karagdagan sa Major na Bersyon**

* Mga updates sa Chromium version
* Node.js major version updates
* Ang pagpapalit ng API dahil sa pagsisira ng Electron nito

**Mga karagdagan sa Minor na Bersyon**

* Node.js minor version updates
* Pagpapalit ng API ng hindi lumalabag sa Electron

**Mga karagdagan sa Patch na Bersyon**

* Node.js patch version updates
* pagsasaayos ng may kaugnayan sa chromium patches
* Ang electron ay nagsasaayos ng mga bug

Because Electron's semver ranges will now be more meaningful, we recommend installing Electron using npm's default `--save-dev` flag, which will prefix your version with `^`, keeping you safely up to date with minor and patch updates:

```sh
npm install --save-dev electron
```

For developers interested only in bug fixes, you should use the tilde semver prefix e.g. `~2.0.0`, which which will never introduce new features, only fixes to improve stability.

For more details, see [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
