# Архітектура Програми Electron

Перед тим як ми зможемо зануритися в Electron's APIs, нам необхідно обговорити 2 типи процесів наявних в Electron. Вони є фундаментально різні та важливі для розуміння.

## Main та Renderer Processes

В Electron, процес що запускає `package.json`'s `main` скрипт що називається **the main process**. Скрипт що запускає main process може демонструвати GUI за допомогою створення веб сторінок. Застосунок Electron завжди має main process, і нічого більше.

Відтоді як Electron використовує Chromium для відображення веб-сторінок, багато процесна архітектураChromium також використовується. Кожна веб-сторінка в Electron запускається в процесі що стосується тільки її, що називається **the renderer process**.

У нормальних браузерах, веб-сторінки зазвичай виконуються в тестових середовищах і не мають доступу до нативних ресурсів. Користувачі Electron, однак, мають змогу використовувати Node.js API на веб-сторінках, дозволяючи низькорівневу взаємодію з операційною системою.

### Різниця між Головним і Процесом рендерингу

Головний процес створює веб-сторінки, за допомогою створення екземплярів`BrowserWindow`. Кожен екземпляр `BrowserWindow` запускає веб-сторінку у власному процесі рендерингу. Коли екземляр `BrowserWindow` знищено, процес рендерингу буде зупинено.

Головний процес керує всіма веб-сторінками і відповідними процесами для їх рендерінгу. Кожний процес рендерінгу є ізольованим і стосується веб сторінки що в ньому запущена.

In web pages, calling native GUI related APIs is not allowed because managing native GUI resources in web pages is very dangerous and it is easy to leak resources. If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

> #### Aside: Communication Between Processes
> 
> In Electron, we have several ways to communicate between the main process and renderer processes, such as [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## Використання Electron APIs

Electron offers a number of APIs that support the development of a desktop application in both the main process and the renderer process. In both processes, you'd access Electron's APIs by requiring its included module:

```javascript
const electron = require('electron')
```

All Electron APIs are assigned a process type. Many of them can only be used from the main process, some of them only from a renderer process, some from both. The documentation for each individual API will state which process it can be used from.

A window in Electron is for instance created using the `BrowserWindow` class. It is only available in the main process.

```javascript
// Це буде працювати в main process, але буде `undefined` в 
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

## Використання API Node.js

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
//Готове для використання S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. Проте якщо вам необхідні native modules, будь ласка гляньте [цей гайд про те як рекомпілювати їх для Electron](./using-native-node-modules.md).