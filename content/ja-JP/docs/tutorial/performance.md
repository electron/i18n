# パフォーマンス

開発者は Electron アプリケーションのパフォーマンスを最適化するための戦略について頻繁に尋ねます。 ソフトウェアエンジニア、消費者、フレームワークの開発者は、常に "パフォーマンス" は何を意味するかという 1 つの定義には同意しません。 このドキュメントでは、使用しているメモリ、CPU、およびディスクリソースの量を削減し、アプリがユーザー入力に応答し、操作をできるだけ早く完了するようにする、Electron メンテナー御用達の方法のいくつかを概説します。 さらに、すべてのパフォーマンス戦略においてアプリは高いセキュリティ水準を維持する必要があります。

JavaScript でパフォーマンスの高いウェブサイトを構築する方法に関する知恵と情報は、Electron アプリにも一般的に適用されます。 ある程度であれば、パフォーマンスの高い Node.js アプリケーションを構築する方法を述べたノウハウも適用されますが、Node.js バックエンドでの "パフォーマンス" という用語はクライアントで実行されるアプリケーションとは異なることを意味することに注意してください。

このリストは利便性のために提供されており、[セキュリティチェックリスト](./security.md) とよく似ていますが、完全なものではありません。 以下に概説するすべての手順に従っても、遅い Electron アプリを構築してしまうかもしれません。 Electron は強力な開発プラットフォームであり、開発者であるあなたがやりたいことは多かれ少なかれ行うことができます。 その自由はパフォーマンスがほとんどあなたの責任であることを意味します。

## 計って、測って、図る

以下のリストには、かなり簡単で実装しやすい手順がいくつか含まれています。 しかし、アプリを最もパフォーマンスの良いバージョンに構築するには、多くの手順を超える必要があります。 代わりに、慎重にプロファイリングして測定することでアプリで実行されているすべてのコードを詳しく調べる必要があります。 ボトルネックはどこ? いつユーザーがボタンをクリックして、どの処理が時間を浪費をしている? アプリがただアイドル状態の間、どのオブジェクトが最もメモリを食っている?

幾度となく、パフォーマンスの高い Electron アプリを構築するための最も成功した戦略は、実行中のコードのプロファイルを作成し、その中で最もリソースを消費する部分を見つけ、最適化することであることがわかりました。 この一見面倒なプロセスを何度も繰り返すと、アプリのパフォーマンスは劇的に向上します。 Visual Studio Code や Slack などの主要なアプリで使用された経験から、この方法がパフォーマンスを向上させる最も信頼できる戦略であることが示されています。

アプリのコードをプロファイリングする方法について知りたいのであれば、Chrome デベロッパーツールと仲良くなってください。 複数のプロセスを一度に見る高度な分析は、[Chrome Tracing] ツールを検討してみてください。

### 推薦図書

 * [始めよう実行時パフォーマンス分析](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
 * [談話: "Visual Studio Code - 最初の一秒"](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## チェックリスト

これらの手順を実行すると、アプリが少しだけ無駄なく、高速になり、一般的にリソースの消費が少なくなる可能性があります。

1. [迂闊なモジュール採用](#1-carelessly-including-modules)
2. [あまりに早いコードのロードと実行](#2-loading-and-running-code-too-soon)
3. [メインプロセスをブロックしている](#3-blocking-the-main-process)
4. [レンダラープロセスをブロックしている](#4-blocking-the-renderer-process)
5. [不要な polyfill](#5-unnecessary-polyfills)
6. [不要またはブロックしているネットワークリクエスト](#6-unnecessary-or-blocking-network-requests)
7. [Bundle your code](#7-bundle-your-code)

## 1) 迂闊なモジュール採用

Node.js モジュールをアプリケーションに追加する前に、そのモジュールを調べましょう。 そのモジュールにはどれだけの依存関係が含まれているでしょうか。 どの種類のリソースが、単に `require()` 文で呼び出す必要があるでしょうか。 NPM パッケージレジストリでダウンロード数が最も多かったり GitHub で最もスターの数が多かったりするモジュールは、実際には利用可能なもののうち最もすっきりとした最小のものではない場合があります。

### なぜ？

この推奨事項の背後にある理由は、実例で最もよく説明されています。 Electron の初期の頃は、ネットワーク接続の信頼できる検出が問題でした。そのため、多くのアプリは簡易な `isOnline()` メソッドを公開しているモジュールを使用していました。

そのモジュールは、多くの有名なエンドポイントに到達するかどうかでネットワーク接続を検出しました。 これらのエンドポイントのリストについては、既知のポートのリストも含まれる別のモジュールに依存していました。 この依存モジュール自身は、ポートに関する情報を含むモジュールに依存していました。これは、100,000 行を超える内容の JSON ファイルの形式で提供されていました。 モジュールがロードされるたびに (通常は `require('module')` 文で)、すべての依存関係をロードし、最終的にこの JSON ファイルを読み取って解析します。 数千行の JSON の解析は非常に重い操作です。 遅いマシンでは、全体で数秒かかる場合があります。

多くのサーバーコンテキストでは、起動にかかる時間は実質的に無関係です。 すべてのポートに関する情報を必要とする Node.js サーバーは、サーバーが起動してリクエストをより高速に処理できるようになると、必要なすべての情報をメモリにロードするため実際に "パフォーマンスが向上" します。 この例で説明するモジュールは、"悪質な" モジュールではありません。 ただし、Electron アプリでは、実際に必要のない情報をメモリに読み込んで解析したり保存したりするべきではありません。

要するに、主に Linux で実行する Node.js サーバー用に書かれた一見優れたモジュールは、アプリのパフォーマンスにとって悪いニュースかもしれません。 この特定の例での正しいソリューションは、モジュールはまったく使用せず、代わりに Chromium の後のバージョンに含まれる接続チェックを使用することでした。

### どうすればいいの？

モジュールを検討するときは、以下を確認することを推奨します。

1. 依存関係のサイズ。2) のロードに必要なリソース (` require()`) も含まれます。
3. 関心のあるアクションを実行するために必要なリソース

モジュールをロードするときの CPU プロファイルとヒープメモリプロファイルの生成は、コマンドライン上の 1 つのコマンドで実行できます。 以下の例では、人気のあるモジュール `request` を見ていきます。

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

このコマンドを実行すると、実行したディレクトリに `.cpuprofile` ファイルと `.heapprofile` ファイルが作成されます。 両方のファイルは、Chrome デベロッパーツールを使用して、それぞれ `Performance` および `Memory` タブを使用して分析できます。

![performance-cpu-prof](../images/performance-cpu-prof.png)

![performance-heap-prof](../images/performance-heap-prof.png)

この例では、著者のマシンで `request` のロードに約 0.5 秒かかったのに対し、`node-fetch` のメモリ消費は劇的に少なく、50ms 未満でした。

## 2) あまりに早いコードのロードと実行

重いセットアップ操作がある場合は、それらを後回しすることを検討してください。 アプリケーションの起動直後に実行されているすべての作業を調べます。 すべての操作をすぐに実行するのではなく、ユーザーの行程により近い順序で操作をずらすことを検討してください。

従来の Node.js 開発では、すべての `require()` ステートメントを先頭に配置する慣習がありました。 いま同じ戦略を使用 _しつつ_ すぐ必要ではないサイズの大きいモジュールを使用している Electron アプリケーションを作成している場合、同じ戦略のうえで、より適切なタイミングで読み込むように後回しします。

### なぜ？

モジュールのロードは、特に Windows では驚くほど重い操作です。 アプリの起動時に、ユーザーに現在必要のない操作で待たせてはなりません。

これは当たり前のように思えるかもしれませんが、多くのアプリケーションは、更新の確認、後のフローで使用されるコンテンツのダウンロード、重いディスク I/O 操作の実行など、アプリの起動直後に大量の作業を行う傾向があります。

例として Visual Studio Code を考えてみましょう。 ファイルを開くと、コードを強調表示せずにすぐにファイルが表示され、テキストを操作する機能が優先されます。 その作業が完了すると、コードの強調表示に進みます。

### どうすればいいの？

例として、アプリケーションが架空の `.foo` 形式のファイルを解析していると仮定しましょう。 それをするためには、同様に架空の `foo-parser` モジュールに依存します。 従来の Node.js 開発では、依存関係を先にロードするコードを作成する場合があります。

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

上記の例では、ファイルがロードされるとすぐに多くの作業が実行されます。 解析されたファイルをすぐ取得する必要があるでしょうか。 `getParsedFiles()` が実際に呼び出されたときに、これを少し後で実行できるでしょうか。

```js
// "fs" はすでにロードされている可能性が高いため、この `require()` 呼び出しは軽いです
const fs = require('fs')

class Parser {
  async getFiles () {
    // `getFiles` が呼ばれても、すぐにはディスクに触れません。
    // また、非同期バージョンを使用して
    // 他の操作をブロックしないことを保証します。
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // 架空の foo-parser はロードするには大きくて重いモジュールなので、
    // 実際にファイルを解析する必要があるまでその動作を後回しします。
    // `require()` にはモジュールキャッシュが付属しているため、
    // この `require()` 呼び出しは 1 回だけ重く、
    // 後続の `getParsedFiles()` 呼び出しはより高速になります。
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// この操作は、前の例よりもはるかに軽くなりました
const parser = new Parser()

module.exports = { parser }
```

要するに、アプリの起動時にリソースをすべて割り当てるのではなく、"その時に合わせて" リソースを割り当てます。

## 3) メインプロセスをブロックしている

Electron のメインプロセス ("ブラウザプロセス" と呼ばれることもあります) は特別です。これは、アプリの他のすべてのプロセスの親プロセスであり、オペレーティングシステムが相互作用する一次プロセスです。 ウィンドウ、インタラクション、アプリ内のさまざまなコンポーネント間の通信を処理します。 UI スレッドも保持します。

どんな状況でも、このプロセスと UI スレッドを長い実行時間の操作でブロックしてはなりません。 UI スレッドをブロックすると、メインプロセスが処理を続行できる状態になるまで、アプリ全体がフリーズします。

### なぜ？

メインプロセスとその UI スレッドは、本質的にアプリ内の主要な操作の管制塔です。 オペレーティングシステムがマウスクリックについてアプリに通知すると、アプリはウィンドウに到達する前にメインプロセスを通過します。 ウィンドウがぬるぬるした滑らかなアニメーションをレンダリングしている場合、それについて GPU プロセスとやり取りする必要があって―もう一度メインプロセスを通過します。

Electron と Chromium は、UI スレッドのブロックを回避するために、新しいスレッドに重いディスク I/O および CPU バウンド操作を配置するよう配慮します。 あなたもおなじようにしましょう。

### どうすればいいの？

Electron の強力なマルチプロセスアーキテクチャは、長時間実行するタスクを支援する準備ができていますが、少数のパフォーマンストラップも含まれています。

1) 長時間実行される CPU 負荷の高いタスクについては、[Worker Thread](https://nodejs.org/api/worker_threads.html) を使用するか、それらを BrowserWindow に移動することを検討するか、(最後の手段として) 専用プロセスを生成します。

2) 同期 IPC と `remote` モジュールの使用はできるだけ避けてください。 正しい使用方法もありますが、`remote` モジュールを使用して知らないうちに UI スレッドをブロックするのは非常に容易です。

3) メインプロセスでブロックする I/O 操作の使用を避けてください。 要するに、コア Node.js モジュール (`fs` や `child_process` など) が同期バージョンと非同期バージョンを提供している場合は、常に非同期および非ブロッキングのものを選択するべきです。


## 4) レンダラープロセスをブロックしている

Electron には Chrome の最新バージョンが同梱されているため、Web Platform が提供する最新で最良の機能を利用して、アプリをスムーズかつ応答性の良いように維持する手法で重い操作を後回しまたはオフロードできます。

### なぜ？

レンダラープロセスで実行する JavaScript が、アプリに多く含まれているのかもしれません。 その仕掛けは、60fps でユーザー入力、アニメーションへの対応、スムーズなスクロールを維持するために、必要なリソースを奪わずに可能な限り迅速に操作を実行することです。

レンダラーのコードで操作の流れを調整することは、ユーザーがアプリの "カクつき" を時々訴える場合に特に役立ちます。

### どうすればいいの？

平たく言えば、最新のブラウザー用の高性能ウェブアプリを構築するためのすべてのアドバイスは、Electron のレンダリングにも適用されます。 現在、自由に使える 2 つの主要なツールがあります。小規模な操作用の `requestIdleCallback()` と、長時間実行する操作用の `Web Workers` です。

*`requestIdleCallback()`* により、開発者は、プロセスがアイドル期間に入るとすぐに実行される関数をキューに入れることができます。 これにより、ユーザーエクスペリエンスに影響を与えることなく、優先度の低い作業やバックグラウンド作業を実行できます。 使用方法の詳細については、[MDNのドキュメントを参照してください](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)。

*Web Worker* は別のスレッドでコードを実行する強力なツールです。 考慮すべき注意点がいくつかあります。注意点については、Electron の [マルチスレッドドキュメント](./multithreading.md) および [Web Worker の MDN ドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) を参照してください。 長時間にわたって大量の CPU パワーを必要とするあらゆる操作に理想的な解決法です。


## 5) 不要な polyfill

Electron の大きな利点の1つは、JavaScript、HTML、CSS をどのエンジンが解析するかを正確に知っていることです。 ウェブ向けに書かれたコードを再利用する場合は、Electron に含まれている機能を polyfill しないようにしてください。

### なぜ？

今日のインターネット用のウェブアプリケーションを構築する場合、最も古い環境では、使用できる機能と使用できない機能が決まります。 Electron はパフォーマンスの良い CSS フィルターとアニメーションをサポートしていますが、古いブラウザはそうではないかもしれません。 WebGL を使用できる場合、古いスマートフォンをサポートするために、開発者はそのようなより多くのリソースを必要とする解決方法を選択していた可能性があります。

When it comes to JavaScript, you may have included toolkit libraries like jQuery for DOM selectors or polyfills like the `regenerator-runtime` to support `async/await`.

It is rare for a JavaScript-based polyfill to be faster than the equivalent native feature in Electron. Do not slow down your Electron app by shipping your own version of standard web platform features.

### どうすればいいの？

Operate under the assumption that polyfills in current versions of Electron are unnecessary. If you have doubts, check \[caniuse.com\]\[https://caniuse.com/\] and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

In addition, carefully examine the libraries you use. Are they really necessary? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available](http://youmightnotneedjquery.com/).

If you're using a transpiler/compiler like TypeScript, examine its configuration and ensure that you're targeting the latest ECMAScript version supported by Electron.


## 6) Unnecessary or blocking network requests

Avoid fetching rarely changing resources from the internet if they could easily be bundled with your application.

### なぜ？

Many users of Electron start with an entirely web-based app that they're turning into a desktop application. As web developers, we are used to loading resources from a variety of content delivery networks. Now that you are shipping a proper desktop application, attempt to "cut the cord" where possible
 - and avoid letting your users wait for resources that never change and could easily be included  in your app.

A typical example is Google Fonts. Many developers make use of Google's impressive collection of free fonts, which comes with a content delivery network. The pitch is straightforward: Include a few lines of CSS and Google will take care of the rest.

When building an Electron app, your users are better served if you download the fonts and include them in your app's bundle.

### どうすればいいの？

In an ideal world, your application wouldn't need the network to operate at all. To get there, you must understand what resources your app is downloading \- and how large those resources are.

To do so, open up the developer tools. Navigate to the `Network` tab and check the `Disable cache` option. Then, reload your renderer. Unless your app prohibits such reloads, you can usually trigger a reload by hitting `Cmd + R` or `Ctrl + R` with the developer tools in focus.

The tools will now meticulously record all network requests. In a first pass, take stock of all the resources being downloaded, focusing on the larger files first. Are any of them images, fonts, or media files that don't change and could be included with your bundle? If so, include them.

As a next step, enable `Network Throttling`. Find the drop-down that currently reads `Online` and select a slower speed such as `Fast 3G`. Reload your renderer and see if there are any resources that your app is unnecessarily waiting for. In many cases, an app will wait for a network request to complete despite not actually needing the involved resource.

As a tip, loading resources from the Internet that you might want to change without shipping an application update is a powerful strategy. For advanced control over how resources are being loaded, consider investing in [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## 7) Bundle your code

As already pointed out in "[Loading and running code too soon](#2-loading-and-running-code-too-soon)", calling `require()` is an expensive operation. If you are able to do so, bundle your application's code into a single file.

### なぜ？

Modern JavaScript development usually involves many files and modules. While that's perfectly fine for developing with Electron, we heavily recommend that you bundle all your code into one single file to ensure that the overhead included in calling `require()` is only paid once when your application loads.

### どうすればいいの？

There are numerous JavaScript bundlers out there and we know better than to anger the community by recommending one tool over another. We do however recommend that you use a bundler that is able to handle Electron's unique environment that needs to handle both Node.js and browser environments.

As of writing this article, the popular choices include [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), and [rollup.js](https://rollupjs.org/).
