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

**Limitations selon les plateformes :**

* Sur Linux, l'indicateur d'application sera utilisé s'il est pris en charge, sinon `GtkStatusIcon` sera utilisé à la place.
* Sur les distributions Linux qui ont seulement le support de l'indicateur d'application, vous devrez installer `libappindicator1` pour faire fonctionner l'icône.
* L'indicateur d'application sera affiché seulement lorsqu'il a un menu contextuel.
* Lorsque l'indicateur d'application est utilisé sur Linux, l'événement `click` est ignoré.
* Sur Linux, afin que les modifications apportées à chaque `MenuItem` prennent effet, vous devrez appeler `setContextMenu` à nouveau. Par exemple :

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

#### Événement : 'right-click' *macOS* *Windows*

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Les limites de l'icône.

Émis lorsque l’utilisateur fait un clique droit sur l’icône.

#### Événement : 'double-click' *macOS* *Windows*

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
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

Retourne :

* `event` Événement
* `files` String[] - les chemins d’accès des fichiers déposés.

Émis lorsque des fichiers sont glissés et déposés sur l’icône.

#### Événement : 'drop-text' *macOS*

Retourne :

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

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris entre dans la zone de l’icône.

#### Événement : 'mouse-leave' *macOS*

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris sort de la zone de l’icône.

#### Event: 'mouse-move' *macOS* *Windows*

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

#### `tray.setPressedImage(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône quand elle est pressée sur macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Définit le texte au survol pour l'icône.

#### `tray.setTitle(title)` *macOS*

* `title` String

Définit le titre affiché à côté de l'icône de la barre d'état dans la barre d'état (couleurs support ANSI).

#### `tray.getTitle()` *macOS*

Retourne `String` - le titre affiché à côté de l'icône de la barre d'état

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Boolean

Définie l'option pour ignorer les événements de double clic. Ignorer ces évènements vous permet de détecter chaque simple clic sur l’icône dans la barre des tâches.

Cette valeur est définie à <0>false</0> par défaut.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Retourne un `Boolean` - Si oui ou non les événènements de double clic seront ignorés.

#### `tray.displayBalloon(options)` *Windows*

* `options` Objet 
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. La valeur par défaut est `true`. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. Par défaut la valeur est `false`. Maps to [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010).
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Par défaut la valeur est `false`. Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

Affiche une bulle dans la barre d'État.

#### `tray.removeBalloon()` *Windows*

Removes a tray balloon.

#### `tray.focus()` *Windows*

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (facultatif)
* `position` [Point](structures/point.md) (facultatif) - Position du menu.

Ouvre le menu contextuel de l’icône. Lorsque le `menu` est passé, le `menu` s’affichera au lieu du menu contextuel de l’icône de la barre d’État.

La `position` n’est disponible que sur Windows, et c’est (0, 0) par défaut.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Définit le menu contextuel de l'icône.

#### `tray.getBounds()` *macOS* *Windows*

Retourne [`Rectangle`](structures/rectangle.md)

Les `limites` de l'icône de la barre d’État en tant qu'`Objet`.

#### `tray.isDestroyed()`

Retourne `Boolean` - si l’icône est détruite.