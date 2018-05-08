# Electron について

[Electron](https://electronjs.org)は、HTML, CSS, JavaScriptで作られたクロスプラットフォーム デスクトップ アプリケーションを作成するために、GitHubによって開発されたオープンソースライブラリです。 Electronは、[Chromium](https://www.chromium.org/Home)と[Node.js](https://nodejs.org)を一つのランタイムとして組み合わせることで、この目的を達成しており、Mac, Windows, Linux用にアプリをパッケージ化することが出来ます。

Electronは、GitHubのカスタマイズ可能なテキストエディタである[Atom](https://atom.io)用のフレームワークとして2013年に開発が始まりました。ElectronとAtomは2014年の春にオープンソースになっています。

そのときから、オープンソース開発者、ベンチャー企業、古参の企業で使われる人気のツールになっています。Electronによって[どんなアプリケーションが作られているか](https://electronjs.org/apps)も見てみてください。

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

バージョン2.0から、Electronは[`semver`に従います](https://semver.org)。 最近のバージョンのnpmを使っていれば、ほとんどのアプリケーションで `$ npm install electron` が正しく動作するでしょう。

バージョンアップのプロセスは、[Electronのバージョン管理](electron-versioning.md)に詳しく記載されています。

### LTS（長期サポート版）

現在のところ、長期的にサポートを行うElectronの古いバージョンは存在しません。 Electronの現在のバージョンでうまく動作しているなら、そのバージョンを使い続けることが出来ます。 もし新しく入ってきた機能を使っていきたいなら、新しいバージョンにアップグレードしていかなければなりません。

大きな更新が`v.1.0.0`でありました。 もしこのバージョンを使用していない場合は、[`v1.0.0`での変更について](https://electronjs.org/blog/electron-1-0)をお読みください。

## 基本理念

Electronのファイルサイズを小さく、そして依存とAPIを維持可能なものとするために、本プロジェクトの扱う領域は制限されます。

For instance, Electron uses Chromium's rendering library rather than all of Chromium. これにより、使用しているChromiumのアップデートをしやすくしますが、Google Chromeにある機能のうちいくつかがElectronにはふくまれないことになります。

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