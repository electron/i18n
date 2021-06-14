---
title: Electron 13.0.0
author:
  - sofianguía
  - georgexu99
  - VerteDinde
date: '25-05-2021'
---

¡Electron 13.0.0 ha sido liberado! It includes upgrades to Chromium `91` and V8 `9.1`. We've added several API updates, bug fixes, and general improvements. ¡Lea a continuación para más detalles!

---

El equipo de Electron esta emocionado de anunciar el lanzamiento de Electron 13.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables

### Cambios de pila

* Chromium `91`
    * [Nuevo en Chrome 91](https://developer.chrome.com/blog/new-in-chrome-91/)
    * [Nuevo en Chrome 90](https://developer.chrome.com/blog/new-in-chrome-90/)
* Node.js `14.16.0`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `9.1`
    * [V8 9.1 blog post](https://v8.dev/blog/v8-release-91)
    * [V8 9.0 blog post](https://v8.dev/blog/v8-release-90)

### Destacar características

* Added `process.contextIsolated` property that indicates whether the current renderer context has `contextIsolation` enabled. [#28252](https://github.com/electron/electron/pull/28252)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28866](https://github.com/electron/electron/pull/28866)
* Deprecated the `new-window` event of `WebContents`. Es reemplazado por `webContents.setWindowOpenHandler()`
* Added `process.contextId` used by `@electron/remote`. [#28251](https://github.com/electron/electron/pull/28251)

Vea la [notas de lanzamiento 13.0.0](https://github.com/electron/electron/releases/tag/v13.0.0) para la lista completa de nuevas características y cambios.

## Restaurar archivos borrados

* `window.open()` parameter frameName is no longer set as window title. [#27481](https://github.com/electron/electron/pull/27481)
* Changed `session.setPermissionCheckHandler(handler)` to allow for `handler`'s first parameter, `webContents` to be `null`. [#19903](https://github.com/electron/electron/pull/19903)

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API

* Added `roundedCorners` option for `BrowserWindow`. [#27572](https://github.com/electron/electron/pull/27572)
* Added new `session.storagePath` API to get the path on disk for session-specific data.[28866](https://github.com/electron/electron/pull/28866)
* Added support for passing DOM elements over the context bridge. [#26776](https://github.com/electron/electron/pull/26776)
* Added `process.uptime()` to sandboxed renderers. [#26684](https://github.com/electron/electron/pull/26684)
* Added missing fields to the parameters emitted as part of the `context-menu`event.[#26788](https://github.com/electron/electron/pull/26788)
* Added support for registering Manifest V3 extension service workers.
* Added ‘registration-completed’ event to ServiceWorkers. [#27562](https://github.com/electron/electron/pull/27562)

### Cambios Eliminado/Obsoletos

Las siguientes APIs han sido eliminadas o ahora están obsoletas:

* Deprecated the `new-window` event of `WebContents`. Es reemplazado por `webContents.setWindowOpenHandler()`
* Eliminado obsoleto `shell.moveItemToTrash()`. [#26723](https://github.com/electron/electron/pull/26723)
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

* Los métodos siguientes de `systemPreferences` han quedado obsoletos:

    * `systemPreferences.isDarkMode()`
    * `systemPreferences.isInvertedColorScheme()`
    * `systemPreferences.isHighContrastColorScheme()`

    En su lugar, usa las siguientes propiedades `nativeTheme`:

    * `nativeTheme.shouldUseDarkColors`
    * `nativeTheme.shouldUseInvertedColorScheme`
    * `nativeTheme.shouldUseHighContrastColors`

## Fin de soporte para 10.x.y

Electron 10.x.y ha alcanzado el fin de soporte según la [política de soporte ](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [calendario tentativo 14.0.0](https://electronjs.org/docs/tutorial/electron-timelines) traza fechas claves en el ciclo de vida del desarrollo de Electron 14.0. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
