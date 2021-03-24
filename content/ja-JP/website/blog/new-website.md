---
title: "Electron の新しい国際化されたサイト"
author: zeke
date: '2017-11-13'
---

Electron の新しいウェブサイトは [electronjs.org][] です! 静的な Jekyll サイトを Node.js ウェブサーバに置き換えました。これにより、サイトの国際化が柔軟になり、より魅力的な新機能への道が開かれました。

---

## 🌍 翻訳

私たちは、世界中の開発者が Electron アプリ開発に着手できることを目標に、ウェブサイトの国際化プロセスを開始しました。 私たちは [Crowdin][] という翻訳プラットフォームを使用しています。これは GitHub と統合されており、コンテンツが異なる言語に翻訳されると自動的にプルリクエストを開いて更新します。

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="簡体字中国語で Electron Nav">
    <figcaption>簡体字中国語における Electron のナビゲーションバー</figcaption>
  </a>
</figure>

私たちはこれまで静かにこの取り組みを進めていました。75 人以上もの Electron コミュニティメンバーは、すでにプロジェクトを有機的に構築し、Web サイトの国際化と、Electron のドキュメントを 20 以上の言語に翻訳する取り組みに参加しています。 世界中の [一日の貢献数](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) では、特にフランス語、ベトナム語、インドネシア語、中国語の翻訳が抜きんでています。

各言語を選択してその言語の翻訳の進捗状況を確認するには、 [electronjs.org/languages](https://electronjs.org/languages) を参照してください。

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Crowdin の現在の翻訳先言語">
    <figcaption>Crowdin 上の翻訳状況</figcaption>
  </a>
</figure>

マルチリンガルの方で Electron のドキュメントやウェブサイトの翻訳に興味があれば、[electron/electron-i18n][] のレポジトリにアクセスするか、[Crowdin][] ですぐに翻訳を始められます。

現在 Crowdin の Electron 翻訳プロジェクトで有効な言語は 21 つです。 さらなる言語のサポート追加は簡単ですので、翻訳に興味があるもの翻訳したい言語がリストにない場合は、[こちらからご連絡くだされば](https://github.com/electron/electronjs.org/issues/new) 有効にします。

## レンダリング前の翻訳のドキュメント

生の Markdown ファイルでドキュメントを読みたい場合でも、以下のようにすれば任意の言語で読むことができるようになりました。

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## アプリページ

本日から、どのような Electron アプリでも、独自のページをこのサイト上へ簡単に作成できます。 例えば、[Etcher](https://electronjs.org/apps/etcher)や [1Clipboard](https://electronjs.org/apps/1clipboard)や [GraphQL Playground](https://electronjs.org/apps/graphql-playground)があります。ここではサイトの日本語バージョンを表示しています。

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

Electron の素晴らしいアプリがいくつかありますが、それらを見つけるのは簡単ではありませんし、すべての開発者がアプリを市場に出して配布するために適切なウェブサイトを構築する時間やリソースを持っているわけではありません。

[PNG アイコンファイルとアプリメタデータが少しあれば](https://github.com/electron/electron-apps/blob/master/contributing.md)、特定のアプリに関する多くの情報を収集できます。 GitHub から収集したデータで、公開リポジトリがある全アプリのスクリーンショット、ダウンロードリンク、バージョン、リリースノート、README をアプリページに表示できるようになりました。 各アプリのアイコンから抽出したカラーパレットを使用しつつ、[強調されたアクセシビリティの高い色](https://github.com/zeke/pick-a-good-color) を作成し、各アプリページに視覚の分別をつけることもできます。

[アプリのインデックスページ](https://electronjs.org/apps) には、[GraphQL GUI](https://electronjs.org/apps?q=graphql) や [p2p ツール](https://electronjs.org/apps?q=graphql) のような面白いアプリを見つけられるように、カテゴリとキーワードフィルタが追加されました。

サイトで紹介したい Electron アプリがある方は、[electron/electron-apps][] リポジトリでプルリクエストを開いてください。

## Homebrew でワンラインインストール

macOS のパッケージマネージャー [Homebrew][] には [cask][] というサブコマンドがあります。`brew cask install atom` のようにすれば、ターミナル上のコマンド一つでデスクトップアプリを簡単にインストールできます。

一般的な Electron アプリの Homebrew Cask 名を収集し始め、 キャッシュを持つすべてのアプリページに インストールコマンドを表示するようになりました。

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>お使いのプラットフォームに合わせたインストールオプション: macOS, Windows, Linux</figcaption>
  </a>
</figure>

homebrew樽の名前を持つすべてのアプリを表示するには、 [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew) を参照してください。 インデックスを作成していない他のアプリがある場合、 [追加してください!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 新ドメイン

このサイトを electron.atom.io から新しいドメインに移動しました: [electronjs.org][]。

Electron プロジェクトは、ウェブ技術をベースにした GitHub のオープンソーステキストエディタ [Atom][] の中から生まれました。 Electron はもともと `atom-shell` と呼ばれていました。 最初に使用したアプリは Atom でしたが、ほどなくしてこの魔法のような Chromium + Node ランタイムがあらゆるタイプのアプリケーションにも利用できると気づきました。 Microsoft や Slack のような企業が `atom-shell` を利用し始めた頃、このプロジェクトには新しい名前が必要だろうということになりました。

そして "Electron" が生まれたのです。 2016 年の初め、GitHub は Atom と別に Electron の開発とメンテナンス特化の新チームを結成しました。 それ以来 Electron は何千ものアプリ開発者に採用されています。現在では多くの大企業に採用され、その多くが独自の Electron チームをも保有しています。

Atom や [GitHub Desktop][] のような GitHub の Electron プロジェクトサポートも未だに私たちチームの優先事項です。しかし、新ドメインへの移行が Atom と Electron の技術的区別をより明確にできるであろうと願っています。

## 🐢🚀 どこでもNode.js

以前の Electron ウェブサイトは、Ruby ベースの静的サイト生成ツールとして人気の [Jekyll][] で構築していました。 Jekyll は静的ウェブサイトの構築に最適なツールですが、このウェブサイトではそれを使いこなせなくなり始めていました。 適切なリダイレクトや動的なコンテンツの描画等より動的な機能が欲しかったため、[Node.js][] サーバーは当然の選択でした。

Electron のエコシステムには、Python から C++ や Bash まで、さまざまなプログラミング言語で書かれたコンポーネントのプロジェクトが含まれています。 しかし Electron の基礎は JavaScript であり、私たちのコミュニティで最も使用されている言語です。

ウェブサイトを Ruby から Node.js に移行することで、ウェブサイトに貢献したい人の敷居を低くすることが目標です。

## ⚡️ より簡単になったオープンソースへの参加

[Node.js][] (8以上) と [git](https://git-scm.org) をインストールしていれば、ローカルで簡単にサイトを動かせます。

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

この新しいウェブサイトはHerokuでホストされています。 デプロイパイプラインと [アプリプレビュー](https://devcenter.heroku.com/articles/github-integration-review-apps) 機能を使用しています。これにより、プルリクエストごとにアプリの動作するコピーを自動作成できます。 これにより、査読者はサイトのライブコピーに プルリクエストの実際の効果を見ることが容易になります。

## 🙏 貢献者への感謝

Electron の改善に時間と労力を提供してくださった世界中の皆様に特別な感謝の意を表したいと思います。 オープンソースコミュニティの情熱が Electron の成功を大きく支えています。 ありがとうございます!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>
[Atom]: https://atom.io
[cask]: https://caskroom.github.io
[Crowdin]: https://crowdin.com/project/electron
[electron/electron-apps]: https://github.com/electron/electron-apps
[electron/electron-i18n]: https://github.com/electron/electron-i18n#readme
[electronjs.org]: https://electronjs.org
[GitHub Desktop]: https://desktop.github.com
[Homebrew]: https://brew.sh
[Jekyll]: https://jekyllrb.com
[Node.js]: https://nodejs.org