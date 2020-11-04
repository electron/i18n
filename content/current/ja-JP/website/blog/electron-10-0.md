---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 がリリースされました! Chromium `85`, V8 `8.5`, および Node.js `12.16` へのアップグレードが含まれます。 いくつかの新しいAPI統合と改善を追加しました。 詳細は以下をご覧ください!

---

Electron チームは、Electron 10.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。

Electron 10 リリースでは、リリースノートにも変更を加えました。 Electron 10 の新機能と、Electron 10 と過去のリリースの間に何が変更された可能性があるかを簡単に把握できるようにします。 これには、Electron 10 に導入された変更も含まれますが、以前のリリースにバックポートされました。 これにより、Electron をアップグレードする際に新機能やバグ修正を簡単に見つけられるようになることを願っています。

新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 注目すべき変更

### 累積的変更

* Chromium `85.0.4183.84`
    * [Chrome 84 の新機能](https://developers.google.com/web/updates/2020/07/nic84)
    * [Chrome 85 の新機能](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Node 12.16.3 ブログ記事](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 ブログ記事](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 ブログ記事](https://v8.dev/blog/v8-release-85)

### 注目の機能

* `contents.getBackgroundThrottling()` メソッドと `contents.backgroundThrottling` プロパティを追加しました。 [#21036]
* メインプロセスの `desktopCapturer` モジュールを公開。 [#23548](https://github.com/electron/electron/pull/23548)
* 指定された `セッション` が `ses.isPersistent()` API を呼び出すことで永続的かどうかを確認できるようになりました。 [#22622](https://github.com/electron/electron/pull/22622)
* ネットワークIPアドレスの変更とICEによりRTC呼び出しが接続されないネットワークの問題を解決します。 (Chromium 問題 1113227)。 [#24998](https://github.com/electron/electron/pull/24998)

新機能と変更の完全なリストは、[10.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v10.0.0) を参照してください。

## 破壊的変更

* `enableRemoteModule` のデフォルト値を `false` に変更しました。 [#22091](https://github.com/electron/electron/pull/22091)
    * これは、 `リモート` モジュールを非推奨にしてユーザーランドに移動するための私たちの計画の一部です。 [この Issue](https://github.com/electron/electron/issues/21408) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。
* `app.allowRendererProcessReuse` のデフォルト値を `true` に変更しました。 [#22336](https://github.com/electron/electron/pull/22336) ( [Electron 9](https://github.com/electron/electron/pull/22401) でも)
   * これにより、レンダラープロセスで非コンテキスト認識ネイティブモジュールが読み込まれるのを防ぎます。
   * [この Issue](https://github.com/electron/electron/issues/18397) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。
* OS ロケールが RTL 言語(アラビア語やヘブライ語など)に設定されている場合の、macOS 上のウィンドウボタンの配置を修正しました。 フレームレスウィンドウアプリは、ウィンドウのスタイリング中にこの変更を考慮する必要があります。 [#22016](https://github.com/electron/electron/pull/22016)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* セッション: 指定された `セッション` が `ses.isPersistent()` API を呼び出して永続的であるかどうかを確認できるようになりました。 [#22622](https://github.com/electron/electron/pull/22622)
* Contents: `contents.getBackgroundThrottling()` メソッドと `contents.backgroundThrottling` プロパティを追加しました。 [#21036](https://github.com/electron/electron/pull/21036)

### 非推奨となった API

次の API が非推奨または削除されました:

* `netLog` の `currentlyLoggingPath` プロパティを廃止しました。 さらに、 `netLog.stopLogging` が記録されたログへのパスを返さないようにしました。 [#22732](https://github.com/electron/electron/pull/22732)
* `crashReporter` に非圧縮のクラッシュアップロードがあります。 [#23598](https://github.com/electron/electron/pull/23598)

## 7.x.y サポートの終了

Electron 7.x.y は、プロジェクトの [サポート ポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に従ってサポート終了に達しました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 11.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 11.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### `リモート` モジュールの非推奨作業を継続する (Electron 11)
[Electron 9](https://www.electronjs.org/blog/electron-9-0) でリモートモジュールを削除する作業を開始し、 `リモート` モジュールを削除する計画を続けています。 Electron 11 では、Electron 10 で行ったように、 [WeakRef](https://v8.dev/features/weak-references) を実装するためのリファクタ作業を継続する予定です。 廃止予定の全計画と詳細については、 [この問題](https://github.com/electron/electron/issues/21408) をお読みいただき、従ってください。

### ネイティブノードモジュールをContext AwareまたはN-API(Electron 11) にすることを要求する最終ステップ
Electron 6 以降から レンダラープロセスにロードされた [ネイティブノードモジュール](https://nodejs.org/api/addons.html) を [N-API](https://nodejs.org/api/n-api.html) または [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons)のいずれかにするための基盤を構築してきました。 この変更を有効にすると、セキュリティの強化、パフォーマンスの高速化、メンテナンス作業の負荷の低減が可能になります。 この計画の最後のステップは、Electron 11 でレンダリングプロセスの再利用を無効にする機能を削除することです。 提案されたタイムラインを含む詳細については、この問題 [](https://github.com/electron/electron/issues/18397) を参照してください。
