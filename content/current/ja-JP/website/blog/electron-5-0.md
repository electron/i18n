---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Electron チームは、Electron 5.0.0 のリリース発表にワクワクしています! npm を使って `npm install electron@latest` でインストールするか、[リリースページ](https://github.com/electron/electron/releases/tag/v5.0.0) から tarball をダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

---

## 何が新しくなったの?

Electron の機能の多くは、Chromium、Node.js、V8 といったコアコンポーネントによって提供されています。 Electron では、これらのプロジェクトが最新のものになるように維持し、JavaScript の新機能、パフォーマンスの向上、セキュリティ修正をユーザーに提供しています。 これらの各パッケージについて、Electron 5 ではメジャーバージョンを更新しています。

- Chromium `73.0.3683.119`
  - [70 の新機能](https://developers.google.com/web/updates/2018/10/nic70)
  - [71 の新機能](https://developers.google.com/web/updates/2018/12/nic71)
  - [72 の新機能](https://developers.google.com/web/updates/2019/01/nic72)
  - [73 の新機能](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Node 12 ブログ記事](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [新しい JS の機能](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 には、Electron 固有の API の改善も含まれます。 主な変更点の概要は以下の通りです。変更点の全リストは [Electron v5.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v5.0.0) を参照してください。

### Promise 化

Electron 5 でも [Promise 化イニシアチブ](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) の取り組みを継続しており、Electron のコールバックベース API を Promise を使用したものへと変換しています。 これらの API が Electron 5 で変換されています。
* `app.getFileIcon`
* `contentTracing.getCategories`
* `contentTracing.startRecording`
* `contentTracing.stopRecording`
* `debugger.sendCommand`
* Cookie API
* `shell.openExternal`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### macOS 向けシステムカラーアクセス

macOS システムカラーにアクセスするために、これらの関数が `systemPreferences` に変更または追加されました。
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystemColor`

### プロセスメモリ情報

現在のプロセスに関するメモリ使用量の統計情報を取得する関数 `process.getProcessMemoryInfo` が追加されました。

### remote API の更なるフィルタリング

`remote` API のセキュリティを向上させるため、`remote.getBuiltin`、`remote.getCurrentWindow`、`remote.getCurrentWebContents`、`<webview>.getWebContents` を [フィルタリング](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows) できる、新しい remote のイベントが追加されました。

### BrowserWindow で複数の BrowserView

BrowserWindow が一つの BrowserWindow 内で複数の BrowserViewを管理できるようになりました。

## 破壊的変更

### パッケージしたアプリのデフォルト

パッケージしたアプリは、デフォルトのアプリと同じように動作するようになりました。デフォルトのアプリケーションメニューがそのアプリになければ作成され、アプリが `window-all-closed` イベントを処理しなければ、そのイベントは自動的に処理されます。

### 混合サンドボックス

混合サンドボックスモードはデフォルトで有効になりました。 これまでは混合サンドボックスモードも有効になっている場合にのみサンドボックス化されていました。これで、`sandbox: true` で起動したレンダラーが実際にサンドボックス化されるようになりました。

### セキュリティの改善
セキュリティ向上のため、`nodeIntegration` と `webviewTag` の省略値が `false` になりました。

### スペルチェッカーが非同期に

SpellCheck API が変更され、[非同期の実行結果](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider) を提供するようになりました。

## 非推奨

以下の API は Electron 5.0.0 で新たに非推奨となり、6.0.0 で削除される予定のものです。

### arm と arm64 向けの mksnapshot バイナリ
arm と arm64 向けの mksnapshot のネイティブバイナリは非推奨となり、6.0.0 で削除されます。 arm と arm64 向けの snapshots は x64 バイナリで作成できます。

### WebContents での ServiceWorker API
WebContents 上での ServiceWorker API は後に削除するために非推奨となります。
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### サンドボックス化 WebContents での自動モジュール
セキュリティ向上のため、以下のモジュールの `require` を介した直接使用は非推奨になります。代わりにサンドボックス化された WebContents 内で `remote.require` を使用してください。
* `electron.screen`
* `child_process`
* `fs`
* `os`
* `path`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`、 `webFrame.setIsolatedWorldHumanReadableName`、`webFrame.setIsolatedWorldSecurityOrigin` は `webFrame.setIsolatedWorldInfo` と入れ替わりで非推奨になりました。

### 混合サンドボックス
`enableMixedSandbox` と `--enable-mixed-sandbox` コマンドラインスイッチは互換性のためにまだ残りますが、非推奨となり効果も無くなります。

## 2.0.x サポートの終了

[サポートするバージョンのポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に基づき、2.0.x は役目を終えました。

## App のフィードバックプログラム

テストには引き続き [アプリフィードバックプログラム](https://electronjs.org/blog/app-feedback-program) を使用します。 このプログラムに参加するプロジェクトは、そのアプリで Electron ベータ版をテストします。見返りとして、発見した新しいバグは安定版リリースのために優先します。 参加や詳細については、[当プログラムに関するブログ記事を確認してください](https://electronjs.org/blog/app-feedback-program)。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 6.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) では、Electron 6 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的変更の詳細は、[予定されている破壊的変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
