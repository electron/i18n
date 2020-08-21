# ビルド手順 (macOS)

macOS 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [Node.js](https://nodejs.org) (外部)
* TLS 1.2 に対応した Python 2.7

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. クイックテストをするには以下を実行します。

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

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

公式の Electron ビルドは、[Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip) と macOS 10.13 SDK でビルドされています。  より新しい SDK でビルドして同様に動いても、現在のリリースは 10.13 SDK を使用します。

## Electron のビルド

[ビルド指示: GN](build-instructions-gn.md)を参照してください。
