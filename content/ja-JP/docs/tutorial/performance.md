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
2. [Loading and running code too soon](#2-loading-and-running-code-too-soon)
3. [Blocking the main process](#3-blocking-the-main-process)
4. [Blocking the renderer process](#4-blocking-the-renderer-process)
5. [Unnecessary polyfills](#5-unnecessary-polyfills)
6. [Unnecessary or blocking network requests](#6-unnecessary-or-blocking-network-requests)
7. [Bundle your code](#7-bundle-your-code)

## 1) 迂闊なモジュール採用

Node.js モジュールをアプリケーションに追加する前に、そのモジュールを調べましょう。 そのモジュールにはどれだけの依存関係が含まれているのか? どの種類のリソースが、単に `require()` 文で呼び出す必要があるのか? NPM パッケージレジストリでダウンロード数が最も多かったり GitHub で最もスターの数が多かったりするモジュールは、実際には利用可能なもののうち最もすっきりとした最小のものではない場合があります。

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

## 2) Loading and running code too soon

重いセットアップ操作がある場合は、それらを後回しすることを検討してください。 アプリケーションの起動直後に実行されているすべての作業を調べます。 すべての操作をすぐに実行するのではなく、ユーザーの行程により近い順序で操作をずらすことを検討してください。

従来の Node.js 開発では、すべての `require()` ステートメントを先頭に配置する慣習がありました。 いま同じ戦略を使用 _しつつ_ すぐ必要ではないサイズの大きいモジュールを使用している Electron アプリケーションを作成している場合、同じ戦略のうえで、より適切なタイミングで読み込むように後回しします。

### なぜ？

モジュールのロードは、特に Windows では驚くほど重い操作です。 アプリの起動時に、ユーザーに現在必要のない操作で待たせてはなりません。

これは当たり前のように思えるかもしれませんが、多くのアプリケーションは、更新の確認、後のフローで使用されるコンテンツのダウンロード、重いディスク I/O 操作の実行など、アプリの起動直後に大量の作業を行う傾向があります。

Let's consider Visual Studio Code as an example. When you open a file, it will immediately display the file to you without any code highlighting, prioritizing your ability to interact with the text. Once it has done that work, it will move on to code highlighting.

### どうすればいいの？

Let's consider an example and assume that your application is parsing files in the fictitious `.foo` format. In order to do that, it relies on the equally fictitious `foo-parser` module. In traditional Node.js development, you might write code that eagerly loads dependencies:

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

In the above example, we're doing a lot of work that's being executed as soon as the file is loaded. Do we need to get parsed files right away? Could we do this work a little later, when `getParsedFiles()` is actually called?

```js
// "fs" is likely already being loaded, so the `require()` call is cheap
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk as soon as `getFiles` is called, not sooner.
    // Also, ensure that we're not blocking other operations by using
    // the asynchronous version.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Since `require()` comes with a module cache, the `require()` call
    // will only be expensive once - subsequent calls of `getParsedFiles()`
    // will be faster.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// This operation is now a lot cheaper than in our previous example
const parser = new Parser()

module.exports = { parser }
```

In short, allocate resources "just in time" rather than allocating them all when your app starts.

## 3) Blocking the main process

Electron's main process (sometimes called "browser process") is special: It is the parent process to all your app's other processes and the primary process the operating system interacts with. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Under no circumstances should you block this process and the UI thread with long-running operations. Blocking the UI thread means that your entire app will freeze until the main process is ready to continue processing.

### なぜ？

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. If your window is rendering a buttery-smooth animation, it'll need to talk to the GPU process about that – once again going through the main process.

Electron and Chromium are careful to put heavy disk I/O and CPU-bound operations onto new threads to avoid blocking the UI thread. You should do the same.

### どうすればいいの？

Electron's powerful multi-process architecture stands ready to assist you with your long-running tasks, but also includes a small number of performance traps.

1) For long running CPU-heavy tasks, make use of [worker threads](https://nodejs.org/api/worker_threads.html), consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Avoid using the synchronous IPC and the `remote` module as much as possible. While there are legitimate use cases, it is far too easy to unknowingly block the UI thread using the `remote` module.

3) Avoid using blocking I/O operations in the main process. In short, whenever core Node.js modules (like `fs` or `child_process`) offer a synchronous or an asynchronous version, you should prefer the asynchronous and non-blocking variant.


## 4) Blocking the renderer process

Since Electron ships with a current version of Chrome, you can make use of the latest and greatest features the Web Platform offers to defer or offload heavy operations in a way that keeps your app smooth and responsive.

### なぜ？

Your app probably has a lot of JavaScript to run in the renderer process. The trick is to execute operations as quickly as possible without taking away resources needed to keep scrolling smooth, respond to user input, or animations at 60fps.

Orchestrating the flow of operations in your renderer's code is particularly useful if users complain about your app sometimes "stuttering".

### どうすればいいの？

Generally speaking, all advice for building performant web apps for modern browsers apply to Electron's renderers, too. The two primary tools at your disposal  are currently `requestIdleCallback()` for small operations and `Web Workers` for long-running operations.

*`requestIdleCallback()`* allows developers to queue up a function to be executed as soon as the process is entering an idle period. It enables you to perform low-priority or background work without impacting the user experience. For more information about how to use it, [check out its documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

*Web Workers* are a powerful tool to run code on a separate thread. There are some caveats to consider – consult Electron's [multithreading documentation](./multithreading.md) and the [MDN documentation for Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). They're an ideal solution for any operation that requires a lot of CPU power for an extended period of time.


## 5) Unnecessary polyfills

One of Electron's great benefits is that you know exactly which engine will parse your JavaScript, HTML, and CSS. If you're re-purposing code that was written for the web at large, make sure to not polyfill features included in Electron.

### なぜ？

When building a web application for today's Internet, the oldest environments dictate what features you can and cannot use. Even though Electron supports well-performing CSS filters and animations, an older browser might not. Where you could use WebGL, your developers may have chosen a more resource-hungry solution to support older phones.

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
