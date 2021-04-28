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
/ lib / - JavaScript / TypeScript شفرة المصدر.
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
├── patches/ - ユースケースと元の機能との差異を扱うために、
|   |          Electron のコア依存関係上に適用されたパッチ。
|   ├── boringssl/ - Google の OpenSSL フォークである BoringSSL に適用されているパッチ。
|   ├── chromium/ - Chromium に適用されているパッチ。
|   ├── node/ - Node.js 上に適用されているパッチ。
|   └── v8/ - Google の V8 エンジンの上に適用されているパッチ。
├── shell/ - C++ ソースコード。
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
|   |   └── resources/ - アイコン、プラットフォーム固有のファイルなど。
|   ├── renderer/ - レンダラープロセスで動くコード。
|   |   └── api/ - レンダラープロセス API の実装。
|   └── common/ - Node のメッセージループを Chromium のメッセージループに
|       |         統合するためのユーティリティ関数やコードなど、
|       |         メインプロセスとレンダラープロセスの両方で使用されるコード。
|       └── api/ - 共通の API の実装と、
|                  Electron の組み込みモジュールの基礎。
├── spec/ - レンダラープロセスで実行される Electron の連続テストのコンポーネント。
├── spec-main/ - メインプロセスで実行される Electron の連続テストのコンポーネント。
└── BUILD.gn - Electronのビルドルール。
```

## その他のディレクトリの構造

* **.circleci** - CircleCI を使用した CI のコンフィグファイル。
* **.github** - Issue のテンプレートとコード所有者を含む GitHub 指定のコンフィグファイル。
* **dist** - 配布用に作成したときに `script/create-dist.py` スクリプトが作成する一時的なディレクトリ。
* **external_binaries** - `gn`によるビルドがサポートされていない第三者のフレームワークのバイナリでダウンロードしたもの。
* **node_modules** - ビルドに使用する第三者のnodeモジュール。
* **npm** - npm を介した Electron のインストールロジック。
* **out** - `ninja`の一時的な出力用ディレクトリ。
* **script** - ビルド、パッケージ、テストなどの開発目的に使用されるスクリプト。

```diff
script/ - Electron がさまざまな目的で実行するすべてのスクリプトの集合。
├── codesign/ - Electron アプリのコード署名を偽装します。テスト用です。
├── lib/ - その他の Python のユーティリティスクリプト。
└── release/ - Electron のリリースプロセス中に実行されるスクリプト。
    ├── notes/ - 新しいバージョンの Electron のリリースノートを生成します。
    └── uploaders/ - リリース中にさまざまなリリースに関するファイルをアップロードします。
```

* **typings** - Electron 内部コードの TypeScript 型定義。
* **vendor** - サードパーティの依存関係のソースコード。
