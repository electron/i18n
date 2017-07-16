# Electron 자주 묻는 질문

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
// In the main process.
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

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

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
// In the main process.
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