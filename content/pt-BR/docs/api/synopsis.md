# Sinopse

> Como usar Node.js e Electron APIs.

All of [Node.js's built-in modules](https://nodejs.org/api/) are available in Electron and third-party node modules also fully supported as well (including the [native modules](../tutorial/using-native-node-modules.md)).

O Electron também fornece alguns módulos extras para o desenvolvimento de aplicativos desktop. Alguns módulos só estão disponíveis no processo principal, alguns só estão disponíveis no processo de renderização (página web), e alguns podem ser usados em ambos os processos.

A regra básica é: se um módulo for [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) ou relacionado ao sistema de baixo nível, então deve estar disponível apenas no processo principal. Você precisa estar familiarizado com o conceito de [ processo principal vs. processo de renderização ](../tutorial/quick-start.md#main-process) scripts para poder usar esses módulos.

O script do processo principal é exatamente como um script normal do Node.js:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

The renderer process is no different than a normal web page, except for the extra ability to use node modules:

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

## Destructuring assignment

As of 0.37, you can use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make it easier to use built-in modules.

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

If you need the entire `electron` module, you can require it and then using destructuring to access the individual modules from `electron`.

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

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