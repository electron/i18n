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
|   └── renderer/ - Javascript レンダラープロセス初期化コード。
|       └── api/ - Javascript API 実装。
├── native_mate/ - Chromium の gin ライブラリのフォークで、
|                  C++ と JavaScript の間で型を簡単にマーシャリングできます。
├── spec/ - 自動テスト。
└── BUILD.gn - Electronのビルドルール。
```

## `/chromium_src`

`/chromium_src` 内のファイルは、そのコンテンツレイヤーの一部ではなく Chromium の断片である傾向があります。 例えば Pepper APIを実装するには、公式の Chrome が行うものと同様の配置が必要です。 関連するソースを [libcc](../glossary.md#libchromiumcontent) の一部として作成することもできますが、ほとんどの場合、すべての機能を必要とするわけではありません (いくつかはプロプライエタリな、分析的なものになる傾向があります)。そのため私たちはコードの一部を取得しました。 これらは libcc のパッチにできるかもしれませんが、libcc の目的は非常に最小限のパッチを維持することであり、これらが書かれた時点で chromium_src の変更は大きなものになる傾向があります。 更に、これらのパッチは現在保守している他の libcc パッチとは異なり、決してアップストリームになることはありません。

## その他のディレクトリの構造

* **script** - ビルド、パッケージ、テストなどの開発目的に使用されるスクリプト。
* **tools** - GN ファイルで使用されるヘルパースクリプト。`script` とは異なり、ここに配置されたスクリプトはユーザーが直接呼び出すことはできません。
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
