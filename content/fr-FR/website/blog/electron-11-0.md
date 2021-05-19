---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 est disponible ! It includes upgrades to Chromium `87`, V8 `8.7`, and Node.js `12.18.3`. We've added support for Apple silicon, and general improvements. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 11.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). The release is packed with upgrades, fixes, and new support for Apple's M1 hardware.

Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `87.0.4280.47`
    * [Nouveau avec Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [Nouveau avec Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Node 12.18.3 blog post](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 blog post](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 blog post](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 blog post](https://v8.dev/blog/v8-release-87)

### Surligner les fonctionnalités

* Support for Apple M1: On November 10, Apple announced their [new M1 chips, which will be included in their upcoming hardware](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). Beginning in Electron 11, Electron will be shipping separate versions of Electron for Intel Macs (x64) and Apple's upcoming M1 hardware (arm64). You can learn more about how to get your Electron app [running on Apple's M1 hardware here.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Added V8 crash message and location information to crashReport parameters. [#24771](https://github.com/electron/electron/pull/24771)
* Improved the performance of sending wide objects over the context bridge. [#24671](https://github.com/electron/electron/pull/24671)

See the [11.0.0 release notes](https://github.com/electron/electron/releases/tag/v11.0.0) for a full list of new features and changes.

## Changements de rupture

* Removed experimental APIs: `BrowserView.{fromId, fromWebContents, getAllViews}` and the `id` property of `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Added `app.getApplicationInfoForProtocol()` API that returns detailed information about the app that handles a certain protocol. [#24112](https://github.com/electron/electron/pull/24112)
* Added `app.createThumbnailFromPath()` API that returns a preview image of a file given its file path and a maximum thumbnail size. [#24802](https://github.com/electron/electron/pull/24802)
* Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25756](https://github.com/electron/electron/pull/25756)

## Fin du support pour 8.x.y

Electron 8.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Although we are careful not to make promises about release dates, our plan is to release new major versions of Electron with new versions of those components approximately quarterly. The [tentative 12.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 12.0 development life cycle. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Continued Work for Deprecation of `remote` Module
We started work to remove the `remote` module in [Electron 9](https://www.electronjs.org/blog/electron-9-0). We plan to remove the `remote` module itself in Electron 14.

Read and follow [this issue](https://github.com/electron/electron/issues/21408) for full plans and details for deprecation.

### Étape finale pour exiger que les Modules Natifs de Node soient Context Aware ou N-API (dans Electron 12)
À partir d'Electron 6, nous avons préparé le terrain pour que [les modules Node natifs](https://nodejs.org/api/addons.html) chargés dans le processus de rendu, soient soit [N-API](https://nodejs.org/api/n-api.html) ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). L'imposition de ce changement apporte une sécurité accrue, des performances plus rapides et une charge de travail de maintenance réduite. La dernière étape de ce plan est de supprimer la possibilité de désactiver la réutilisation du processus de rendu dans Electron 12.

Read and follow [this issue](https://github.com/electron/electron/issues/18397) for full details, including the proposed timeline.
