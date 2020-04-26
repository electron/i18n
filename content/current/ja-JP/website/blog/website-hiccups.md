---
title: Web サイトのしゃっくり
author: zeke
date: '2018-02-12'
---

先週、 [electronjs.org](https://electronjs.org) で数分間のダウンタイムが発生しました。 この短い停止による影響でご迷惑をおかけして申し訳ありません。 本日、少しの調査の後、根本の原因を診断し、 [修正](https://github.com/electron/electronjs.org/pull/1076) を行いました。

---

今後このようなダウンタイムを防ぐために、 [Heroku threshold alerts](https://devcenter.heroku.com/articles/metrics#threshold-alerting) をアプリで有効化しました。失敗したリクエストや遅いレスポンスが一定のしきい値を超えて蓄積されるたびに、私たちのチームに通知され、素早く問題に対応できます。

## すべての言語のオフラインドキュメント

あなたが Electron アプリを飛行機や地下のコーヒーショップで開発するとき、オフラインで参照するためにドキュメントのコピーが欲しい場合があるでしょう。 幸い、 20 以上の言語での Markdown ファイルによる Electron ドキュメントが利用可能です。

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## GUI でのオフラインドキュメント

[devdocs.io/electron](https://devdocs.io/electron/) は、 Electron だけでなく、 JavaScript 、 TypeScript 、 Node.js 、 React 、 Angular などのドキュメントを保存している便利な Web サイトです。 もちろん、参照するための Electron アプリもあります。 Electron サイトで [devdocs-app](https://electronjs.org/apps/devdocs-app) を参照してください。

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

アプリをマウスやトラックパッドなしでインストールしたい場合、 [Electron Forge](https://electronforge.io/) の `install` コマンドをお試しください:

```sh
npx electron-forge install egoist/devdocs-app
```