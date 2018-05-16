## Classe : BrowserView

> Créer et contrôle les fenêtres.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

Processus : [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). C'est comme une fenêtre enfant, sauf qu'il est positionné par rapport à sa fenêtre propriétaire. Il se veut être une alternative à la balise `webview`.

## Exemple

```javascript
// Dans le processus main.
const {BrowserView, BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

let view = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` *Experimental*

* `options` Object (facultatif) 
  * `webPreferences` Object (facultatif) - Voir [BrowserWindow](browser-window.md).

### Méthodes statiques

#### `BrowserView.getAllViews()`

Retourne `BrowserView[]` - Un tableau de tous les BrowserViews ouverts.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Retourne `BrowserView | null` - Le BrowserView qui possède le contenu donné `webContents` ou `null` si le contenu n'est pas possédé par un BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Retourne `BrowserView` - La vue avec l'`id` donné.

### Propriétés d'instance

Les objets créés avec `new BrowserView` ont les propriétés suivantes :

#### `view.webContents` *Experimental*

Un objet [`WebContents`](web-contents.md) appartient à cette vue.

#### `view.id` *Experimental*

Un`Integer` représentant l’ID unique de la vue.

### Méthodes d’instance

Les objets créés avec `new BrowserView` ont les méthodes d’instance suivant :

#### `view.destroy()`

Force la fermeture de la vue, les événements `unload` et `beforeunload` ne seront pas émis pour la page web. Une fois que vous avez terminé avec une vue, appelez cette fonction afin libérer de la mémoire et autres ressources dès que possible.

#### `view.isDestroyed()`

Retourne `Boolean` - Si la vue est détruite.

#### `view.setAutoResize(options)` *Experimental*

* `options` Objet 
  * `width` Boolean - Si `true`, la largeur de la vue va se redimensionner pour être de la même largeur que la fenêtre. `false` par défaut.
  * `height` Boolean - Si `true`, la hauteur de la vue va se redimensionner pour être de la même hauteur que la fenêtre. `false` par défaut.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Redimensionne et déplace la vue vers les limites fournies par rapport à la fenêtre.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Couleur dans le format `#aarrggbb` ou `#argb`. Le canal alpha est facultatif.