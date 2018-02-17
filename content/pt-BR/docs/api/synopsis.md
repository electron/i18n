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

O processo de renderização não é diferente de uma página web normal, com exceção da capacidade adicional de usar módulos de nó:

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

Para executar o seu aplicativo, leia [executar seu aplicativo](../tutorial/quick-start.md#run-your-app).

## Atribuição de desestruturação

A partir de 0,37, você pode usar [tarefa de desestruturação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) para facilitar a utilização módulos internos.

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Se você precisar de todo o módulo `electron`, você pode exigi-lo e depois usar desestruturação para acessar os módulos individuais do `electron`.

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

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