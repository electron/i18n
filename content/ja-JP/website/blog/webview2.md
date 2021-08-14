---
title: WebView2 と Electron
author:
  - electron
date: '2021-07-22'
---

この数週間で、新しい [WebView2](https://docs.microsoft.com/en-us/microsoft-edge/webview2/) と Electron の違いについていくつかご質問をいただきました。

両チームとも、ウェブ技術をデスクトップ上で最高のものにするという目標を掲げているため、共通点の総合的な比較を検討してみましょう。

Electron と WebView2 は、行動が早く、常に進化しているプロジェクトです。 現在の Electron と WebView2 の共通点と相違点を簡単にまとめてみました。

---

## アーキテクチャの概要

Electron と WebView2 はどちらも、ウェブコンテンツのレンダリングに Chromium ソースを使用しています。 厳密には WebView2 は Edge のソースからビルドされています。しかし、Edge は Chromium のソースをフォークしてビルドされています。 Electron は Chrome と DLL を共有していません。 WebView2 のバイナリは、Edge (Edge 90 の安定チャンネル) をハードリンクしているので、ディスクや一部の動作セットを共有しています。 詳細は [Evergreen ディストリビューションモード](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution#evergreen-distribution-mode) をご参照ください。

Electron アプリは、常に開発時のバージョンの Electron をバンドルして頒布しています。 WebView2 では、頒布にあたって 2 つの選択肢があります。 アプリケーションが開発された WebView2 ライブラリをそのままバンドルすることもできますし、システム上に既存の共有ランタイム版を使用することもできます。 WebView2 は、共有ランタイムが見つからない場合のブートストラップインストーラーを含む、各手段向けのツールを提供しています。 WebView2 は、Windows 11 から _標準で_ 付属します。

フレームワークをバンドルしているアプリケーションは、マイナーなセキュリティリリースを含め、そのフレームワークをアップデートする責任があります。 共有 WebView2 ランタイムを使用しているアプリの場合、WebView2 には Chrome や Edge に似た独自の更新機能が用意されており、アプリとは独立して実行されます。 Electron と同じく、アプリケーションのコードやその他の依存関係の更新は開発者の責任です。 Electron も WebView2 も Windows Update では管理されません。

Electron と WebView2 は、どちらも Chromium のマルチプロセスアーキテクチャを継承しています。つまり、1 つのメインプロセスが 1 つ以上のレンダラープロセスと通信します。 これらのプロセスは、システム上で動作している他のアプリケーションと完全に分離されます。 すべての Electron アプリケーションは、ルートのブラウザプロセス、いくつかのユーティリティプロセス、0 個以上のレンダープロセスを含む、独立したプロセスツリーを構成します。 同じ [ユーザーデータフォルダ](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/user-data-folder) を使用している WebView2 アプリ (スイートアプリのようなもの) は、レンダラープロセス以外を共有します。 異なるデータフォルダを使用している WebView2 アプリは、プロセスを共有しません。

* ElectronJS プロセスモデル:

    ![ElectronJS Process Model Diagram](/images/Electron-Architecture.png)
* WebView2 ベースのアプリケーションプロセスモデル:

    ![WebView2 Process Model Diagram](/images/WebView2-Architecture.png)

[WebView2 のプロセスモデル](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/process-model) と [Electron のプロセスモデル](https://www.electronjs.org/docs/tutorial/process-model) についてはこちらをご覧ください。

Electron は、メニュー、ファイルシステムへのアクセス、通知など、デスクトップアプリケーションの一般的需要に応える API を提供します。 WebView2 は、WinForms、WPF、WinUI、Win32 などのアプリケーションフレームワークに統合されることを目的としたコンポーネントです。 WebView2 は JavaScript によるウェブ規格外の OS API を提供しません。

Electron は Node.js を統合しています。 Electron アプリケーションは、レンダラープロセスやメインプロセスから Node.js API、モジュール、Node ネイティブアドオンを利用できます。 WebView2 アプリケーションは、アプリケーションの他の部分が書かれている言語やフレームワークを前提にしていません。 JavaScript コードからオペレーティングシステムへアクセスするには、アプリケーションホストプロセスを介する必要があります。

Electron は、[Fugu Project](https://fugu-tracker.web.app/) が開発した API を含むウェブ API との互換性を維持するよう努めています。 [こちらに Electron の Fugu API 対応状況のスナップショット](https://docs.google.com/spreadsheets/d/1APQalp8HCa-lXVOqyul369G-wjM2RcojMujgi67YaoE/edit?usp=sharing) を用意しました。 WebView2 では、[Edge との API の違い](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/browser-features) について同様のリストを作成しています。

Electron でのウェブコンテンツのセキュリティモデルは、フルアクセスからフルサンドボックスまで設定可能です。 WebView2 のコンテンツは常にサンドボックス化されます。 Electron はセキュリティモデルの選択について、[包括的なセキュリティドキュメント](https://www.electronjs.org/docs/tutorial/security) を用意しています。 WebView2 にも [セキュリティのベストプラクティス](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/security) が用意されています。

Electron のソースは GitHub 上でメンテンスされており、自由に利用できます。 アプリケーションは、Electron の独自 _ブランド_ を構築できるように変更を加えられます。 WebView2 のソースは GitHub 上で利用できません。

簡単な概要:

|                     |        Electron |             WebView2 |
| ------------------- | ---------------:| --------------------:|
| ビルドの依存関係            |        Chromium |                  エッジ |
| GitHub 上でコードが利用可能   |              あり |                   なし |
| Edge/Chrome DLL の共有 |              なし |     あり (Edge 90 のもの) |
| アプリケーション間でのランタイム共有  |              なし |                   任意 |
| アプリケーション API        |              あり |                   なし |
| Node.js             |              あり |                   なし |
| サンドボックス             |              任意 |                   常時 |
| アプリケーションフレームワークの必要性 |              なし |                   あり |
| サポートされているプラットフォーム   | Mac, Win, Linux | Win (Mac/Linux は計画中) |
| アプリ間でのプロセス共有        |              なし |                   任意 |
| フレームワークの更新機構        |        アプリケーション |             WebView2 |

## パフォーマンスの議論

ウェブコンテンツのレンダリングに関しては、Electron、WebView2、その他 Chromium ベースのレンダラーの間におけるパフォーマンスの差はほとんどないと考えています。 私たちは、潜在的なパフォーマンスの違いを調査するご興味のある方向けに [Electron、C++ + WebView2、C# + WebView2 で構築したアプリの土台](https://github.com/crossplatform-dev/xplat-challenges) を作成しました。

ウェブコンテンツのレンダリング _以外_ にもいくつかの違いがあり、Electron、WebView2、Edge などの関係者は、PWA を含めた詳細な比較を行うことに興味を示しています。

### プロセス間通信 (IPC)

_プロセス間通信は、Electron アプリでのパフォーマンスを考慮する必要があるでしょう。これにはすぐに強調すべき違いがあります。_

Chromium では、サンドボックス化したレンダラーとシステムの他の部分との間で、ブラウザプロセスが IPC ブローカーとして機能します。 While Electron allows unsandboxed render processes, many apps choose to enable the sandbox for added security. WebView2 always has the sandbox enabled, so for most Electron and WebView2 apps IPC can impact overall performance.

Even though Electron and WebView2 have a similar process models, the underlying IPC differs. Communicating between JavaScript and C++ or C# requires [marshalling](https://en.wikipedia.org/wiki/Marshalling_(computer_science)), most commonly to a JSON string. JSON serialization/parsing is an expensive operation, and IPC-bottlenecks can negatively impact performance. Starting with Edge 93, WV2 will use [CBOR](https://en.wikipedia.org/wiki/CBOR) for network events.

Electron supports direct IPC between any two processes via the [MessagePorts](https://www.electronjs.org/docs/latest/tutorial/message-ports) API, which utilize [the structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm). Applications which leverage this can avoid paying the JSON-serialization tax when sending objects between processes.

## 概要

Electron and WebView2 have a number of differences, but don't expect much difference with respect to how they perform rendering web content. Ultimately, an app’s architecture and JavaScript libraries/frameworks have a larger impact on memory and performance than anything else because _Chromium is Chromium_ regardless of where it is running.

Special thanks to the WebView2 team for reviewing this post, and ensuring we have an up-to-date view of the WebView2 architecture. They welcome any [feedback on the project](https://github.com/MicrosoftEdge/WebView2Feedback).
