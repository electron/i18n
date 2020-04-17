# 첫 번째 Electron 앱 만들기

Electron은 풍부한 네이티브(운영 체제) API를 가진 런타임을 제공하기 때문에 순수 JavaScript를 사용해 데스크탑 앱을 만들 수 있습니다. 웹 서버보다는 데스크탑 애플리케이션에 초점을 맞춘 Node.js 런타임의 변종이라고 생각하시면 됩니다.

그렇다고 해서, Electron이 그래픽 사용자 인터페이스(GUI) 라이브러리와 관련된 자바스크립트라는 의미는 아닙니다. Electron은 웹 페이지를 GUI로 사용하기 때문에, 자바스크립트로 제어되는 Chromium 브라우저에서도 작업 결과를 볼 수 있습니다.

**참고**: 예제 섹션에서 제공하는 저장소에서 예제를 [내려받아 바로 실행](#예제)할 수 있습니다.

개발과 관련해서 Electron 애플리케이션은 근본적으로 Node.js 애플리케이션이라고 할 수 있습니다. Node.js 모듈과 마찬가지로 시작점은 `package.json` 입니다. 기본적으로 Electron 앱 대부분은 다음과 같은 폴더 구조를 가지고 있습니다:

```plaintext
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

__주의__: `package.json`에 `main` 필드에 값이 설정되어 있지 않으면, Electron은 `index.js`를 로드하려고 할 것입니다. (Node.js 동작방식과 유사하게) 이것은 간단한 Node 애플리케이션이지만, 현재 패키지를 실행하기 위한 `node` 명령어를 담은 `start` 스크립트를 추가할 수도 있습니다.

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

이 이외에도 다양한 Electron 설치 방법이 있습니다. 프록시, 미러 사이트, 커스텀 캐시 등을 이용한 설치 방법은 [설치 가이드 문서](installation.md)를 참고하시길 바랍니다.

## Electron 개발 맛보기

Electron 앱은 자바스크립트로 개발하며, Node.js를 개발할 때 사용하던 개념과 메서드를 그대로 이용해서 앱을 개발할 수 있습니다. Electron의 모든 API와 기능은 `electron` 모듈을 통해 접근할 수 있으며, Node.js 모듈 사용법과 유사합니다:

```javascript
const electron = require('electron')
```

`electron` 모듈은 네임 스페이스 안에서 기능을 제공합니다. 예를 들면, 애플리케이션 생명 주기는 `electron.app`을 통해 관리되며, `electron.BrowserWindow` 클래스를 사용해 창을 생성할 수 있습니다. 아래 예제는 애플리케이션이 준비될 때까지 기다렸다가 창을 여는 `main.js`코드입니다:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 브라우저 창을 생성합니다.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 그리고 앱의 index.html를 로드합니다.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

`main.js`는 창을 생성하고 애플리케이션에서 발생한 모든 시스템 이벤트를 처리합니다. 최종 완성된 예제 코드에서는 개발자 도구를 열거나, 창 닫기 처리, macOS에서 사용자가 dock의 app 아이콘을 클릭했을때 창 재생성하기 등의 기능을 제공하고 있습니다.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 브라우저 창을 생성합니다.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // 개발자 도구를 엽니다.
  win.webContents.openDevTools()
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
app.whenReady().then(createWindow)

// 모든 윈도우가 닫히면 종료된다.
app.on('window-all-closed', () => {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 이 파일에는 나머지 앱의 특정 주요 프로세스 코드를 포함시킬 수 있습니다. 별도의 파일에 추가할 수도 있으며 이 경우 require 구문이 필요합니다.
```

마지막으로 `index.html`는 보여주고 싶은 웹 페이지에 해당합니다:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
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

`main.js`, `index.html`, `package.json` 파일을 작성한 후에는, 애플리케이션 디렉토리에서 `npm start` 명령어를 이용해 앱을 실행할 수 있습니다.

## 예제

[`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) 저장소를 clone하여 이 문서에서 설명한 코드를 실행해 볼 수 있습니다.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# 저장소 clone
$ git clone https://github.com/electron/electron-quick-start
# 저장소 디렉토리로 이동
$ cd electron-quick-start
# 의존성 설치
$ npm install
# 앱 실행
$ npm start
```

개발 편의성을 제공하는 boilerplates와 도구 목록을 확인하려면, [Boilerplates와 CLI](./boilerplates-and-clis.md) 문서를 참고하세요.
