# Electron 자주 묻는 질문

## 왜 Electron을 설치하는데에 문제가 생길까요?

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

## Electron 은 언제 최신 Chrome 으로 업그레이드 합니까?

Electron 의 Chrome 버전은 대게 새로운 안정적인 Chrome 버전이 출시 된 후 1 ~ 2 주 이내에 반영됩니다. 이 예상치는 보장되지 않으며 업그레이드와 관련 작업량에 따라 다릅니다.

Chrome 의 안정적인 채널만 사용됩니다. 베타 또는 개발 채널에 중요한 수정 사항이 있다면, 소급 적용 할 것 입니다.

자세한 내용은, [보안 소개](tutorial/security.md)를 참조하세요.

## Electron 은 언제 최신 Node.js 로 업그레이드 합니까?

Node.js 의 새 버전이 출시되면, Electron 에서 업그레이드 하기 전에 보통 한 달 정도 기다립니다. 그래서 새 Node.js 버전에 발생한 버그의 영향을 받지 않을 수 있습니다. 이것은 매우 자주 발생합니다.

일반적으로 Node.js 의 새 기능은 V8 업그레이드로 가져옵니다. Electron 이 Chrome 브라우저에 탑재된 V8 을 사용하기 때문에, 대게 새 Node.js 버전의 빛나는 새JavaScript 기능은 이미 Electron 에 있습니다.

## 웹 페이지 간 데이터는 어떻게 공유합니까?

웹 페이지 (렌더러 프로세스 들) 간 데이터를 공유하기 위한 가장 쉬운 방법은 브라우저에 이미 사용가능 한 HTML5 API 들을 사용하는 것 입니다. 좋은 후보는 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 입니다.

또는 Electron 에 한정되는 IPC 시스템을 사용할 수 있습니다. `electron` 모듈의 `remote` 속성을 통하여 주 프로세스의 객체를 전역 변수로 저장하고, 렌더러에서 그것들에 접근합니다:

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

## 몇 분 후 내 앱이 윈도우 트레이에서 사라집니다.

이 현상은 window/tray 를 저장하기 위해 사용 된 변수가 가비지 수집 될 때 발생합니다.

이 문제가 발생했다면, 다음 글이 도움이 될 것 입니다:

* [메모리 관리](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [변수 스코프](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

빨리 해결하고 싶다면, 코드를 변경 해 변수를 전역으로 만듭니다. 다음 코드에서:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

다음으로:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Electron 에서 jQuery/RequireJS/Meteor/AngularJS 를 사용할 수 없습니다.

Electron 의 Node.js 통합으로 인해, DOM 에 `module`, `exports`, `require` 같은 몇 가지 추가 기호가 삽입됐습니다. 이것은 같은 이름의 심볼을 삽입하려는 몇몇 라이브러리에서 문제를 일으킵니다.

이것을 해결하기 위해, Electron 에서 노드 통합을 해제 할 수 있습니다:

```javascript
//메인 프로세스에서.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

그러나 Node.js 와 Electron API 들의 기능을 유지하려면, 다른 라이브러리를 포함하기 전에 페이지의 심볼 이름을 변경해야 합니다:

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

## `require('electron').xxx` 가 정의되지 않았습니다.

Electron 의 내장 모듈을 사용하다가 다음과 같은 에러를 만날 수 있습니다:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

이것은 지역 또는 전역에 [npm `electron` 모듈](https://www.npmjs.com/package/electron)이 설치되어 있기 때문입니다. 이것은 Electron 의 내장 모듈을 덮어씁니다.

올바른 내장 모듈을 사용하고 있는지 확인하기 위해, `electron` 모듈의 경로를 출력 할 수 있습니다:

```javascript
console.log(require.resolve('electron'))
```

그리고 다음과 같은 형식인지 확인하세요:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

`node_modules/electron/index.js` 와 같으면, npm `electron` 모듈을 지우거나, 이름을 바꿔야 합니다.

```sh
npm uninstall electron
npm uninstall -g electron
```

그러나 내장 모듈을 사용하고 있지만 여전히 이 오류가 발생하면, 모듈을 잘못 된 프로세스에서 사용하고 있을 가능성이 큽니다. 예를 들어 `electron.app` 는 주 프로세스에서만 사용할 수 있고, `electron.webFrame` 은 렌더러 프로세스에서만 사용 가능합니다.