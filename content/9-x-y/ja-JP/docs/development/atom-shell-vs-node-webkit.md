# ElectronとNW.js（旧 node-webkit）との技術的な差異

__Note: Electron の以前の名称は Atom Shell でした__

NW.js のように、Electron は JavaScript と HTML でデスクトップアプリケーションを記述するプラットフォームを提供し、ウェブページからローレベルのシステムへアクセスすることを許可するための Node integration があります。

しかし、Electron と NW.js の2つのプロジェクトでは、完全に別のプロダクトにする根本的な違いがあります。

__1. アプリケーションのエントリ__

NW.js アプリケーションのメインエントリポイントはウェブページか JS スクリプトです。 `package.json` で HTML か JS ファイルを指定し、(HTML のエントリポイントの場合) それがアプリケーションのメインウインドウとしてブラウザウインドウで開かれるか、スクリプトが実行されます。

Electron では、エントリポイントは JavaScript スクリプトです。 URL を直接指定するのではなく、手動でブラウザウインドウを作成し、API を用いて HTML ファイルを読み込みます。 また、アプリケーションをいつ終了するかを決定するためにウインドウイベントを監視する必要があります。

Electron は Node.js ランタイムのように動作します。 Electron の API はローレベルなので、[PhantomJS](http://phantomjs.org/) の代わりにブラウザテストに使用できます。

__2. ビルドシステム__

Chromium のすべてのビルドの複雑さを避けるため、Electron は Chromium のコンテンツ API にアクセスするのに [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) を使用します。 `libchromiumcontent` は Chromium コンテンツモジュールとその依存関係を含むシングル共有ライブラリです。 ユーザは、Electron をビルドするのに強力なマシンは必要ありません。

__3. Node Integration__

NW.js では、ウェブページ内の Node integration では Chromium のパッチを適用する必要があります。Electron では、Chromium のハッキングを避けるために、libuv ループを各プラットフォームのメッセージループと統合する、別の方法を選択しました。 これがどのように行われているかについては [`node_bindings`][node-bindings] コードを参照してください。

__4. マルチコンテキスト__

NW.js の経験者であれば、Node コンテキストやウェブコンテキストの概念をご存知でしょう。 これらの概念は、NW.js の実装手法から考案されたものです。

Node の [マルチコンテキスト](https://github.com/nodejs/node-v0.x-archive/commit/756b622) 機能を使用すると、Electron はウェブページ内に新しい JavaScript コンテキストを導入しません。

注釈: NW.js は 0.13 からマルチコンテキストを任意でサポートしています。

[node-bindings]: https://github.com/electron/electron/tree/master/atom/common
