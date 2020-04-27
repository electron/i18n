---
title: Electron 1.0
author: jlord
date: '2016-05-11'
---

過去2年間、Electron は HTML、CSS、JavaScript を使用したクロスプラットフォームのデスクトップアプリケーション開発を支援してきました。 私たちのフレームワークと、それを作成したコミュニティで大きな節目を共にできるということで興奮しています。 Electron 1.0 のリリースは [electronjs.org](https://electronjs.org) からご覧いただけます。

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0 は、API の安定性と成熟度における大きな節目です。 このリリースでは Windows、Mac、Linux 上で真にネイティブに近い動作のアプリを構築できます。 新しいドキュメント、新しいツール、新しい Electron API 概略アプリにより、Electron アプリの構築がこれまで以上に簡単になりました。

初めての Electron アプリを素早く構築するには [クイックスタートガイド](https://electronjs.org/docs/tutorial/quick-start) を参照してください。

Electron で次に何を作るのか、楽しみにしています。

## Electron の道のり

私たちは 2 年と少し前に [Atom](https://atom.io) を立ち上げた時に Electron をリリースしました。 当初 Atom Shell という名前だった Electron は、Atom のために構築したフレームワークでした。 当時の Atom は Electron が提供する特色と機能性のきっかけを生み、Atom の初期リリースを後押ししていました。

いま Electron を突き動かしているのは、[メール](https://nylas.com)、[チャット](https://slack.com)、[Git アプリ](https://www.gitkraken.com) から、[SQL 分析ツール](https://www.wagonhq.com)、[torrent クライアント](https://webtorrent.io/desktop)、[ロボット](https://www.jibo.com) まで、あらゆる開発者や企業のコミュニティの成長です。

この 2 年間、企業とオープンソースプロジェクトの両方で、アプリケーション基盤として Electron が採用されています。 この 1 年間で、Electron は 120 万回以上ダウンロードされています。 素晴らしい Electron アプリを [こちらでご紹介](https://electronjs.org/apps) します。あなたのアプリがまだない場合は追加しましょう。

![Electron のダウンロード数](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Electron API デモ

1.0 のリリースに合わせて、Electron API を調べたり、Electron アプリをネイティブ風にする方法の詳細を学べる新アプリをリリースします。 [Electron API デモ](https://github.com/electron/electron-api-demos) アプリには、アプリの立ち上げに役立つコードスニペットと、Electron API を効果的に使うヒントが入っています。

[![Electron API デモ](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)](https://github.com/electron/electron-api-demos)

## Devtron

Electron アプリのデバッグに役立つ新しい拡張機能も追加しました。 [Devtron](https://electronjs.org/devtron) はオープンソース拡張機能です。[Chrome デベロッパー ツール](https://developer.chrome.com/devtools) の拡張で、Electron アプリのインスペクト、デバッグ、トラブルシューティングを支援する設計です。

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)](https://electronjs.org/devtron)

### 特徴

  * **Require グラフ** は、メインプロセスとレンダラープロセス両方の、アプリの内部と外部ライブラリとの依存関係の視覚化に役立ちます。
  * **IPC モニタ** は、アプリ内のプロセス間で送受信されたメッセージを追跡して表示します。
  * **イベントインスペクタ** は window、app、process などのコア Electron API にアプリが登録しているイベントやリスナーを表示します。
  * **アプリリンター** はあなたのアプリのよくある間違いや機能の欠損をチェックします。

## Spectron

最後に、Electron アプリの統合テストフレームワーク [Spectron](https://electronjs.org/spectron) の新バージョンをリリースします。

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)](https://electronjs.org/spectron)

Spectron 3.0 は Electron API 全体を包括的にサポートするため、さまざまなシナリオや環境でアプリケーションを動作検証するテストを、より迅速に記述できます。 Spectron は [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver)と[WebDriverIO](http://webdriver.io) をベースにしているため、ページナビゲーション、ユーザー入力、JavaScript 実行といった API も備えています。

## コミュニティ

Electron 1.0 は、何百人もの開発者によるコミュニティの努力の成果です。 コアフレームワーク以外では、Electron アプリの構築、パッケージ、デプロイを容易にするライブラリやツールが何百とリリースされています。

新しい [コミュニティ](https://electronjs.org/community) ページでは、開発中の素晴らしい Electron のツール、アプリ、ライブラリ、フレームワークを多数掲載しています。 [Electron](https://github.com/electron) や [Electron Userland](https://github.com/electron-userland) といった Organization を覗けば、こういった素晴らしいプロジェクトをいくつか見られます。

Electron は初めてですか? Electron 1.0 の紹介ビデオはこちらです。

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>

