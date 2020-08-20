# Sinopse

> Como usar APIs Node.js e Electron.

All of [Node.js's built-in modules](https://nodejs.org/api/) are available in Electron and third-party node modules also fully supported as well (including the [native modules](../tutorial/using-native-node-modules.md)).

O Electron também fornece alguns módulos extras para o desenvolvimento de aplicativos desktop. Alguns módulos só estão disponíveis no processo principal, alguns só estão disponíveis no processo de renderização (página web), e alguns podem ser usados em ambos os processos.

A regra básica é: se um módulo for [GUI][gui] ou relacionado ao sistema de baixo nível, então deve estar disponível apenas no processo principal. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/application-architecture.md#main-and-renderer-processes) scripts to be able to use those modules.

The main process script is like a normal Node.js script:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

O processo de renderização não é diferente de uma página web normal, com exceção da capacidade adicional de usar módulos de nó:

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

Para executar o seu aplicativo, leia [executar seu aplicativo](../tutorial/first-app.md#running-your-app).

## Atribuição de desestruturação

A partir de 0,37, você pode usar [tarefa de desestruturação][destructuring-assignment] para facilitar a utilização módulos internos.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Se você precisar de todo o módulo `electron`, você pode exigi-lo e depois usar desestruturação para acessar os módulos individuais do `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.on('ready', () => {
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

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
