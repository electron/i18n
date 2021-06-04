---
title: 'Electron の舞台裏: メッセージループの統合'
author: zcbenz
date: '2016-07-28'
---

Electron の舞台裏について説明するシリーズ、第一弾です。 この投稿では、 Electron が Node のイベントループをどのように Chromium と統合しているかを紹介します。

---

これまで、Node を GUI プログラミングに使う試みは数多くありました。GTK+ のバインディングでは [node-gui][node-gui] が、 Qt のバインディングでは [node-qt][node-qt] があります。 しかし、GUI ツールキットは独自のメッセージループを持っているにもかかわらず、Node は独自のイベントループに libuv を使用しています。メインスレッドは同時に 1 つのループしか実行できないため、本番環境ではどちらも動作しません。 そのために、Node で GUI のメッセージループを共通化して実行するための仕掛けとして非常に短い間隔のタイマーでメッセージループをポンピングすると、GUI のレスポンスが遅くなり、多くの CPU リソースを占有してしまいます。

Electron の開発中にも同じ問題が発生しましたが、 Node のイベントループを Chromium のメッセージループに統合するという、逆の方法を取りました。

## メインプロセスとレンダラープロセス

メッセージループの統合についての詳細の前に、 Chromium のマルチプロセスアーキテクチャについて説明します。

Electron には、メインプロセスとレンダラープロセス、2 種類のプロセスがあります (これはとても単純化してあります。詳細は [マルチプロセスアーキテクチャ][multi-process] を参照してください)。 メインプロセスはウインドウの作成など GUI が動作するための責務を担い、レンダラープロセスはウェブページの実行とレンダリングだけを行います。

Electron では JavaScript を使ってメインプロセスとレンダラープロセスの両方を制御できるように、両方のプロセスに Node を統合する必要があるのです。

## Chromium のメッセージループを libuv に置換

最初の試みは、 Chromium のメッセージループを libuv で再実装することでした。

レンダラープロセスは、メッセージループはファイル記述子とタイマーだけをリッスンしていたので簡単でした。

しかし、メインプロセスではとても困難でした。 各プラットフォームは独自の GUI メッセージループを持ちます。 macOS の Chromium は `NSRunLoop` を使う一方、 Linux では glib を使います。 ネイティブ GUI のメッセージループからファイル記述子を抽出して libuv の繰り返しに与えるために多くのハックを試みましたが、それでもうまくいかないエッジケースに遭遇しました。

最終的に、短い間隔で GUI メッセージループをポーリングするタイマーを追加しました。 この結果、プロセスは一定の CPU 使用率を消費し、操作によっては長い遅延が発生してしまいました。

## 別のスレッドで Node のイベントループをポーリング

libuv が成熟するにつれて、別のアプローチができるようになりました。

libuv にバックエンドファイル記述子の概念が導入されました。これは libuv がイベントループのためにポーリングするファイル記述子 (またはハンドル) です。 バックエンドファイル記述子をポーリングすることで、 libuv で新しいイベントが発生したときに通知を受けられるようになりました。

そこで Electron では、バックエンドファイル記述子をポーリングするために別のスレッドを作成しました。これは libuv API の代わりにシステムコールでポーリングしていたのでスレッドセーフでした。 そして、 libuv のイベントループで新しいイベントがあるとき、メッセージが Chromium のメッセージループに送信され、 libuv のイベントはメインスレッドで処理されるようになりました。

このようにして、 Chromium や Node にパッチを当てることを避けつつ、メインプロセスとレンダラープロセスで同じコードを使用できました。

## コード

メッセージループの統合の実装は [`electron/atom/common/`][node-bindings] 下の `node_bindings` ファイルで見ることができます。 これは Node を統合したいプロジェクトでも簡単に再利用できます。

*更新: 実装を [`electron/shell/common/node_bindings.cc`][node-bindings-updated] に移動しました。*

[node-gui]: https://github.com/zcbenz/node-gui
[node-qt]: https://github.com/arturadib/node-qt
[multi-process]: http://dev.chromium.org/developers/design-documents/multi-process-architecture
[node-bindings]: https://github.com/electron/electron/tree/main/atom/common
[node-bindings-updated]: https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc
