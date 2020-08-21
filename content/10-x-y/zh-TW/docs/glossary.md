# 詞彙表

本頁定義了在 Electron 程式開發上的一些慣用術語。

### ASAR

ASAR 代表 Atom Shell Archive Format。 [Asar][asar] 壓縮檔類似 `tar` 格式，都是將多個檔案數個檔案串接成單一個檔案。 Electron 可以在不拆開整個檔案的情況下任意地從它讀取檔案。

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

C 執行階段程式庫（C Run-time Library，縮寫為 CRT）是 C++ 標準程式庫的一部分，整合了 ISO C99 標準程式庫。 實作 CRT 的 Visual C++ 程式庫支援機器碼開發，混合的機器碼與受控碼 ，以及 .NET 上的純受控程式碼開發。

### DMG

Apple 磁碟映像檔 (Apple Disk Image) 是 macOS 用的打包格式。 DMG 檔案常被用來打包應用程式的「安裝程式」。 [electron-builder][] 支援打包成 `dmg`。

### IME

輸入法編輯器 (Input Method Editor)。 讓使用者能輸入不在鍵盤上的字元及符號的程式。 例如，讓使用者在拉丁鍵盤上輸入中文、日文、韓文和印度文字。

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main][] and [renderer][] processes.

### libchromiumcontent

包含 [Chromium Content][] 及其相依的所有模組 (例如 Blink, [V8][] 等) 的共用程式庫。 也稱作 "libcc"。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### 主處理序

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. 通常也會用它來管理功能表、功能表列、Dock、Tray 等原生元素。 The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

可再參考: [處理序](#process), [畫面轉譯處理序](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### 原生模組

Native modules (also called [addons][] in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. 主要是提供 Node.js 中的 JavaScript 與 C/C++ 程式庫溝通的介面。

Electron 支援 Node 原生模組，但是 Electron 很有可能會用跟你安裝的 Node 不同版本的 V8，因此建置原生模組時你要手動指定 Electron 標頭檔的位置。

可再參考[使用 Node 原生模組][]。

### NSIS

Nullsoft 腳本式安裝系統 (Nullsoft Scriptable Install System)，是 Microsoft Windows 上的一套腳本式安裝程式編寫工具。 它是在多種自由軟體許可的組合下發佈，是 InstallShield 等商業產品外，廣泛被使用的解決方案。 [electron-builder][] 支援 NSIS 建置。

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### 處理序

處理序 (Process) 是電腦程式執行中的一個執行個體。 使用[主處理序][]及一或多個[畫面轉譯處理序][]的 Electron 應用程式，實際上是同時執行多個程式。

在 Node.js 和 Electron 中，每個執行中的處理序都有相對應的 `process` 物件。 這是個全域物件，可以提供目前處理序的相關資訊，也能操作控制它。 因為它是全域的，應用程式可以不用透過 require() 直接存取。

可再參考: [主處理序](#main-process)、[畫面轉譯處理序](#renderer-process)

### 畫面轉譯處理序

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

在一般的瀏覽器中，網頁通常是在沙箱環境中執行，不能存取本機資源。 然後，Electron 的使用者，能在網頁中使用 Node.js API，與作業系統進行較低階的互動。

可再參考: [處理序](#process), [主處理序](#main-process)

### Squirrel

Squirrel 是讓 Electron 應用程式的新版本發佈時能自動更新的開放原始碼框架。 可以參考 [autoUpdater][] API 學著怎麼開始使用 Squirrel。

### 使用者園地

這個術語起源於 Unix 社群，使用者園地 (“userland” 或 “userspace”) 指的是在作業系統核心外執行的程式。 最近，這個名詞在 Node 及 npm 社群中流行起來，用來區分由「Node 核心」功能及由龐大「使用者」社群發佈到 npm 上的套件。

像 Node 一樣，Electron 只專注在一組小而精的 API 上，提供開發跨平臺桌面應用程式所需的必要功能。 這種設計理念讓 Electron 保有彈性，且不過度設限實際的使用方式。 使用者園地讓使用者們建立及分享「核心」沒提供的功能。

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron 把 V8 視為 Chromium 的一部分一起建置，再建置 Node 時就直接指到這份 V8。

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. 它跟你一般的網頁有不一樣的權限，應用程式與嵌入內容之間的溝通全部都是非同步的。 這麼一來可以確保你應用程式的安全性不會受到嵌入內容影響。

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[Chromium Content]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[主處理序]: #main-process
[renderer]: #renderer-process
[畫面轉譯處理序]: #renderer-process
[使用 Node 原生模組]: tutorial/using-native-node-modules.md
[V8]: #v8
