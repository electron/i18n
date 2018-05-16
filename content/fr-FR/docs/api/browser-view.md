## Classe : BrowserView

> Créer et contrôle les fenêtres.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

Processus : [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a `BrowserWindow`. C'est comme une fenêtre enfant, sauf qu'il est positionné par rapport à sa fenêtre propriétaire. Il se veut être une alternative à la balise `webview`.

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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([options])` *Experimental*

* `options` Object (facultatif) 
  * `webPreferences` Object (facultatif) - Voir [BrowserWindow](browser-window.md).

### Méthodes statiques

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### Propriétés d'instance

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Méthodes d’instance

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `options` Objet 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.