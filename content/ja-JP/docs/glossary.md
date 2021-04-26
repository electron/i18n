# 用語集

このページでは、Electron の開発で一般的に使用される用語を示します。

### ASAR

ASARはAtom Shell Archive Formatの略語です。 [asar][asar]アーカイブは、複数のファイルを1つにまとめる`tar`ライクでシンプルなアーカイブ形式です。 Electron はASARファイルから全体を解凍せずに任意のファイルを読み出すことができます。

ASAR 形式は、主に Windows でのパフォーマンス向上を目的に作成されました… 要加筆

### CRT

C ランタイム ライブラリ (CRT, C Run-time Library) は ISO C99 標準ライブラリが組み込まれている C++ 標準ライブラリの一部です。 ネイティブコード開発、ネイティブコードと管理コードの混在した開発、.Netの純粋な管理コードをサポートするCRTを実装するVisual C++ライブラリ

### DMG

Apple Disk Image (DMG) はmacOSで使用されるパッケージング形式です。 DMGファイルはインストーラーアプリケーションを配布するために使用されます。 [electron-builder][]は`dmg`形式をビルドターゲットとしてサポートしています。

### IME

Input Method Editorの略で、日本では「かな漢字変換システム」を指します。 日本のユーザにとっては何を今更という説明になりますが、漢字などキーボード上に存在しない文字や記号を入力するためのツールです。 日本語、中国語、韓国語に限らず、インドの言語などもIMEを使用することでアルファベット（ローマ字）から入力することができます。

### IDL

Interface description language、インターフェイス記述言語のことです。 Java、C++、JavaScript などのインターフェース生成に使用できるフォーマットで、関数のシグネチャやデータ型を記述します。

### IPC

IPC は Inter-Process Communication、プロセス間通信の略です。 Electron は、シリアライズされた JSON メッセージを [メインプロセス][] と [レンダラプロセス][] 間で送信する際に IPC を使用します。

### libchromiumcontent

[Chromium Content module][] および 全ての依存関係（Blink や [V8][]）を含む共有ライブラリです。 libcc とも呼ばれます。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### メインプロセス (main process)

メインプロセスは通常 `main.js` というファイル名で配置され、Electron アプリのエントリポイントになります。 これはアプリが開始してから終了するまでを制御します。 また、メニュー、メニューバー、ドック、タスクトレイなどのネイティブ要素の管理も担当します。 メインプロセスは、アプリ内のレンダラプロセスの作成も担います。 完全な Node API を使用できます。

各アプリのメインプロセスファイルは、`package.json` の `main` プロパティに指定します。 `electron .` はここから起動時に実行するファイルを取得します。

Chromium では、このプロセスを "ブラウザプロセス" と呼びます。 レンダラープロセスとの混同を避けるため、Electron では名前を変更しています。

[プロセス](#process)、[レンダラープロセス](#renderer-process)についても参照してください。

### MAS

Apple の Mac App Store の頭文字をつなげたものです。 MAS へのアプリ登録の詳細は、[Mac App Store 登録ガイド][] を参照してください。

### Mojo

イントラプロセスまたはインタープロセス通信のための IPC システム。これが重要なのは、Chromeが別々のプロセスで動作するかどうかを、メモリプレッシャーによって判断するようにに設計されているからです。

（参照： https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md ）

### ネイティブモジュール (native module)

ネイティブ モジュールはNode.js では[アドオン][] とも呼ばれ、requireによってNode.jsやElectronへ読み込むことの出来る、C またはC++で書かれたモジュールです。通常のNode.jsモジュールと同様に使用することが出来ます。 主に、Node.jsで実行されているJavaScript と C/C++ のライブラリ間のインタフェースを提供するために使用されます。

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールでビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

[ネイティブNodeモジュールを使用する][]についても参照してください.

### NSIS

Nullsoft Script Install Systemは、Microsoft Windows向けの、スクリプト駆動型インストーラー作成ツールです。(訳注: NullsoftはWinampの開発元の企業です) フリーソフトウェアライセンスの元でリリースされており、InstallShieldのようなプロプライエタリな商用製品の代替として広く使用されています。 [electron-builder][]はNSISをビルドターゲットとしてサポートしています。

### OSR

OSR (Off-screen rendering、オフスクリーンレンダリング) を使用すると、重いページをバックグラウンドで読み込みんだ後で表示することができます (かなりの高速化が期待されます)。 画面に表示することなくページをレンダリングできます。

### process

プロセスは、実行されているプログラムのインスタンスです。 Electronでは、[メインプロセス][]と 1つ以上の[レンダラープロセス][]が動作しており、実際には同時に複数のプログラムが実行されていることになります。

Node.jsとElectronでは、実行中のプロセスは、`process`オブジェクトをもっています。 このオブジェクトは現在のプロセスに関する情報を提供し、また制御を行う広域変数です。 広域変数であるため、require() を使用せずにいつでもアクセスできます。

[メインプロセス](#main-process)、[レンダラープロセス](#renderer-process)についても参照してください。

### レンダラープロセス (renderer process)

レンダラープロセスは、アプリ内のブラウザウインドウです。 メインプロセスと違って複数存在でき、それぞれ別のプロセスとして動作します。 また、非表示にもできます。

通常のブラウザでは、ウェブページはサンドボックス化された環境で実行され、ネイティブリソースへのアクセスは許可されません。 しかし、Electron を使用している場合は、Node.js API をウェブページ内で使用して、OS へ作用できるローレベル API を使用することが出来ます。

[プロセス](#process)、[レンダラープロセス](#main-process)についても参照してください。

### Squirrel

Squirrelは、Electronアプリケーションの新しいバージョンに対する自動更新を可能にするオープンソースフレームワークです。 Squirrelについては [autoUpdater][] APIを参照してください。

### ユーザーランド (userland)

Unixコミュニティーに由来する言葉ですが、"ユーザーランド"や"ユーザースペース"は、Osカーネルの外側で動作するプログラムを意味します。 より最近では、この用語はNodeやnpmコミュニティでは、"Node core"で使用できる機能を、大きな"ユーザー"コミュニティ npmに登録して公開されたパッケージを区別されるために使用されます。

Nodeのように、Electronはマルチプラットフォームデスクトップアプリケーションを開発するのに必要なすべての原始的機能を提供するスモールセットAPIを提供することに焦点を当てています。 この設計思想により、Electronは過度にルールに則りすぎたものではなく、柔軟なツールでいられるようにしています。 ユーザーランドは、"core"で使用できる物の上に追加機能を提供するツールを作成したり共有したりすることを可能にします。

### V8

V8 は Google のオープンソース JavaScript エンジンです。 C++ で書かれており、Google Chrome で使用されています。 V8 はスタンドアローンで実行することも、任意の C++ アプリケーションに組み込むこともできます。

Electron は V8 を Chromium の一部としてビルドし、それからNodeをビルドする際に NodeがV8を指すようにします。

V8 のバージョンは必ず Google Chrome のバージョンに対応しています。 例えば Chrome 59 には V8 5.9 が入っており、Chrome 58 には V8 5.8 が入っています。

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` タグは、Electron アプリに 'ゲスト' コンテンツ (外部のウェブページなど) を埋め込むために使用します。 これらは `iframe` に似ていますが、それぞれの webview が別のプロセスで実行されるという点が異なります。 あなたのウェブページとは同じ権限はもっておらず、アプリと埋め込まれたコンテンツのやりとりは非同期的な物になります。 アプリはこれにより埋め込みコンテンツから安全を保たれます。

[アドオン]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[Chromium Content module]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store 登録ガイド]: tutorial/mac-app-store-submission-guide.md
[メインプロセス]: #main-process
[レンダラプロセス]: #renderer-process
[レンダラープロセス]: #renderer-process
[ネイティブNodeモジュールを使用する]: tutorial/using-native-node-modules.md
[V8]: #v8
