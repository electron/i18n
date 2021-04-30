# ビルド手順 (macOS)

カスタム Electron バイナリの作成にあたって macOS で **Electron そのもの** をビルドするには、以下のガイドラインに従ってください。 アプリのコードをビルド済み Electron バイナリにバンドルして頒布する場合は、[アプリケーション頒布][application-distribution] のガイドを参照してください。

## 必要な環境

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [Node.js](https://nodejs.org) (外部)
* TLS 1.2 に対応した Python 2.7

## Python

あなたのシステムと Python が少くとも TLS 1.2 をサポートしていることを確認してください。 これは、macOS と Python 両方のバージョンに依存します。 クイックテストをするには以下を実行します。

```sh
$ npx @electron/check-python-tls
```

スクリプトが古い構成のセキュリティプロトコルを使用していると応答した場合、macOS を High Sierra に更新するか、新しいバージョンの Python 2.7.x をインストールすることができます。 Python をアップグレードするために、以下では [Homebrew](https://brew.sh/) を使用します。

```sh
$ brew install python@2 && brew link python@2 --force
```

Homebrew で提供される Python を使用している場合、以下の Python モジュールのインストールも必要です。

* [pyobjc](https://pypi.org/project/pyobjc/#description)

以下のように `pip` を使ってインストールできます。

```sh
$ pip install pyobjc
```

## macOS SDK

Electron を開発していて独自の Electron ビルドを再配布する予定がない場合は、このセクションを飛ばして構いません。

公式の Electron ビルドは、[Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip) と macOS 11.0 SDK でビルドされています。 より新しい SDK でビルドして同様に動いても、現在のリリースは 11.0 SDK を使用します。

## Electron のビルド

[ビルド指示: GN](build-instructions-gn.md)を参照してください。

[application-distribution]: ../tutorial/application-distribution.md
