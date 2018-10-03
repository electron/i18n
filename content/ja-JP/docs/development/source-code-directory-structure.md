# ソースコードのディレクトリ構造

The source code of Electron is separated into a few parts, mostly following Chromium on the separation conventions.

You may need to become familiar with [Chromium's multi-process architecture](https://dev.chromium.org/developers/design-documents/multi-process-architecture) to understand the source code better.

## ソースコードの構造

```diff
Electron
├── atom/ - C++ で書かれたコード
|   ├── app/ - システムエントリーコード
|   ├── browser/ - メインウィンドウを含むフロントエンド、UIと
|   |   |          メインプロセスの全て。 これは、レンダーと会話してWEBページを
|   |   |          管理します。
|   |   ├── ui/ - Implementation of UI stuff for different platforms.
|   |   |   ├── cocoa/ - Cocoa specific source code.
|   |   |   ├── win/ - Windows GUI specific source code.
|   |   |   └── x/ - X11 specific source code.
|   |   ├── api/ - The implementation of the main process APIs.
|   |   ├── net/ - Network related code.
|   |   ├── mac/ - Mac specific Objective-C source code.
|   |   └── resources/ - Icons, platform-dependent files, etc.
|   ├── renderer/ - Code that runs in renderer process.
|   |   └── api/ - The implementation of renderer process APIs.
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── brightray/ - Thin shim over libcc that makes it easier to use.
├── chromium_src/ - Chromium からコピーされたコード。 以下をご覧ください
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - ドキュメント
├── lib/ - JavaScript で書かれたコード
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - 自動テスト
└── BUILD.gn - Electronのビルドルール.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## その他のディレクトリの構造

* **script** - Scripts used for development purpose like building, packaging, testing, etc.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - ビルドに使用する第三者のnodeモジュール。
* **out** - `ninja`の一時的な出力用ディレクトリ。
* **dist** - 配布用に作成したときに `script/create-dist.py` スクリプトが作成する一時的なディレクトリ。
* **external_binaries** - `gn`によるビルドがサポートされていない第三者のフレームワークのバイナリでダウンロードしたもの。

## Git Submodules を最新に保つ

このElectron リポジトリは、ベンダー関連の依存関係があり、それらは[/vendor](https://github.com/electron/electron/tree/master/vendor) ディレクトリにあります。 `git status`を実行したときに以下のようなメッセージが表示されるかもしれません。:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

これらのベンダー依存関係を更新するには次のコマンドを実行します。

```sh
git submodule update --init --recursive
```

このコマンドを頻繁に実行している場合、`~/.gitconfig`にエイリアスを作成するといいでしょう。:

```sh
[alias]
    su = submodule update --init --recursive
```