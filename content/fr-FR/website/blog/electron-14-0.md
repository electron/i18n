---
title: Electron 14.0.0
author:
  - sofianguy
  - clavin
  - ckerr
date: '2021-08-31'
---

Electron 14.0.0 est disponible ! Cette version inclue les mises à jour pour Chromium `93`, V8 `9.3`, et Node. js. Nous avons ajouté plusieurs mises à jour de l'API, des corrections de bugs et des améliorations générales. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 14.0.0 ! Vous pouvez l'installer via `npm install electron@latest` ou le télécharger depuis notre [site officiel des versions](https://electronjs.org/releases/stable). Lisez la suite pour plus de détails sur cette version et veuillez partagez vos commentaires et remarques !

## Changements notables

### Electron Release Cadence Change

Beginning in September 2021 with Electron 15, Electron will release a new major stable version every 8 weeks. You can read the [full details here](https://www.electronjs.org/blog/8-week-cadence). Electron 15 will begin beta on September 1, 2021 and stable release will be on September 21, 2021. You can find [Electron's public timeline here](https://electronjs.org/docs/tutorial/electron-timelines).

Additionally, Electron will be changing supported versions from latest three versions to latest four versions until May 2022. See [see our versioning document](https://electronjs.org/docs/tutorial/electron-versioning) for more detailed information about versioning in Electron.

### Changements de la Stack

* Chromium `93`
    * [Nouveau avec Chrome 93](https://developer.chrome.com/blog/new-in-chrome-93/)
    * [Nouveau avec Chrome 92](https://www.chromestatus.com/features#milestone%3D92)
* Node.js `14.17.0`
    * [Node 14.17.0 blog post](https://nodejs.org/en/blog/release/v14.17.0/)
* V8 `9.3`
    * [V8 9.3 blog post](https://v8.dev/blog/v8-release-93)
    * [V8 9.2 blog post](https://v8.dev/blog/v8-release-92)

### Highlight Features

* Default Changed: `nativeWindowOpen` now defaults to `true`. [(voir la documentation)](https://www.electronjs.org/docs/api/window-open.md)
* Child windows no longer inherit BrowserWindow construction options from their parents. [#28550](https://github.com/electron/electron/pull/28550)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28665](https://github.com/electron/electron/pull/28665)
* Ajout de `process.contextId` utilisé par `@electron/remote`. [#28007](https://github.com/electron/electron/pull/28007)
* Added experimental cookie encryption support behind an [Electron Fuse](https://www.electronjs.org/docs/tutorial/fuses). [#29492](https://github.com/electron/electron/pull/29492)

Voir les notes de version 14.0.0[](https://github.com/electron/electron/releases/tag/v14.0.0) pour une liste complète des nouvelles fonctionnalités et des modifications.

## Changements de rupture

Below are breaking changes introduced in Electron 14. More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/main/docs/breaking-changes.md) page.

### Supprimé : `app.allowRendererProcessReuse`

The `app.allowRendererProcessReuse` property has been removed as part of our plan to more closely align with Chromium's process model for security, performance and maintainability.

Pour des informations plus détaillées, voir [#18397](https://github.com/electron/electron/issues/18397).

### Suppression : Browser Window Affinity

The `affinity` option when constructing a new `BrowserWindow` has been removed as part of our plan to more closely align with Chromium's process model for security, performance and maintainability.

Pour des informations plus détaillées, voir [#18397](https://github.com/electron/electron/issues/18397).

### API modifiée : `window.open()`

The optional parameter `frameName` no longer sets the title of the window. This behavior now follows the specification described by the [native documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) for the `windowName` parameter.

If you were using this parameter to set the title of a window, you can instead use the [`win.setTitle(title)`](https://www.electronjs.org/docs/api/browser-window#winsettitletitle) method.

### Supprimé : `worldSafeExecuteJavaScript`

`worldSafeExecuteJavaScript` has been removed with no alternative. Please ensure your code works with this property enabled. It has been enabled by default since Electron 12.

Vous serez affecté par ce changement si vous utilisez `webFrame.executeJavaScript` ou `webFrame.executeJavaScriptInIsolatedWorld`. You will need to ensure that values returned by either of those methods are supported by the [Context Bridge API](https://www.electronjs.org/docs/api/context-bridge.md#parameter--error--return-type-support) as these methods use the same value passing semantics.

### Valeur par défaut modifié : `nativeWindowOpen`est par défaut à `true`

Prior to Electron 14, `window.open` was by default shimmed to use `BrowserWindowProxy`. This meant that `window.open('about:blank')` did not work to open synchronously scriptable child windows, among other incompatibilities. `nativeWindowOpen` is no longer experimental, and is now the default.

See the documentation for [window.open in Electron](https://www.electronjs.org/docs/api/window-open.md) for more details.

### Removed: BrowserWindowConstructorOptions inheriting from parent windows

Prior to Electron 14, windows opened with `window.open` would inherit BrowserWindow constructor options such as `transparent` and `resizable` from their parent window. Beginning with Electron 14, this behavior has been removed and windows will not inherit any BrowserWindow constructor options from their parents.

Instead, explicitly set options for the new window with `setWindowOpenHandler`:

```js
webContents.setWindowOpenHandler((details) => {
  return {
    action: 'allow',
    overrideBrowserWindowOptions: {
      // ...
    }
  }
})
```

### Supprimé : `additionalFeatures`

The deprecated `additionalFeatures` property in the `new-window` and `did-create-window` events of WebContents has been removed. Since `new-window` uses positional arguments, the argument is still present, but will always be the empty array `[]`. (Note: the `new-window` event itself is already deprecated and has been replaced by `setWindowOpenHandler`.) Bare keys in window features will now present as keys with the value `true` in the options object.

```js
// Removed in Electron 14
// Triggered by window.open('...', '', 'my-key')
webContents.on('did-create-window', (window, details) => {
  if (details.additionalFeatures.includes('my-key')) {
    // ...
  }
})

// Replace with
webContents.on('did-create-window', (window, details) => {
  if (details.options['my-key']) {
    // ...
  }
})
```

### Removed: `remote` module

Deprecated in Electron 12, the `remote` module has now been removed from Electron itself and extracted into a separate package, [`@electron/remote`](https://www.npmjs.com/package/@electron/remote). The `@electron/remote` module bridges JavaScript objects from the main process to the renderer process. This lets you access main-process-only objects as if they were available in the renderer process. This is a direct replacement for the `remote` module. See the [module's readme](https://github.com/electron/remote/blob/main/README.md) for migration instructions and reference.


## API Changes

* Added `BrowserWindow.isFocusable()` method to determine whether a window is focusable. [#28642](https://github.com/electron/electron/pull/28642)
* Ajout de la propriété d'instance `WebFrameMain.visibilityState`. [#28706](https://github.com/electron/electron/pull/28706)
* Added `disposition`, `referrer` and `postBody` to the details object passed to the window open handler registered with `setWindowOpenHandler`. [#28518](https://github.com/electron/electron/pull/28518)
* Ajout de `process.contextId` utilisé par `@electron/remote`. [#28007](https://github.com/electron/electron/pull/28007)
* Added experimental cookie encryption support behind an [Electron Fuse](https://www.electronjs.org/docs/tutorial/fuses). [#29492](https://github.com/electron/electron/pull/29492)
* Added missing `resourceType` conversions for `webRequest` listener details: `font`, `ping`, `cspReport`, `media`, `webSocket`. [#30050](https://github.com/electron/electron/pull/30050)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28665](https://github.com/electron/electron/pull/28665)
* Added support for Windows Control Overlay on macOS. [#29986](https://github.com/electron/electron/pull/29986)
* Added support for directing Chromium logging to a file with `--log-file=.../path/to/file.log`. Also, it's now possible to enable logging from JavaScript by appending command-line switches during the first JS tick. [#29963](https://github.com/electron/electron/pull/29963)
* Added support for the des-ede3 cipher in node crypto. [#27897](https://github.com/electron/electron/pull/27897)
* Added a `ContextBridgeMutability` feature that allows context bridge objects to be mutated. [#27348](https://github.com/electron/electron/pull/27348)


### Removed/Deprecated Changes

Les API suivantes ont été supprimées ou sont désormais dépréciées :

* The `remote` module has been removed after being deprecated in Electron 12. [#25734](https://github.com/electron/electron/pull/25734)
* Child windows no longer inherit BrowserWindow construction options from their parents. [#28550](https://github.com/electron/electron/pull/28550)
* Removed deprecated `additionalFeatures` property from `new-window` and `did-create-window` WebContents events. [#28548](https://github.com/electron/electron/pull/28548)
* Removed the deprecated `app.allowRendererProcessReuse` and BrowserWindow `affinity` options. [#26874](https://github.com/electron/electron/pull/26874)
* The `submitURL` option for `crashReporter.start` is no longer a required argument when `uploadToServer` is false. [#28105](https://github.com/electron/electron/pull/28105)

## Fin du support pour 11.x.y

Electron 11.x.y a atteint sa limite pour le support conformément à la politique d'assistance du projet[politique d'assistance](https://electronjs.org/docs/tutorial/support#supported-versions). Developers and applications are encouraged to upgrade to a newer version of Electron.

## What's Next

In the short term, you can expect the team to continue to focus on keeping up with the development of the major components that make up Electron, including Chromium, Node, and V8. Although we are careful not to make promises about release dates, our plan is release new major versions of Electron with new versions of those components approximately quarterly.

For information on planned breaking changes in upcoming versions of Electron, see our [Planned Breaking Changes](https://github.com/electron/electron/blob/main/docs/breaking-changes.md).
