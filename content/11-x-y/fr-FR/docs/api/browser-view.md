## Classe : BrowserView

> Créer et contrôle les fenêtres.

Processus : [Main](../glossary.md#main-process)

Un `BrowserView` peut être utilisé pour intégrer des contenus web supplémentaires dans un [`BrowserWindow`](browser-window.md). C'est comme une fenêtre enfant, sauf qu'il est positionné par rapport à sa fenêtre propriétaire. Il se veut être une alternative à la balise `webview`.

### Example

```javascript
// Dans le processus main.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Experimental_

* `options` Object (optional)
  * `webPreferences` Object (facultatif) - Voir [BrowserWindow](browser-window.md).

### Propriétés d'instance

Les objets créés avec `new BrowserView` ont les propriétés suivantes :

#### `view.webContents` _Experimental_

Un objet [`WebContents`](web-contents.md) appartient à cette vue.

### Méthodes d’instance

Les objets créés avec `new BrowserView` ont les méthodes d’instance suivant :

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
