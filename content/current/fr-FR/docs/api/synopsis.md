# Synopsis

> Comment utiliser les APIs de Nodejs et d'Electron.

Tous les [modules intégrés de Node.js](https://nodejs.org/api/) sont disponibles dans Electron, ainsi que les modules tiers pour node sont totalement supportés (incluant les [modules natifs](../tutorial/using-native-node-modules.md)).

Electron fournit également quelques modules supplémentaires intégrés pour le développement d'application de bureau natives. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

La règle de base est : si un module est une [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) ou un système de bas niveau est associé, il devrait être disponible dans le processus main. Vous devez être familier avec le concept de [processus main vs. processus renderer](../tutorial/quick-start.md#main-and-renderer-processes) pour pouvoir utiliser ces modules.

Le script <0>main process</0> ressemble à script Node.js normal :

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

Pour lancer votre app, lisez [Lancer votre application](../tutorial/quick-start.md#run-your-application).

## Affectation par décomposition

À partir de la 0.37, vous pouvez utiliser l'[affectation par décomposition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pour rendre l'utilisation des modules intégrés plus simple.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Si vous avez besoin la totalité du module `electron`, vous pouvez faire un require et décomposer ensuite le tout pour accéder aux modules venant d'`electron` individuellement.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Ce qui est équivalent au code suivant :

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
