# Архитектура приложения Electron

Перед погружением в API нужно обсудить два доступных в Electron типа процессов. Они фундаментально различаются и их важно понимать.

## Main и Renderer процессы

В Electron процесс, который запускает сценарий `package.json` `main` называется **основным процессом**. Сценарий, запускающий главный процесс, может выводить GUI путем создания веб-страниц. В приложениях Electron всегда есть один главный процесс, но не больше.

Так как Electron использует Chromium для отображения веб-страниц, Chromium мульти-процессорная архитектура также используется. Каждая веб-страница электрон выполняется в собственном процессе, который называют **процесс визуализации**.

В нормальных браузерах, веб-страницы обычно выполняются в изолированной среде и им не разрешается доступ к нативным ресурсам. Пользователи Electron'а, однако, имеют право использовать API Node.js на веб-страницах, позволяя взаимодействовать на нижнем уровне операционной системы.

### Различия между основными процессами и процессами визуализации

Основной процесс создает веб-страницы путем создания экземпляров `BrowserWindow`. Каждый экземпляр `BrowserWindow` запускает веб-страницу в процессе визуализации. Когда экземпляр `BrowserWindow` уничтожается, соответствующий процесс визуализации также прекращается.

Основной процесс управляет всеми веб-страницами и процессами их визуализации. Каждый процесс визуализации изолирован и заботится только о веб-странице, работающей в нем.

В веб-страницах вызов нативного GUI связывать интерфейсы API не допускается, поскольку управление нативными GUI ресурсами на веб-страницах очень опасно, и это легко допустить утечку ресурсов. Если вы хотите выполнить GUI операции на веб-странице, процесс визуализации веб-страницы должен общаться с основным процессом для запроса выполнения этих операций основного процесса.

> #### Aside: Communication Between Processes
> 
> В Electron у нас есть несколько способов взамимодействия между основным процессом и процессами визуализации. Например, модули для отправки сообщений: [`ipcRenderer`](../api/ipc-renderer.md), [`ipcMain`](../api/ipc-main.md) и модуль для вызова удаленных процедур(RPC) - [remote](../api/remote.md). Так же доступен FAQ о [том, как обмениваться данными между веб-страницами](../faq.md#how-to-share-data-between-web-pages).

## Использование API Electron

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

## Использование API Node.js

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) Все API, доступные в Node.js также доступны и в Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) Вы можетет использовать Node.js модули в вашем приложении. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

Например чтобы использовать официальный AWS SDK в вашем приложении, следует сначала установить его как зависимость:

```sh
npm install --save aws-sdk
```

Затем в вашем приложении Electron, подключите и используйте модуль, так же как в Node.js приложение:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).