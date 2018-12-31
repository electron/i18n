# 첫 번째 Electron 앱 만들기

Electron은 풍부한 네이티브(운영 체제) API를 가진 런타임을 제공하기 때문에 순수 JavaScript를 사용해 데스크탑 앱을 만들 수 있습니다. 웹 서버보다는 데스크탑 애플리케이션에 초점을 맞춘 Node.js 런타임의 변종이라고 생각하시면 됩니다.

그렇다고 해서, Electron이 그래픽 사용자 인터페이스(GUI) 라이브러리와 관련된 자바스크립트라는 의미는 아닙니다. Electron은 웹 페이지를 GUI로 사용하기 때문에, 자바스크립트로 제어되는 Chromium 브라우저에서도 작업 결과를 볼 수 있습니다.

**참고**: 예제 섹션에서 제공하는 저장소에서 예제를 [내려받아 바로 실행](#예제)할 수 있습니다.

개발과 관련해서 Electron 애플리케이션은 근본적으로 Node.js 애플리케이션이라고 할 수 있습니다. Node.js 모듈과 마찬가지로 시작점은 `package.json` 입니다. 기본적으로 Electron 앱 대부분은 다음과 같은 폴더 구조를 가지고 있습니다:

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

**주의**: `package.json`에 `main` 필드에 값이 설정되어 있지 않으면, Electron은 `index.js`를 로드하려고 할 것입니다. (Node.js 동작방식과 유사하게) 이것은 간단한 Node 애플리케이션이지만, 현재 패키지를 실행하기 위한 `node` 명령어를 담은 `start` 스크립트를 추가할 수도 있습니다.

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

이제 `electron`을 설치할 시간입니다. 서로 다른 Electron 버전을 가진 여러 가지 앱과 작업할 수 있게 개발 의존성 유형으로 Electron을 설치하는 방법을 추천합니다. 이를 위해, 앱 디렉토리에서 아래의 명령어를 실행하세요:

```sh
npm install --save-dev electron
```

이 이외에도 다양한 Electron 설치 방법이 있습니다. [설치 가이드](installation.md)를 방문하여 프록시, 미러, 커스텀 캐쉬 등을 알아보십시오.

## Electron 개발 맛보기

일랙트론 앱들은 Node.js 개발과 동일한 원칙 및 방법을 사용해 Javascript로 개발되었습니다. Electron에 있는 모든 API들과 기능들은 `electron` 모듈을 이용해 접근 할 수 있으며, 이것은 다른 Node.js 모듈처럼 사용이 가능 합니다:

```javascript
const electron = require('electron')
```

`electron` 모듈은 네임 스페이스의 기능을 노출합니다. 에를 들어, 애플리케이션의 수명주기는 `electron.app`를 통해 관리되며, `electron.BrowserWindow` 클래스를 통해 창들이 생성합니다. 심플한 `main.js` 파일은 응용 프로그램이 준비되고 창을 열 때까지 기다릴 것입니다.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

`main.js`는 창들을 생성하고 여러분의 애플리케이션이 발생시키는 모든 시스템 이벤트를 처리합니다. 위의 예제보다 더 완벽한 버전의 예제에서는 개발자 도구를 열거나, 창이 닫힐때의 처리, 혹은 macOS상에서 사용자가 dock의 app의 아이콘을 클릭했을때 창을 다시 만드는 등의 처리를 보여줍니다.

```javascript
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

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

마지막으로 `index.html`이 표시하려는 웹 페이지입니다.

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

최초로 생성되어 초기화된 `main.js`, `index.html`, 그리고 `package.json` 파일들을 갖고 있다면, 여러분의 애플리케이션 디렉토리에서 `npm start` 명령어를 이용하여 app을 실행해 볼 수 있습니다. 

## 예제

[`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) 레파지토리에서 소스를 clone하여 소스 안의 튜토리얼 코드를 실행합니다.

**참고**: 실행하기 위해선 [Git](https://git-scm.com)과 [npm](https://www.npmjs.com/)이 필요합니다.

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

빠른 개발 process를 위한 boilerplates와 툴의 목록은 [Boilerplates and CLIs documentation](./boilerplates-and-clis.md)의 문서를 참고하세요.