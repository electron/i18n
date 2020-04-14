# 用語集

このページでは、Electron の開発で一般的に使用される用語を示します。

### ASAR

ASARはAtom Shell Archive Formatの略語です。 [asar](https://github.com/electron/asar)アーカイブは、複数のファイルを1つにまとめる`tar`ライクでシンプルなアーカイブ形式です。 Electron はASARファイルから全体を解凍せずに任意のファイルを読み出すことができます。

ASAR 形式は、Windows でのパフォーマンスを向上させるために主に作成されました…[書きかけです]

### CRT

C ランタイム ライブラリ (CRT, C Run-time Library) は ISO C99 標準ライブラリが組み込まれている C++ 標準ライブラリの一部です。 ネイティブコード開発、ネイティブコードと管理コードの混在した開発、.Netの純粋な管理コードをサポートするCRTを実装するVisual C++ライブラリ

### DMG

Apple Disk Image (DMG) はmacOSで使用されるパッケージング形式です。 DMGファイルはインストーラーアプリケーションを配布するために使用されます。 [electron-builder](https://github.com/electron-userland/electron-builder)は`dmg`形式をビルドターゲットとしてサポートしています。

### IME

Input Method Editorの略で、日本では「かな漢字変換システム」を指します。 日本のユーザにとっては何を今更という説明になりますが、漢字などキーボード上に存在しない文字や記号を入力するためのツールです。 日本語、中国語、韓国語に限らず、インドの言語などもIMEを使用することでアルファベット（ローマ字）から入力することができます。

### IDL

インターフェース記述言語。関数シグネチャとデータ型を記述するとJavaやC++、Javascript等の言語でインターフェースを生成するために使用されるフォーマット

### IPC

IPCはプロセス間通信 (Inter-Process Communication) の略語です。Electron は シリアル化されたJSON メッセージを [メインプロセス](#main-process) と [レンダラプロセス](#renderer-process) 間で送信する際にIPCを使用します。

### libchromiumcontent

[Chromium Content module](https://www.chromium.org/developers/content-module) および 全ての依存関係（Blink や [V8](#v8)）を含む共有ライブラリです。 libcc とも呼ばれます。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### メインプロセス (main process)

メインプロセスは通常、 `main.js` というファイル名で配置され、Electron アプリのエントリポイントになります。アプリケーションが開始されてから終了されるまでを制御します。 また、メニュー、メニューバー、ドック、タスクトレイなどのネイティブ要素の管理も担当します。 メインプロセスは、アプリ中におけるレンダラプロセスの生成も担当しています。完全なNode APIを使用できます。

アプリのメインプロセスファイルは、`package.json` の `main`プロパティで指定されます。これをもとに`Electron`は起動時に実行するファイルを知ることが出来ます。

なお、Chromium においては、メインプロセスは「ブラウザプロセス」(browser process) と称されます。Electron では、レンダラプロセスとの混同を防ぐために名称が変更されています。

[プロセス](#process)、[レンダラープロセス](#renderer-process)についても参照してください。

### MAS

AppleのMac App Storeの略語です。MASへアプリを登録する際の詳細については、[Mac App Store 登録ガイド](tutorial/mac-app-store-submission-guide.md)をご参照ください。

### Mojo

イントラプロセスまたはインタープロセス通信のための IPC システム。これが重要なのは、Chromeが別々のプロセスで動作するかどうかを、メモリプレッシャーによって判断するようにに設計されているからです。

（参照： https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md ）

### ネイティブモジュール (native module)

ネイティブ モジュールはNode.js では[アドオン](https://nodejs.org/api/addons.html) とも呼ばれ、requireによってNode.jsやElectronへ読み込むことの出来る、C またはC++で書かれたモジュールです。通常のNode.jsモジュールと同様に使用することが出来ます。 主に、Node.jsで実行されているJavaScript と C/C++ のライブラリ間のインタフェースを提供するために使用されます。

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

Electron は V8 を Chromium の一部としてビルドし、それからNodeをビルドする際に NodeがV8を指すようにします。

V8のバージョンは必ず Google Chrome のバージョンに対応しています。例えば Chrome 59 には V8 5.9 が、Chrome 58 には V8 5.8 が含まれています。

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview`タグはElectron上のあなたのアプリ上に、外部ページなどの'guest'コンテンツを埋め込むために使用されます。`iframe`のような物ですが、それぞれのwebviewが別々のプロセスで動作する点が異なります。 あなたのウェブページとは同じ権限はもっておらず、アプリと埋め込まれたコンテンツのやりとりは非同期的な物になります。 アプリはこれにより埋め込みコンテンツから安全を保たれます。