# ソースコードのディレクトリ構造

Electron のソースコードは、いくつかの部分に分けられています。ほとんどの場合、分離規約上 Chromium に従っています。

ソースコードをよりよく理解するためには、[Chromium のマルチプロセスアーキテクチャ](https://dev.chromium.org/developers/design-documents/multi-process-architecture) に慣れる必要があるかもしれません。

## ソースコードの構造

```diff
Electron
├── atom/ - C++ のソースコード。
|   ├── app/ - システムのエントリコード。
|   ├── browser/ - メインウィンドウ、UI と
|   |   |          メインプロセスの全てを含むフロントエンド。 これはレンダラーと連絡して Web ページを
|   |   |          管理します。
|   |   ├── ui/ - 異なるプラットフォーム間での UI のローレベルの実装。
|   |   |   ├── cocoa/ - Cocoa に関連したソースコード。
|   |   |   ├── win/ - Windows のGUIに関連したソースコード。
|   |   |   └── x/ - X11 に関連したソースコード。
|   |   ├── api/ - メインプロセス API の実装。
|   |   ├── net/ - ネットワークに関連したコード。
|   |   ├── mac/ - Mac に関連した Objective-C のソースコード。
|   |   └── resources/ - アイコン、プラットフォームに依存したファイル、等。
|   ├── renderer/ - レンダラープロセスで実行されるコード。
|   |   └── api/ - レンダラープロセス API の実装。
|   └── common/ - Node のメッセージループを Chromium のメッセージループに
|       |         統合するためのユーティリティ関数やコードなど、
|       |         メインプロセスとレンダラープロセスの両方で使用されるコード。
|       └── api/ - 共通の API の実装と、
|                  Electron の組み込みモジュールの基礎。
├── chromium_src/ - Chromium からコピーされたコード。 以下をご覧ください
├── default_app/ - app を提供せずに Electron を起動したときに
|                  表示されるデフォルトページ。
├── docs/ - ドキュメント
├── lib/ - JavaScript のソースコード。
|   ├── browser/ - Javascript メインプロセス初期化コード。
|   |   └── api/ - Javascript API 実装。
|   ├── common/ - メインとレンダラープロセスの両方から使用される JavaScript
|   |   └── api/ - Javascript API 実装。
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
* **vendor** - 第三者の依存関係のソースコード。Chromiumのソースコードツリーと同じディレクトリがあると混乱しかねないため、`third_party`の名前を使用しません。
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