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
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav in Simplified Chinese">
    <figcaption>簡体字中国語におけるElectronのナビゲーション</figcaption>
  </a>
</figure>

私たちはこれまで静かにこの取り組みを進めていました。75 人以上もの Electron コミュニティメンバーは、すでにプロジェクトを有機的に構築し、Web サイトの国際化と、Electron のドキュメントを 20 以上の言語に翻訳する取り組みに参加しています。 世界中の [デイリーの貢献者](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) 、特にフランス語、ベトナム語、インドネシア語、中国語の翻訳は、抜きんでています。

各言語を選択してその言語の翻訳の進捗状況を確認するには、 [electronjs.org/languages](https://electronjs.org/languages) を参照してください。

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Current target languages on Crowdin">
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

Using just a [PNG icon file and a small amount of app metadata](https://github.com/electron/electron-apps/blob/master/contributing.md), we're able to collect a lot of information about a given app. Using data collected from GitHub, app pages can now display screenshots, download links, versions, release notes, and READMEs for every app that has a public repository. Using a color palette extracted from each app's icon, we can produce [bold and accessible colors](https://github.com/zeke/pick-a-good-color) to give each app page some visual distinction.

The [apps index page](https://electronjs.org/apps) now also has categories and a keyword filter to find interesting apps like [GraphQL GUIs](https://electronjs.org/apps?q=graphql) and [p2p tools](https://electronjs.org/apps?q=graphql).

If you've got an Electron app that you'd like featured on the site, open a pull request on the [electron/electron-apps](https://github.com/electron/electron-apps) repository.

## Homebrew を使った、ワンラインインストール

The [Homebrew](https://brew.sh) package manager for macOS has a subcommand called [cask](https://caskroom.github.io) that makes it easy to install desktop apps using a single command in your terminal, like `brew cask install atom`.

We've begun collecting Homebrew cask names for popular Electron apps and are now displaying the installation command (for macOS visitors) on every app page that has a cask:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Installation options tailored for your platform: macOS, Windows, Linux</figcaption>
  </a>
</figure>

To view all the apps that have homebrew cask names, visit [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). If you know of other apps with casks that we haven't indexed yet, [please add them!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 新ドメイン

このサイトを electron.atom.io から新しいドメインに移動しました: [electronjs.org](https://electronjs.org)。

The Electron project was born inside [Atom](https://atom.io), GitHub's open-source text editor built on web technologies. Electron was originally called `atom-shell`. Atom was the first app to use it, but it didn't take long for folks to realize that this magical Chromium + Node runtime could be used for all kinds of different applications. When companies like Microsoft and Slack started to make use of `atom-shell`, it became clear that the project needed a new name.

And so "Electron" was born. In early 2016, GitHub assembled a new team to focus specifically on Electron development and maintenance, apart from Atom. In the time since, Electron has been adopted by thousands of app developers, and is now depended on by many large companies, many of which have Electron teams of their own.

Supporting GitHub's Electron projects like Atom and [GitHub Desktop](https://desktop.github.com) is still a priority for our team, but by moving to a new domain we hope to help clarify the technical distinction between Atom and Electron.

## 🐢🚀 どこでもNode.js

The previous Electron website was built with [Jekyll](https://jekyllrb.com), the popular Ruby-based static site generator. Jekyll is a great tool for building static websites, but the website had started to outgrow it. We wanted more dynamic capabilities like proper redirects and dynamic content rendering, so a [Node.js](https://nodejs.org) server was the obvious choice.

The Electron ecosystem includes projects with components written in many different programming languages, from Python to C++ to Bash. But JavaScript is foundational to Electron, and it's the language used most in our community.

By migrating the website from Ruby to Node.js, we aim to lower the barrier to entry for people wishing to contribute to the website.

## ⚡️ より簡単になったオープンソースへの参加

もしあなたが v8またはそれ以降の [Node.js](https://nodejs.org) と[git](https://git-scm.org) があなたのシステムにインストールされているなら、ローカルにサイトを簡単に起動できます。

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

この新しいウェブサイトはHerokuでホストされています。 We use deployment pipelines and the [Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps) feature, which automatically creates a running copy of the app for every pull request. This makes it easy for reviewers to view the actual effects of a pull request on a live copy of the site.

## 🙏 貢献者への感謝

私たちは、Electronを改善するために自分の時間とエネルギーを貢献してくれた世界中のすべての人々に感謝したいと思います。 オープンソースコミュニティへの情熱は、Electronの成功に、計り知れないほど貢献しています。 ありがとうございます!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>