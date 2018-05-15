# Electron 應用程式架構

Before we can dive into Electron's APIs, we need to discuss the two process types available in Electron. They are fundamentally different and important to understand.

## 主處理序及畫面轉譯處理序

在 Electron 中，透過 `package.json` 中的 `main` 指令執行的程序稱作**主處理序**。 The script that runs in the main process can display a GUI by creating web pages. An Electron app always has one main process, but never more.

由於 Electron 使用 Chromium 來顯示網頁，因此 Chromium 的多程序架構也可以被使用。 Electron 中每個網頁都執行在各自的程序中，稱作**渲染器程序**。

在一般的瀏覽器中，網頁通常是在沙箱環境中執行，不能存取本機資源。 然後，Electron 的使用者，能在網頁中使用 Node.js API，與作業系統進行較低階的互動。

### 主程序與渲染器程序的差別

主程序透過 `BrowserWindow` 實例來建立網頁。 每一個 `BrowserWindow` 實例都會在自己的渲染器程序中運行網頁。 當一個 `BrowserWindow` 實例被銷毀後，相應的渲染器程序也會被終止。

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated and only cares about the web page running in it.

由於在網頁中管理原生的 GUI 資源很危險且容易導致資源洩漏，所以在網頁中不被允許使用原生 GUI 相關的 APIs。 如果你想在網頁中對 GUI 進行操作，其對應的渲染器程序必須和主程序溝通，請求主程序進行相關的 GUI 操作。

> #### Aside: Communication Between Processes
> 
> In Electron, we have several ways to communicate between the main process and renderer processes. Like [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## 使用 Electron API

Electron offers a number of APIs that support the development of a desktop application in both the main process and the renderer process. In both processes, you'd access Electron's APIs by requiring its included module:

```javascript
const electron = require('electron')
```

All Electron APIs are assigned a process type. Many of them can only be used from the main process, some of them only from a renderer process, some from both. The documentation for each individual API will state which process it can be used from.

A window in Electron is for instance created using the `BrowserWindow` class. It is only available in the main process.

```javascript
// This will work in the main process, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks. Electron comes with a module called `remote` that exposes APIs usually only available on the main process. In order to create a `BrowserWindow` from a renderer process, we'd use the remote as a middle-man:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## 使用 Node.js API

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) All APIs available in Node.js are available in Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).