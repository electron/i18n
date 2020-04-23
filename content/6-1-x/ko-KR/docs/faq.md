# Electron FAQ

## 왜 Electron을 설치하는데에 문제가 생길까요?

`npm install electron`을 실행할 때, 어떤 사용자에게는 가끔 설치 오류가 발생합니다.

대부분의 경우에는, 이 오류는 네트웍 문제로 인한 것이고 `electron` npm 패키지 자체의 오류는 아닙니다. `ELIFECYCLE`나 `EAI_AGAIN`, `ECONNRESET`, `ETIMEDOUT` 같은 오류는 이런 네트웍 문제임을 나타냅니다. 최선의 방법은 네트웍을 전환하거나 잠시 기다린 후에 다시 설치를 시도하는 것입니다.

`npm`을 통해 설치하는 것에 실패한다면 Electron을 [electron/electron/releases](https://github.com/electron/electron/releases)로부터 직접 다운로드할 수 있습니다.

## Electron은 언제 최신 버전의 Chrome으로 업그레이드해야 합니까?

Electron의 Chrome 버전은 대게 새로운 안정적인 Chrome 버전이 출시 된 후 1 ~ 2 주 이내에 반영됩니다. 이 업그레이드 기간은 일정하지 않으며 업그레이드와 관련 작업량에 따라 다릅니다.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

자세한 내용은 [보안 설명](tutorial/security.md)을 참고하세요.

## Electron을 언제 최신 Node.js로 업그레이드해야 합니까?

Node.js의 새 버전이 출시되면, Electron 또한 업그레이드 전에 보통 한 달 정도 기다립니다. 그래서 새 Node.js 버전에 매우 자주 발생하는 버그의 영향을 받지 않을 수 있습니다.

일반적으로 Node.js의 새 기능들은 V8의 업그레이드로부터 이루어집니다. Electron이 Chrome 브라우저에 탑재된 V8을 사용하기 시작한 때부터, 보통 빛나는 새 버전의 JavaScript 기능은 이미 Electron에 존재합니다.

## 웹 페이지 간에 데이터를 어떻게 공유하나요?

웹페이지(렌더러 프로세스들) 간의 가장 간단한 공유 방법은 이미 모든 브라우저에서 사용가능한 HTML5의 API를 사용하는 것입니다. 좋은 해결책들은 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)입니다.

또는 Electron에서만 사용할 수 있는 IPC 시스템을 사용하여 메인 프로세스의 global 변수에 데이터를 저장한 후 다음과 같이 렌더러 프로세스에서 `electron` 모듈의 `remote` 속성을 통하여 접근할 수 있습니다:

```javascript
// 메인 프로세스에서.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## 내 앱의 윈도우/트레이가 몇 분 후에 사라집니다.

이 현상은 윈도우/트레이를 저장하기 위해 사용 된 변수가 쓰레기로 수집되었을 때 발생합니다.

이러한 문제를 맞닥뜨린 경우 다음 문서를 읽어보는 것이 좋습니다:

* [메모리 관리](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [변수 스코프](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

만약 빠르게 고치고 싶다면, 다음과 같이 변수를 전역 변수로 만드는 방법이 있습니다:

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

를 이렇게:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Electron에서 jQuery/RequireJS/Meteor/AngularJS를 사용할 수 없습니다.

Node.js가 Electron에 합쳐졌기 때문에, DOM에 `module`, `exports,` `require` 같은 몇 가지 심볼들이 추가됬습니다. 따라서 같은 이름의 심볼을 사용하는 몇몇 라이브러리들과 충돌이 발생할 수 있습니다.

이러한 문제를 해결하려면, Electron에서 node 포함을 비활성화시켜야 합니다:

```javascript
// 메인 프로세스에서.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

하지만 Node.js의 기능과 Electron API를 유지하고 싶다면 페이지에 다른 라이브러리를 추가하기 전에 심볼들의 이름을 변경해야 합니다:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## require('electron').xxx가 undefined를 반환합니다.

Electron의 빌트인 모듈을 사용할 때, 다음과 같은 오류가 발생할 수 있습니다:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

이러한 문제가 발생하는 이유는 [npm`의 electron` 모듈](https://www.npmjs.com/package/electron)이 로컬 또는 전역 중 한 곳에 설치되어, Electron의 빌트인 모듈을 덮어씌우는 바람에 빌트인 모듈을 사용할 수 없기 때문입니다.

올바른 빌트인 모듈을 사용하고 있는지 확인하고 싶다면, `electron` 모듈의 경로를 출력하는 방법이 있습니다:

```javascript
console.log(require.resolve('electron'))
```

그리고 다음과 같은 경로를 가지는지 점검하면 됩니다:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

하지만 `node_modules/electron/index.js`와 같은 경로로 되어있을 경우, `electron `모듈을 지우거나 이름을 바꿔야만 합니다.

```sh
npm uninstall electron
npm uninstall -g electron
```

그런데 여전히 빌트인 모듈이 계속해서 문제를 발생시키는 경우, 아마 모듈을 잘못 사용하고 있을 가능성이 큽니다. 예를 들면 `electron.app`은 메인 프로세스에서만 사용할 수 있는 모듈이며, 반면 `electron.webFrame` 모듈은 렌더러 프로세스에서만 사용할 수 있는 모듈입니다.
