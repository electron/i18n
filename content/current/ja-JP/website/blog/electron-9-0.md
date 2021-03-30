---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 がリリースされました! Chromium `83`, V8 `8.3`, および Node.js `12.14` へのアップグレードが含まれます。 スペルチェッカー機能、有効化されたPDFビューアなど、いくつかの新しいAPI統合が追加されました。

---

Electron チームは、Electron 9.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `83.0.4103.64`
    * [Chrome 81 の新機能](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 がスキップされました](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Chrome 83 の新機能](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Node 12.14.1 ブログ記事](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 ブログ記事](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 ブログ記事](https://v8.dev/blog/v8-release-83)

### 注目の機能

* スペルチェッカー機能の複数の改善。 詳細は [#22128](https://github.com/electron/electron/pull/22128) と [#22368](https://github.com/electron/electron/pull/22368) をご覧ください。
* Linux 上でのウィンドウイベントハンドラの効率を改善しました。 [#23260](https://github.com/electron/electron/pull/23260).
* PDF ビューアを有効にします。 [#22131](https://github.com/electron/electron/pull/22131).

新機能と変更の完全なリストは、[9.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v9.0.0) を参照してください。

## 破壊的変更

* `enableRemoteModule: true` を指定せずに `リモート` を使用した場合の非推奨の警告 [#21546](https://github.com/electron/electron/pull/21546)
    * これは `remote` モジュールを非推奨にしユーザーランドへ移行する計画の第一段階です。 [この Issue](https://github.com/electron/electron/issues/21408) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。
* `app.enableRendererProcessReuse` をデフォルトで true に設定します。 [#22336](https://github.com/electron/electron/pull/22336)
    * これは、レンダラープロセスにロードされるネイティブ Node モジュールは [N-API](https://nodejs.org/api/n-api.html) か [コンテキス対応](https://nodejs.org/api/addons.html#addons_context_aware_addons) であるという将来の要件に対応する作業の一環です。 完全な情報と提案された時系列は、[この Issue](https://github.com/electron/electron/issues/18397) で詳しく説明しています。
* JavaScript以外のオブジェクトをIPC経由で送信すると例外が発生するようになりました。 [#21560](https://github.com/electron/electron/pull/21560)
    * この動作は Electron 8.0 で減価償却されました。 Electron 9.0 では、古いシリアライズアルゴリズムが削除され、このような非シリアライズ可能なオブジェクトを送信すると、「オブジェクトをクローンできませんでした」というエラーがスローされます。

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* `シェル` API の変更:
   * `shell.openItem` API は、非同期の `shell.openPath API` に置き換えられました。 [提案](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `セッション`API の変更:
   * 辞書内のカスタム単語を一覧表示するために、 `session.listWordsFromスペルチェッカーDictionary` APIを追加しました。 [#22128](https://github.com/electron/electron/pull/22128)
   * 辞書内のカスタム単語を削除するために `session.removeWordFromSpellCheckerDictionary` APIを追加しました。 [#22368](https://github.com/electron/electron/pull/22368)
   * `session.serviceWorkerContext` API を追加し、基本的なサービス ワーカー情報にアクセスし、サービス ワーカーからコンソール ログを受信しました。 [#22313](https://github.com/electron/electron/pull/22313)
* `app` API の変更:
   * macOS の `app.focus()` に、アプリが強制的にフォーカスできるように新しいフォースパラメータを追加しました。 [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` API の変更:
   * `BrowserWindow` で getter/setter のペアへのプロパティアクセスをサポート。 [#23208](https://github.com/electron/electron/pull/23208)

### 非推奨となった API

次の API が非推奨または削除されました:

* `shell.openItem` API が減価償却され、非同期の `shell.openPath API` に置き換えられました。
* `<webview>.getWebContents`が削除されました。
* `WebFrame.setLayoutZoomLevelLimits`は Electron 8.0 では非推奨となっていました。

## 6.x.y サポートの終了

Electron 6.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 10.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 10.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### `contextIsolation` のデフォルトを `false` から `true` に変更する (Electron 10 から開始)

contextIsolation がなければ、レンダラープロセスで実行されるコードは、Electron の内部またはアプリケーションのプリロードスクリプトに簡単にアクセスできます。 そのコードは、Electron が制限を維持したい特権アクションを実行できます。

このデフォルトを変更すると、Electron アプリのデフォルトのセキュリティが向上し、アプリが意図的に安全でない動作を選択する必要があります。 Electronは、Electron 10.0にある 現在のコンテキストのデフォルトの `contextIsolation` を、Electron 12.0の新しいデフォルト(`true`) に変更します。

`のcontextIsolationisolation`の詳細について、特に簡単に有効にする方法とセキュリティ上の利点を[コンテキスト分離文書](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md)を参照してください。
