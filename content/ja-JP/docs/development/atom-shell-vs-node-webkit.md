# ElectronとNW.js（旧 node-webkit）との技術的な差異

**Note: Electron の以前の名称は Atom Shell でした**

NW.js のように、Electron は JavaScript と HTML でデスクトップアプリケーションを記述するプラットフォームを提供し、ウェブページからローレベルのシステムへアクセスすることを許可するための Node integration があります。

しかし、Electron と NW.js の2つのプロジェクトでは、完全に別のプロダクトにする根本的な違いがあります。

**1. アプリケーションのエントリ**

NW.js アプリケーションのメインエントリポイントはウェブページか JS スクリプトです。 `package.json` で HTML か JS ファイルを指定し、(HTML のエントリポイントの場合) それがアプリケーションのメインウインドウとしてブラウザウインドウで開かれるか、スクリプトが実行されます。

Electron では、エントリポイントは JavaScript スクリプトです。 URL を直接指定するのではなく、手動でブラウザウインドウを作成し、API を用いて HTML ファイルを読み込みます。 また、アプリケーションをいつ終了するかを決定するためにウインドウイベントを傍受する必要があります。

Electron は Node.js ランタイムによく似ています。 Electron の API はローレベルなので、[PhantomJS](http://phantomjs.org/) の代わりにブラウザテストに使用できます。

**2. ビルドシステム**

Chromium のすべてのビルドの複雑さを避けるため、Electron は Chromium のコンテンツ API にアクセスするのに [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) を使用します。 `libchromiumcontent` は Chromium コンテンツモジュールとその依存関係を含むシングル共有ライブラリです。 ユーザは、Electron をビルドするのに強力なマシンは必要ありません。

**3. Node Integration**

NW.js では、ウェブページ内の Node integration では Chromium のパッチを適用する必要があります。Electron では、Chromium のハッキングを避けるために、libuv ループを各プラットフォームのメッセージループと統合する、別の方法を選択しました。 See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.