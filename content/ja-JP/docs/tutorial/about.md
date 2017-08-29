# Electron について

[Electron](https://electron.atom.io)は、HTML, CSS, JavaScriptで作られたクロスプラットフォーム デスクトップ アプリケーションを作成するために、GitHubによって開発されたオープンソースライブラリです。 Electronは、[Chromium](https://www.chromium.org/Home)と[Node.js](https://nodejs.org)を一つのランタイムとして組み合わせることで、この目的を達成しており、Mac, Windows, Linux用にアプリをパッケージ化することが出来ます。

Electronは、GitHubのカスタマイズ可能なテキストエディタである[Atom](https://atom.io)用のフレームワークとして2013年に開発が始まりました。ElectronとAtomは2014年の春にオープンソースになっています。

そのときから、オープンソース開発者、ベンチャー企業、古参の企業で使われる人気のツールになっています。Electronによって[どんなアプリケーションが作られているか](https://electron.atom.io/apps/)も見てみてください。

Electronの開発者やリリースについてもっと詳しく知りたいか、Electronでアプリケーションの開発を進めたい場合は、[クイックスタートガイド](quick-start.md)をお読みください。

## コアチームと貢献者

ElectronはGitHubのチームと、コミュニティで[活動中の開発貢献者](https://github.com/electron/electron/graphs/contributors)によってメンテナンスされています。 貢献者には、個人の開発者の方も居れば、Electronでアプリを作成中の大企業で働いている方も居ます。 頻繁に貢献している方を、プロジェクトのメンテナとしてよろこんで迎えたいと思っています。 詳しくは、[Electronへの貢献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)をご覧ください。

## リリース

[Electronは頻繁にリリースされます](https://github.com/electron/electron/releases)。明らかなバグ修正・新しいAPI・ChromiumまたはNode.jsのアップデートがあるときあたらしいバージョンがリリースされます。

### 依存関係の更新

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### バージョン管理

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### LTS（長期サポート版）

現在のところ、長期的にサポートを行うElectronの古いバージョンは存在しません。 If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## 基本理念

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## 履歴

Electronのマイルストーンは以下の通りです。

| :calendar:     | :tada:                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| **2013 年 4 月** | [Atom Shell プロジェクトが開始される](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45) |
| **2014 年 5 月** | [Atom Shell がオープンソース化される](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html)                          |
| **2015 年 4 月** | [Atom Shell の名称が Electron に変更される](https://github.com/electron/electron/pull/1389)                               |
| **2016 年 5 月** | [Electron `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0) がリリースされる                             |
| **2016 年 5 月** | [Electron アプリケーションが Mac App Store に対応](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide)   |
| **2016 年 8 月** | [Windows Store が Electron アプリケーションをサポート](https://electron.atom.io/docs/tutorial/windows-store-guide)            |