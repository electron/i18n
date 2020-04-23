## Classe : Tray

> Ajoute des icônes et des menus contextuels à la zone de notification du système.

Processus : [Main](../glossary.md#main-process)

`Tray` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/chemin/vers/mon/icone')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('Ceci est mon application.')
  tray.setContextMenu(contextMenu)
})
```

__Limitations selon les plateformes :__

* Sur Linux, l'indicateur d'application sera utilisé s'il est pris en charge, sinon `GtkStatusIcon` sera utilisé à la place.
* Sur les distributions Linux qui ont seulement le support de l'indicateur d'application, vous devrez installer `libappindicator1` pour faire fonctionner l'icône.
* L'indicateur d'application sera affiché seulement lorsqu'il a un menu contextuel.
* Lorsque l'indicateur d'application est utilisé sur Linux, l'événement `click` est ignoré.
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. Par exemple :

```javascript
const { app, Menu, Tray } = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/chemin/vers/mon/icone')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
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

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque l’utilisateur clique sur l’icône.

#### Événement : 'right-click' _macOS_ _Windows_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.

Émis lorsque l’utilisateur fait un clique droit sur l’icône.

#### Événement : 'double-click' _macOS_ _Windows_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.

Émis lorsque l’utilisateur double clique sur l’icône.

#### Événement : 'balloon-show' _Windows_

Émis lorsque le ballon de la barre d’État s’affiche.

#### Événement : 'balloon-click' _Windows_

Émis lorsque l’utilisateur clique sur le ballon de la barre d'État.

#### Événement : 'balloon-closed' _Windows_

Émis lorsque le ballon de la barre d’État est fermé en raison du délai d’attente dépassé ou de l’utilisateur le ferme manuellement.

#### Événement : 'drop' _macOS_

Émis lorsque un ou des éléments sont glissés et déposés sur l’icône.

#### Événement : 'drop-files' _macOS_

Retourne :

* `event` Événement
* `files` String[] - les chemins d’accès des fichiers déposés.

Émis lorsque des fichiers sont glissés et déposés sur l’icône.

#### Événement : 'drop-text' _macOS_

Retourne :

* `event` Événement
* `text` String - le texte déposé.

Émis lorsqu'un texte est déposé sur l’icône.

#### Événement : 'drag-enter' _macOS_

Émis lorsqu’une opération glisser entre dans la zone de l’icône.

#### Événement : 'drag-leave' _macOS_

Émis lorsqu’une opération glisser sort de la zone de l’icône.

#### Événement : 'drag-end' _macOS_

Émis lorsqu’une opération glisser se termine sur l'icône ou à un autre emplacement.

#### Événement : 'mouse-enter' _macOS_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris entre dans la zone de l’icône.

#### Événement : 'mouse-leave' _macOS_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris sort de la zone de l’icône.

#### Event: 'mouse-move' _macOS_ _Windows_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris bouge dans la zone de l’icône.

### Méthodes d’instance

La classe `Tray` dispose des méthodes suivantes :

#### `tray.destroy()`

Détruit l’icône immédiatement.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône.

#### `tray.setPressedImage(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône quand elle est pressée sur macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Définit le texte au survol pour l'icône.

#### `tray.setTitle(title)` _macOS_

* `title` String

Définit le titre affiché à côté de l'icône de la barre d'état dans la barre d'état (couleurs support ANSI).

#### `tray.getTitle()` _macOS_

Retourne `String` - le titre affiché à côté de l'icône de la barre d'état

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

Cette valeur est définie à <0>false</0> par défaut.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Retourne un `Boolean` - Si oui ou non les événènements de double clic seront ignorés.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (optionnel)
  * `title` String
  * `content` String

Affiche une bulle dans la barre d'État.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (facultatif)
* `position` [Point](structures/point.md) (facultatif) - Position du menu.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

La `position` n’est disponible que sur Windows, et c’est (0, 0) par défaut.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Définit le menu contextuel de l'icône.

#### `tray.getBounds()` _macOS_ _Windows_

Retourne [`Rectangle`](structures/rectangle.md)

Les `limites` de l'icône de la barre d’État en tant qu'`Objet`.

#### `tray.isDestroyed()`

Retourne `Boolean` - si l’icône est détruite.
