# BrowserView

Un `BrowserView` peut être utilisé pour intégrer des contenus web supplémentaires dans un [`BrowserWindow`](browser-window.md). C'est comme une fenêtre enfant, sauf qu'il est positionné par rapport à sa fenêtre propriétaire. Il se veut être une alternative à la balise `webview`.

## Classe : BrowserView

> Créer et contrôle les fenêtres.

Processus : [Main](../glossary.md#main-process)

### Exemple

```javascript
// Dans le processus main.
const { BrowserView, BrowserWindow } = require ('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, largeur: 300, hauteur: 300 })
view.webContents.loadURL ('https://electronjs.org')
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

* Objet `options`
  * `width` Boolean (facultatif) - Si `true`, la largeur de la vue augmentera et rétrécira ensemble avec la fenêtre. `false` par défaut.
  * `height` Boolean (facultatif) - Si `true`, la hauteur de la vue augmentera et rétrécira avec la fenêtre. `false` par défaut.
  * `horizontal` Boolean (facultatif) - Si `true`, la position x et la largeur de la vue se développeront et rétréciront proportionnellement avec la fenêtre. `false` par défaut.
  * `vertical` Boolean (facultatif) - Si `true`, la position et la hauteur y de la vue augmenteront et rétréciront proportionnellement avec la fenêtre. `false` par défaut.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Redimensionne et déplace la vue vers les limites fournies par rapport à la fenêtre.

#### `view.getBounds()` _Expérimental_

Retourne [`Rectangle`](structures/rectangle.md)

Les `limites` de cette instance BrowserView comme `Object`.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Couleur en `#aarrggbb` ou `#argb` forme. Le canal alpha est optionnel.
