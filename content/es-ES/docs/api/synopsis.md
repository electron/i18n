# Sinopsis

> Como utilizar Node.js y los APIs de Electrón.

Todos los [módulos incorporados de Node.js](https://nodejs.org/api/) está disponibles en Electrón y los nodos de terceros también son completamente compatibles (incluyendo a los [ módulos nativos](../tutorial/using-native-node-modules.md)).

Electrón además provee algunos módulos incorporados extra para desarrollar aplicaciones de escritorio nativas. Algunos módulos solo están disponibles en el proceso principal, algunos solo están disponibles en el proceso de renderizado (página web) y algunos pueden ser usados en ambos procesos.

La regla básica es: si un módulo es [ GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) o relacionado a sistemas de bajo nivel, entonces solo puede estar disponible en el proceso principal. Necesitas estar familiarizado con el concepto de [ proceso principal vs. proceso de renderizado](../tutorial/quick-start.md#main-process) códigos para ser capaz de usar los módulos.

El código del proceso principal es solo como un código Node.js normal:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

El proceso de renderizado no es diferente que el de una página web normal, excepto por la habilidad extra de usar módulos de nodos:

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

## Asignación de desestructuración

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