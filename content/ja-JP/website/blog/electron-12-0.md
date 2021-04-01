---
title: Electron 12.0.0
author:
  - VerteDinde
  - mlaurencin
  - sofianguy
date: '2021-03-02'
---

Electron 12.0.0 がリリースされました! これには Chromium `89`、V8 `8.9`、Node.js `14.16` へのアップグレードが含まれています。 remote モジュールの変更、contextIsolation の新しい既定値、新しい webFrameMain API の追加、一般的な改善を行いました。 詳細は以下をご覧ください!

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

* ContextBridge の `exposeInMainWorld` メソッドが、非オブジェクトの API を公開できるようになりました。 [#26834](https://github.com/electron/electron/pull/26834)
* Node 12 から Node 14 へアップグレードしました。 [#23249](https://github.com/electron/electron/pull/25249)
* メインプロセスから `WebContents` インスタンスのサブフレームにアクセスするため、新しく `webFrameMain` API を追加しました。 [#25464](https://github.com/electron/electron/pull/25464)
* `contextIsolation` と `worldSafeExecuteJavaScript` の既定値が `true` になりました。 [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

新機能と変更の完全なリストは、[12.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v12.0.0) を参照してください。

## 破壊的変更

* `remote` モジュールを非推奨にしました。 これは [`@electron/remote`](https://github.com/electron/remote) に置き換えられます。 [#25293](https://github.com/electron/electron/pull/25293)
    * 現在 `remote` モジュールを使用している方のために、[こちらの `@electron/remote` への移行ガイド](https://github.com/electron/remote#migrating-from-remote) を作成しました。
* `contextIsolation` の既定値を `true` に変更しました。 [#27949](https://github.com/electron/electron/pull/27949)
* `worldSafeExecuteJavaScript` の既定値を `true` に変更しました。 [#27502](https://github.com/electron/electron/pull/27502)
* `crashReporter.start({ compress })` の既定値を `false` から `true` に変更しました。 [#25288](https://github.com/electron/electron/pull/25288)
* Flash サポートの削除: Chromium が Flash サポートを削除したため、Electron 12 でも削除されました。 詳細については [Chromium の Flash ロードマップ](https://www.chromium.org/flash-roadmap) を参照してください。
* x86 上の Chrome で SSE3 が必須に: Chromium は [SSE3 (Streaming SIMD Extensions 3) の最小サポートを満たさない古い x86 CPU のサポートを削除しました](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64)。 このサポートが Electron 12 でも削除されました。

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* `webFrameMain` API の追加: `webFrameMain` モジュールは、既存の [`WebContents`](/docs/api/web-contents.md) インスタンス間を横断したフレーム探索に利用できます。 これはメインプロセスにおける既存の webFrame API と等価なものです。 この新しい API の詳細については、[こちら](https://github.com/electron/electron/pull/25464) か [ドキュメント](https://www.electronjs.org/docs/api/web-frame-main) を参照してください。
* `app` API の変更:
    * ローカライズされない `serviceName` を `'child-process-gone'` / `app.getAppMetrics()` に追加しました。 [#25975](https://github.com/electron/electron/pull/25975)
    * Apple シリコン上の Rosetta で動作していることを検出する `app.runningUnderRosettaTranslation` プロパティを新たに追加しました。 [#26444](https://github.com/electron/electron/pull/26444)
    * `render-process-gone` の詳細に `exitCode` を追加しました (app と webContents)。 [#27677](https://github.com/electron/electron/pull/27677)
* `BrowserWindow` API の変更:
    * `BrowserWindow.isTabletMode()` API を追加しました。 [#25209](https://github.com/electron/electron/pull/25209)
    * `resized` (Windows/macOS) と `moved` (Windows) イベントを `BrowserWindow` に追加しました。 [#26216](https://github.com/electron/electron/pull/26216)
    * システムコンテキストメニューの抑制とオーバーライドができる `system-context-menu` イベントを追加しました。 [#25795](https://github.com/electron/electron/pull/25795)
    * `BrowserView` を手前に移動できる `win.setTopBrowserView()` を追加しました。 [#27713](https://github.com/electron/electron/pull/27713)
    * `webPreferences.preferredSizeMode` を追加しました。これにより document の最小サイズに応じてビューのサイズを変更できます。 [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` API の変更:
    * ContextBridge の `exposeInMainWorld` メソッドが、非オブジェクトの API を公開できるようにしました。 [#26834](https://github.com/electron/electron/pull/26834)
* `display` API の変更:
    * `Display` オブジェクトに `displayFrequency` プロパティを追加し、Windows でのリフレッシュレートに関する情報を取得できるようにしました。 [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` API の変更:
    * いくつかの `chrome.management` API のサポートを追加しました。 [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` API の変更:
    * macOS 共有メニュー表示のサポートを追加しました。 [#25629](https://github.com/electron/electron/pull/25629)
* `net` API の変更:
    * `net.request()` に新しく `credentials` オプションを追加しました。 [#25284](https://github.com/electron/electron/pull/25284)
    * 現在インターネットに接続しているかどうかを検出する `net.online` を追加しました。 [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` API の変更:
    * `powerMonitor.onBatteryPower` を追加しました。 [#26494](https://github.com/electron/electron/pull/26494)
    * macOS 上での powerMonitor に高速なユーザー切り替えイベントを追加しました。 [#25321](https://github.com/electron/electron/pull/25321)
* `session` API の変更:
    * `ses.loadExtension()` API に `allowFileAccess` オプションを追加しました。 [#27702](https://github.com/electron/electron/pull/27702)
    * `session.setPermissionRequestHandler` のために `display-capture` API を追加しました。 [#27696](https://github.com/electron/electron/pull/27696)
    * `session.setSSLConfig` に `disabledCipherSuites` オプションを追加しました。 [#25818](https://github.com/electron/electron/pull/25818)
    * `extension-loaded`、`extension-unloaded`、`extension-ready` イベントを `session` に追加しました。 [#25385](https://github.com/electron/electron/pull/25385)
    * SSL の構成ができるように `session.setSSLConfig()` を追加しました。 [#25461](https://github.com/electron/electron/pull/25461)
    * `session.setProxy()` のモードへ `direct`、`auto_detect`、`system` のいずれかを明示的に指定するサポートを追加しました。 [#24937](https://github.com/electron/electron/pull/24937)
    * [Serial API](https://web.dev/serial/) サポートを追加しました。 [#25237](https://github.com/electron/electron/pull/25237)
    * スペルチェッカーを有効/無効にする API を追加しました。 [#26276](https://github.com/electron/electron/pull/26276)
* `シェル` API の変更:
    * 同期 API の `shell.moveItemToTrash()` に代わり、新しく非同期の`shell.trashItem()` API を追加しました。 [#25114](https://github.com/electron/electron/pull/25114)
* `webContents` API の変更:
    * レンダラーのクラッシュのデバッグに役立つよう、コンソールに小さなコンソールヒントを追加しました。 [#25317](https://github.com/electron/electron/pull/25317)
    * webRequest ハンドラーの details オブジェクトに `frame` と `webContents` のプロパティを追加しました。 [#27334](https://github.com/electron/electron/pull/27334)
    * ハングしたレンダラーの回復を支援するため、レンダラープロセスを強制的に終了させる `webContents.forcefullyCrashRenderer()` を追加しました。 [#25580](https://github.com/electron/electron/pull/25580)
    * レンダラーが作成した子ウィンドウ用の `setWindowOpenHandler` API を追加し、`new-window` イベントを非推奨にしました。 [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API の変更:
    * レンダラーにスペルチェックの API を追加しました。 [#25060](https://github.com/electron/electron/pull/25060)

### 削除/非推奨となった変更

以下の API は削除されたか非推奨になりました。

* `remote` モジュールを非推奨にしました。 これは [`@electron/remote`](https://github.com/electron/remote) に置き換えられます。 [#25293](https://github.com/electron/electron/pull/25293)
* 非推奨だった `crashReporter` API を削除しました。 [#26709](https://github.com/electron/electron/pull/26709)
* パッケージアプリのデフォルトの 'ヘルプ' メニューにある Electron ウェブサイトへのリンクを削除しました。 [#25831](https://github.com/electron/electron/pull/25831)

## 9.x.y サポート終了

Electron 9.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 13.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 13.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。
