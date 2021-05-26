---
title: Electron 13.0.0
author:
  - sofianguy
  - georgexu99
  - VerteDinde
date: '2021-05-25'
---

Electron 13.0.0 がリリースされました! It includes upgrades to Chromium `91` and V8 `9.1`. We've added several API updates, bug fixes, and general improvements. 詳細は以下をご覧ください!

---

Electron チームは、Electron 13.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `91`
    * [Chrome 91 の新機能](https://developer.chrome.com/blog/new-in-chrome-91/)
    * [Chrome 90 の新機能](https://developer.chrome.com/blog/new-in-chrome-90/)
* Node.js `14.16.0`
    * [Node 14.16.0 ブログ記事](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 ブログ記事](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `9.1`
    * [V8 9.1 ブログ記事](https://v8.dev/blog/v8-release-91)
    * [V8 9.0 ブログ記事](https://v8.dev/blog/v8-release-90)

### 注目の機能

* Added `process.contextIsolated` property that indicates whether the current renderer context has `contextIsolation` enabled. [#28252](https://github.com/electron/electron/pull/28252)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28866](https://github.com/electron/electron/pull/28866)
* Deprecated the `new-window` event of `WebContents`. It is replaced by `webContents.setWindowOpenHandler()`
* Added `process.contextId` used by `@electron/remote`. [#28251](https://github.com/electron/electron/pull/28251)

新機能と変更の完全なリストは、[13.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v13.0.0) を参照してください。

## 破壊的変更

* `window.open()` parameter frameName is no longer set as window title. [#27481](https://github.com/electron/electron/pull/27481)
* Changed `session.setPermissionCheckHandler(handler)` to allow for `handler`'s first parameter, `webContents` to be `null`. [#19903](https://github.com/electron/electron/pull/19903)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* Added `roundedCorners` option for `BrowserWindow`. [#27572](https://github.com/electron/electron/pull/27572)
* Added new `session.storagePath` API to get the path on disk for session-specific data.[28866](https://github.com/electron/electron/pull/28866)
* Added support for passing DOM elements over the context bridge. [#26776](https://github.com/electron/electron/pull/26776)
* Added `process.uptime()` to sandboxed renderers. [#26684](https://github.com/electron/electron/pull/26684)
* Added missing fields to the parameters emitted as part of the `context-menu`event.[#26788](https://github.com/electron/electron/pull/26788)
* Added support for registering Manifest V3 extension service workers.
* Added ‘registration-completed’ event to ServiceWorkers. [#27562](https://github.com/electron/electron/pull/27562)

### 削除/非推奨となった変更

以下の API は削除されたか非推奨になりました。

* Deprecated the `new-window` event of `WebContents`. It is replaced by `webContents.setWindowOpenHandler()`
* 非推奨だった `shell.moveItemToTrash()` を削除しました. [#26723](https://github.com/electron/electron/pull/26723)
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

* 以下の `systemPreferences` のメソッドは非推奨になりました。

    * `systemPreferences.isDarkMode()`
    * `systemPreferences.isInvertedColorScheme()`
    * `systemPreferences.isHighContrastColorScheme()`

    代わりに、次の `nativeTheme` プロパティを使用します。

    * `nativeTheme.shouldUseDarkColors`
    * `nativeTheme.shouldUseInvertedColorScheme`
    * `nativeTheme.shouldUseHighContrastColors`

## 10.x.y サポート終了

Electron 10.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 14.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 14.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。
