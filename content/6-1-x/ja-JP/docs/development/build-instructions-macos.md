# ビルド手順 (macOS)

macOS 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [Node.js](https://nodejs.org) (外部)
* TLS 1.2 に対応した Python 2.7

## Python

システムと Python のバージョンが少なくとも TLS 1.2 をサポートしていることも確認してください。これはあなたの macOS と Python のバージョンの両方に依存します。 クイックテストをするには以下を実行します。

```sh
$ npm run check-tls
```

スクリプトが古い構成のセキュリティプロトコルを使用していると応答した場合、macOS を High Sierra に更新するか、新しいバージョンの Python 2.7.x をインストールすることができます。Python をアップグレードするために、以下では [Homebrew](https://brew.sh/) を使用します。

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

公式の Electron ビルドは、[Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip) と MacOS 10.13 SDK でビルドされています。  より新しい SDK でビルドして同様に動いても、現在のリリースは 10.13 SDK を使用します。

## Electron のビルド

[ビルド指示: GN](build-instructions-gn.md)を参照してください。
