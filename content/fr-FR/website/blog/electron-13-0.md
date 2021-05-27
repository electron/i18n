---
title: Electron 13.0.0
author:
  - sofianguy
  - georgexu99
  - VerteDinde
date: '2021-05-25'
---

Electron 13.0.0 est disponible ! It includes upgrades to Chromium `91` and V8 `9.1`. We've added several API updates, bug fixes, and general improvements. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 13.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `91`
    * [Nouveau avec Chrome 91](https://developer.chrome.com/blog/new-in-chrome-91/)
    * [Nouveau avec Chrome 90](https://developer.chrome.com/blog/new-in-chrome-90/)
* Node.js `14.16.0`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `9.1`
    * [V8 9.1 blog post](https://v8.dev/blog/v8-release-91)
    * [V8 9.0 blog post](https://v8.dev/blog/v8-release-90)

### Surligner les fonctionnalités

* Added `process.contextIsolated` property that indicates whether the current renderer context has `contextIsolation` enabled. [#28252](https://github.com/electron/electron/pull/28252)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28866](https://github.com/electron/electron/pull/28866)
* Deprecated the `new-window` event of `WebContents`. Il est remplacé par `webContents.setWindowOpenHandler()`
* Added `process.contextId` used by `@electron/remote`. [#28251](https://github.com/electron/electron/pull/28251)

See the [13.0.0 release notes](https://github.com/electron/electron/releases/tag/v13.0.0) for a full list of new features and changes.

## Changements de rupture

* `window.open()` parameter frameName is no longer set as window title. [#27481](https://github.com/electron/electron/pull/27481)
* Changed `session.setPermissionCheckHandler(handler)` to allow for `handler`'s first parameter, `webContents` to be `null`. [#19903](https://github.com/electron/electron/pull/19903)

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Added `roundedCorners` option for `BrowserWindow`. [#27572](https://github.com/electron/electron/pull/27572)
* Added new `session.storagePath` API to get the path on disk for session-specific data.[28866](https://github.com/electron/electron/pull/28866)
* Added support for passing DOM elements over the context bridge. [#26776](https://github.com/electron/electron/pull/26776)
* Added `process.uptime()` to sandboxed renderers. [#26684](https://github.com/electron/electron/pull/26684)
* Added missing fields to the parameters emitted as part of the `context-menu`event.[#26788](https://github.com/electron/electron/pull/26788)
* Added support for registering Manifest V3 extension service workers.
* Added ‘registration-completed’ event to ServiceWorkers. [#27562](https://github.com/electron/electron/pull/27562)

### Removed/Deprecated Changes

The following APIs have been removed or are now deprecated:

* Deprecated the `new-window` event of `WebContents`. Il est remplacé par `webContents.setWindowOpenHandler()`
* Removed deprecated `shell.moveItemToTrash()`. [#26723](https://github.com/electron/electron/pull/26723)
* Removed the following deprecated `BrowserWindow` extension APIs:

    * `BrowserWindow.addExtension(path)`
    * `BrowserWindow.addDevToolsExtension(path)`
    * `BrowserWindow.removeExtension(name)`
    * `BrowserWindow.removeDevToolsExtension(name)`
    * `BrowserWindow.getExtensions()`
    * `BrowserWindow.getDevToolsExtensions()`

    Use the `session` APIs instead:

    * `ses.loadExtension(path)`
    * `ses.removeExtension(extension_id)`
    * `ses.getAllExtensions()`

* Les méthodes suivantes de `systemPreferences` ont été dépréciées :

    * `systemPreferences.isDarkMode()`
    * `systemPreferences.isInvertedColorScheme()`
    * `systemPreferences.isHighContrastColorScheme()`

    Veuillez utiliser à la place les propriétés de `nativeTheme` suivantes :

    * `nativeTheme.shouldUseDarkColors`
    * `nativeTheme.shouldUseInvertedColorScheme`
    * `nativeTheme.shouldUseHighContrastColors`

## Fin du support pour 10.x.y

Electron 10.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. The [tentative 14.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 14.0 development life cycle. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
