# Sinopse

> Como usar Node.js e Electron APIs.

All of [Node.js's built-in modules](https://nodejs.org/api/) are available in Electron and third-party node modules also fully supported as well (including the [native modules](../tutorial/using-native-node-modules.md)).

O Electron também fornece alguns módulos extras para o desenvolvimento de aplicativos desktop. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

A regra básica é: se um módulo for [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) ou relacionado ao sistema de baixo nível, então deve estar disponível apenas no processo principal. Você precisa estar familiarizado com o conceito de [ processo principal vs. processo de renderização ](../tutorial/application-architecture.md#main-and-renderer-processes) scripts para poder usar esses módulos.

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

Para executar o seu aplicativo, leia [executar seu aplicativo](../tutorial/first-app.md#running-your-app).

## Atribuição de desestruturação

A partir de 0,37, você pode usar [tarefa de desestruturação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) para facilitar a utilização módulos internos.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Se você precisar de todo o módulo `electron`, você pode exigi-lo e depois usar desestruturação para acessar os módulos individuais do `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Isto equivale ao seguinte código:

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
