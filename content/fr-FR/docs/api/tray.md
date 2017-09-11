## Classe : Tray

> Ajoute des icônes et des menus contextuels à la zone de notification du système.

Processus : [Principal](../glossary.md#main-process)

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

* `image` ([NativeImage](native-image.md) | Chaîne de caractères)

Créer une nouvelle icône dans la barre de notification avec l'`image`.

### Événements d’instance

Le module `Tray` émet les événements suivants :

#### Événement : 'click'

* `event` Événement 
  * `altKey` Booléen
  * `shiftKey` Booléen
  * `ctrlKey` Booléen
  * `metaKey` Booléen
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône

Émis lorsque l’utilisateur clique sur l’icône.

#### Événement : 'right-click' *macOS* *Windows*

* `event` Événement 
  * `altKey` Booléen
  * `shiftKey` Booléen
  * `ctrlKey` Booléen
  * `metaKey` Booléen
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône

Émis lorsque l’utilisateur fait un clique droit sur l’icône.

#### Événement : 'double-click' *macOS* *Windows*

* `event` Événement 
  * `altKey` Booléen
  * `shiftKey` Booléen
  * `ctrlKey` Booléen
  * `metaKey` Booléen
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône

Émis lorsque l’utilisateur double clique sur l’icône.

#### Événement : 'balloon-show' *Windows*

Émis lorsque le ballon de la barre d’État s’affiche.

#### Événement : 'balloon-click' *Windows*

Émis lorsque l’utilisateur clique sur le ballon de la barre d'État.

#### Événement : 'balloon-closed' *Windows*

Émis lorsque le ballon de la barre d’État est fermé en raison du délai d’attente dépassé ou de l’utilisateur le ferme manuellement.

#### Événement : 'drop' *macOS*

Émis lorsque un ou des éléments sont déplacés et déposés sur l’icône.

#### Événement : 'drop-files' *macOS*

* `event` Événement
* `files` Chaîne de caractères[] - les chemins d’accès des fichiers déposés.

Émis lorsque des fichiers sont déplacés et déposés sur l’icône.

#### Événement : 'drop-text' *macOS*

* `event` Événement
* `text` Chaîne de caractères - la chaîne de texte déposée

Emitted when dragged text is dropped in the tray icon.

#### Event: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Event: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Event: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Event: 'mouse-enter' *macOS*

* `event` Événement 
  * `altKey` Booléen
  * `shiftKey` Booléen
  * `ctrlKey` Booléen
  * `metaKey` Booléen
* `position` [Point](structures/point.md) - The position of the event

Emitted when the mouse enters the tray icon.

#### Event: 'mouse-leave' *macOS*

* `event` Événement 
  * `altKey` Booléen
  * `shiftKey` Booléen
  * `ctrlKey` Booléen
  * `metaKey` Booléen
* `position` [Point](structures/point.md) - The position of the event

Emitted when the mouse exits the tray icon.

### Instance Methods

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar.

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

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
  * `icon` ([NativeImage](native-image.md) | String) - (optional)
  * `title` String - (optional)
  * `content` String - (optional)

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.