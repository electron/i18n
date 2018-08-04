# ビルド手順 (macOS)

macOS 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

- macOS 10.11.6 以上
- [Xcode](https://developer.apple.com/technologies/tools/) 8.2.1 以上
- [Node.js](https://nodejs.org) (外部)
- TLS 1.2 に対応した Python 2.7

## Python

システムと Python のバージョンが少なくともTLS 1.2をサポートしていることも確認してください。 これはあなたの macOS と Python のバージョンの両方に依存します。 クイックテストを実行するには以下を実行します。

```sh
$ python ./script/tls.py
```

スクリプトが古い構成のセキュリティプロトコルを使用していると応答した場合、macOS を High Sierra に更新するか、新しいバージョンの Python 2.7.x をインストールすることができます。Python をアップグレードするために、以下では [Homebrew](https://brew.sh/) を使用します。

```sh
$ brew install python@2 && brew link python@2 --force
```

Homebrew で提供される Python を使用している場合、以下の Python モジュールのインストールも必要です。

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Electron を開発していて独自の Electron ビルドを再配布する予定がない場合は、このセクションを飛ばして構いません。

特定の機能 (ピンチズームなど) を正しく機能させるには、macOS 10.10 SDK をターゲットにする必要があります。

公式の Electron ビルドは、デフォルトで 10.10 SDK を含まない [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip) でビルドされています。 入手するには、まず [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) ディスクイメージをダウンロードしてマウントしてください。

次に、Xcode 6.4 ディスクイメージが `/Volumes/Xcode` にマウントされ、Xcode 8.2.1 のインストールが `/Applications/Xcode.app` にあるとすると、以下を実行します。

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

更に 10.10 SDK に対してビルドするには、以下の手順で Xcode を有効にする必要があります。

- `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist` を開く
- `MinimumSDKVersion` を `10.10` にセットする
- ファイルを保存する

## コードを取得する

```sh
$ git clone https://github.com/electron/electron
```

## ブートストラップ

ブートストラップスクリプトはビルドに必要な全ての依存関係をダウンロードし、ビルドプロジェクトファイルを作成します。 なお、Electron のビルドには [ninja](https://ninja-build.org/) を用いているため、Xcode プロジェクトが生成されないことに注意してください。

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## ビルド

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## 32 ビット OS のサポート

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## クリーン

To clean the build files:

```sh
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## テスト

See [Build System Overview: Tests](build-system-overview.md#tests)