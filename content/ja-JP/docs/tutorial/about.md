# Electron について

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electronは、[Chromium](https://www.chromium.org/Home)と[Node.js](https://nodejs.org)を一つのランタイムとして組み合わせることで、この目的を達成しており、Mac, Windows, Linux用にアプリをパッケージ化することが出来ます。

Electronは、GitHubのカスタマイズ可能なテキストエディタである[Atom](https://atom.io)用のフレームワークとして2013年に開発が始まりました。ElectronとAtomは2014年の春にオープンソースになっています。

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Electronの開発者やリリースについてもっと詳しく知りたいか、Electronでアプリケーションの開発を進めたい場合は、[クイックスタートガイド](quick-start.md)をお読みください。

## コアチームと貢献者

ElectronはGitHubのチームと、コミュニティで[活動中の開発貢献者](https://github.com/electron/electron/graphs/contributors)によってメンテナンスされています。 貢献者には、個人の開発者の方も居れば、Electronでアプリを作成中の大企業で働いている方も居ます。 頻繁に貢献している方を、プロジェクトのメンテナとしてよろこんで迎えたいと思っています。 詳しくは、[Electronへの貢献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)をご覧ください。

## リリース

[Electronは頻繁にリリースされます](https://github.com/electron/electron/releases)。明らかなバグ修正・新しいAPI・ChromiumまたはNode.jsのアップデートがあるときあたらしいバージョンがリリースされます。

### 依存関係の更新

Electronに含まれるChromiumのバージョンは、新しい安定版のChromiumがリリースされてから、変更内容の大きさに応じて、1〜2週間以内にアップデートされます。

Node.js の新しいバージョンがリリースされたとき、より安定したバージョンを使用できるように、Electron の Node.js を更新するのを通常約1か月待ちます。

Electronでは、Node.jsとChromiumで使用しているV8は単一インスタンス、通常ではChromiumが使用している物が共用されます。ほとんどの場合でこのアプローチは*うまいこといきます*が、時折、Node.jsにパッチを当てて改修する作業が必要になります。

### バージョン管理

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS（長期サポート版）

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## 基本理念

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## 履歴

Below are milestones in Electron's history.

| :calendar:     | :tada:                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **2013 年 4 月** | [Atom Shell プロジェクトが開始される](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)     |
| **2014 年 5 月** | [Atom Shell がオープンソース化される](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html)                              |
| **2015 年 4 月** | [Atom Shell の名称が Electron に変更される](https://github.com/electron/electron/pull/1389)                                   |
| **2016 年 5 月** | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **2016 年 5 月** | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **2016 年 8 月** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |