# Synopsis

> Comment utiliser les APIs de Nodejs et d'Electron.

Tous les [modules intégrés de Node.js](https://nodejs.org/api/) sont disponibles dans Electron, ainsi que les modules tiers pour node sont totalement supportés (incluant les [modules natifs](../tutorial/using-native-node-modules.md)).

Electron fournit également quelques modules supplémentaires intégrés pour le développement d'application de bureau natives. Certains modules ne sont disponibles que dans le processus principal, certains ne sont disponibles que dans le processus de rendu (page Web), et certains peuvent être utilisés dans l’un ou l’autre type processus.

La règle de base est : si un module est une [GUI][gui] ou un système de bas niveau est associé, il devrait être disponible dans le processus main. Vous devez être familier avec concept de processus principal [par rapport au processus de rendu](../tutorial/quick-start.md#main-and-renderer-processes) scripts pour être en mesure d’utiliser ces modules.

Le script <0>main process</0> ressemble à script Node.js normal :

```javascript
const { app, BrowserWindow } = require ('electron')
let win = null

app.whenReady().then()=> {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL ('https://github.com')
})
```

Le processus de rendu n’est pas différent d’une page Web normale, à l’exception de la possibilité supplémentaire d’utiliser des modules de nœuds si `nodeIntegration` est activé :

```html
<! DOCTYPE html>
<html>
<body>
<script>
  const fs = require ('fs') console
  .log (fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

Pour lancer votre app, lisez [Lancer votre application](../tutorial/quick-start.md#run-your-application).

## Affectation par décomposition

À partir de la 0.37, vous pouvez utiliser l'[affectation par décomposition][destructuring-assignment] pour rendre l'utilisation des modules intégrés plus simple.

```javascript
const { app, BrowserWindow } = require ('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL ('https://github.com')
})
```

Si vous avez besoin la totalité du module `electron`, vous pouvez faire un require et décomposer ensuite le tout pour accéder aux modules venant d'`electron` individuellement.

```javascript
const electron = require ('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then()) => {
  win = new BrowserWindow()
  win.loadURL ('https://github.com')
})
```

Ce qui est équivalent au code suivant :

```javascript
const electron = require ('electron')
const app = electron.app
const BrowserWindow = electron. BrowserWindow
let win

app.whenReady().then()=> {
  win = new BrowserWindow()
  win.loadURL ('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
