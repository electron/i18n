# プロセスのサンドボックス化

Chromium の重要なセキュリティ機能の一つは、プロセスをサンドボックス内で実行できることです。 サンドボックスは、ほとんどのシステムリソースへのアクセスを制限することで悪意のあるコードが引き起こす被害を制限します。サンドボックスのプロセスは、CPU サイクルとメモリのみを自由に使用できます。 サンドボックス化したプロセスで追加の特権を必要とする操作を実行するには、専用の通信チャンネルを使用してより特権のあるプロセスにタスクを委譲します。

Chromium では、メインプロセス以外のほとんどのプロセスにサンドボックス化が適用されます。 これにはレンダラープロセスのほか、オーディオサービス、GPU サービス、ネットワークサービスなどのユーティリティプロセスも含まれます。

詳しい情報は Chromium の [サンドボックスデザインのドキュメント][sandbox] をご参照ください。

## Electron のサンドボックス化ポリシー

Electron には混合サンドボックス環境があります。これは、サンドボックス化したプロセスと特権プロセスを横並びに実行するというものです。 デフォルトでは、レンダラープロセスはサンドボックスではなく、ユーティリティプロセスです。 注意として、Chromium と同様にメイン (ブラウザ) プロセスは特権プロセスであり、サンドボックス化できません。

歴史的には、アプリ開発者にとってレンダラーでの Node.js の利用は非常に強力なツールであるため、このような混合サンドボックス方式が確立されました。 あいにく、この機能は甚大なセキュリティ上の脆弱性でもあります。

理論的には、信頼されるコードだけを表示するデスクトップアプリケーションでは非サンドボックス化レンダラーは問題になりません。しかし、信頼されないウェブコンテンツを表示する場合の Electron は、Chromium よりも堅牢性が低くなります。 クロスサイトスクリプティング、コンテンツインジェクション、遠隔で読み込んだウェブサイトへの中間者攻撃など、悪意のある人間が利用できる攻撃手段は無数にあります。 念のため、大多数の状況ではレンダラーのサンドボックスの有効化を推奨します。

<!--TODO: update this guide when #28466 is either solved or closed -->
なお Issue トラッカーではレンダラーのサンドボックス化をデフォルトで有効にするための議論が活発に行われています。 詳しくは [#28466][issue-28466]) を参照してください。

## Electron でのサンドボックスの動作

Electron のサンドボックス化したプロセスは _ほぼ_ Chromium と同じように動作しますが、Electron は Node.js とのインターフェイスであるために更に考慮すべき概念がいくつかあります。

### レンダラープロセス

Electron のレンダラープロセスをサンドボックス化すると、通常の Chrome レンダラーと同じように動作します。 サンドボックス化したレンダラーは Node.js 環境が初期化されません。

<!-- TODO(erickzhao): when we have a solid guide for IPC, link it here -->
そのため、サンドボックスを有効にすると、レンダラープロセスはプロセス間通信 (IPC) を介したメインプロセスへのタスクの委譲によってのみ、特権的なタスク (ファイルシステムとのやりとり、システムへの変更、サブプロセスの生成など) を実行できます。

### プリロードスクリプト

レンダラープロセスがメインプロセスと通信できるようにするため、サンドボックス化したレンダラーにアタッチされるプリロードスクリプトでは Node.js API をポリフィルしたサブセットを利用できるようになっています。 Node の `require` に似た `require` 関数のモジュールを公開してありますが、これは以下 Electron や Node の組み込みモジュールのサブセットしかインポートできません。

* `electron` (レンダラープロセスのモジュールのみ)
* [`イベント`](https://nodejs.org/api/events.html)
* [`timers`](https://nodejs.org/api/timers.html)
* [`url`](https://nodejs.org/api/url.html)

加えて、プリロードスクリプトは以下の Node.js プリミティブもグローバルとしてポリフィルします。

* [`Buffer`](https://nodejs.org/api/Buffer.html)
* [`process`](../api/process.md)
* [`clearImmediate`](https://nodejs.org/api/timers.html#timers_clearimmediate_immediate)
* [`setImmediate`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args)

`require` 関数は機能を限定したポリフィルであるため、[CommonJS モジュール][commonjs] を利用したプリロードスクリプトの複数ファイル分割ができません。 プリロードコードを分割する必要がある場合は、[webpack][webpack] や [Parcel][parcel] のようなバンドラーを使用してください。

注意として、`preload` スクリプトへ提示される環境はサンドボックス化したレンダラーの環境よりも大幅に特権的です。[`contextIsolation`][contextIsolation] が有効でなければ、レンダラープロセスで実行しれている信頼されないコードに特権的な API をリークするおそれがあります。

## サンドボックスの設定

### 単一のプロセスでサンドボックスを有効にする

Electron では、[`BrowserWindow`][browser-window] コンストラクタで `sandbox: true` を設定することでレンダラープロセスごとにサンドボックスを有効化できます。

```js
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('https://google.com')
})
```

### アプリ全体でサンドボックスを有効にする

すべてのレンダラーにサンドボックスを強制したい場合は、[`app.enableSandbox`][enable-sandbox] API も利用できます。 注意として、この API は app の `ready` イベントより前に呼ぶ必要があります。

```js
// main.js
app.enableSandbox()
app.whenReady().then(() => {
  // app.enableSandbox() を呼んだので `sandbox: true` の指定は不要です。
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```

### Chromium のサンドボックスを無効にする (テストのみ)

[`--no-sandbox`][no-sandbox] CLI フラグで Chromium のサンドボックスを完全に無効化することもできます。これは、(ユーティリティプロセスを含む) すべてのプロセスのサンドボックスを無効化します。 このフラグはテスト目的でのみ使用し、本番環境では **絶対に** 使用しないことを強く推奨します。

注意として、この状況で `sandbox: true` オプションを指定してもレンダラーの Node.js 環境は無効になります。

## 信頼されないコンテンツの描画に関する注意

信頼されないコンテンツを Electron で描画することはまだ未知の領域ですが、いくつかのアプリケーションは成功を収めています (例: [Beaker Browser][beaker])。 私たちの目標はサンドボックス化したコンテンツのセキュリティに関して Chrome にできるだけ近づくことですが、突き詰めるといくつかの基本的な問題のためにいつも後れを取ることになります。

1. 私たちには Chromium 製品に適したセキュリティのリソースやノウハウがありません。 今あるものを活かして Chromium からできることはすべて継承し、セキュリティ上の問題にも迅速に対応できるようにしていますが、Electron は Chromium のようにリソースを割くことができず、Chromium のようなセキュリティは確保できません。
2. Chrome のセキュリティ機能 (セーフブラウジングや証明書の透過性など) の中には、中央集権化と専用サーバが必要なものがありますが、どちらも Electron プロジェクトの目的に反しています。 そのため、セキュリティ関連のコストが発生しないように、Electron では機能を無効にしています。
3. Chromium は 1 つだけですが Electron には何千ものアプリが存在しており、それぞれのアプリの動作は微妙に異なります。 これらの違いを考慮すると巨大な可能性の空間が生じ、通常とは異なるユースケースでのプラットフォームのセキュリティ確保に挑戦することになります。
4. セキュリティアップデートをユーザーに直接伝えることができないため、セキュリティアップデートをユーザーに届けるために、アプリベンダーに Electron のバージョンをアップグレードして頂いています。

Chromium のセキュリティ修正を古いバージョンの Electron にバックポートするよう最善の努力をしていますが、すべての修正のバックポートは保証できません。 堅牢性を確保するには、Electron の最新の安定版を使用することが最善の方法です。

[sandbox]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[issue-28466]: https://github.com/electron/electron/issues/28466
[browser-window]: ../api/browser-window.md
[enable-sandbox]: ../api/app.md#appenablesandbox
[no-sandbox]: ../api/command-line-switches.md#--no-sandbox
[commonjs]: https://nodejs.org/api/modules.html#modules_modules_commonjs_modules
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[beaker]: https://github.com/beakerbrowser/beaker
