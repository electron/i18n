---
title: Electron 12.0.0
author:
  - VerteDinde
  - mlaurencin
  - sofianguy
date: '2021-03-02'
---

Electron 12.0.0 がリリースされました! It includes upgrades to Chromium `89`, V8 `8.9` and Node.js `14.16`. We've added changes to the remote module, new defaults for contextIsolation, a new webFrameMain API, and general improvements. 詳細は以下をご覧ください!

---

Electron チームは、Electron 12.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `89`
    * [Chrome 88 の新機能](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Chrome 89 の新機能](https://developer.chrome.com/blog/new-in-chrome-89/)
* Node.js `14.16`
    * [Node 14.16.0 ブログ記事](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 ブログ記事](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8 ブログ記事](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 ブログ記事](https://v8.dev/blog/v8-release-89)

### 注目の機能

* The ContextBridge `exposeInMainWorld` method can now expose non-object APIs. [#26834](https://github.com/electron/electron/pull/26834)
* Upgraded from Node 12 to Node 14. [#23249](https://github.com/electron/electron/pull/25249)
* Added a new `webFrameMain` API for accessing sub-frames of a `WebContents` instance from the main process. [#25464](https://github.com/electron/electron/pull/25464)
* The default values of `contextIsolation` and `worldSafeExecuteJavaScript` are now `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

新機能と変更の完全なリストは、[12.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v12.0.0) を参照してください。

## 破壊的変更

* Deprecated the `remote` module. It is replaced by [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
    * If you are currently using the `remote` module, we've written [a guide to migrating to `@electron/remote` here.](https://github.com/electron/remote#migrating-from-remote)
* Changed the default value of `contextIsolation` to `true`. [#27949](https://github.com/electron/electron/pull/27949)
* Changed the default value of `worldSafeExecuteJavaScript` to `true`. [#27502](https://github.com/electron/electron/pull/27502)
* Changed the default of `crashReporter.start({ compress })` from `false` to `true`. [#25288](https://github.com/electron/electron/pull/25288)
* Removed Flash support: Chromium has removed support for Flash, which was also removed in Electron 12. See [Chromium's Flash Roadmap](https://www.chromium.org/flash-roadmap) for more details.
* Required SSE3 for Chrome on x86: Chromium has removed support for [older x86 CPUs that do not meet a minimum of SSE3 (Supplemental Streaming SIMD Extensions 3) support](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64). This support was also removed in Electron 12.

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* Added `webFrameMain` API: The `webFrameMain` module can be used to look up frames across existing [`WebContents`](web-contents.md) instances. This is the main process equivalent of the existing webFrame API. More information about this new API can be found [here](https://github.com/electron/electron/pull/25464), and in our [documentation](https://www.electronjs.org/docs/api/web-frame-main).
* `app` API の変更:
    * Added non-localized `serviceName` to `'child-process-gone'` / `app.getAppMetrics()`. [#25975](https://github.com/electron/electron/pull/25975)
    * Added new `app.runningUnderRosettaTranslation` property to detect when running under rosetta on Apple silicon. [#26444](https://github.com/electron/electron/pull/26444)
    * Added `exitCode` to `render-process-gone` details (app & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `BrowserWindow` API の変更:
    * Added `BrowserWindow.isTabletMode()` API. [#25209](https://github.com/electron/electron/pull/25209)
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
    * Added support for showing macOS share menu. [#25629](https://github.com/electron/electron/pull/25629)
* `net` API changes:
    * Added a new `credentials` option for `net.request()`. [#25284](https://github.com/electron/electron/pull/25284)
    * Added `net.online` for detecting whether there is currently internet connection. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` API changes:
    * Added `powerMonitor.onBatteryPower`. [#26494](https://github.com/electron/electron/pull/26494)
    * Added fast user switching event to powerMonitor on macOS. [#25321](https://github.com/electron/electron/pull/25321)
* `session` API の変更:
    * Added `allowFileAccess` option to `ses.loadExtension()` API. [#27702](https://github.com/electron/electron/pull/27702)
    * Added `display-capture` API for `session.setPermissionRequestHandler`. [#27696](https://github.com/electron/electron/pull/27696)
    * Added a `disabledCipherSuites` option to `session.setSSLConfig`. [#25818](https://github.com/electron/electron/pull/25818)
    * Added `extension-loaded`, `extension-unloaded`, and `extension-ready` events to `session`. [#25385](https://github.com/electron/electron/pull/25385)
    * Added `session.setSSLConfig()` to allow configuring SSL. [#25461](https://github.com/electron/electron/pull/25461)
    * Added support for explicitly specifying `direct`, `auto_detect` or `system` modes in `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Added [Serial API](https://web.dev/serial/) support. [#25237](https://github.com/electron/electron/pull/25237)
    * Added APIs to enable/disable spell checker. [#26276](https://github.com/electron/electron/pull/26276)
* `シェル` API の変更:
    * Added a new asynchronous `shell.trashItem()` API, replacing the synchronous `shell.moveItemToTrash()`. [#25114](https://github.com/electron/electron/pull/25114)
* `webContents` API の変更:
    * Added a small console hint to console to help debug renderer crashes. [#25317](https://github.com/electron/electron/pull/25317)
    * Added `frame` and `webContents` properties to the details object in webRequest handlers. [#27334](https://github.com/electron/electron/pull/27334)
    * ハングしたレンダラーの回復を支援するため、レンダラープロセスを強制的に終了させる `webContents.forcefullyCrashRenderer()` を追加しました。 [#25580](https://github.com/electron/electron/pull/25580)
    * Added `setWindowOpenHandler` API for renderer-created child windows, and deprecate `new-window` event. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API changes:
    * Added spellcheck API to renderer. [#25060](https://github.com/electron/electron/pull/25060)

### Removed/Deprecated Changes

The following APIs have been removed or are now deprecated:

* Deprecated the `remote` module. It is replaced by [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
* Removed deprecated `crashReporter` APIs. [#26709](https://github.com/electron/electron/pull/26709)
* Removed links to the Electron website from the default 'Help' menu in packaged apps. [#25831](https://github.com/electron/electron/pull/25831)

## 9.x.y サポート終了

Electron 9.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 13.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 13.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。
