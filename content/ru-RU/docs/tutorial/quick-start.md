# Руководство для начинающих

Electron позволяет создавать настольные приложения на чистом JavaScript, предоставляя среду выполнения с богатым нативным интерфейсом API (операционной системы). Вы могли видеть это как вариант времени выполнения Node.js, ориентированного на настольные приложения вместо веб-серверов.

Это не означает, что Electron является JavaScript привязанной библиотекой графического пользовательского интерфейса (GUI). Вместо этого Electron использует веб-страницы как GUI, поэтому вы могли также видеть его как минимальный Chromium браузер, контролируемый JavaScript-ом.

### Основной процесс

В Electron процесс, который запускает `package.json` `main` сценарий называется **основной процесс**. Сценарий, который выполняется в основном процессе может отображать GUI путем создания веб-страниц.

### Процесс визуализации

Так как Electron использует Chromium для отображения веб-страниц, Chromium мульти-процессорная архитектура также используется. Каждая веб-страница электрон выполняется в собственном процессе, который называют **процесс визуализации**.

В нормальных браузерах, веб-страницы обычно выполняются в изолированной среде и им не разрешается доступ к нативным ресурсам. Electron пользователей, однако, имеют право использовать API Node.js на веб-страницах, позволяя взаимодействия нижнего уровня операционной системы.

### Различия между основными процессами и процессами визуализации

Основной процесс создает веб-страницы путем создания экземпляров `BrowserWindow`. Каждый экземпляр `BrowserWindow` запускает веб-страницу в процессе визуализации. Когда экземпляр `BrowserWindow` уничтожается, соответствующий процесс визуализации также прекращается.

Основной процесс управляет всеми веб-страницами и их соответствующими процессами визуализации. Каждый процесс визуализации изолирован и заботится только о веб-странице, в котором работает.

В веб-страницах вызов нативного GUI связывать интерфейсы API не допускается, поскольку управление нативными GUI ресурсами на веб-страницах очень опасно, и это легко допустить утечку ресурсов. Если вы хотите выполнить GUI операции на веб-странице, процесс визуализации веб-страницы должен общаться с основным процессом для запроса выполнения этих операций основного процесса.

В Electron у нас есть несколько способов общения между основным процессом и процессами визуализации. Как [`ipcRenderer`](../api/ipc-renderer.md) и [`ipcMain`](../api/ipc-main.md) модули для отправки сообщений и [remote](../api/remote.md) модуль для RPC стиля общения. Существует также запись FAQ о [том, как передавать данные между веб-страницами](../faq.md#how-to-share-data-between-web-pages).

## Напишите своё первое Electron приложение

В общем, структура Electron приложения выглядит так:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Формат `package.json` является точно таким же, как Node модули, и сценарий, указанный в поле `main` является сценарий запуска вашего приложения, который будет выполняться в основном процессе. Пример вашего `package.json` может выглядеть следующим образом:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js`.

The `main.js` should create windows and handle system events, a typical example being:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Finally the `index.html` is the web page you want to show:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Запустите Ваше приложение

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```bash
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

    $ .\electron\electron.exe your-app\
    

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```bash
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For more example apps, see the [list of boilerplates](https://electron.atom.io/community/#boilerplates) created by the awesome electron community.