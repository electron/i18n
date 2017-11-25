# 詞彙表

這一頁定義了 Electron 開發過程常用的一些術語。

### ASAR

ASAR 代表 Atom Shell Archive Format。 [Asar](https://github.com/electron/asar)壓縮檔類似 `tar` 格式，都是將多個檔案數個檔案串接成單一個檔案。 Electron 可以任意從它讀取，無須拆包整個檔。

ASAR 格式主要是為了提高在 Windows 上執行的效能... TODO

### Brightray

Brightray [之前是](https://github.com/electron-archive/brightray)讓應用程式方便使用 [libchromiumcontent](#libchromiumcontent) 的靜態程式庫。 目前已經沒在用了，相關程式已直接整合進 Electron 中。

### CRT

C 執行期程式庫 (C Run-time Library，縮寫為 CRT) 是 C++ 標準程式庫的一部分，整合了 ISO C99 標準程式庫。 Visual C++ 程式庫的 CRT 實作，支援機器碼開發、機器碼與 Managed 程式碼混用開發，以及 .NET 上的純 Managed 程式碼開發。

### DMG

Apple 磁碟映像檔 (Apple Disk Image) 是 macOS 用的打包格式。 DMG 檔案常被用來打包應用程式的「安裝程式」。 [electron-builder](https://github.com/electron-userland/electron-builder) 支援打包成 `dmg`。

### IME

輸入法編輯器 (Input Method Editor)。 讓使用者能輸入不在鍵盤上的字元及符號的程式。 例如，讓使用者在拉丁鍵盤上輸入中文、日文、韓文和印度文字。

### IPC

IPC 全名是跨處理序通訊 (Inter-Process Communication)。Electron 使用 IPC 在[主處理序](#main-process)及[畫面轉譯處理序](#renderer-process)間傳送序列化的 JSON 訊息。

### libchromiumcontent

包含 [Chromium Content](https://www.chromium.org/developers/content-module) 及其相依的所有模組 (例如 Blink, [V8](#v8) 等) 的共用程式庫。 也稱作 "libcc"。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### 主處理序

主處理序通常命名為 `main.js`，是每個 Electron 應用程式的入口點。控制應用程式由開啟到關閉的整個生命週期。 通常也會用它來管理功能表、功能表列、Dock、Tray 等原生元素。 主處理序也負責建立應用程式中的每個畫面轉譯處理序。內建完成的 Node API。

每個應用程式的主處理序檔是 `package.json` 的 `main` 值指定。`electron` 才知道啟動時要執行哪隻程式。

可再參考: [處理序](#process), [畫面轉譯處理序](#renderer-process)

### MAS

Apple Mac App Store 的縮寫。如何將你的應用程式送上 MAS，可以參考[Mac App Store 上架導引](tutorial/mac-app-store-submission-guide.md)。

### 原生模組

原生模組 (在 Node.js 裡也叫做 [附加元件 (Addon)](https://nodejs.org/api/addons.html)) 是用 C 或 C++ 開發的模組。可以在 Node.js 或 Electron 中透過 require() 方法載入，使用起來就像一般的 Node.js 模組一樣。 主要是提供 Node.js 中的 JavaScript 與 C/C++ 程式庫溝通的介面。

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

可再參考[使用原生 Node 模組](tutorial/using-native-node-modules.md)。

### NSIS

Nullsoft 腳本式安裝系統 (Nullsoft Scriptable Install System)，是 Microsoft Windows 上的一套腳本式安裝程式編寫工具。 It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

## OSR

螢幕外畫面轉譯 (Off-Screen Rendering)。

### 處理序

處理序 (Process) 是電腦程式執行中的一個執行個體。 Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### 畫面轉譯處理序

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

可再參考: [處理序](#process), [主處理序](#main-process)

### Squirrel

Squirrel 是讓 Electron 應用程式的新版本發佈時能自動更新的開放原始碼框架。 可以參考 [autoUpdater](api/auto-updater.md) API 學著怎麼開始使用 Squirrel。

### 使用者園地

這個術語起源於 Unix 社群，使用者園地 (“userland” 或 “userspace”) 指的是在作業系統核心外執行的程式。 最近，這個名詞在 Node 及 npm 社群中流行起來，用來區分由「Node 核心」功能及由龐大「使用者」社群發佈到 npm 上的套件。

像 Node 一樣，Electron 只專注在一組小而精的 API 上，提供開發跨平臺桌面應用程式所需的必要功能。 這種設計理念讓 Electron 保有彈性，且不過度設限實際的使用方式。 使用者園地讓使用者們建立及分享「核心」沒提供的功能。

### V8

V8 是 Goolge 開放原始碼的 JavaScript 引擎。以 C++ 撰寫，被用在 Google Chrome 裡。V8 也可以獨立執行，或嵌入在任何的 C++ 應用程式中。

Electron 把 V8 視為 Chromium 的一部分一起建置，再建置 Node 時就直接指到這份 V8。

V8 的版本會對應 Google Chrome 的版本。例如 Chrome 59 包含 V8 5.9 版，而 Chrome 58 則包含 V8 5.8 版。

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.