---
title: Electron のシンプルなサンプル
author: zeke
date: '2017-01-19'
---

先日、サンフランシスコにある女性のためのプログラミングスクール [Hackbright Academy](https://hackbrightacademy.com) の会員のために、 GitHub 本社で Electron ハッカソンを開催しました。 参加者がプロジェクトを開始しやすくするために、 [Kevin Sawicki](https://github.com/kevinsawicki) がいくつかのサンプル Electron アプリケーションを作ってくれました。

---

あなたが Electron での開発を始めたばかりか、まだ試したことないのであれば、これらのサンプルアプリケーションは良いスタートとなるでしょう。 小さく、読みやすく、丁寧にコメントされたコードがどのように動いているかを説明してくれます。

始めるには、このリポジトリをクローンします:

```sh
git clone https://github.com/electron/simple-samples
```

いずれかのアプリを起動するには、そのアプリのディレクトリに入り、依存をインストールして開始します:

```sh
cd activity-monitor
npm install
npm start
```

## アクティビティモニター

CPU におけるシステム、ユーザ、アイドル状態の時間をドーナツグラフで表示します。

[![スクリーンショット](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## ハッシュ

入力されたテキストのハッシュ値をいくつかのアルゴリズムを使って表示します。

[![スクリーンショット](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## ミラー

最大化されたサイズで、鏡を見ているかのようにコンピュータのカメラの映像を再生します。 任意で CSS アニメーションを利用した虹色フィルタ効果を含みます。

## 価格

Yahoo Finance API を用いて、現在の原油、金、銀の価格を表示します。

[![スクリーンショット](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

コマンドラインで渡された URL をウィンドウに表示します。

## その他の資料

Electron の利用を開始するためにこれらのアプリが役立つことを願います。 さらに学習するための便利な資料がこちらです:

- [electron-quick-start](https://github.com/electron/electron-quick-start): 最小の Electron アプリケーションテンプレート。
- [Electron API Demos](https://github.com/electron/electron-api-demos): Electron API のコア機能を試すためのインタラクティブアプリ。
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): すべての Electron ドキュメントが検索しやすい 1 ページに。
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Electron メンテナ [Haojian Wu](https://github.com/hokein) によってコンパイルされたサンプルアプリケーションたち。
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - 最新で最良の Electron に関するチュートリアル、本、動画などを集めた GitHub リポジトリ。