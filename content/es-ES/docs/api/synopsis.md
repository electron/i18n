# Sinopsis

> Como utilizar Node.js y los APIs de Electrón.

Todos los [módulos incorporados de Node.js](https://nodejs.org/api/) está disponibles en Electrón y los nodos de terceros también son completamente compatibles (incluyendo a los [ módulos nativos](../tutorial/using-native-node-modules.md)).

Electrón además provee algunos módulos incorporados extra para desarrollar aplicaciones de escritorio nativas. Algunos módulos solo están disponibles en el proceso principal, algunos solo están disponibles en el proceso de renderizado (página web) y algunos pueden ser usados en ambos procesos.

La regla básica es: si un módulo es [ GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) o relacionado a sistemas de bajo nivel, entonces solo puede estar disponible en el proceso principal. You need to be familiar with the concept of [main process vs. proceso de renderizado](../tutorial/application-architecture.md#main-and-renderer-processes) códigos para ser capaz de usar los módulos.

The main process script is like a normal Node.js script:

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

To run your app, read [Run your app](../tutorial/first-app.md#running-your-app).

## Asignación de desestructuración

Respecto al 0.37, puedes usar [ asignación de desestruturación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) para hacer más fácil el uso de los módulos incorporados.

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Si necesitas el módulo ` electron ` completo, puedes requerirlo y luego usar la desestructuración para acceder a los módulos individuales desde ` electron `.

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Este es equivalente al siguiente código:

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