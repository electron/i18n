# Electronサポート

## サポートを探す

セキュリティに関心がある場合は、[セキュリティドキュメント](../../SECURITY.md)をご参照ください。

プログラミングの質問とその回答を探したり、Electron を使っている他の開発者との議論に参加したりしたいのであれば、以下のロケーションのコミュニティで対話できます。
- Atom フォーラムの [`electron`](https://discuss.atom.io/c/electron) カテゴリ
- Freenode の `#atom-shell` チャンネル
- AtomのSlack上の[`Electron`](https://atom-slack.herokuapp.com) チャネル
- [`electron-ru`](https://telegram.me/electron_ru) *(ロシア)*
- [`electron-br`](https://electron-br.slack.com) *(ブラジルポルトガル語)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(韓国語)*
- [`electron-jp`](https://electron-jp.slack.com) *(日本語)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(トルコ語)*
- [`electron-id`](https://electron-id.slack.com) *(インドネシア語)*
- [`electron-pl`](https://electronpl.github.io) *(ポーランド語)*

Electronにコントリビュートしたい場合は、[コントリビューティングドキュメント](../../CONTRIBUTING.md)をご参照ください。

Electron の [サポートしているバージョン](#supported-versions) にバグを見つけた場合は、[issue tracker](../development/issues.md) にご報告していただけると幸いです。

[awesome-electron](https://github.com/sindresorhus/awesome-electron)はコミュニティで保守されている有益なサンプルアプリ、ツール、リソースのリストです。

## サポートされているバージョン

最新の 3 つのメジャーバージョンは Electron チームによってサポートされます。 たとえば、最新リリースが 5.0.x の場合、4.x.y シリーズと、それ以前の2つのリリースシリーズ 3.x.y と 2.x.y もサポートされます。

最新の安定版リリースは一方的に `master` からすべての修正を受け取り、それ以前のバージョンは時間と容量が許すようなこれら修正の大部分を受けています。 サポートされている最も古いリリースラインには、セキュリティ修正のみが直接送られます。

サポートされているすべてのリリースラインは、以前 `master` にマージされた修正をバックポートする外部のプルリクエストを受け付けます。これは、一部の古いサポートラインではケースバイケースとなります。 すべてのリリースラインのバックポートに関する紛糾は、バックポートプルリクエストが発行された週に、週1回の会議での議題項目として [リリースワーキンググループ](https://github.com/electron/governance/tree/master/wg-releases) によって解決されます。

### 現在のサポート対象バージョン
- 5.x
- 4.x
- 3.x

### End-of-life

リリースブランチがサポートサイクルの終わりに達すると、npm では非推奨となり、最後のサポート終了リリースが行われる予定です。 このリリースでは、サポートされていないバージョンの Electron が使用されていることを知らせるための警告が追加されます。

これらの手順は、使用しているブランチがサポートされなくなったときにアプリ開発者が学習できるようにするためのものですが、エンドユーザが過度に煩わされることはありません。

アプリケーションに例外的な状況があり、サポートされていない一連の Electron を使用し続ける必要がある場合、開発者はアプリケーションの `package.json` 内の `devDependencies` から最終リリースを省略することでサポート終了の警告を黙らせることができます。 たとえば、1-6-x シリーズは 1.6.18 リリースでサポートを終了したため、開発者は`devDependency` を `"electron": 1.6.0 - 1.6.17` とすることで警告なしで 1-6-x シリーズを使用することを選択できます。

## サポートされているプラットフォーム

Electronは以下のプラットフォームをサポートしています。

### macOS

macOS 向けには 64bit バイナリのみが提供されます。対応する macOS のバージョンは macOS 10.10 (Yosemite) 以降です。

### Windows

Windows 7以降に対応しています。Vista以前のOSはサポートされておらず、動作もしません。

Windows向けには`ia32` (`x86`) と`x64` (`amd64`) バイナリの両方が提供されています。 ARM デバイス用の Windows 上で Electron アプリケーションを実行することは、ia32 バイナリを使用することによって可能です。

### Linux

`ia32` (`i686`) と `x64` (`amd64`) のビルド済みバイナリは、Ubuntu 12.04上でビルドされ、 `armv7l` バイナリは、Debian Wheezy用のhard-float ABIとNEONのARM v7を対象にビルドしています。

[Electron 2.0 がリリースされるまで](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets)、Electron は `armv7l` バイナリを単純に `arm` という接尾辞を付けてリリースし続けます。 双方のバイナリは同一です。

Electronがどのディストリビューションで動作するかどうかは、ビルドプラットフォームでリンクされたライブラリが存在するかによりますので、Ubuntu 12.04 のみを動作保証していますが、次のプラットフォームについてもビルド済みのElectronバイナリを実行できるか検証しています：

* Ubuntu 12.04 以降
* Fedora 21
* Debian 8
