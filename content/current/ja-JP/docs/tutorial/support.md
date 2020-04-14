# Electronサポート

## サポートを探す

セキュリティ上の相談がある場合は、[セキュリティドキュメント](https://github.com/electron/electron/tree/master/SECURITY.md) をご参照ください。

プログラミングの質問とその回答を探したり、Electron を使っている他の開発者との議論に参加したりしたいのであれば、以下のロケーションのコミュニティで対話できます。
- Atom フォーラムの [`electron`](https://discuss.atom.io/c/electron) カテゴリ
- Freenode の `#atom-shell` チャンネル
- [Atom の Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406) の `#electron` チャンネル
- [`electron-ru`](https://telegram.me/electron_ru) *(Russian)*
- [`electron-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Korean)*
- [`electron-jp`](https://electron-jp.slack.com) *(Japanese)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turkish)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
- [`electron-pl`](https://electronpl.github.io) *(Poland)*

Electron にコントリビュートしたい場合は、[コントリビュートドキュメント](https://github.com/electron/electron/blob/master/CONTRIBUTING.md) をご参照ください。

Electron の [サポートしているバージョン](#supported-versions) にバグを見つけた場合は、[issue tracker](../development/issues.md) にご報告していただけると幸いです。

[awesome-electron](https://github.com/sindresorhus/awesome-electron)はコミュニティで保守されている有益なサンプルアプリ、ツール、リソースのリストです。

## サポートされているバージョン

The latest three *stable* major versions are supported by the Electron team. たとえば、最新のリリースが 6.1.x の場合、5.0.x と 4.2.x 系列がサポートされます。  安定リリース系列ごとに最新のマイナーリリースのみをサポートしています。  つまり、セキュリティ修正の場合 6.1.x は修正を受けますが、6.0.x の新しいバージョンはリリースしません。

最新の安定版リリースは一方的に `master` からすべての修正を受け取り、それ以前のバージョンは時間と容量が許すようなこれら修正の大部分を受けています。 サポートされている最も古いリリースラインには、セキュリティ修正のみが直接送られます。

サポートされているすべてのリリースラインは、以前 `master` にマージされた修正をバックポートする外部のプルリクエストを受け付けます。これは、一部の古いサポートラインではケースバイケースとなります。 すべてのリリースラインのバックポートに関する紛糾は、バックポートプルリクエストが発行された週に、週1回の会議での議題項目として [リリースワーキンググループ](https://github.com/electron/governance/tree/master/wg-releases) によって解決されます。

既存の機能を破壊するような API の変更や削除がされた場合、可能であれば、その機能は削除されるまでに最低 2 つのメジャーバージョンでサポートされます。 例えば、3 引数を取る関数が、メジャーバージョン 10 で 2 引数になった場合、3 引数版は少なくともメジャーバージョン 12 まで動作し続けます。 最低 2 つのバージョンという基準を過ぎた後は、メンテナンスの負担が大きすぎるとメンテナが感じるまで、2 つのバージョンより長く下位互換性をサポートします。

### 現在のサポート対象バージョン
- 8.1.x
- 7.1.x
- 6.1.x

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

Windows向けには`ia32` (`x86`) と`x64` (`amd64`) バイナリの両方が提供されています。 [Electron 6.0.8 以降では、Arm (`arm64`) デバイス上 Windows のネイティブサポートを追加します](windows-arm.md)。 ia32 バイナリを使用すると、以前のバージョンでパッケージ化されたアプリを実行できます。

### Linux

`ia32` (`i686`) と `x64` (`amd64`) のビルド済みバイナリは、Ubuntu 12.04上でビルドされ、 `armv7l` バイナリは、Debian Wheezy用のhard-float ABIとNEONのARM v7を対象にビルドしています。

[Electron 2.0 がリリースされるまで](../breaking-changes.md#duplicate-arm-assets)、Electron は `armv7l` バイナリを単純に `arm` という接尾辞を付けてリリースし続けます。 双方のバイナリは同一です。

Electronがどのディストリビューションで動作するかどうかは、ビルドプラットフォームでリンクされたライブラリが存在するかによりますので、Ubuntu 12.04 のみを動作保証していますが、次のプラットフォームについてもビルド済みのElectronバイナリを実行できるか検証しています：

* Ubuntu 12.04 以降
* Fedora 21
* Debian 8
