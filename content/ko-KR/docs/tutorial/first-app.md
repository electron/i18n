# 첫 번째 Electron 앱 만들기

Electron은 풍부한 네이티브(운영 체제) API를 가진 런타임을 제공하기 때문에 순수 JavaScript를 사용해 데스크탑 앱을 만들 수 있습니다. 웹 서버 대신 데스크탑 애플리케이션에 초점을 맞춘 Node.js 런타임의 변종이라고 생각하시면 됩니다.

그렇다고 해서, Electron이 그래픽 사용자 인터페이스(GUI) 라이브러리를 연결하는 자바스크립트라는 의미는 아닙니다. 다만, Electron은 웹 페이지를 GUI로 사용하기 때문에, 자바스크립트로 제어되는 Chromium 브라우저에서도 작업 결과를 볼 수 있습니다.

**참고**: 이 예제는 저장소에서 [내려받아 바로 실행](#trying-this-example)할 수 있습니다.

개발과 관련해서 Electron 애플리케이션은 근본적으로 Node.js 애플리케이션이라고 할 수 있습니다. Node.js 모듈과 마찬가지로 시작점은 `package.json` 입니다. 기본적인 Electron 앱 대부분은 다음과 같은 폴더 구조를 가지고 있습니다:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

새로운 Electron 애플리케이션을 위해 빈 폴더를 하나 만드세요. 커맨드 라인 클라이언트를 실행한 다음, 새로 만든 폴더 경로에서 `npm init` 명령어를 실행하세요.

```sh
npm init
```

npm은 기본적인 `package.json`파일을 생성하여 여러분에게 정보를 줄 것입니다. `main` 필드에 명시된 스크립트는 여러분의 앱을 시작하는 스크립트이며, 메인 프로세스에서 실행될 것입니다. `package.json`은 아래와 같은 모습일 것입니다:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**주의**: package.json의 `main` 값이 없다면, Electron은 `index.js`를 로드할것입니다. (Node.js가 그러는것처럼요!) 이것이 간단한 Node 애플리케이션이었다면, 현재 패키지를 실행하는 `node` 명령어를 `start` 스크립트를 통해 추가할 수 있습니다.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

이 Node 애플리케이션을 Electron 애플리케이션으로 전환하는 것은 매우 간단합니다 -`node` 런타임을 `electron` 런타임으로 변경하기만 하면 됩니다.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Electron 설치하기

이 시점에선, 여러분은 `electron`을 설치해야 합니다. 가장 추천하는 방법은 electron을 당신의 앱의 개발 의존성으로 설치하는 것 입니다. 이것으로 여러 앱에서 여러 Electron 버전을 사용할 수 있죠. 그렇게 하기 위해선, 밑에 있는 명령어를 당신의 앱의 폴더(디렉토리)에서 실행 하세요:

```sh
npm install --save-dev electron
```

이 이외에도 여러 설치 방법이 있습니다. [설치 가이드](installation.md)를 방문하여 프록시, 미러, 커스텀 캐쉬 등을 알아보십시오.

## 간단히 설명한 Electron 개발

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // index.html을 불러옵니다
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadFile('index.html')

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

## 앱 실행하기

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## 예제

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**주의**: 이 코드를 실행하려면 [Git](https://git-scm.com)이 필요합니다.

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).