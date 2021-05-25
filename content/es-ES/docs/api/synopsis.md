# Sinopsis

> Como utilizar Node.js y los APIs de Electrón.

Todos los [módulos incorporados de Node.js](https://nodejs.org/api/) está disponibles en Electrón y los nodos de terceros también son completamente compatibles (incluyendo a los [ módulos nativos](../tutorial/using-native-node-modules.md)).

Electrón además provee algunos módulos incorporados extra para desarrollar aplicaciones de escritorio nativas. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

La regla básica es: si un módulo es [ GUI][gui] o relacionado a sistemas de bajo nivel, entonces solo puede estar disponible en el proceso principal. You need to be familiar with the concept of main process vs. renderer process scripts to be able to use those modules.

El scrip del proceso principal es como un script normal de Node.js:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

El renderer process no es diferente a una página web normal, excepto por la habilidad extra de usar módulos node si `nodeIntegration` está activada:

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

## Asignación de desestructuración

Respecto al 0.37, puedes usar [ asignación de desestruturación][destructuring-assignment] para hacer más fácil el uso de los módulos incorporados.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Si necesitas el módulo ` electron ` completo, puedes requerirlo y luego usar la desestructuración para acceder a los módulos individuales desde ` electron `.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
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

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
