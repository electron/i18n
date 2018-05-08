# 用語集

このページでは、Electron の開発で一般的に使用される用語を示します。

### ASAR

ASARはAtom Shell Archive Formatの略語です。 [asar](https://github.com/electron/asar)アーカイブは、複数のファイルを1つにまとめる`tar`ライクでシンプルなアーカイブ形式です。 Electron はASARファイルから全体を解凍せずに任意のファイルを読み出すことができます。

ASAR 形式は、Windows でのパフォーマンスを向上させるために主に作成されました…[書きかけです]

### Brightray

Brightray は [libchromiumcontent](#libchromiumcontent) をアプリ内で簡単に使用するための静的ライブラリ[でした](https://github.com/electron-archive/brightray)。 現在は廃止されており、Electronのコードベースにマージされています。

### CRT

C ランタイム ライブラリ (CRT, C Run-time Library) は ISO C99 標準ライブラリが組み込まれている C++ 標準ライブラリの一部です。 The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

Apple Disk Image (DMG) はmacOSで使用されるパッケージング形式です。 DMGファイルはインストーラーアプリケーションを配布するために使用されます。 [electron-builder](https://github.com/electron-userland/electron-builder)は`dmg`形式をビルドターゲットとしてサポートしています。

### IME

Input Method Editorの略で、日本では「かな漢字変換システム」を指します。 日本のユーザにとっては何を今更という説明になりますが、漢字などキーボード上に存在しない文字や記号を入力するためのツールです。 日本語、中国語、韓国語に限らず、インドの言語などもIMEを使用することでアルファベット（ローマ字）から入力することができます。

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPCはプロセス間通信 (Inter-Process Communication) の略語です。Electron は シリアル化されたJSON メッセージを [メインプロセス](#main-process) と [レンダラプロセス](#renderer-process) 間で送信する際にIPCを使用します。

### libchromiumcontent

[Chromium Content module](https://www.chromium.org/developers/content-module) および 全ての依存関係（Blink や [V8](#v8)）を含む共有ライブラリです。 libcc とも呼ばれます。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### メインプロセス (main process)

メインプロセスは通常は`main.js`というファイル名で配置され、Electronアプリの開始ポイントになります。アプリケーションが開始されてから終了されるまでを制御します。 また、メニュー、メニューバー、ドック、タスクトレイなどのネイティブ要素の管理も担当します。 メインプロセスは、アプリ中のレンダラプロセスの作成も担当しています。完全なNode APIを使用できます。

アプリのメインプロセスファイルは、`package.json` の `main`プロパティで指定されます。これをもとに`Electron`は起動時に実行するファイルを知ることが出来ます。

なお、Chromium においては、メインプロセスは「ブラウザプロセス」(browser process) と称されます。Electron では、レンダラプロセスとの混同を防ぐために名称が変更されています。

[プロセス](#process)、[レンダラープロセス](#renderer-process)についても参照してください。

### MAS

AppleのMac App Storeの略語です。MASへアプリを登録する際の詳細については、[Mac App Store 登録ガイド](tutorial/mac-app-store-submission-guide.md)をご参照ください。

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### ネイティブモジュール (native module)

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. 主に、Node.jsで実行されているJavaScript と C/C++ のライブラリ間のインタフェースを提供するために使用されます。

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールでビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

[ネイティブNodeモジュールを使用する](tutorial/using-native-node-modules.md)についても参照してください.

### NSIS

Nullsoft Script Install Systemは、Microsoft Windows向けの、スクリプト駆動型インストーラー作成ツールです。(訳注: NullsoftはWinampの開発元の企業です) フリーソフトウェアライセンスの元でリリースされており、InstallShieldのようなプロプライエタリな商用製品の代替として広く使用されています。 [electron-builder](https://github.com/electron-userland/electron-builder)はNSISをビルドターゲットとしてサポートしています。

### OSR

OSR (Off-screen rendering) を使用すると、重いページをバックグラウンドで読み込みんだ後で表示することができます（かなりの高速化が期待されます）。画面に表示することなくページをレンダリングすることができます。

### プロセス

プロセスは、実行されているプログラムのインスタンスです。 Electronでは、[メインプロセス](#main-process)と 1つ以上の[レンダラープロセス](#renderer-process)が動作しており、実際には同時に複数のプログラムが実行されていることになります。

Node.jsとElectronでは、実行中のプロセスは、`process`オブジェクトをもっています。 このオブジェクトは現在のプロセスに関する情報を提供し、また制御を行う広域変数です。 広域変数であるため、require() を使用せずにいつでもアクセスできます。

[メインプロセス](#main-process)、[レンダラープロセス](#renderer-process)についても参照してください。

### レンダラプロセス (renderer process)

レンダラプロセスは、アプリ中のブラウザーウィンドウです。メインプロセスと異なり、複数存在することが出来、それぞれが別のプロセスとして動作します。また、非表示にもできます。

通常のブラウザでは、ウェブページはサンドボックス化された環境で実行され、ネイティブリソースへのアクセスは許可されません。 しかし、Electronを使用している場合は、Node.js APIをウェブページ内で使用して、OSへ作用できる低レベルAPIを使用することが出来ます。

[プロセス](#process)、[レンダラープロセス](#main-process)についても参照してください。

### Squirrel

Squirrelは、Electronアプリケーションの新しいバージョンに対する自動更新を可能にするオープンソースフレームワークです。 Squirrelについては [autoUpdater](api/auto-updater.md) APIを参照してください。

### ユーザーランド (userland)

Unixコミュニティーに由来する言葉ですが、"ユーザーランド"や"ユーザースペース"は、Osカーネルの外側で動作するプログラムを意味します。 より最近では、この用語はNodeやnpmコミュニティでは、"Node core"で使用できる機能を、大きな"ユーザー"コミュニティ npmに登録して公開されたパッケージを区別されるために使用されます。

Nodeのように、Electronはマルチプラットフォームデスクトップアプリケーションを開発するのに必要なすべての原始的機能を提供するスモールセットAPIを提供することに焦点を当てています。 この設計思想により、Electronは過度にルールに則りすぎたものではなく、柔軟なツールでいられるようにしています。 ユーザーランドは、"core"で使用できる物の上に追加機能を提供するツールを作成したり共有したりすることを可能にします。

### V8

V8 は Google 製のオープンソース JavaScript エンジンです。C++で書かれており、Google Chrome で使用されています。V8 はスタンドアロンで実行することも、任意の C++ アプリケーションに埋め込むこともできます。

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8のバージョンは必ず Google Chrome のバージョンに対応しています。例えば Chrome 59 には V8 5.9 が、Chrome 58 には V8 5.8 が含まれています。

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview`タグはElectron上のあなたのアプリ上に、外部ページなどの'guest'コンテンツを埋め込むために使用されます。`iframe`のような物ですが、それぞれのwebviewが別々のプロセスで動作する点が異なります。 あなたのウェブページとは同じ権限はもっておらず、アプリと埋め込まれたコンテンツのやりとりは非同期的な物になります。 アプリはこれにより埋め込みコンテンツから安全を保たれます。