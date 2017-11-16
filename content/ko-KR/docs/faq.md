# Electron 자주 묻는 질문

## 왜 Electron을 설치하는데에 문제가 생길까요?

`npm install electron`을 실행할 때, 사용자들은 가끔 설치 에러를 마주치게 됩니다.

대부분의 경우, 이 에러는 네트워크 문제일 뿐 `electron` npm 패키지의 문제는 거의 아닙니다. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` 위 같은 에러들은 모두 네트워크 문제라고 볼 수 있습니다. 가장 좋은 해결책은 네트워크를 바꾸거나, 기다려 보거나, 설치를 다시 하는 것입니다.

또한 `npm` 을 이용한 설치가 실패한다면 Electron을 [electron/electron/releases](https://github.com/electron/electron/releases) 에서 직접 설치할 수 있습니다.

## 언제 Electron이 최신 버전의 Chrome으로 업그레이드 되나요?

Electron의 Chrome 버전은 보통 새로운 Chrome 안정 버전이 릴리즈 된 이후 1주 내지 2주 내로 업데이트됩니다. 하지만 이러한 업데이트 주기는 보장되지 않으며 업그레이드에 필요한 작업의 양에 따라 달라집니다.

Electron은 크롬이 사용하는 안정된 채널만을 이용합니다, 만약 중요한 수정이 베타 또는 개발 채널에 패치된 경우, 이전 버전의 채널로 롤백합니다.

자세한 내용은 [보안 설명](tutorial/security.md)을 참고하세요.

## Electron은 언제 최신 버전의 Node.js로 업그레이드 하나요?

새로운 버전의 Node.js가 릴리즈 되면, 보통 Electron을 업그레이드 하기 전에 한 달 정도 대기합니다. 이렇게 하면 새로운 Node.js 버전을 업데이트 함으로써 발생하는 버그들을 피할 수 있기 때문입니다. 이러한 상황은 자주 발생합니다.

Node.js의 새로운 기능은 보통 V8 업그레이드에서 가져옵니다. Electron은 Chrome 브라우저에 탑재된 V8을 사용하고 있습니다. 눈부신 새로운 Node.js 버전의 자바스크립트 기능은 보통 이미 Electron에 있습니다.

## 어떻게 웹 페이지 간에 데이터를 공유할 수 있나요?

두 웹페이지 간에 (렌더러 프로세스) 데이터를 공유하려면 간단히 이미 모든 브라우저에서 사용할 수 있는 HTML5 API들을 사용하면 됩니다. 가장 좋은 후보는 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) 그리고 [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 가 있습니다.

또는 Electron에서만 사용할 수 있는 IPC 시스템을 사용하여 메인 프로세스의 global 변수에 데이터를 저장한 후 다음과 같이 렌더러 프로세스에서 `electron` 모듈의 `remote` 속성을 통하여 접근할 수 있습니다:

```javascript
// 메인 프로세스에서.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// 첫 번째 페이지에서.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// 두 번째 페이지에서.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## 제작한 애플리케이션의 윈도우/트레이가 몇 분 후에나 나타납니다.

이러한 문제가 발생하는 이유는 보통 윈도우/트레이를 담은 변수에 가비지 컬렉션이 작동해서 그럴 가능성이 높습니다.

이러한 문제를 맞닥뜨린 경우 다음 문서를 읽어보는 것이 좋습니다:

* [메모리 관리](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [변수 스코프](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

만약 빠르게 고치고 싶다면, 다음과 같이 변수를 전역 변수로 만드는 방법이 있습니다:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// 주 프로세스에서.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.