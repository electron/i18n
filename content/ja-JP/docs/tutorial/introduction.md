# はじめに

Electron ドキュメントへようこそ！ 初めて Electron アプリを開発する方は、このはじめにを読んで基本的な知識を身につけてください。 そうでない方は、ガイドや API ドキュメントもご利用ください！

## Electron とは何ですか?

Electron は、JavaScript、HTML、CSS によるデスクトップアプリケーションを構築するフレームワークです。 By embedding [Chromium][chromium] and [Node.js][node] into its binary, Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

## 必要な環境

このドキュメントは、読者が Node.js と一般的なウェブ開発の両方に精通していることを前提にしています。 これらの分野のいずれかに精通しておきたい方は、以下のリソースをお勧めします。

* [Getting started with the Web (MDN)][mdn-guide]
* [Introduction to Node.js][node-guide]

また、Chromium のプロセスモデルを知っていると Electron の仕組みをより理解しやすくなります。 You can get a brief overview of Chrome architecture with the [Chrome comic][comic], which was released alongside Chrome's launch back in 2008. その公開から 10 年以上経っていますが、この漫画で紹介された基本原理は Electron の理解に役立ちます。

## Electron Fiddle でサンプルを動かす

[Electron Fiddle][fiddle] is a sandbox app written with Electron and supported by Electron's maintainers. Electron の API を試したり開発中の機能を試作するための学習ツールとして、インストールを強く推奨します。

また、Fiddle はドキュメントとうまく統合してあります。 チュートリアルのサンプルを見ていると、コードブロックの下に "Electron Fiddle で開く" ボタンが表示されていることがよくあります。 Fiddle がインストールされている場合、このボタンを押すと `fiddle.electronjs.org` のリンクが開き、コピーペーストせずとも自動的に Fiddle にサンプルがロードされます。

## ヘルプチャンネル

どこかで行き詰まってしまいましたか? こちらに、ご覧いただきたいリンクがいくつかあります。

* If you need help with developing your app, our [community Discord server][discord] is a great place to get advice from other Electron app developers.
* If you suspect you're running into a bug with the `electron` package, please check the [GitHub issue tracker][issue-tracker] to see if any existing issues match your problem. もし無ければ、バグレポートのテンプレートに記入し、新しい Issue をご提出ください。

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
