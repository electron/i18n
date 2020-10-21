---
title: Electron Userland
author: zeke
date: '2016-12-20'
---

私達は新しい [userland](https://electronjs.org/userland) セックションを Electron のウェブサイトに追加して、ユーザーが私達の反映するオープンソースのエコシステムを構成する人々、パッケージ、アプリを発見する手助けをしています。

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## ユーザーランドの起源

Userland は、ソフトウェアコミュニティの人々が一緒にツールやアイデアを共有する場所です。 この用語は Unix のコミュニティに由来しています。カーネルの外で実行されたプログラムを Userland と呼んでいましたが、今日ではそれ以上のことを意味しています。 今日のJavaScript コミュニティの人々が Userland を参照するとき、通常は [npm パッケージレジストリ](http://npm.im) について話しています。 これは実験とイノベーションが多く発生する場所です。一方 Node とJavaScript 言語は(Unixカーネルのように) 比較的小さく安定したコア機能のセット保持しています。

## NodeとElectron

Node と同様に、Electron にはコア API の小さなセットがあります。 これらは、マルチプラットフォームのデスクトップアプリケーションの開発に必要な基本的な機能を提供します。 この設計思想により、Electronは過度にルールに則りすぎたものではなく、柔軟なツールでいられるようにしています。

Userland はコアの対義語であり、ユーザーはElectronの機能を拡張するツールを作成し、共有することができます。

## データ収集

私達のエコシステムのトレンドをよりよく理解するために、`electron` や`electron-prebuilt`に依存する15,000ものパブリックなGitHubリポジトリからメタデータを分析しました。

私達は[GitHub API](https://developer.github.com/v3/), と[libraries.io API](https://libraries.io/api)、それに npm レジストリを使用して、依存関係、開発の依存関係、パッケージ、作者、リポジトリの貢献者、リポジトリからのダウンロード数、リポジトリのフォーク数、夢想家の数の情報を収集しました。

次に、レポートを生成するために以下のデータを使用しました。

- [アプリ開発依存関係](https://electronjs.org/userland/dev_dependencies): Electron アプリで `devDependencies` として最も頻繁にリストされているパッケージ。
- [GitHub 貢献者](https://electronjs.org/userland/github_contributors): Electron に関連する GitHub リポジトリに多数貢献した GitHub のユーザー。
- [パッケージ依存関係](https://electronjs.org/userland/package_dependencies): 他のnpm パッケージによって頻繁に依存している、Electron 関連の npm パッケージ。
- [お気にいり Apps](https://electronjs.org/userland/starred_apps): (npm パッケージではない) Electron アプリと多くの夢想家を持つ。
- [最多ダウンロードパッケージ](https://electronjs.org/userland/most_downloaded_packages): 多くダウンロードされている Electron 関連の npm パッケージ。
- [アプリ依存関係](https://electronjs.org/userland/dependencies): Electron アプリで `dependencies` として最も頻繁にリストされているパッケージ。
- [パッケージの作者](https://electronjs.org/userland/package_authors): Electron 関連の npm パッケージの最も多作の者。

## 結果のフィルタリング

Reports like [app dependencies](https://electronjs.org/userland/dependencies) and [starred apps](https://electronjs.org/userland/starred_apps) which list packages, apps, and repos have a text input that can be used to filter the results.

この入力に入力すると、ページの URL が動的に更新されます。 この では、特定のスライスを表す URL をコピーして 他のユーザーと共有することができます。

[![babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## より多くの人の参加

レポートのこの最初のセットは始まりに過ぎません。 コミュニティが Electron をどのように構築しているかに関する データを引き続き収集し、 新しいレポートをウェブサイトに追加します。

このデータを収集して表示するために使用されるすべてのツールはオープンソースです。

- [electron/electronjs.org](https://github.com/electron/electron.atom) Electron のウェブサイト。
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Electron userlandでのパッケージ、リポジトリ、およびユーザに関するデータのスライス。
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): GitHub上の `electron` または `electron-prebuilt` に依存するすべての公開リポジトリ
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): `` を `package.json` ファイルに記載するすべての npm パッケージ。

これらのレポートを改善する方法についてのアイデアをお持ちでしたら、[ウェブサイトリポジトリ](https://github.com/electron/electronjs.org/issues/new)または上記のリポジトリのいずれかにIssueを立ててお知らせください。

Electron コミュニティのおかげで、今日の userland を作ることができました！

