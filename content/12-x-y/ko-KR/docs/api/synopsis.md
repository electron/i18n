# 개요

> Node.js 와 Electron API 사용법

모든 [Node.js의 built-in 모듈](https://nodejs.org/api/)은 Electron에서 가능하고 써드파티 node 모듈 또한 모두 지원합니다. ([native 모듈](../tutorial/using-native-node-modules.md) 포함)

Electron은 또한 네이티브 데스트탑 어플리케이션 개발을 위해 추가적인 몇개의 built-in 모듈을 제공합니다. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

기본 규칙 다음과 같습니다: 모듈이 [GUI][gui]이나 low-level 시스템과 관련되었으면 메인 프로세스에서만 가능합니다. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.

main 프로세스 스크립트는 일반적인 Node.js 스크립트와 같습니다:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

The renderer process is no different than a normal web page, except for the extra ability to use node modules if `nodeIntegration` is enabled:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs')
  console.log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

앱을 실행해보고자 한다면 [Run your app](../tutorial/quick-start.md#run-your-application)을 읽어주세요.

## Destructuring assignment

As of 0.37, you can use [destructuring assignment][destructuring-assignment] to make it easier to use built-in modules.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

If you need the entire `electron` module, you can require it and then using destructuring to access the individual modules from `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
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

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
