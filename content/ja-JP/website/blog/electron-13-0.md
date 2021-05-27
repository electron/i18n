---
title: Electron 13.0.0
author:
  - sofianguy
  - georgexu99
  - VerteDinde
date: '2021-05-25'
---

Electron 13.0.0 がリリースされました! これには Chromium `91` とV8 `9.1` へのアップグレードが含まれています。 いくつかの API の更新、バグ修正、及び一般的な改善を行いました。 詳細は以下をご覧ください!

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

* `process.contextIsolated` プロパティを追加しました。これは現在のレンダラーコンテキストで `contextIsolation` が有効かどうかを示します。 [#28252](https://github.com/electron/electron/pull/28252)
* セッション固有のデータに対するディスク上のパスを取得するために新しく `session.storagePath` API を追加しました。 [#28866](https://github.com/electron/electron/pull/28866)
* `WebContents` の `new-window` イベントを非推奨にしました。 これは `webContents.setWindowOpenHandler()` に置き換えられます。
* `@electron/remote` で使用されている `process.contextId` を追加しました。 [#28251](https://github.com/electron/electron/pull/28251)

新機能と変更の完全なリストは、[13.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v13.0.0) を参照してください。

## 破壊的変更

* `window.open()` の引数 frameName はウインドウタイトルとして設定されなくなりました。 [#27481](https://github.com/electron/electron/pull/27481)
* `session.setPermissionCheckHandler(handler)` で、`handler` の第一引数である `webContents` が `null` になることがあるように変更しました。 [#19903](https://github.com/electron/electron/pull/19903)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* `BrowserWindow` に `roundedCorners` オプションを追加しました。 [#27572](https://github.com/electron/electron/pull/27572)
* セッション固有のデータに対するディスク上のパスを取得するために新しく `session.storagePath` API を追加しました。[28866](https://github.com/electron/electron/pull/28866)
* コンテキストブリッジで DOM 要素を渡す機能を追加しました。 [#26776](https://github.com/electron/electron/pull/26776)
* サンドボックス化したレンダラーに `process.uptime()` を追加しました。 [#26684](https://github.com/electron/electron/pull/26684)
* `context-menu` イベントの一部として発生する引数に不足していたフィールドを追加しました。[#26788](https://github.com/electron/electron/pull/26788)
* Manifest V3 拡張機能のサービスワーカーの登録に対応しました。
* ServiceWorker に 'registration-completed' イベントを追加しました。 [#27562](https://github.com/electron/electron/pull/27562)

### 削除/非推奨となった変更

以下の API は削除されたか非推奨になりました。

* `WebContents` の `new-window` イベントを非推奨にしました。 これは `webContents.setWindowOpenHandler()` に置き換えられます。
* 非推奨だった `shell.moveItemToTrash()` を削除しました. [#26723](https://github.com/electron/electron/pull/26723)
* 非推奨となっていた以下の `BrowserWindow` 拡張機能 API を削除しました。

    * `BrowserWindow.addExtension(path)`
    * `BrowserWindow.addDevToolsExtension(path)`
    * `BrowserWindow.removeExtension(name)`
    * `BrowserWindow.removeDevToolsExtension(name)`
    * `BrowserWindow.getExtensions()`
    * `BrowserWindow.getDevToolsExtensions()`

    代わりに以下の `session` API を使用してください。

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
