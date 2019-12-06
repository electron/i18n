# Electron について

[Electron](https://electronjs.org) は、HTML、CSS、JavaScript でクロスプラットフォームデスクトップアプリケーションを作成するために GitHub によって開発されたオープンソースライブラリです。 Electron は [Chromium](https://www.chromium.org/Home) と [Node.js](https://nodejs.org) を一つのランタイムとして組み合わせることでこれを達成しており、Mac、Windows、Linux 向けにアプリをパッケージすることが出来ます。

Electron は、GitHub のカスタマイズ可能なテキストエディタである [Atom](https://atom.io) 用のフレームワークとして 2013 年に開発が始まりました。Electron と Atom は 2014 年の春にオープンソースになっています。

以来、オープンソース開発者、ベンチャー企業、大手企業で使われる人気ツールになりました。[Electron で作られているものを見てみましょう](https://electronjs.org/apps)。

Electron の貢献者とリリースについてもっと詳しく知りたい、もしくは Electron を始めたい場合については [クイックスタートガイド](quick-start.md) にあります。

## コアチームと貢献者

Electron は、GitHub のチームとコミュニティの [積極的な貢献者](https://github.com/electron/electron/graphs/contributors) らによってメンテナンスされています。 貢献者には、個人開発者の方も居れば、Electron でアプリを開発している大企業に勤めている方も居ます。 頻繁に貢献している方を、プロジェクトのメンテナとしてよろこんで迎えたいと思っています。 詳しくは、[Electronへの貢献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)をご覧ください。

## リリース

[Electron のリリース](https://github.com/electron/electron/releases) は頻繁に行われます。明瞭なバグ修正、新しい API、Chromium や Node.js のアップデート時に新しいバージョンがリリースされます。

### 依存関係の更新

Electronに含まれるChromiumのバージョンは、新しい安定版のChromiumがリリースされてから、変更内容の大きさに応じて、1〜2週間以内にアップデートされます。

Node.js の新しいバージョンがリリースされたとき、より安定したバージョンを使用できるように、Electron の Node.js を更新するのを通常約1か月待ちます。

Electronでは、Node.jsとChromiumで使用しているV8は単一インスタンス、通常ではChromiumが使用している物が共用されます。ほとんどの場合でこのアプローチは*うまいこといきます*が、時折、Node.jsにパッチを当てて改修する作業が必要になります。

### バージョン管理

バージョン2.0から、Electronは[`semver`に従います](https://semver.org)。 最近のバージョンのnpmを使っていれば、ほとんどのアプリケーションで `$ npm install electron` が正しく動作するでしょう。

バージョンアップのプロセスは、[Electronのバージョン管理](electron-versioning.md)に詳しく記載されています。

### LTS（長期サポート版）

現在のところ、長期的にサポートを行うElectronの古いバージョンは存在しません。 Electronの現在のバージョンでうまく動作しているなら、そのバージョンを使い続けることが出来ます。 もし新しく入ってきた機能を使っていきたいなら、新しいバージョンにアップグレードしていかなければなりません。

大きな更新が`v.1.0.0`でありました。 もしこのバージョンを使用していない場合は、[`v1.0.0`での変更について](https://electronjs.org/blog/electron-1-0)をお読みください。

## 基本理念

Electronのファイルサイズを小さく、そして依存とAPIを維持可能なものとするために、本プロジェクトの扱う領域は制限されます。

例えば、ElectronはChromiumのすべてというよりも、Chromiumのレンダリングライブラリのみを使用するようになっています。 これにより、使用しているChromiumのアップデートをしやすくしますが、Google Chromeにある機能のうちいくつかがElectronにはふくまれないことになります。

Electronに追加される新しい機能はネイティブAPIであるべきです。 独立したNode.jsモジュールとして機能可能なものはモジュールのままで問題ありません。 [コミュニティによって作成されたツール](https://electronjs.org/community) を参照してください。

## 履歴

Electronのマイルストーンは以下の通りです。

| :calendar:     | :tada:                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| **2013 年 4 月** | [Atom Shell プロジェクトが開始される](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45) |
| **2014 年 5 月** | [Atom Shell がオープンソース化される](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html)                         |
| **2015 年 4 月** | [Atom Shell の名称が Electron に変更される](https://github.com/electron/electron/pull/1389)                               |
| **2016 年 5 月** | [Electron `v1.0.0`](https://electronjs.org/blog/electron-1-0) がリリースされる                                          |
| **2016 年 5 月** | [Electron アプリケーションが Mac App Store に対応](mac-app-store-submission-guide.md)                                       |
| **2016 年 8 月** | [Windows Store が Electron アプリケーションをサポート](windows-store-guide.md)                                                |