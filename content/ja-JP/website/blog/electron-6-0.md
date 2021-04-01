---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

Electron チームは、Electron 6.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

---

## 新機能

今日は Electron プロジェクトにとって初めてのことが起こりました。Electron の安定版リリースが、対応する [Chrome 安定版リリース](https://www.chromestatus.com/features/schedule) と **同日に** リリースされたのです! 🎉

Electron の機能の多くは、Chromium、Node.js、V8 といったコアコンポーネントによって提供されています。 Electron では、これらのプロジェクトが最新のものになるように維持し、JavaScript の新機能、パフォーマンスの向上、セキュリティ修正をユーザーに提供しています。 これらの各パッケージについて、Electron 6 ではメジャーバージョンを更新しています。

- Chromium `76.0.3809.88`
  - [74 の新機能](https://developers.google.com/web/updates/2019/04/nic74)
  - [75 の新機能](https://developers.google.com/web/updates/2019/06/nic75)
  - [76 の新機能](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Node 12.4.0 ブログ記事](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 ブログ記事](https://v8.dev/blog/v8-release-76)

このリリースには、Electron の API の改善も含まれます。 [リリースノート](https://github.com/electron/electron/releases/tag/v6.0.0) により詳細なリストがありますが、ここではハイライトを紹介します。

### Promise 化

Electron 6.0 でも 5.0 から始まった近代化 [イニシアチブ](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) を継続し、[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) のサポート改善を行っています。

これらの関数は Promise を返すようになりました。従来のコールバックベースの呼び出しもサポートしています。
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

これらの関数には、同期と Promise ベースの非同期、2 つの形式があります。
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

これらの関数は Promise を返すようになりました。
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`、`Electron Helper (GPU).app`、`Electron Helper (Plugin).app`

[Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc) を有効にするためには、書き込みと実行が可能なメモリや異なるチーム ID で署名されたコードの読み込みなどを制限するために、特別なコード署名権限を Helper に付与する必要がありました。

Chromium の Helper アプリに 3 つの新しい種別を [追加しました](https://chromium-review.googlesource.com/c/chromium/src/+/1627456)。1 つはレンダラー用 (`Electron Helper (Renderer).app`)、1 つは GPU プロセス用 (`Electron Helper (GPU).app`)、1 つはプラグイン用 (`Electron Helper (Plugin).app`) です。

`electron-osx-sign` で Electron アプリのコード署名を行っている方は、ビルドロジックを変更しなくても構いません。 カスタムスクリプトでアプリをコード署名する場合は、3 つの新しい Helper アプリケーションを正しくコード署名しているかどうか確認する必要があります。

これらの新しいヘルパーと共にアプリケーションを正しくパッケージするには、 `electron-packager@14.0.4` 以上を使用する必要があります。  `electron-builder` を使用している方は、[この Issue](https://github.com/electron-userland/electron-builder/issues/4104) を確認して、これらの新しいヘルパーのサポート状況を確認してください。

## 破壊的変更

 * これは、レンダラープロセスにロードされるネイティブ Node モジュールは [N-API](https://nodejs.org/api/n-api.html) か [コンテキス対応](https://nodejs.org/api/addons.html#addons_context_aware_addons) であるという将来の要件に対応する作業の、下地づくりとして始めています。 この変更を行う理由は、パフォーマンス高速化、セキュリティ強化、保守作業を軽減するためです。 提案された時系列を含む詳細は、[この Issue](https://github.com/electron/electron/issues/18397) を読んでください。 この変更は Electron v11 で完了する予定です。

 * `net.IncomingMessage` ヘッダは、[Node.js の動作](https://nodejs.org/api/http.html#http_message_headers)、特に `set-cookie` の値や重複するヘッダの処理方法が厳密に一致するように [少し変更](https://github.com/electron/electron/pull/17517#issue-263752903) されました。 [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` は void を返す非同期呼び出しになりました。 [#17121](https://github.com/electron/electron/pull/17121)

 * アプリで `app.getPath('log')` を使用する前に、新しい関数 `app.setAppLogPath()` を呼び出して明示的にログパスを設定しなければならないようになりました。 [#17841](https://github.com/electron/electron/pull/17841)

## 3.x.y サポートの終了

[サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に基づき、3.x.y は役目を終えました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## App のフィードバックプログラム

テストには引き続き [アプリフィードバックプログラム](https://electronjs.org/blog/app-feedback-program) を使用します。 このプログラムに参加するプロジェクトは、そのアプリで Electron ベータ版をテストします。見返りとして、発見した新しいバグは安定版リリースのために優先します。 参加や詳細については、[当プログラムに関するブログ記事を確認してください](https://electronjs.org/blog/app-feedback-program)。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 7.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 7 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的変更の詳細は、[予定されている破壊的変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
