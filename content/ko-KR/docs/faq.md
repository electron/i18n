# Electron FAQ

## 왜 Electron을 설치하는데에 문제가 생길까요?

`npm install electron`을 실행하면 일부 사용자는 설치 오류가 발생할 수 있습니다.

거의 모든 경우, 이러한 오류들은 네트워크 문제의 결과이고 `electron` npm package의 문제가 아닙니다. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 및 `ETIMEDOUT`과 같은 오류는 모두 네트워크 문제를 나타냅니다. 가장 좋은 해결책은 네트워크를 전환하거나, 잠시 기다렸다가 다시 설치하는 것입니다.

`npm`을 통한 설치가 실패 할 경우[electron/electron/releases](https://github.com/electron/electron/releases)에서 Electron을 직접 다운로드 할 수도 있습니다.

## Electron은 언제 최신 버전의 Chrome으로 업그레이드해야 합니까?

Electron의 Chrome 버전은 대게 새로운 안정적인 Chrome 버전이 출시 된 후 1 ~ 2 주 이내에 반영됩니다. 이 업그레이드 기간은 일정하지 않으며 업그레이드와 관련 작업량에 따라 다릅니다.

Chrome의 안정적인 채널만 사용됩니다. 베타 또는 개발 채널에 중요한 수정 사항이 있다면, 소급 적용 할 것 입니다.

자세한 내용은, [보안 소개](tutorial/security.md)를 참조하세요.

## Electron을 언제 최신 Node.js로 업그레이드해야 합니까?

Node.js의 새 버전이 출시되면, Electron 또한 업그레이드 전에 보통 한 달 정도 기다립니다. 그래서 새 Node.js 버전에 매우 자주 발생하는 버그의 영향을 받지 않을 수 있습니다.

일반적으로 Node.js의 새 기능들은 V8의 업그레이드로부터 이루어집니다. Electron이 Chrome 브라우저에 탑재된 V8을 사용하기 시작한 때부터, 보통 빛나는 새 버전의 JavaScript 기능은 이미 Electron에 존재합니다.

## 웹 페이지 간에 데이터를 어떻게 공유하나요?

웹페이지(렌더러 프로세스들) 간의 가장 간단한 공유 방법은 이미 모든 브라우저에서 사용가능한 HTML5의 API를 사용하는 것입니다. 좋은 해결책들은 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)입니다.

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

## 내 앱의 트레이가 몇 분 후에 사라집니다.

이 현상은 트레이를 저장하기 위해 사용된 변수가 쓰레기로 수집되었을 때 발생합니다.

이 문제가 발생했다면, 다음 글이 도움이 될 것 입니다:

* [메모리 관리](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [변수 스코프](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

빨리 해결하고 싶다면, 코드를 변경 해 변수를 전역으로 만듭니다. 다음 코드에서:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

다음으로:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Electron에서 jQuery/RequireJS/Meteor/AngularJS를 사용할 수 없습니다.

Electron 의 Node.js 통합으로 인해, DOM 에 `module`, `exports`, `require` 같은 몇 가지 추가 기호가 삽입됐습니다. 이것은 같은 이름의 심볼을 삽입하려는 몇몇 라이브러리에서 문제를 일으킵니다.

이것을 해결하기 위해, Electron 에서 노드 통합을 해제 할 수 있습니다:

```javascript
//메인 프로세스에서.
const { BrowserWindow } = require('electron')
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

## 서체가 흐릿해 보입니다, 이것은 무엇이고 어떻게 해결할 수 있나요?

[sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/)이 비활성화되어 있을 경우, LCD 화면의 서체가 흐릿해 보일 수 있습니다. 예를 들어

![subpixel 렌더링 예시](images/subpixel-rendering-screenshot.gif)

서브 픽셀 앤티 앨리어싱에는 글꼴 글리프가 포함 된 레이어의 불투명 배경이 필요합니다. (더 많은 정보는 [이 이슈](https://github.com/electron/electron/issues/6344#issuecomment-420371918)에서 확인하세요).

이 목표를 달성하려면 생성자에서 [BrowserWindow](api/browser-window.md)의 배경을 설정하십시오.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

이 효과는 (일부?) LCD 화면에서만 볼 수 있습니다. 차이가 보이지 않더라도 일부 사용자가 있을 수 있습니다. 다른 이유가 없는 한 항상 배경을 이런 식으로 설정하는 것이 가장 좋습니다.

CSS에서 배경을 설정하는 것만으로는 효과가 없습니다.