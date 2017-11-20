# Synopsis

> Comment utiliser les APIs de Nodejs et d'Electron.

Tous les [modules intégrés de Node.js](https://nodejs.org/api/) sont disponibles dans Electron, ainsi que les modules tiers pour node sont totalement supportés (incluant les [modules natifs](../tutorial/using-native-node-modules.md)).

Electron fournit également quelques modules supplémentaires intégrés pour le développement d'application de bureau natives. Certains modules sont seulement disponibles dans le processus main, d'autres sont seulement disponibles dans le processus renderer (page web), et certains peuvent être utilisés dans les deux processus.

La règle de base est : si un module est une [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) ou un système de bas niveau est associé, il devrait être disponible dans le processus main. Vous devez être familier avec le concept de [processus main vs. processus renderer](../tutorial/quick-start.md#main-process) pour pouvoir utiliser ces modules.

Le script du processus main est simplement comme un script Node.js :

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

Le processus renderer n'est pas différent d'une page web normale, à l'exception que l'on peut utiliser des modules nodes :

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

Pour lancer votre app, lisez [Lancer votre application](../tutorial/quick-start.md#run-your-app).

## Affectation par décomposition

À partir de la 0.37, vous pouvez utiliser l'[affectation par décomposition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pour rendre l'utilisation des modules intégrés plus simple.

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

Ce qui est équivalent au code suivant :

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