# ElectronとNW.js（旧 node-webkit）との技術的な差異

__Note: Electron の以前の名称は Atom Shell でした__

NW.js のように、Electron は JavaScript と HTML でデスクトップアプリケーションを記述するプラットフォームを提供し、ウェブページからローレベルのシステムへアクセスすることを許可するための Node integration があります。

しかし、Electron と NW.js の2つのプロジェクトでは、完全に別のプロダクトにする根本的な違いがあります。

__1. アプリケーションのエントリ__

NW.js アプリケーションのメインエントリポイントはウェブページか JS スクリプトです。 `package.json` で HTML か JS ファイルを指定し、(HTML のエントリポイントの場合) それがアプリケーションのメインウインドウとしてブラウザウインドウで開かれるか、スクリプトが実行されます。

Electron では、エントリポイントは JavaScript スクリプトです。 URL を直接指定するのではなく、手動でブラウザウインドウを作成し、API を用いて HTML ファイルを読み込みます。 また、アプリケーションをいつ終了するかを決定するためにウインドウイベントを監視する必要があります。

Electron は Node.js ランタイムのように動作します。 Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. ビルドシステム__

Chromium のすべてのビルドの複雑さを避けるため、Electron は Chromium のコンテンツ API にアクセスするのに [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) を使用します。 `libchromiumcontent` は Chromium コンテンツモジュールとその依存関係を含むシングル共有ライブラリです。 ユーザは、Electron をビルドするのに強力なマシンは必要ありません。

__3. Node Integration__

NW.js では、ウェブページ内の Node integration では Chromium のパッチを適用する必要があります。Electron では、Chromium のハッキングを避けるために、libuv ループを各プラットフォームのメッセージループと統合する、別の方法を選択しました。 これがどのように行われているかについては [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) コードを参照してください。

__4. マルチコンテキスト__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

Node の [マルチコンテキスト](https://github.com/nodejs/node-v0.x-archive/commit/756b622) 機能を使用すると、Electron はウェブページ内に新しい JavaScript コンテキストを導入しません。

注釈: NW.js は 0.13 からマルチコンテキストを任意でサポートしています。
