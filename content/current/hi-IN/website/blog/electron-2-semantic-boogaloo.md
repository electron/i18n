---
title: 'Electron 2.0 and Beyond - Semantic Versioning'
author: groundwater
date: '2017-12-06'
---

A new major version of Electron is in the works, and with it some changes to our versioning strategy. As of version 2.0.0, Electron will strictly adhere to Semantic Versioning.

---

This change means you'll see the major version bump more often, and it will usually be a major update to Chromium. Patch releases will also be more stable, as they will now only contain bug fixes with no new features.

**मुख्य संस्करण वृद्धि**

* क्रोमियम संस्करण अपडेटस
* Node.js major version updates
* इलेक्ट्रॉन ब्रेकिंग ऐपीआई परिवर्तन

**लघु संस्करण वृद्धि**

* Node.js minor version updates
* इलेक्ट्रॉन नॉन-ब्रेकिंग ऐपीआई परिवर्तन

**पैच संस्करण वृद्धि**

* Node.js patch version updates
* त्रुटी-सुधार क्रोमियम पैच
* इलेक्ट्रॉन बग-फिक्सेस

Because Electron's semver ranges will now be more meaningful, we recommend installing Electron using npm's default `--save-dev` flag, which will prefix your version with `^`, keeping you safely up to date with minor and patch updates:

```sh
npm install --save-dev electron
```

For developers interested only in bug fixes, you should use the tilde semver prefix e.g. `~2.0.0`, which which will never introduce new features, only fixes to improve stability.

For more details, see [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
