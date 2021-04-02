# Sinopsis

> Como utilizar Node.js y los APIs de Electrón.

Todos los [módulos incorporados de Node.js](https://nodejs.org/api/) está disponibles en Electrón y los nodos de terceros también son completamente compatibles (incluyendo a los [ módulos nativos](../tutorial/using-native-node-modules.md)).

Electrón además provee algunos módulos incorporados extra para desarrollar aplicaciones de escritorio nativas. Algunos módulos solo están disponibles en el proceso principal, algunos solo están disponibles en el proceso del representador (Página Web), y algunos se pueden usar en cualquier tipo de proceso.

La regla básica es: si un módulo es [ GUI][gui] o relacionado a sistemas de bajo nivel, entonces solo puede estar disponible en el proceso principal. Debes estar familiarizado con el concepto de los scripts [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) para ser capaz de usar esos módulos.

El scrip del proceso principal es como un script normal de Node.js:

```javascript
const { app, BrowserWindow } = require (' Electron ')
Let Win = null

app. whenReady (). then (() => {
  Win = New BrowserWindow ({ width: 800, height: 600 })
  Win. loadURL (' https://github.com ')
})
```

El renderer process no es diferente a una página web normal, excepto por la habilidad extra de usar módulos node si `nodeIntegration` está activada:

```html
<! DOCTYPE HTML>
<html>
<body>
<script>
  const FS = require (' FS ')
  Console. log (FS. readFileSync (__filename, ' UTF8 '))
</script>
</body>
</html>
```

Para ejecutar su aplicación, lea [Ejecutar su aplicación](../tutorial/quick-start.md#run-your-application).

## Asignación de desestructuración

Respecto al 0.37, puedes usar [ asignación de desestruturación][destructuring-assignment] para hacer más fácil el uso de los módulos incorporados.

```javascript
const { app, BrowserWindow } = require (' Electron ')

dejar que Win

app. whenReady (). then (() => {
  Win = New BrowserWindow ()
  Win. loadURL (' https://github.com ')
})
```

Si necesitas el módulo ` electron ` completo, puedes requerirlo y luego usar la desestructuración para acceder a los módulos individuales desde ` electron `.

```javascript
const Electron = require (' Electron ')
const { app, BrowserWindow } = Electron

Let Win

app. whenReady (). then (() => {
  Win = New BrowserWindow ()
  Win. loadURL (' https://github.com ')
})
```

Este es equivalente al siguiente código:

```javascript
const Electron = require (' Electron ')
const App = electron.app
const BrowserWindow = Electron. BrowserWindow
Let Win

app. whenReady (). then (() => {
  Win = New BrowserWindow ()
  Win. loadURL (' https://github.com ')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
