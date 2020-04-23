## Classe : BrowserView

> Créer et contrôle les fenêtres.

Processus : [Main](../glossary.md#main-process)

Un `BrowserView` peut être utilisé pour intégrer des contenus web supplémentaires dans un [`BrowserWindow`](browser-window.md). C'est comme une fenêtre enfant, sauf qu'il est positionné par rapport à sa fenêtre propriétaire. Il se veut être une alternative à la balise `webview`.

### Example

```javascript
// Dans le processus main.
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
gagne. n('closed', () => {
  win = null
})

let view = new BrowserView()
win. etBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Experimental_

* `options` Object (optional)
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

#### `view.webContents` _Experimental_

Un objet [`WebContents`](web-contents.md) appartient à cette vue.

#### `view.id` _Experimental_

Un`Integer` représentant l’ID unique de la vue.

### Méthodes d’instance

Les objets créés avec `new BrowserView` ont les méthodes d’instance suivant :

#### `view.destroy()`

Force la fermeture de la vue, les événements `unload` et `beforeunload` ne seront pas émis pour la page web. Une fois que vous avez terminé avec une vue, appelez cette fonction afin libérer de la mémoire et autres ressources dès que possible.

#### `view.isDestroyed()`

Retourne `Boolean` - Si la vue est détruite.

#### `view.setAutoResize(options)` _Experimental_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Redimensionne et déplace la vue vers les limites fournies par rapport à la fenêtre.

#### `view.getBounds()` _Expérimental_

Retourne [`Rectangle`](structures/rectangle.md)

Les `limites` de cette instance BrowserView comme `Object`.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
