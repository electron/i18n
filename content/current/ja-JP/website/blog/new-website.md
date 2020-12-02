---
title: "Electron の国際化された新しいサイト"
author: zeke
date: '2017-11-13'
---

Electron は [electronjs.org](https://electronjs.org)という新しいウェブサイトを作成しました。 静的なJekyllサイトで Node.js ウェブサーバーです。これによってサイトの国際化を柔軟に行い、よりエキサイティングな新機能が開発できるようになりました。

---

## 🌍 翻訳

私たちは、Electronアプリの開発を世界的なオーディエンスにアクセスできるようにするという目標を掲げて、ウェブサイトの国際化のプロセスを始めました。 [Crowdin](https://crowdin.com/project/electron) と呼ばれるローカライズプラットフォームを使用しており、これは GitHub を統合しています。 コンテンツが異なる言語に翻訳されるため、自動的にプルリクエストを開いたり更新したりします。

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="簡体字中国語で Electron Nav">
    <figcaption>簡体字中国語におけるElectronのナビゲーション</figcaption>
  </a>
</figure>

私たちはこれまで静かにこの取り組みを進めていました。75 人以上もの Electron コミュニティメンバーは、すでにプロジェクトを有機的に構築し、Web サイトの国際化と、Electron のドキュメントを 20 以上の言語に翻訳する取り組みに参加しています。 世界中の [デイリーの貢献者](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) 、特にフランス語、ベトナム語、インドネシア語、中国語の翻訳は、抜きんでています。

各言語を選択してその言語の翻訳の進捗状況を確認するには、 [electronjs.org/languages](https://electronjs.org/languages) を参照してください。

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Crowdin の現在の翻訳先言語">
    <figcaption>Crowdinで見た翻訳の進捗</figcaption>
  </a>
</figure>

あなたが複数の言語ができ、Electronのドキュメントやウェブサイトの翻訳を手伝うことに興味がある場合は、 [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) リポジトリにアクセスするか、 [Crowdin](https://crowdin.com/project/electron)で翻訳に参加してください。GitHub アカウントを使用してサインインできます。

Crowdin の Electron 翻訳プロジェクトで有効になっている言語は21あります。 新しい翻訳言語を追加するのは簡単です。あなたが翻訳の支援に興味があるが、あなたの言語がリストにない場合、[私達](https://github.com/electron/electronjs.org/issues/new) に知らせてください。すぐに有効にします。

## レンダリング前の翻訳のドキュメント

マークダウンファイルのドキュメントをそのまま読みたい場合、任意の言語で読めるようになりました。

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## アプリページ

今日では、Electronのサイトには、どのアプリでも Electron 独自のページを簡単に作成できます。 例えば、[Etcher](https://electronjs.org/apps/etcher)や [1Clipboard](https://electronjs.org/apps/1clipboard)や [GraphQL Playground](https://electronjs.org/apps/graphql-playground)があります。ここではサイトの日本語バージョンを表示しています。

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

そこにいくつかの信じられないほどの Electron アプリがありますが、これらはいつも簡単にみつけられるとは限りません。すべての開発者が市場に適切なウェブサイトを構築し、自分のアプリを配布するための時間やリソースを持っているわけではありません。

[PNG アイコンファイルとアプリメタデータが少しあれば](https://github.com/electron/electron-apps/blob/master/contributing.md)、特定のアプリに関する多くの情報を収集できます。GitHub から収集したデータで、公開リポジトリがある全アプリのスクリーンショット、ダウンロードリンク、バージョン、リリースノート、README をアプリページに表示できるようになりました。 各アプリのアイコンから抽出したカラーパレットを使用しつつ、[強調されたアクセシビリティの高い色](https://github.com/zeke/pick-a-good-color) を作成し、各アプリページに視覚の分別をつけることもできます。

[アプリのインデックスページ](https://electronjs.org/apps) には、[GraphQL GUI](https://electronjs.org/apps?q=graphql) や [p2p ツール](https://electronjs.org/apps?q=graphql) のような面白いアプリを見つけられるように、カテゴリとキーワードフィルタが追加されました。

サイトで紹介したい Electron アプリがある方は、[electron/electron-apps](https://github.com/electron/electron-apps) リポジトリでプルリクエストを開いてください。

## Homebrew を使った、ワンラインインストール

macOS のパッケージマネージャー [Homebrew](https://brew.sh) には [cask](https://caskroom.github.io) というサブコマンドがあります。`brew cask install atom` のようにすれば、ターミナル上のコマンド一つでデスクトップアプリを簡単にインストールできます。

一般的な Electron アプリの Homebrew Cask 名を収集し始め、 キャッシュを持つすべてのアプリページに インストールコマンドを表示するようになりました。

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>お使いのプラットフォームに合わせたインストールオプション: macOS, Windows, Linux</figcaption>
  </a>
</figure>

homebrew樽の名前を持つすべてのアプリを表示するには、 [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew) を参照してください。 インデックスを作成していない他のアプリがある場合、 [追加してください!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 新ドメイン

このサイトを electron.atom.io から新しいドメインに移動しました: [electronjs.org](https://electronjs.org)。

Electron プロジェクトは、ウェブ技術をベースにした GitHub のオープンソーステキストエディタ [Atom](https://atom.io) の中から生まれました。 Electron はもともと `atom-shell` と呼ばれていました。 最初に使用したアプリは Atom でしたが、ほどなくしてこの魔法のような Chromium + Node ランタイムがあらゆるタイプのアプリケーションにも利用できると気づきました。 Microsoft や Slack のような企業が `atom-shell` を利用し始めた頃、このプロジェクトには新しい名前が必要だろうということになりました。

そして "Electron" が生まれたのです。 2016 年の初め、GitHub は Atom と別に Electron の開発とメンテナンス特化の新チームを結成しました。 それ以来 Electron は何千ものアプリ開発者に採用されています。現在では多くの大企業に採用され、その多くが独自の Electron チームをも保有しています。

Atom や [GitHub Desktop](https://desktop.github.com) のような GitHub の Electron プロジェクトサポートも未だに私たちチームの優先事項です。しかし、新ドメインへの移行が Atom と Electron の技術的区別をより明確にできるであろうと願っています。

## 🐢🚀 どこでもNode.js

以前の Electron ウェブサイトは、Ruby ベースの静的サイト生成ツールとして人気の [Jekyll](https://jekyllrb.com) で構築していました。 Jekyll は静的ウェブサイトの構築に最適なツールですが、このウェブサイトではそれを使いこなせなくなり始めていました。 適切なリダイレクトや動的なコンテンツの描画等より動的な機能が欲しかったため、[Node.js](https://nodejs.org) サーバーは当然の選択でした。

Electron のエコシステムには、Python から C++ や Bash まで、さまざまなプログラミング言語で書かれたコンポーネントのプロジェクトが含まれています。 しかし Electron の基礎は JavaScript であり、私たちのコミュニティで最も使用されている言語です。

ウェブサイトを Ruby から Node.js に移行することで、ウェブサイトに貢献したい人の敷居を低くすることが目標です。

## ⚡️ より簡単になったオープンソースへの参加

もしあなたが v8またはそれ以降の [Node.js](https://nodejs.org) と[git](https://git-scm.org) があなたのシステムにインストールされているなら、ローカルにサイトを簡単に起動できます。

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

この新しいウェブサイトはHerokuでホストされています。 デプロイパイプラインと [アプリプレビュー](https://devcenter.heroku.com/articles/github-integration-review-apps) 機能を使用しています。これにより、プルリクエストごとにアプリの動作するコピーを自動作成できます。 これにより、査読者はサイトのライブコピーに プルリクエストの実際の効果を見ることが容易になります。

## 🙏 貢献者への感謝

私たちは、Electronを改善するために自分の時間とエネルギーを貢献してくれた世界中のすべての人々に感謝したいと思います。 オープンソースコミュニティへの情熱は、Electronの成功に、計り知れないほど貢献しています。 ありがとうございます!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>