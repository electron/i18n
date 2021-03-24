---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 がリリースされました! これには Chromium `87`、V8 `8.7`、Node.js `12.18.3` へのアップグレードが含まれています。 Apple Sillicon のサポート追加に、ほか一般的な改善となりました。 詳細は以下をご覧ください!

---

Electron チームは、Electron 11.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 今回のリリースでは、アップグレード、修正、Apple の M1 ハードウェアの新規サポートなどが盛り込まれています。

新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `87.0.4280.47`
    * [Chrome 86 の新機能](https://developers.google.com/web/updates/2020/10/nic86)
    * [Chrome 87 の新機能](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Node 12.18.3 ブログ記事](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 ブログ記事](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 ブログ記事](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 ブログ記事](https://v8.dev/blog/v8-release-87)

### 注目の機能

* Apple M1 に対応: 11 月 10 日、Apple は [今後のハードウェア](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/) に内蔵される新しい M1 チップを発表しました。 Electron 11 から、Intel Mac (x64) 用と Apple の次期 M1 ハードウェア (arm64) 用の別々のバージョンを頒布する予定です。 Electron アプリを [Apple の M1 ハードウェア上で動作させる方法については、こちら](https://www.electronjs.org/blog/apple-silicon) を参照してください。 [#24545](https://github.com/electron/electron/pull/24545)
* crashReport の引数に V8 のクラッシュメッセージと位置情報を追加しました。 [#24771](https://github.com/electron/electron/pull/24771)
* コンテキストブリッジを介して大きめのオブジェクトを送信する際のパフォーマンスを改善しました。 [#24671](https://github.com/electron/electron/pull/24671)

新機能と変更の完全なリストは、[11.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v11.0.0) を参照してください。

## 破壊的変更

* 実験的 API の削除: `BrowserView.{fromId, fromWebContents, getAllViews}` と `BrowserView` の `id` プロパティ。 [#23578](https://github.com/electron/electron/pull/23578)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* 特定のプロトコルを扱うアプリの詳細情報を返す API `app.getApplicationInfoForProtocol()` を追加しました。 [#24112](https://github.com/electron/electron/pull/24112)
* ファイルのパスと最大サムネイルサイズを指定するとファイルのプレビュー画像を返す API `app.createThumbnailFromPath()` を追加しました。 [#24802](https://github.com/electron/electron/pull/24802)
* ハングしたレンダラーの回復を支援するため、レンダラープロセスを強制的に終了させる `webContents.forcefullyCrashRenderer()` を追加しました。 [#25756](https://github.com/electron/electron/pull/25756)

## 8.x.y サポートの終了

Electron 8.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 12.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 12.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### `remote` モジュールの非推奨化作業の継続
[Electron 9](https://www.electronjs.org/blog/electron-9-0) から `remote` モジュールの削除作業を開始してきました。 Electron 14 では `remote` モジュール自体を削除する予定です。

[この Issue](https://github.com/electron/electron/issues/21408) から、非推奨化の全計画と詳細をご確認ください。

### ネイティブ Node モジュールで Context Aware や N-API を要求するようにする最終段階 (Electron 12 にて)
Electron 6 以降、レンダラープロセスで読み込まれる [ネイティブ Node モジュール](https://nodejs.org/api/addons.html) では、[N-API](https://nodejs.org/api/n-api.html) または [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons) のいずれかであることを要求するように下準備の作業が行われてきました。 この変更を適用することで、セキュリティの強化、パフォーマンスの高速化、保守作業の軽減が可能になります。 この計画の最終段階は、Electron 12 でレンダラープロセスの再利用を無効にする機能を削除することです。

提案のタイムラインを含む詳細は、[この Issue](https://github.com/electron/electron/issues/18397) をご参照ください。
