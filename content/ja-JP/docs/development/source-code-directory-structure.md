# ソースコードのディレクトリ構造

Electron のソースコードは、いくつかの部分に分けられています。ほとんどの場合、分離規約上 Chromium に従っています。

ソースコードをよりよく理解するためには、[Chromium のマルチプロセスアーキテクチャ](https://dev.chromium.org/developers/design-documents/multi-process-architecture) に慣れる必要があるかもしれません。

## ソースコードの構造

```diff
Electron
├── build/ - GN でビルドするために必要なコンフィグファイルをビルドします。
├── buildflags/ - 条件付きビルドに使用できる機能の集合を定義します。
├── chromium_src/ - コンテンツレイヤーの一部でない Chromium からコピーされたソースコード。
├── default_app/ - 消費者向けアプリ以外から Electron が起動されたときに
|                  実行されるデフォルトアプリ。
├── docs/ - Electron のドキュメント。
|   ├── api/ - Electron の外部向けモジュールと API のドキュメント。
|   ├── development/ - Electron の開発と Electron による開発の支援ドキュメント。
|   ├── fiddles/ - Electron Fiddle で実行できるコードスニペットの集合。
|   ├── images/ - ドキュメントで使用される画像。
|   └── tutorial/ - Electron のさまざまな観点におけるチュートリアルドキュメント。
├── lib/ - JavaScript/TypeScript ソースコード。
|   ├── browser/ - メインプロセス初期化コード。
|   |   ├── api/ - メインプロセスモジュール API の実装。
|   |   └── remote/ - メインプロセスで使用される
|   |                 リモートモジュールに関連したコード。
|   ├── common/ - メインとレンダラー両方のプロセスに必要なロジックに関連するものです。
|   |   └── api/ - メインとレンダラー両方のプロセスに必要な
|   |              モジュール API の実装
|   ├── isolated_renderer/ - contextIsolation が有効なとき
|   |                       イソレートレンダラープロセスの作成を処理します。
|   ├── renderer/ - レンダラープロセス初期化コード。
|   |   ├── api/ - レンダラープロセスモジュール API の実装。
|   |   ├── extension/ - Electron レンダラープロセスでの
|   |   |                Chrome 拡張機能の使用に関連したコード。
|   |   ├── remote/ - メインプロセスでの remote モジュールの
|   |   |             使用を処理するロジック。
|   |   └── web-view/ - レンダラープロセスでの webview の
|   |                   使用を処理するロジック。
|   ├── sandboxed_renderer/ - サンドボックスレンダラープロセスの作成を処理する
|   |   |                     ロジック。
|   |   └── api/ - サンドボックスレンダラープロセス API の実装。
|   └── worker/ - Web Worker で Node.js 環境の適切な機能を
|                 処理するロジック。
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Patches applied to Google's fork of OpenSSL, BoringSSL.
|   ├── chromium/ - Patches applied to Chromium.
|   ├── node/ - Patches applied on top of Node.js.
|   └── v8/ - Patches applied on top of Google's V8 engine.
├── shell/ - C++ source code.
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
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Electronのビルドルール。
```

## その他のディレクトリの構造

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - 配布用に作成したときに `script/create-dist.py` スクリプトが作成する一時的なディレクトリ。
* **external_binaries** - `gn`によるビルドがサポートされていない第三者のフレームワークのバイナリでダウンロードしたもの。
* **node_modules** - ビルドに使用する第三者のnodeモジュール。
* **npm** - Logic for installation of Electron via npm.
* **out** - `ninja`の一時的な出力用ディレクトリ。
* **script** - ビルド、パッケージ、テストなどの開発目的に使用されるスクリプト。

```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```

* **ツール** - Helper scripts used by GN files. 
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

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