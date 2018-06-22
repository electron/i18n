## Classe : Tray

> Ajoute des icônes et des menus contextuels à la zone de notification du système.

Processus : [Main](../glossary.md#main-process)

`Tray` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/chemin/vers/mon/icone')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('Ceci est mon application.')
  tray.setContextMenu(contextMenu)
})
```

**Limitations selon les plateformes :**

* Sur Linux, l'indicateur d'application sera utilisé s'il est pris en charge, sinon `GtkStatusIcon` sera utilisé à la place.
* Sur les distributions Linux qui ont seulement le support de l'indicateur d'application, vous devrez installer `libappindicator1` pour faire fonctionner l'icône.
* L'indicateur d'application sera affiché seulement lorsqu'il a un menu contextuel.
* Lorsque l'indicateur d'application est utilisé sur Linux, l'événement `click` est ignoré.
* Sur Linux, afin que les modifications apportées à chaque `MenuItem` prennent effet, vous devrez appeler `setContextMenu` à nouveau. Par exemple :

```javascript
const {app, Menu, Tray} = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/chemin/vers/mon/icone')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
  ])

  // Fait un changement au menu contextuel
  contextMenu.items[1].checked = false

  // Appelé à nouveau pour Linux car nous avons modifié le menu contextuel
  appIcon.setContextMenu(contextMenu)
})
```

* Sur Windows, il est recommandé d'utiliser des icônes du type `ICO` pour obtenir les meilleurs effets visuels.

Si vous souhaitez conserver les mêmes comportements sur toutes les plateformes, vous ne devriez pas vous appuyez sur l'événement `click` et toujours fixer un menu contextuel sur l'icône.

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

Créer une nouvelle icône dans la barre de notification avec l'`image`.

### Événements d’instance

Le module `Tray` émet les événements suivants :

#### Événement : 'click'

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque l’utilisateur clique sur l’icône.

#### Événement : 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.

Émis lorsque l’utilisateur fait un clique droit sur l’icône.

#### Événement : 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.

Émis lorsque l’utilisateur double clique sur l’icône.

#### Événement : 'balloon-show' *Windows*

Émis lorsque le ballon de la barre d’État s’affiche.

#### Événement : 'balloon-click' *Windows*

Émis lorsque l’utilisateur clique sur le ballon de la barre d'État.

#### Événement : 'balloon-closed' *Windows*

Émis lorsque le ballon de la barre d’État est fermé en raison du délai d’attente dépassé ou de l’utilisateur le ferme manuellement.

#### Événement : 'drop' *macOS*

Émis lorsque un ou des éléments sont glissés et déposés sur l’icône.

#### Événement : 'drop-files' *macOS*

* `event` Événement
* `files` String[] - les chemins d’accès des fichiers déposés.

Émis lorsque des fichiers sont glissés et déposés sur l’icône.

#### Événement : 'drop-text' *macOS*

* `event` Événement
* `text` String - le texte déposé.

Émis lorsqu'un texte est déposé sur l’icône.

#### Événement : 'drag-enter' *macOS*

Émis lorsqu’une opération glisser entre dans la zone de l’icône.

#### Événement : 'drag-leave' *macOS*

Émis lorsqu’une opération glisser sort de la zone de l’icône.

#### Événement : 'drag-end' *macOS*

Émis lorsqu’une opération glisser se termine sur l'icône ou à un autre emplacement.

#### Événement : 'mouse-enter' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris entre dans la zone de l’icône.

#### Événement : 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris sort de la zone de l’icône.

#### Événement : 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris bouge dans la zone de l’icône.

### Méthodes d’instance

La classe `Tray` dispose des méthodes suivantes :

#### `tray.destroy()`

Détruit l’icône immédiatement.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Définit l’`image` associée à l'icône quand elle est pressée sur macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Définit le texte au survol pour l'icône.

#### `tray.setTitle(title)` *macOS*

* `title` String

Définit le titre affiché à côté de l’icône dans la barre d’État (Supporte les couleurs ANSI).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - mode de surbrillance avec l'une des valeurs suivante : 
  * `selection` - Met en surbrillance l'icône de la barre d'État lorsqu'il est cliqué et quand son menu contextuel est ouvert. C'est la valeur par défaut.
  * `always` - Toujours mettre en surbrillance l’icône.
  * `never` - Jamais mettre en surbrillance l’icône.

Définit quand l'icône de la barre d'état est mis en surbrillance (en blue).

**Remarque :** Vous pouvez utiliser `highlightMode` avec [`BrowserWindow`](browser-window.md) en alternant les modes `'never'` et `'always'` lorsque la visibilité de la fenêtre change.

```javascript
const {BrowserWindow, Tray} = require('electron')

const win = new BrowserWindow({width: 800, height: 600})
const tray = new Tray('/path/to/my/icon')

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})
```

#### `tray.displayBalloon(options)` *Windows*

* `options` Objet 
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Affiche une bulle dans la barre d'État.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (facultatif)
* `position` [Point](structures/point.md) (facultatif) - Position du menu.

Ouvre le menu contextuel de l’icône. Lorsque le `menu` est passé, le `menu` s’affichera au lieu du menu contextuel de l’icône de la barre d’État.

La `position` n’est disponible que sur Windows, et c’est (0, 0) par défaut.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Définit le menu contextuel de l'icône.

#### `tray.getBounds()` *macOS* *Windows*

Retourne [`Rectangle`](structures/rectangle.md)

Les `limites` de l'icône de la barre d’État en tant qu'`Objet`.

#### `tray.isDestroyed()`

Retourne `Boolean` - si l’icône est détruite.