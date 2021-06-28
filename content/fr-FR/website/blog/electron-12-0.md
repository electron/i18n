---
title: Electron 12.0.0
author:
  - VerteDinde
  - mlaurencin
  - sofianguy
date: '2021-03-02'
---

Electron 12.0.0 est disponible ! It includes upgrades to Chromium `89`, V8 `8.9` and Node.js `14.16`. We've added changes to the remote module, new defaults for contextIsolation, a new webFrameMain API, and general improvements. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 12.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `89`
    * [Nouveau avec Chrome 88](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Nouveau avec Chrome 89](https://developer.chrome.com/blog/new-in-chrome-89/)
* Node.js `14.16`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8 blog post](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 blog post](https://v8.dev/blog/v8-release-89)

### Surligner les fonctionnalités

* The ContextBridge `exposeInMainWorld` method can now expose non-object APIs. [#26834](https://github.com/electron/electron/pull/26834)
* Upgraded from Node 12 to Node 14. [#23249](https://github.com/electron/electron/pull/25249)
* Added a new `webFrameMain` API for accessing sub-frames of a `WebContents` instance from the main process. [#25464](https://github.com/electron/electron/pull/25464)
* The default values of `contextIsolation` and `worldSafeExecuteJavaScript` are now `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

See the [12.0.0 release notes](https://github.com/electron/electron/releases/tag/v12.0.0) for a full list of new features and changes.

## Changements de rupture

* Déprécié le module `remote`. It is replaced by [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
    * If you are currently using the `remote` module, we've written [a guide to migrating to `@electron/remote` here.](https://github.com/electron/remote#migrating-from-remote)
* Changed the default value of `contextIsolation` to `true`. [#27949](https://github.com/electron/electron/pull/27949)
* Changed the default value of `worldSafeExecuteJavaScript` to `true`. [#27502](https://github.com/electron/electron/pull/27502)
* Changed the default of `crashReporter.start({ compress })` from `false` to `true`. [#25288](https://github.com/electron/electron/pull/25288)
* Removed Flash support: Chromium has removed support for Flash, which was also removed in Electron 12. See [Chromium's Flash Roadmap](https://www.chromium.org/flash-roadmap) for more details.
* Required SSE3 for Chrome on x86: Chromium has removed support for [older x86 CPUs that do not meet a minimum of SSE3 (Streaming SIMD Extensions 3) support](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64). This support was also removed in Electron 12.

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Added `webFrameMain` API: The `webFrameMain` module can be used to look up frames across existing [`WebContents`](/docs/api/web-contents.md) instances. This is the main process equivalent of the existing webFrame API. More information about this new API can be found [here](https://github.com/electron/electron/pull/25464), and in our [documentation](https://www.electronjs.org/docs/api/web-frame-main).
* `app` modifications de l'API :
    * Added non-localized `serviceName` to `'child-process-gone'` / `app.getAppMetrics()`. [#25975](https://github.com/electron/electron/pull/25975)
    * Added new `app.runningUnderRosettaTranslation` property to detect when running under rosetta on Apple silicon. [#26444](https://github.com/electron/electron/pull/26444)
    * Added `exitCode` to `render-process-gone` details (app & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `BrowserWindow` Changements d'API :
    * Ajout de l'API `BrowserWindow.isTabletMode()`. [#25209](https://github.com/electron/electron/pull/25209)
    * Added `resized` (Windows/macOS) and `moved` (Windows) events to `BrowserWindow`. [#26216](https://github.com/electron/electron/pull/26216)
    * Added new `system-context-menu` event to allow preventing and overriding the system context menu. [#25795](https://github.com/electron/electron/pull/25795)
    * Added `win.setTopBrowserView()` so that `BrowserView`s can be raised. [#27713](https://github.com/electron/electron/pull/27713)
    * Added `webPreferences.preferredSizeMode` to allow sizing views according to their document's minimum size. [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` API changes:
    * Allowed ContextBridge `exposeInMainWorld` method to expose non-object APIs. [#26834](https://github.com/electron/electron/pull/26834)
* `display` API changes:
    * Added `displayFrequency` property to the `Display` object to allow getting information about the refresh rate on Windows. [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` API changes:
    * Added support for some `chrome.management` APIs. [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` API changes:
    * Ajout de la prise en charge de l'affichage du menu de partage macOS. [#25629](https://github.com/electron/electron/pull/25629)
* `net` API changes:
    * Ajout d'une nouvelle option `credentials` pour `net.request()`. [#25284](https://github.com/electron/electron/pull/25284)
    * Ajout de `net.online` pour détecter s'il existe actuellement une connexion Internet. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` API changes:
    * Ajout de `powerMonitor.onBatteryPower`. [#26494](https://github.com/electron/electron/pull/26494)
    * Added fast user switching event to powerMonitor on macOS. [#25321](https://github.com/electron/electron/pull/25321)
* `session` API change :
    * Ajout de l'option `allowFileAccess` à l'API `ses.loadExtension()`. [#27702](https://github.com/electron/electron/pull/27702)
    * Added `display-capture` API for `session.setPermissionRequestHandler`. [#27696](https://github.com/electron/electron/pull/27696)
    * Ajout d'une option `disabledCipherSuites` à `session.setSSLConfig`. [#25818](https://github.com/electron/electron/pull/25818)
    * Added `extension-loaded`, `extension-unloaded`, and `extension-ready` events to `session`. [#25385](https://github.com/electron/electron/pull/25385)
    * Added `session.setSSLConfig()` to allow configuring SSL. [#25461](https://github.com/electron/electron/pull/25461)
    * Added support for explicitly specifying `direct`, `auto_detect` or `system` modes in `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Added [Serial API](https://web.dev/serial/) support. [#25237](https://github.com/electron/electron/pull/25237)
    * Added APIs to enable/disable spell checker. [#26276](https://github.com/electron/electron/pull/26276)
* `shell` API modifie :
    * Added a new asynchronous `shell.trashItem()` API, replacing the synchronous `shell.moveItemToTrash()`. [#25114](https://github.com/electron/electron/pull/25114)
* `webContents` modifications de l'API :
    * Added a small console hint to console to help debug renderer crashes. [#25317](https://github.com/electron/electron/pull/25317)
    * Added `frame` and `webContents` properties to the details object in webRequest handlers. [#27334](https://github.com/electron/electron/pull/27334)
    * Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25580](https://github.com/electron/electron/pull/25580)
    * Added `setWindowOpenHandler` API for renderer-created child windows, and deprecate `new-window` event. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API changes:
    * Added spellcheck API to renderer. [#25060](https://github.com/electron/electron/pull/25060)

### Removed/Deprecated Changes

Les API suivantes ont été supprimées ou sont désormais dépréciées :

* Déprécié le module `remote`. It is replaced by [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
* Suppression des API `crashReporter` dépréciées. [#26709](https://github.com/electron/electron/pull/26709)
* Suppression des liens vers le site Web Electron du menu "Aide" par défaut dans les applications packagées. [#25831](https://github.com/electron/electron/pull/25831)

## End of Support for 9.x.y

Electron 9.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. The [tentative 13.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 13.0 development life cycle. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
