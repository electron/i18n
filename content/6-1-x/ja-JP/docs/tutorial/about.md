# Electron について

[Electron](https://electronjs.org) は、HTML、CSS、JavaScript でクロスプラットフォームデスクトップアプリケーションを作成するために GitHub によって開発されたオープンソースライブラリです。 Electron は [Chromium](https://www.chromium.org/Home) と [Node.js](https://nodejs.org) を一つのランタイムとして組み合わせることでこれを達成しており、Mac、Windows、Linux 向けにアプリをパッケージすることが出来ます。

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Electron の貢献者とリリースについてもっと詳しく知りたい、もしくは Electron を始めたい場合については [クイックスタートガイド](quick-start.md) にあります。

## コアチームと貢献者

Electron は、GitHub のチームとコミュニティの [積極的な貢献者](https://github.com/electron/electron/graphs/contributors) らによってメンテナンスされています。 貢献者には、個人開発者の方も居れば、Electron でアプリを開発している大企業に勤めている方も居ます。 頻繁に貢献している方を、プロジェクトのメンテナとしてよろこんで迎えたいと思っています。 詳しくは、[Electronへの貢献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)をご覧ください。

## リリース

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### 依存関係の更新

Electron に含まれる Chromium のバージョンは、新しい安定版の Chromium がリリースされてから、その変更内容の大きさに応じて 1~2 週間以内に更新されます。

Node.js の新しいバージョンがリリースされたとき、より安定したバージョンを使用できるように、Electron の Node.js を更新するのを通常約1か月待ちます。

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### バージョン管理

バージョン 2.0 から Electron は [`semver` に準拠しています](https://semver.org)。 最近のバージョンの npm を使用している、ほとんどのアプリケーションであれば、`$ npm install electron` は正常に動作します。

バージョン更新の手順は、[Electronのバージョン管理](electron-versioning.md) で詳しく解説されています。

### LTS（長期サポート版）

現在、長期サポートを行っている旧バージョンの Electron は存在しません。 現在のバージョンの Electron でうまく動作するのであれば、そのバージョンを使い続けるとよいでしょう。 新機能を使いたい場合は、新しいバージョンにアップグレードしていく必要があります。

メジャーアップデートがバージョン `v1.0.0` でありました。 未だにこのバージョンを使用している場合は、[`v1.0.0` の変更の詳細を読んでください](https://electronjs.org/blog/electron-1-0)。

## 基本理念

Electron を (ファイルサイズで) 小さく、(依存関係とAPIの広がりを) 持続可能に保つために、このプロジェクトは内部プロジェクトの範囲を制限します。

例えば、Electron は Chromium のすべてというより、Chromium の描画ライブラリのみを使用します。 これにより Chromium の更新が容易になりますが、Google Chrome にある機能のいくつかが Electron には無いということです。

Electron に追加される新機能は、基本的にネイティブ API であるべきです。 その機能が独立した Node.js モジュールになり得る場合は、おそらくそうあるべきです。 これについては [コミュニティ製の Electron ツール](https://electronjs.org/community) を参照してください。

## 履歴

以下は、Electron の歴史におけるマイルストーンです。

| :calendar:     | :tada:                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| **2013 年 4 月** | [Atom Shell プロジェクトが開始される](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45) |
| **2014 年 5 月** | [Atom Shell がオープンソース化される](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html)                         |
| **2015 年 4 月** | [Atom Shell の名称が Electron に変更される](https://github.com/electron/electron/pull/1389)                               |
| **2016 年 5 月** | [Electron `v1.0.0`](https://electronjs.org/blog/electron-1-0) がリリースされる                                          |
| **2016 年 5 月** | [Electron アプリケーションが Mac App Store に対応](mac-app-store-submission-guide.md)                                       |
| **2016 年 8 月** | [Windows Store が Electron アプリケーションをサポート](windows-store-guide.md)                                                |
