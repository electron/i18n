# はじめに

Electron ドキュメントへようこそ！ 初めて Electron アプリを開発する方は、このはじめにを読んで基本的な知識を身につけてください。 そうでない方は、ガイドや API ドキュメントもご利用ください！

## Electron とは何ですか?

Electron は、JavaScript、HTML、CSS によるデスクトップアプリケーションを構築するフレームワークです。 Electron は [Chromium][chromium] と [Node.js][node] をバイナリに組み込むことで、単一の JavaScript コードベースを維持しつつ、ネイテイブ開発経験無しでも Windows、macOS、Linux で動作するクロスプラットフォームアプリを作成できます。

## 必要な環境

このドキュメントは、読者が Node.js と一般的なウェブ開発の両方に精通していることを前提にしています。 これらの分野のいずれかに精通しておきたい方は、以下のリソースをお勧めします。

* [ウェブ入門 (MDN)][mdn-guide]
* [Introduction to Node.js][node-guide]

また、Chromium のプロセスモデルを知っていると Electron の仕組みをより理解しやすくなります。 2008 年の Chrome 発表と同時に公開された [Chrome 漫画][comic] には、Chrome のアーキテクチャの概要が載っています。 その公開から 10 年以上経っていますが、この漫画で紹介された基本原理は Electron の理解に役立ちます。

## Electron Fiddle でサンプルを動かす

[Electron Fiddle][fiddle] は Electron で書かれたサンドボックスアプリで、Electron のメンテナがサポートしています。 Electron の API を試したり開発中の機能を試作するための学習ツールとして、インストールを強く推奨します。

また、Fiddle はドキュメントとうまく統合してあります。 チュートリアルのサンプルを見ていると、コードブロックの下に "Electron Fiddle で開く" ボタンが表示されていることがよくあります。 Fiddle がインストールされている場合、このボタンを押すと `fiddle.electronjs.org` のリンクが開き、コピーペーストせずとも自動的に Fiddle にサンプルがロードされます。

## ヘルプチャンネル

どこかで行き詰まってしまいましたか? こちらに、ご覧いただきたいリンクがいくつかあります。

* アプリ開発で助けを求めたい場合、[コミュニティ Discord サーバー][discord] で他の Electron アプリ開発者からアドバイスを受けることができます。
* `electron` パッケージのバグが疑われる場合は、[GitHub Issue トラッカー][issue-tracker] で既存の Issue とあなたの Issue に合致するものがないかご確認ください。 もし無ければ、バグレポートのテンプレートに記入し、新しい Issue をご提出ください。

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
