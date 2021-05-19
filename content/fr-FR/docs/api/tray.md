# Tray

## Classe : Tray

> Ajoute des icônes et des menus contextuels à la zone de notification du système.

Processus : [Main](../glossary.md#main-process)

`Tray` est un [EventEmitter][event-emitter].

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
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
app.whenReady().then(() => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
})
```

* Sur Windows, il est recommandé d'utiliser des icônes du type `ICO` pour obtenir les meilleurs effets visuels.

Si vous souhaitez conserver les mêmes comportements sur toutes les plateformes, vous ne devriez pas vous appuyez sur l'événement `click` et toujours fixer un menu contextuel sur l'icône.

### `new Tray(image, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` String (optional) _Windows_ - Assigns a GUID to the tray icon. If the executable is signed and the signature contains an organization in the subject line then the GUID is permanently associated with that signature. OS level settings like the position of the tray icon in the system tray will persist even if the path to the executable changes. If the executable is not code-signed then the GUID is permanently associated with the path to the executable. Changer le chemin vers l’exécuteur testamentaire brisera la création de l’icône du plateau et un nouveau GUID doit être utilisé. However, it is highly recommended to use the GUID parameter only in conjunction with code-signed executable. If an App defines multiple tray icons then each icon must use a separate GUID.

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

#### Event: 'mouse-up' _macOS_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Emitted when the mouse is released from clicking the tray icon.

Note: This will not be emitted if you have set a context menu for your Tray using `tray.setContextMenu`, as a result of macOS-level constraints.

#### Event: 'mouse-down' _macOS_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Emitted when the mouse clicks the tray icon.

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

#### `tray.setTitle(title[, options])` _macOS_

* `title` String
* `options` Object (optional)
  * `fontType` String (optional) - The font family variant to display, can be `monospaced` or `monospacedDigit`. `monospaced` is available in macOS 10.15+ and `monospacedDigit` is available in macOS 10.11+.  When left blank, the title uses the default system font.

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

* Objet `options`
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. La valeur par défaut est `true`. Maps to [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON].
  * `noSound` Boolean (optional) - Do not play the associated sound. Par défaut la valeur est `false`. Maps to [`NIIF_NOSOUND`][NIIF_NOSOUND].
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Par défaut la valeur est `false`. Maps to [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME].

Affiche une bulle dans la barre d'État.

#### `tray.removeBalloon()` _Windows_

Removes a tray balloon.

#### `tray.focus()` _Windows_

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (facultatif)
* `position` [Point](structures/point.md) (facultatif) - Position du menu.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

La `position` n’est disponible que sur Windows, et c’est (0, 0) par défaut.

#### `tray.closeContextMenu()` _macOS_ _Windows_

Closes an open context menu, as set by `tray.setContextMenu()`.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Définit le menu contextuel de l'icône.

#### `tray.getBounds()` _macOS_ _Windows_

Retourne [`Rectangle`](structures/rectangle.md)

Les `limites` de l'icône de la barre d’État en tant qu'`Objet`.

#### `tray.isDestroyed()`

Retourne `Boolean` - si l’icône est détruite.

[NIIF_NOSOUND]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010
[NIIF_LARGE_ICON]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020
[NIIF_RESPECT_QUIET_TIME]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
