# 用語集

このページでは、Electron の開発で一般的に使用される用語を示します。

### ASAR

ASARはAtom Shell Archive Formatの略語です。 [asar](https://github.com/electron/asar)アーカイブは、複数のファイルを1つにまとめる`tar`ライクでシンプルなアーカイブ形式です。 Electron はASARファイルから全体を解凍せずに任意のファイルを読み出すことができます。

ASAR 形式は、Windows でのパフォーマンスを向上させるために主に作成されました…[書きかけです]

### Brightray

[Brightray](https://github.com/electron/brightray)は、アプリケーション内で簡単に[libchromiumcontent](#libchromiumcontent)を使用する静的ライブラリです。 Brightrayは元々Electronのために作成されましたが、Electronを使用していないネイティブアプリでChromiumのレンダラを有効にするために使用する事もできます。

Brightrayは低レイヤーの依存ライブラリで、大半のElectronユーザが関わらないものです。

### DMG

Apple Disk Image (DMG) はmacOSで使用されるパッケージング形式です。 DMGファイルはインストーラーアプリケーションを配布するために使用されます。 [electron-builder](https://github.com/electron-userland/electron-builder)は`dmg`形式をビルドターゲットとしてサポートしています。

### IPC

IPCはプロセス間通信 (Inter-Process Communication) の略語です。Electron は シリアル化されたJSON メッセージを [メインプロセス](#main-process) と [レンダラプロセス](#renderer-process) 間で送信する際にIPCを使用します。

### libchromiumcontent

Chromiumコンテントモジュールとその依存関係(例：Blink, [V8](#v8)など)を含んだ単一共有ライブラリです。

### メインプロセス (main process)

メインプロセスは通常は`main.js`というファイル名で配置され、Electronアプリの開始ポイントになります。アプリケーションが開始されてから終了されるまでを制御します。 また、メニュー、メニューバー、ドック、タスクトレイなどのネイティブ要素の管理も担当します。 メインプロセスは、アプリ中のレンダラプロセスの作成も担当しています。完全なNode APIを使用できます。

アプリのメインプロセスファイルは、`package.json` の `main`プロパティで指定されます。これをもとに`Electron`は起動時に実行するファイルを知ることが出来ます。

[プロセス](#process)、[レンダラープロセス](#renderer-process)についても参照してください。

### MAS

AppleのMac App Storeの略語です。MASへアプリを投稿する歳の詳細については、[Mac App Store 提出ガイド](tutorials/mac-app-store-submission-guide.md)をご参照ください。

### ネイティブモジュール (native module)

ネイティブ モジュールはNode.js では[アドオン](https://nodejs.org/api/addons.html) とも呼ばれ、requireによってNode.jsやElectronへ読み込むことの出来る、C またはC++でかかれたモジュールです。通常のNode.jsモジュールと童謡に使用することが出来ます。 主に、Node.jsで実行されているJavaScript と C/C++ のライブラリ間のインタフェースを提供するために使用されます。

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールでビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

[ネイティブNodeモジュールを使用する](tutorial/using-native-node-modules.md)についても参照してください.

## NSIS

Nullsoft Script Install Systemは、Microsoft Windows向けの、スクリプト駆動型インストーラー作成ツールです。(訳注: NullsoftはWinampの開発元の企業です) フリーソフトウェアライセンスの元でリリースされており、InstallShieldのようなプロプライエタリな商用製品の代替として広く使用されています。 [electron-builder](https://github.com/electron-userland/electron-builder)はNSISをビルドターゲットとしてサポートしています。

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

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 は Google 製のオープンソース JavaScript エンジンです。C++で書かれており、Google Chrome で使用されています。V8 はスタンドアロンで実行することも、任意の C++ アプリケーションに埋め込むこともできます。

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.