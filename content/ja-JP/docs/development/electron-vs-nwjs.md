# Electron と NW.js との技術的差異

[NW.js][nwjs] のように、Electron はウェブ技術を使ったデスクトップアプリケーションを書くプラットフォームを提供します。 どちらのプラットフォームも、開発者は HTML、JavaScript、Node.js が利用できます。 表面上は、とても似ています。

しかし、この 2 つのプロジェクトには根本的な違いがあり、Electron と NW.js は完全に別物です。

## 1) アプリケーションのエントリ

NW.js では、アプリケーションのメインエントリポイントを HTML ウェブページにできます。 その場合、NW.js は指定のエントリポイントをブラウザウインドウで開きます。

Electron では、エントリポイントは常に JavaScript スクリプトです。 URL を直接指定するのではなく、手動でブラウザウィンドウを作成し、API で HTML ファイルをロードします。 アプリケーションを終了するタイミングを決めるため、ウインドウイベントを監視する必要もあります。

Electron は Node.js ランタイムのように動作します。 Electron の API はローレベルなので、[PhantomJS](https://phantomjs.org/) 代わりのブラウザテストに使うことができます。

## 2) Node インテグレーション

NW.js では、ウェブページで Node インテグレーションをするには Chromium にパッチを当てる必要があります。Electron では Chromium のハッキングを避けるために各プラットフォームのメッセージループに `libuv` ループを統合する、別の選択をしました。 これがどのように行われているかについては [`node_bindings`][node-bindings] コードを参照してください。

## 3) JavaScript コンテキスト

NW.js の経験者であれば、Node コンテキストやウェブコンテキストの概念をご存知でしょう。 これらの概念は、NW.js の実装手段から考案されたものです。

Node の [マルチコンテキスト](https://github.com/nodejs/node-v0.x-archive/commit/756b622) 機能を使用すると、Electron はウェブページ内に新しい JavaScript コンテキストを導入しません。

注釈: NW.js は 0.13 からマルチコンテキストを任意でサポートしています。

## 4) レガシーサポート

NW.js では、Windows XP 対応の "レガシーリリース" がまだ提供されています。 これはセキュリティアップデートを受けません。

ハードウェアメーカー、Microsoft、Chromium、Node.js がシステムの重大セキュリティアップデートすらリリースしていないことを鑑みると、Windows XP の使用は危険であり、完全に自己責任であることを警告しなければなりません。

しかし、私たちの想像を超える要件が存在する可能性があることは理解しています。Windows XP で動作する Electron のようなものをお探しであれば、NW.js のレガシーリリースをお勧めします。

## 5) 機能

サポートする機能の量は多くの差異があります。 Electron にはより大きなコミュニティがあり、これを使用するアプリ製品の数も多く、[npm][electron-modules] で利用できる大量のユーザー製モジュールがあります。

例えば、Electron には自動更新サポートが組み込まれており、インストーラ作成を容易にする無数のツールも用意されています。 NW.js の良いところを挙げると、NW.js は Chrome アプリ開発向けに `Chrome.*` API を数多くサポートしています。

もちろん、ウェブ技術で構築された、洗練されたアプリケーション製品 (Visual Studio Code、Slack、Facebook Messenger など) のプラットフォームとしては Electron の方が優れていると考えます。しかし、ウェブ技術の仲間たるもの公平でありたいです。 Electron にはない機能が必要であれば、NW.js を試すのもいいかもしれません。

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/main/lib/common
