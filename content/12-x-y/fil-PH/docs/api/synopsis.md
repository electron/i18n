# Sinopsis

> Paano gamitin ang Node.js at Electron na mga API.

Lahat ng [built-in na mga modyul ng Node.js](https://nodejs.org/api/) ay makikita sa Electron at ang mga pangatlong partido na mga modyul ay buong sinusuportahan rin (kasali na ang [mga modyul na native](../tutorial/using-native-node-modules.md)).

Ang Electron ay nagbibigay din ng ilang sobrang built-in na mga modyul para sa pagbubuo ng native na mga aplikasyong pang-desktop. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

Ang mahalagang patakaran ay: kung ang isang modyul ay [GUI][gui] o nauugnay sa mababang antas na sistema, dapat ay makikita lamang ito sa pangunahing proseso. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.

The main process script is like a normal Node.js script:

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

Upang mapagana ang iyong app, basahin ang [Paganahin ang iyong app](../tutorial/quick-start.md#run-your-application).

## Ang Destructuring Assignment

Sa 0.37, magagamit mo ang [destructuring assignment][destructuring-assignment] upang mapadali ang paggamit ng built-in na mga modyul.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Kung kailangan mo ang kabuuang modyul ng `electron`, pwede mong i-require ito at gamitin ang destructuring upang i-access ang bawat mga modyul mula sa `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Katumbas ito sa sumusunod na code:

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
