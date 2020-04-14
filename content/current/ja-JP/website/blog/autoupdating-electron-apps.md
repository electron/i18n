---
title: オープンソースアプリの自動更新が簡単に
author: zeke
date: '2018-05-01'
---

本日、無料でオープンソースのホスト型 [更新ウェブサービス](https://github.com/electron/update.electronjs.org) と連携 [npm パッケージ](https://github.com/electron/update-electron-app) をリリースし、オープンソース Electron アプリの自動更新を簡単にできるようにします。 これにより、アプリ開発者がデプロイについて頭を悩ませずに済み、ユーザーへの高品質なエクスペリエンス開発について集中できます。

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="アップデータースクリーンショット">
    <figcaption>動作中の新しい更新モジュール</figcaption>
  </a>
</figure>

## 簡単に新しく

Electron には [autoUpdater](https://electronjs.org/docs/tutorial/updates) API があります。これはバックグラウンドで外部エンドポイントからメタデータを取得して、アプリのアップデートを確認し、自動的にインストールします。

こういった更新の有効化は、多くの Electron アプリ開発者にとってデプロイプロセスでの面倒な手順でした。アプリのバージョン履歴メタデータを提供するためだけに、ウェブサーバーを展開して維持する必要があるからです。

本日、アプリ自動更新の新しいドロップインソリューションを発表します。 Electron アプリが公開 GitHub リポジトリにあり、GitHub Releases を使用してビルドを公開している場合、このサービスでアプリの継続更新をユーザーに配布できます。

## 新モジュールの使い方

最小限の構成にするため、新しい [update.electronjs.org](https://github.com/electron/update.electronjs.org) ウェブサービスと統合する npm モジュール [update-electron-app](https://github.com/electron/update-electron-app) を作成しました。

モジュールのインストール

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

[electron-builder](https://github.com/electron-userland/electron-builder) でアプリをパッケージ化している場合、その組み込みアップデーターを使用できます。 詳細は、[electron.build/auto-update](https://www.electron.build/auto-update) を参照してください。

アプリが非公開の場合、独自の更新サーバーを実行する必要があります。 これには、Zeit の [Hazel](https://github.com/zeit/hazel) や Atlassian の [Nucleus](https://github.com/atlassian/nucleus) など、多くのオープンソースツールがあります。 さらなる情報は [更新サーバーのデプロイ](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) チュートリアルを参照してください。

## 謝辞

このシンプルでスケーラブルなウェブサービスの設計と構築を支援して頂いた [Julian Gruber](http://juliangruber.com/) に感謝します。 オープンソースの [Hazel](https://github.com/zeit/hazel) サービスを作った [Zeit](https://zeit.co) の方々に感謝します。このサービスからデザインのインスピレーションを得ました。 コードレビューをして下さった [Samuel Attard](https://www.samuelattard.com/) に感謝します。 このサービスのテストを支援してくれた Electron コミュニティに感謝します。

🌲 Electron アプリの未来はここに永遠の緑となった!