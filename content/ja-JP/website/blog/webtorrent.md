---
title: '今週のプロジェクト: WebTorrent'
author:
  - feross
  - zeke
date: '2017-03-14'
---

今週は [@feross](https://github.com/feross) と [@dcposch](https://github.com/dcposch) が WebTorrent についてお話しします。WebTorrent は、ユーザーをつなぎ合わせて分配された分散型ブラウザ間ネットワークを形成する、ウェブベースのトレントクライアントです。

---

## WebTorrent とは?

[WebTorrent](https://webtorrent.io) は、ブラウザーで動く初のトレントクライアントです。 全て JavaScript で書かれており、P2P 転送に WebRTC を使用できます。 ブラウザのプラグイン、拡張機能、インストールは不要です。

公開のウェブ標準を使用して、WebTorrent はウェブサイトのユーザーを結び付け、効率的なファイル転送のために分配された分散型ブラウザ間ネットワークを形成します。

WebTorrent の実際のデモは [webtorrent.io](https://webtorrent.io/) で見ることができます。

<a href="https://webtorrent.io/">
  <img alt="webtorrent homepage" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Why is this cool?

YouTube のようだけれども、訪問者がサイトコンテンツのホストを助けるビデオサイトを想像してください。 WebTorrent で強化されたウェブサイトは、利用者が多いほどより高速で強靭になります。

ブラウザ間通信は仲介者を排除し、人々が各々の条件で通信できます。 クライアント/サーバーは不要です。ピアのネットワークがあれば、みな平等です。 WebTorrent は、ウェブを再分散化する道程の初めの一歩です。

## Electron はどこに登場するのですか?

約 1 年前、デスクトップアプリ版 WebTorrent である [WebTorrent デスクトップ](https://webtorrent.io/desktop/) を作成することにしました。

[![WebTorrent Desktop player window](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

私たちは、以下の 3 つの理由の下に WebTorrent デスクトップを作りました。

1. 簡潔、軽量、広告なしのオープンソーストレントアプリが欲しい
2. 優良なストリーミングサポート付きトレントアプリが欲しい
3. BitTorrent と WebTorrent ネットワークを繋ぐ "ハイブリッドクライアント" が欲しい

## トレントは既にウェブブラウザでダウンロードできるのに、なぜデスクトップアプリなのですか?

初めに、WebTorrent 設計の背景を少しだけお話しましょう。

<a href="https://webtorrent.io/desktop/">
  <img alt="webtorrent desktop logo" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

黎明期の頃、BitTorrent は TCP を転送プロトコルとして使用していました。 その後、TCP よりも優れた性能と更なるメリットを持った uTP が登場しました。 すべての上流トレントクライアントは最終的に uTP を採用し、現在はどちらのプロトコルでも BitTorrent を使用できます。 WebRTC プロトコルは次の必然的な段階です。 すべてのデスクトップ BitTorrent クライアントと数百万のウェブブラウザで構成される 1 つの巨大な P2P ネットワーク — これはウェブブラウザとの相互運用性を保証します。

"ウェブピア" (ウェブブラウザで実行されるトレントピア) は、数百万の新しいピアを追加し、BitTorrent を多数の新しいユースケースに広めることで、BitTorrent ネットワークを強化します。 WebTorrent は、既存の BitTorrent クライアントが WebTorrent サポートを簡単に追加できるように、できるだけ BitTorrent 仕様に準拠しています。

[Vuze](https://www.vuze.com/) のような一部のトレントアプリはウェブピアを既にサポートしていますが、他のアプリのサポート追加を待ちたくはありませんでした。 **元来、WebTorrent デスクトップは WebTorrent プロトコルの採用を促進する手段でした。**誰もが使いたくなるような素晴らしいトレントアプリを作成することで、ウェブピア (ウェブサイト上のユーザなど) とトレントを共有できるネットワーク内のピア数を増やすのです。

## あまり知られていないような、興味深いトレントの用法はありますか?

WebTorrent の一番すごい用法というと、ピアアシスト配信でしょう。 [Wikipedia](https://www.wikipedia.org/) や [インターネットアーカイブ](https://archive.org/) などの非営利プロジェクトは、訪問者にリソースを提供してもらうことで帯域幅とホスティングコストを削減できます。 人気コンテンツは、ブラウザ間で迅速かつ安価に提供できます。 たまにしかアクセスされないコンテンツは、オリジンサーバーから HTTP 経由で確実に提供できます。

インターネットアーカイブはトレントファイルを実際に既に更新しているため、WebTorrent でうまく動作します。 なので、サイトにインターネットアーカイブのコンテンツを埋め込みたい場合でも、トレントでアーカイブのホスティングコストを削減し、アーカイブ側は実際にウェブをアーカイブすることに資金を注げます。

CDN から P2P を介したアプリ配信といった、面白いビジネスユースケースもあります。

## WebTorrent を使うお気に入りのプロジェクトはありますか?

![gaia app screenshot](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

WebTorrent で作られた一番すごいものといえば、間違いなく、[Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html) でしょう。 これは、ぬるぬる動く天の川の 3D インタラクティブシミュレーションです。 データはトレントから直接ブラウザに読み込まれます。 銀河系を飛び回り、私たち人間が宇宙の広大さに比べてどれだけ小さいかを実感すると同時に畏敬の念を抱きます。

この作成方法は、著者の Charlie Hoey が WebGL と WebTorrent で天体図を作成した方法を説明しているブログ記事 [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93) で読むことができます。

<a href="https://brave.com/">
  <img alt="brave logo" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

また、私たちは [Brave](https://brave.com/) の大ファンです。 Brave は、広告とトラッカーを自動的にブロックして、ウェブをより高速で安全にするブラウザです。 最近、Brave はトレントサポートを追加しました。そのため、[従来のトレントを外部アプリなしで閲覧](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/) できます。 この機能は WebTorrent で動作しています。

そのため、ほとんどのブラウザーが PDF ファイルを描画できるように、Brave はマグネットリンクとトレントファイルを描画できます。 これらは、ブラウザがネイティブでサポートするただの別種のコンテンツです。

なんと、Brave の共同創設者の 1 人は、WebTorrent の作成に使われた言語 JavaScript の作成者 Brendan Eich です。その Brave が WebTorrent 統合を選んだなんてとてもカッコよくないですか?

## Electron で WebTorrent デスクトップを構築することにしたのはなぜですか?

<a href="https://webtorrent.io/desktop/">
  <img alt="WebTorrent Desktop main window" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Electron アプリはすべてのアプリに Chrome コンテンツモジュール全体を含むため、"肥大化" していると言われています。これは、場合によっては部分的に当てはまります (Electron アプリインストーラーは通常 ~40MB ですが、OS 固有のアプリインストーラーでは通常 ~20MB)。

しかし、WebTorrent デスクトップの場合、Electron のほぼすべての機能を使用しますし、通常の操作では何十もの Chrome 機能を使用します。 プラットフォームごとにこれらの機能をゼロから実装していれば、アプリを構築するのに数ヶ月から数年かかるか、単一のプラットフォームでしかリリースできなかったでしょう。

アイデアを実現するため、Electron の [Dock 統合](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (ダウンロード進捗を表示)、[メニューバー統合](https://electronjs.org/docs/api/menu) (バックグラウンド実行)、[プロトコルハンドラーの登録](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (マグネットリンクを開く)、[powerSaveBlocker](https://electronjs.org/docs/api/power-save-blocker/) (映像再生中のスリープ防止)、[自動更新](https://electronjs.org/docs/api/auto-updater) といった機能を使用しました。 Chrome の機能については、`<video>` タグ (多種に渡る動画形式の再生)、`<track>` (字幕対応用)、ドラッグアンドドロップ対応、WebRTC (ネイティブアプリでの使用は難しい) など、色々と使用しています。

言うまでもなく、トレントエンジンは多くの Node API が存在することを前提とした JavaScript で記述されています。特に、`require('net')` と `require('dgram')` によって TCP と UDP ソケットをサポートしています。

Basically, Electron is just what we needed and had the exact set of features we needed to ship a solid, polished app in record time.

## What are your favorite things about Electron?

The WebTorrent library has been in development as an open source side project for two years. **We made WebTorrent Desktop in four weeks.** Electron is the primary reason that we were able to build and ship our app so quickly.

Just as Node.js made server programming accessible to a generation of jQuery-using front-end programmers, Electron makes native app development accessible to anyone familiar with Web or Node.js development. Electron is extremely empowering.

## Do the website and the Desktop client share code?

Yes, the [`webtorrent` npm package](https://npmjs.com/package/webtorrent) works in Node.js, in the browser, and in Electron. The exact same code can run in all environments – this is the beauty of JavaScript. It's today's universal runtime. Java Applets promised "Write Once, Run Anywhere" apps, but that vision never really materialized for a number of reasons. Electron, more than any other platform, actually gets pretty darn close to that ideal.

## What are some challenges you've faced while building WebTorrent?

In early versions of the app, we struggled to make the UI performant. We put the torrent engine in the same renderer process that draws the main app window which, predictably, led to slowness anytime there was intense CPU activity from the torrent engine (like verifying the torrent pieces received from peers).

We fixed this by moving the torrent engine to a second, invisible renderer process that we communicate with over [IPC](https://electronjs.org/docs/api/ipc-main/). This way, if that process briefly uses a lot of CPU, the UI thread will be unaffected. Buttery-smooth scrolling and animations are so satisfying.

Note: we had to put the torrent engine in a renderer process, instead of a "main" process, because we need access to WebRTC (which is only available in the renderer.)

## In what areas should Electron be improved?

One thing we'd love to see is better documentation about how to build and ship production-ready apps, especially around tricky subjects like code signing and auto-updating. We had to learn about best practices by digging into source code and asking around on Twitter!

## Is WebTorrent Desktop done? If not, what's coming next?

We think the current version of WebTorrent Desktop is excellent, but there's always room for improvement. We're currently working on improving polish, performance, subtitle support, and video codec support.

If you're interested in getting involved in the project, check out [our GitHub page](https://github.com/feross/webtorrent-desktop)!

## Any Electron development tips that might be useful to other developers?

[Feross](http://feross.org/), one of the WebTorrent Desktop contributors, recently gave a talk *"Real world Electron: Building Cross-platform desktop apps with JavaScript"* at NodeConf Argentina that contains useful tips for releasing a polished Electron app. The talk is especially useful if you're at the stage where you have a basic working app and you're trying to take it to the next level of polish and professionalism.

[Watch here](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Slides here](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), another WebTorrent contributor, wrote [a checklist of things you can do](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) to make your app feel polished and native. It comes with code examples and covers things like macOS dock integration, drag-and-drop, desktop notifications, and making sure your app loads quickly.

