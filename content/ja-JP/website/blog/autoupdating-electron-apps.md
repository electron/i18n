---
title: オープンソースアプリの自動更新が簡単に
author: zeke
date: '2018-05-01'
---

本日、無料でオープンソースのホスト型 [更新ウェブサービス](https://github.com/electron/update.electronjs.org) と連携 [npm パッケージ](https://github.com/electron/update-electron-app) をリリースし、オープンソース Electron アプリの自動更新を簡単にできるようにします。 これにより、アプリ開発者がデプロイについて頭を悩ませずに済み、ユーザーへの高品質なエクスペリエンス開発について集中できます。

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Updater Screenshot">
    <figcaption>動作中の新しい更新モジュール</figcaption>
  </a>
</figure>

## 簡単に新しく

Electron には [autoUpdater](https://electronjs.org/docs/tutorial/updates) API があります。これはバックグラウンドで外部エンドポイントからメタデータを取得して、アプリのアップデートを確認し、自動的にインストールします。

こういった更新の有効化は、多くの Electron アプリ開発者にとってデプロイプロセスでの面倒な手順でした。アプリのバージョン履歴メタデータを提供するためだけに、ウェブサーバーを展開して維持する必要があるからです。

本日、アプリ自動更新の新しいドロップインソリューションを発表します。 Electron アプリが公開 GitHub リポジトリにあり、GitHub Releases を使用してビルドを公開している場合、このサービスでアプリの継続更新をユーザーに配布できます。

## 新モジュールの使い方

最小限の構成にするため、新しい [update.electronjs.org](https://github.com/electron/update.electronjs.org) ウェブサービスと統合する npm モジュール [update-electron-app](https://github.com/electron/update-electron-app) を作成しました。

モジュールは以下のようにインストールします。

```sh
npm install update-electron-app
```

アプリの [メインプロセス](https://electronjs.org/docs/glossary#main-process) 内のどこかで、以下を呼び出します。

```js
require('update-electron-app')()
```

これだけです! このモジュールはアプリの起動時に更新を確認し、その後 10 分ごとにも確認します。 更新があれば、バックグラウンドで自動的にダウンロードされ、更新準備が整うとダイアログが表示されます。

## 既存アプリの移行

既に Electron の autoUpdater API を使用しているアプリもこのサービスを使用できます。 移行するには、[`update-electron-app`](https://github.com/electron/update-electron-app)モジュールか、[update.electronjs.org と直接統合](https://github.com/electron/update.electronjs.org) します。

## 代替手段

If you're using [electron-builder](https://github.com/electron-userland/electron-builder) to package your app, you can use its built-in updater. For details, see [electron.build/auto-update](https://www.electron.build/auto-update).

If your app is private, you may need to run your own update server. There are a number of open-source tools for this, including Zeit's [Hazel](https://github.com/zeit/hazel) and Atlassian's [Nucleus](https://github.com/atlassian/nucleus). See the [Deploying an Update Server](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) tutorial for more info.

## Thanks

Thanks to [Julian Gruber](http://juliangruber.com/) for helping design and build this simple and scalable web service. Thanks to the folks at [Zeit](https://zeit.co) for their open-source [Hazel](https://github.com/zeit/hazel) service, from which we drew design inspiration. Thanks to [Samuel Attard](https://www.samuelattard.com/) for the code reviews. Thanks to the Electron community for helping test this service.

🌲 Here's to an evergreen future for Electron apps!