---
title: Electron 13.0.0
author:
  - sofiangria
  - georgexu99
  - VerteDinde
date: '2021-05-25'
---

Electron 13.0.0 has been released! It includes upgrades to Chromium `91` and V8 `9.1`. We've added several API updates, bug fixes, and general improvements. Leia abaixo para mais detalhes!

---

The Electron team is excited to announce the release of Electron 13.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis

### Alterações de Pilha

* Chromium `91`
    * [New in Chrome 91](https://developer.chrome.com/blog/new-in-chrome-91/)
    * [New in Chrome 90](https://developer.chrome.com/blog/new-in-chrome-90/)
* Node.js `14.16.0`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `9.1`
    * [V8 9.1 blog post](https://v8.dev/blog/v8-release-91)
    * [V8 9.0 blog post](https://v8.dev/blog/v8-release-90)

### Destacar recursos

* Added `process.contextIsolated` property that indicates whether the current renderer context has `contextIsolation` enabled. [#28252](https://github.com/electron/electron/pull/28252)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28866](https://github.com/electron/electron/pull/28866)
* Deprecated the `new-window` event of `WebContents`. It is replaced by `webContents.setWindowOpenHandler()`
* Added `process.contextId` used by `@electron/remote`. [#28251](https://github.com/electron/electron/pull/28251)

See the [13.0.0 release notes](https://github.com/electron/electron/releases/tag/v13.0.0) for a full list of new features and changes.

## Breaking Changes

* `window.open()` parameter frameName is no longer set as window title. [#27481](https://github.com/electron/electron/pull/27481)
* Changed `session.setPermissionCheckHandler(handler)` to allow for `handler`'s first parameter, `webContents` to be `null`. [#19903](https://github.com/electron/electron/pull/19903)

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## Alterações de API

* Added `roundedCorners` option for `BrowserWindow`. [#27572](https://github.com/electron/electron/pull/27572)
* Added new `session.storagePath` API to get the path on disk for session-specific data.[28866](https://github.com/electron/electron/pull/28866)
* Added support for passing DOM elements over the context bridge. [#26776](https://github.com/electron/electron/pull/26776)
* Added `process.uptime()` to sandboxed renderers. [#26684](https://github.com/electron/electron/pull/26684)
* Added missing fields to the parameters emitted as part of the `context-menu`event.[#26788](https://github.com/electron/electron/pull/26788)
* Added support for registering Manifest V3 extension service workers.
* Added ‘registration-completed’ event to ServiceWorkers. [#27562](https://github.com/electron/electron/pull/27562)

### Removed/Deprecated Changes

The following APIs have been removed or are now deprecated:

* Deprecated the `new-window` event of `WebContents`. It is replaced by `webContents.setWindowOpenHandler()`
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

* The following `systemPreferences` methods have been deprecated:

    * `systemPreferences.isDarkMode()`
    * `systemPreferences.isInvertedColorScheme()`
    * `systemPreferences.isHighContrastColorScheme()`

    Use the following `nativeTheme` properties instead:

    * `nativeTheme.shouldUseDarkColors`
    * `nativeTheme.shouldUseInvertedColorScheme`
    * `nativeTheme.shouldUseHighContrastColors`

## End of Support for 10.x.y

Electron 10.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. The [tentative 14.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 14.0 development life cycle. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
