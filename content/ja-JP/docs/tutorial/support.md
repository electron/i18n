# Electronサポート

## Finding Support

セキュリティに関心がある場合は、[セキュリティドキュメント](../../SECURITY.md)をご参照ください。

プログラミングの質問に対する回答を探している、またはElectronを使っている他の開発者との議論に参加したいのであれば、各ローケーションのコミュニティで対話できます。

* Atomフォーラム上の[`electron`](https://discuss.atom.io/c/electron)カテゴリ
* Freenode上の`#atom-shell`チャネル
* AtomのSlack上の[`Electron`](https://atom-slack.herokuapp.com) チャネル
* [`electron-ru`](https://telegram.me/electron_ru) *(ロシア)*
* [`electron-br`](https://electron-br.slack.com) *(ブラジルポルトガル語)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(韓国語)*
* [`electron-jp`](https://electron-jp.slack.com) *(日本語)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(トルコ語)*
* [`electron-id`](https://electron-id.slack.com) *(インドネシア語)*
* [`electron-pl`](https://electronpl.github.io) *(ポーランド語)*

Electronにコントリビュートしたい場合は、[コントリビューティングドキュメント](../../CONTRIBUTING.md)をご参照ください。

[サポートされているバージョン](#supported-versions)のElectronでバグを見つけた場合は、[issue tracker](../development/issues.md)にレポートをおお願いします。

[awesome-electron](https://github.com/sindresorhus/awesome-electron)はコミュニティで保守されている有益なサンプルアプリ、ツール、リソースのリストです。

## サポートされているバージョン

最新の3リリースブランチがElectronチームによってサポートされています。 For example, if the latest release is 2.0.x, then the 2-0-x series is supported, as are the two previous release series 1-7-x and 1-8-x.

When a release branch reaches the end of its support cycle, the series will be deprecated in NPM and a final end-of-support release will be made. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## サポートされているプラットフォーム

Electronは以下のプラットフォームをサポートしています。

### macOS

macOS向けには64bitバイナリのみが提供されます。対応するmacOSのバージョンは10.9以降です。

### Windows

Windows 7以降に対応しています。Vista以前のOSはサポートされておらず、動作もしません。

Windows向けには`ia32` (`x86`) と`x64` (`amd64`) バイナリの両方が提供されています。 Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Electronがどのディストリビューションで動作するかどうかは、ビルドプラットフォームでリンクされたライブラリが存在するかによりますので、Ubuntu 12.04 のみを動作保証していますが、次のプラットフォームについてもビルド済みのElectronバイナリを実行できるか検証しています：

* Ubuntu 12.04 以降
* Fedora 21
* Debian 8