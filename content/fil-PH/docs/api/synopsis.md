# Sinopsis

> Paano gamitin ang Node.js at Electron na mga API.

Lahat ng [built-in na mga modyul ng Node.js](https://nodejs.org/api/) ay makikita sa Electron at ang mga pangatlong partido na mga modyul ay buong sinusuportahan rin (kasali na ang [mga modyul na native](../tutorial/using-native-node-modules.md)).

Ang Electron ay nagbibigay din ng ilang sobrang built-in na mga modyul para sa pagbubuo ng native na mga aplikasyong pang-desktop. Ang ibang mga modyul ay magagamit lamang sa pangunahing mga proseso, ang iba ay nasa prosesong renderer lamang (web na pahina), ang iba ay pwedeng gamitin sa dalawang proseso.

Ang mahalagang patakaran ay: kung ang isang modyul ay [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) o nauugnay sa mababang antas na sistema, dapat ay makikita lamang ito sa pangunahing proseso. You need to be familiar with the concept of [main process vs. prosesong renderer](../tutorial/quick-start.md#main-process) na mga script upang maaaring gamitin ang mga modyul na iyon.

The main process script is just like a normal Node.js script:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

Ang prosesong renderer ay hindi iba sa isang normal na pahina, maliban na lang sa ekstrang abilidad na magamit ang node na mga modyul:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const {app} = require('electron').remote
  console.log(app.getVersion())
</script>
</body>
</html>
```

To run your app, read [Run your app](../tutorial/quick-start.md#run-your-app).

## Ang Destructuring Assignment

Sa 0.37, magagamit mo ang [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) upang mapadali ang paggamit ng built-in na mga modyul.

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Kung kailangan mo ang kabuuang modyul ng `electron`, pwede mong i-require ito at gamitin ang destructuring upang i-access ang bawat mga modyul mula sa `electron`.

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
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

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```