# 시작하기

Electron을 사용하면 풍부한 네이비트(운영 체제)API를 사용하여 런타임을 제공하는 순수 자바 스크립트로 데스크탑 앱을 만들 수 있습니다. 웹 서버 대신 데스크탑 앱에 초점을 맞춘 Node.js 런타임의 모델로 보시면 됩니다.

이건 Electron이 graphical user interface(GUI)라이브러리에 대한 자바 스크립트 바인딩이 아닙니다. 대신, Electron은 웹 페이지를 GUI로 사용하므로, 자바스크립트로 제어되는 크롬 브라우저로도 볼 수 있습니다.

### Main Process 

Electron에서 `package.json`의 `main` 스크립트를 실행하는 프로세스를 **the main process**라고 부릅니다. 메인 프로세스에서 실행되는 스크립트는 웹 페이지를 만들어서 GUI를 표시 할 수 있습니다.

### Renderer Process

Electron은 웹페이지를 보여주기 위해 Chromium을 사용하고, 그렇기에 Chromium의 멀티 프로세스 아키텍쳐 또한 사용됩니다. 각각의 Electron 웹페이지는 자체 프로세스로 동작하고 이것을 **the renderer process**라고 부릅니다.

일반적인 브라우저에서 웹 페이지는 대개 샌드박스 환경에서 실행하고 네이티브 리소스에 액세스 할 수 없습니다. 그러나 Electron 유저들은 Node.js APIs 의 낮은 수준의 운영체제 상호 작용을 허용하는 웹 페이지에서 힘이 있다.

### Differences Between Main Process and Renderer Process

메인 프로세스는 `BrowserWindow` 인스턴스를 생성하여 웹페이지를 만듭니다. 각각의 `BrowserWindow` 인스턴스는 자체 렌더러 프로세스에서 웹 페이지를 실행합니다. `BrowserWindow` 인스턴스가 소멸되면, 해당 렌더러 프로세스도 종료됩니다.

메인 프로세스는 모든 웹 페이지와 해당하는 렌더러 프로세스를 관리합니다. 각각의 렌더러 프로세스는 분리되어 있으며 실행되는 웹 페이지 에서만 보호 받습니다.

웹 페이지에서 네이티브 GUI 관련 API는 웹 페이지에서 네이티브 GUI리소스를 관리하는 것이 매우 위험하고 리소스의 유출이 쉽게 때문에 허용하지 않습니다. 웹페이지에서 GUI작업을 수행하려면, 웹 페이지의 렌더러 프로세스가 메인 프로세스에게 이러한 작업을 수행하도록 요청해야 합니다.

Electron에는 메인 프로세스와 렌더러 프로세스 사이에 통신할 수 있는 몇 가지 방법이 있습니다. 예로, 메시지를 보내는 [`ipcRenderer`](../api/ipc-renderer.md) 와 [`ipcMain`](../api/ipc-main.md) 모듈, RPC 스타일 통신인 [remote](../api/remote.md)모듈이 있다. 또한 FAQ에 [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages)를 기입해 놓았습니다.

## 당신의 첫 번째 Electron 앱을 만드세요

일반적으로 Electron 앱의 구조는 이렇습니다:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

`package.json`의 형식은 Node들의 모듈과 일치하고, 스크립트에서 `main`필드가 메인 프로세스를 시작하는 앱의 시작 스크립트입니다. `package.json`의 예는 다음과 같습니다:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: 만약 `main` 필드가 `package.json`에 없으면, 일렉트론은 `index.js`를 로드하려고 할 것입니다.

`main.js`는 윈도우를 생성하고 시스템 이벤트를 처리하는데 대표적인 예는 다음과 같습니다:

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

## Run your app

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