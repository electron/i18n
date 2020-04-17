# 개요

> Node.js 와 Electron API 사용법

모든 [Node.js의 built-in 모듈](https://nodejs.org/api/)은 Electron에서 가능하고 써드파티 node 모듈 또한 모두 지원합니다. ([native 모듈](../tutorial/using-native-node-modules.md) 포함)

Electron은 또한 네이티브 데스트탑 어플리케이션 개발을 위해 추가적인 몇개의 built-in 모듈을 제공합니다. 일부 모듈은 main 프로세스에서만 가능하며, 일부 모듈은 renderer process(웹페이지)에서만 가능합니다. 그리고 일부 모듈은 두 프로세스 모두에서 가능합니다.

기본 규칙 다음과 같습니다: 모듈이 [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface)이나 low-level 시스템과 관련되었으면 메인 프로세스에서만 가능합니다. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/application-architecture.md#main-and-renderer-processes) scripts to be able to use those modules.

main 프로세스 스크립트는 일반적인 Node.js 스크립트와 같습니다:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

renderer 프로세스는 node 모듈을 사용할 수 있다 점을 제외하면 일반적인 웹페이지과 다르지 않습니다:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const { app } = require('electron').remote
  console.log(app.getVersion())
</script>
</body>
</html>
```

앱을 실행해보고자 한다면 [Run your app](../tutorial/first-app.md#running-your-app)을 읽어주세요.

## Destructuring assignment

As of 0.37, you can use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make it easier to use built-in modules.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

If you need the entire `electron` module, you can require it and then using destructuring to access the individual modules from `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

This is equivalent to the following code:

```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```
