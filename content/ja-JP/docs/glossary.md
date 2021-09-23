# 用語集

このページでは、Electron の開発で一般的に使用される用語を示します。

### ASAR

ASARはAtom Shell Archive Formatの略語です。 [asar][]アーカイブは、複数のファイルを1つにまとめる`tar`ライクでシンプルなアーカイブ形式です。 Electron はASARファイルから全体を解凍せずに任意のファイルを読み出すことができます。

The ASAR format was created primarily to improve performance on Windows when reading large quantities of small files (e.g. when loading your app's JavaScript dependency tree from `node_modules`).

### code signing

Code signing is a process where an app developer digitally signs their code to ensure that it hasn't been tampered with after packaging. Both Windows and macOS implement their own version of code signing. As a desktop app developer, it's important that you sign your code if you plan on distributing it to the general public.

For more information, read the [Code Signing][] tutorial.

### context isolation

Context isolation is a security measure in Electron that ensures that your preload script cannot leak privileged Electron or Node.js APIs to the web contents in your renderer process. With context isolation enabled, the only way to expose APIs from your preload script is through the `contextBridge` API.

For more information, read the [Context Isolation][] tutorial.

See also: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

The C Runtime Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. ネイティブコード開発、ネイティブコードと管理コードの混在した開発、.Netの純粋な管理コードをサポートするCRTを実装するVisual C++ライブラリ

### DMG

Apple Disk Image (DMG) はmacOSで使用されるパッケージング形式です。 DMGファイルはインストーラーアプリケーションを配布するために使用されます。

### IME

Input Method Editorの略で、日本では「かな漢字変換システム」を指します。 日本のユーザにとっては何を今更という説明になりますが、漢字などキーボード上に存在しない文字や記号を入力するためのツールです。 日本語、中国語、韓国語に限らず、インドの言語などもIMEを使用することでアルファベット（ローマ字）から入力することができます。

### IDL

Interface description language、インターフェイス記述言語のことです。 Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

[メインプロセス](#main-process)、[レンダラープロセス](#renderer-process)についても参照してください。

### メインプロセス (main process)

メインプロセスは通常 `main.js` というファイル名で配置され、Electron アプリのエントリポイントになります。 これはアプリが開始してから終了するまでを制御します。 また、メニュー、メニューバー、ドック、タスクトレイなどのネイティブ要素の管理も担当します。 メインプロセスは、アプリ内のレンダラプロセスの作成も担います。 完全な Node API を使用できます。

各アプリのメインプロセスファイルは、`package.json` の `main` プロパティに指定します。 `electron .` はここから起動時に実行するファイルを取得します。

Chromium では、このプロセスを "ブラウザプロセス" と呼びます。 レンダラープロセスとの混同を避けるため、Electron では名前を変更しています。

[プロセス](#process)、[レンダラープロセス](#renderer-process)についても参照してください。

### MAS

Apple の Mac App Store の頭文字をつなげたものです。 MAS へのアプリ登録の詳細は、[Mac App Store 登録ガイド][] を参照してください。

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

（参照： https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md ）

See also: [IPC](#ipc)

### MSI

On Windows, MSI packages are used by the Windows Installer (also known as Microsoft Installer) service to install and configure applications.

More information can be found in [Microsoft's documentation][msi].

### ネイティブモジュール (native module)

ネイティブ モジュールはNode.js では[アドオン][] とも呼ばれ、requireによってNode.jsやElectronへ読み込むことの出来る、C またはC++で書かれたモジュールです。通常のNode.jsモジュールと同様に使用することが出来ます。 主に、Node.jsで実行されているJavaScript と C/C++ のライブラリ間のインタフェースを提供するために使用されます。

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールでビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

For more information, read the [Native Node Modules] tutorial.

### 公証

Notarization is a macOS-specific process where a developer can send a code-signed app to Apple servers to get verified for malicious components through an automated service.

See also: [code signing](#code-signing)

### OSR

OSR (offscreen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). 画面に表示することなくページをレンダリングできます。

For more information, read the [Offscreen Rendering][][osr] tutorial.

### preload script

Preload scripts contain code that executes in a renderer process before its web contents begin loading. These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

See also: [renderer process](#renderer-process), [context isolation](#context-isolation)

### プロセス

プロセスは、実行されているプログラムのインスタンスです。 Electronでは、[メインプロセス][]と 1つ以上の[レンダラープロセス][]が動作しており、実際には同時に複数のプログラムが実行されていることになります。

Node.jsとElectronでは、実行中のプロセスは、`process`オブジェクトをもっています。 このオブジェクトは現在のプロセスに関する情報を提供し、また制御を行う広域変数です。 広域変数であるため、require() を使用せずにいつでもアクセスできます。

[メインプロセス](#main-process)、[レンダラープロセス](#renderer-process)についても参照してください。

### レンダラープロセス (renderer process)

レンダラープロセスは、アプリ内のブラウザウインドウです。 メインプロセスと違って複数存在でき、それぞれ別のプロセスとして動作します。 また、非表示にもできます。

[プロセス](#process)、[レンダラープロセス](#main-process)についても参照してください。

### サンドボックス

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrelは、Electronアプリケーションの新しいバージョンに対する自動更新を可能にするオープンソースフレームワークです。 Squirrelについては [autoUpdater][] APIを参照してください。

### ユーザーランド (userland)

Unixコミュニティーに由来する言葉ですが、"ユーザーランド"や"ユーザースペース"は、Osカーネルの外側で動作するプログラムを意味します。 より最近では、この用語はNodeやnpmコミュニティでは、"Node core"で使用できる機能を、大きな"ユーザー"コミュニティ npmに登録して公開されたパッケージを区別されるために使用されます。

Node.jsのように、Electronはマルチプラットフォームなデスクトップアプリケーション開発に必要なすべての原始的機能を提供するスモールセットAPIを提供することに焦点を当てています。 この設計思想により、Electronは過度にルールに則りすぎたものになることなく、柔軟性を持つツールであり続けることが可能になっています。 ユーザーランドは、"core"で使用できる物の上に追加機能を提供するツールを作成したり共有したりすることを可能にします。

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
[Code Signing]: tutorial/code-signing.md
[Context Isolation]: tutorial/context-isolation.md
[Mac App Store 登録ガイド]: tutorial/mac-app-store-submission-guide.md
[メインプロセス]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[レンダラープロセス]: #renderer-process
