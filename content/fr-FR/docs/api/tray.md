## Classe : Tray

> Ajoute des icônes et des menus contextuels à la zone de notification du système.

Processus : [Main](../glossary.md#main-process)

`Tray` est un [EventEmitter][event-emitter].

```javascript
const { app, Menu, Tray } = require ('electron')

let tray = null
app.whenReady().then()=> { plateau
  = nouveau plateau ('/path/to/my/icon')
  const contextMenu = Menu.buildDeTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip ('This is my application.')
  tray.setContextMenu (contextMenu)
})
```

__Limitations selon les plateformes :__

* Sur Linux, l'indicateur d'application sera utilisé s'il est pris en charge, sinon `GtkStatusIcon` sera utilisé à la place.
* Sur les distributions Linux qui ont seulement le support de l'indicateur d'application, vous devrez installer `libappindicator1` pour faire fonctionner l'icône.
* L'indicateur d'application sera affiché seulement lorsqu'il a un menu contextuel.
* Lorsque l'indicateur d'application est utilisé sur Linux, l'événement `click` est ignoré.
* Sur Linux afin que les modifications apportées aux `MenuItem`individuels prennent effet, vous devez appeler `setContextMenu` nouveau. Par exemple :

```javascript
const { app, Menu, Tray } = require ('electron')

let appIcon = null
app.whenReady().then()) => {
  appIcon = new Tray ('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate(en anglais seulement) [
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Apporter une modification au menu contexte
  contextMenu.items[1].checked = false

  // Appelez-le à nouveau pour Linux parce que nous avons modifié le menu context
  appIcon.setContextMenu (contextMenu)
})
```

* Sur Windows, il est recommandé d'utiliser des icônes du type `ICO` pour obtenir les meilleurs effets visuels.

Si vous souhaitez conserver les mêmes comportements sur toutes les plateformes, vous ne devriez pas vous appuyez sur l'événement `click` et toujours fixer un menu contextuel sur l'icône.

### `nouveau Plateau (image, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` String (facultatif) _Windows_ - Attribue un GUID à l’icône plateau. Si l’exécutable est signé et que la signature contient une organisation dans la ligne d’objet, le GUID est associé de façon permanente à cette signature. Les paramètres de niveau OS comme la position de l’icône de plateau dans le plateau système persisteront même si le chemin vers les modifications exécutables. Si l’exécuteur testamentaire n’est pas signé de code, le GUID est associé de façon permanente au chemin vers l’exécuteur testamentaire. Changer le chemin vers l’exécuteur testamentaire brisera la création de l’icône du plateau et un nouveau GUID doit être utilisé. Toutefois, il est fortement recommandé d’utiliser le paramètre GUID uniquement en conjonction avec le code signé exécutable. Si une application définit plusieurs icônes de plateau, chaque icône doit utiliser un GUID distinct.

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

#### Evénement: 'mouse-up' _macOS_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris est libérée en cliquant sur l’icône du plateau.

Remarque : Cela ne sera pas émis si vous avez défini un menu context pour votre plateau à l’aide de `tray.setContextMenu`, en raison de contraintes au niveau macOS.

#### Evénement: 'mouse-down' _macOS_

Retourne :

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - la position de l’événement.

Émis lorsque la souris clique sur l’icône du plateau.

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
* `options` objet (facultatif)
  * `fontType` String (facultatif) - La variante de la famille de polices à afficher, peut être `monospaced` ou `monospacedDigit`. `monospaced` est disponible en macOS 10.15+ et `monospacedDigit` est disponible en macOS 10.11+.  Lorsqu’il est laissé vide, le titre utilise la police système par défaut.

Définit le titre affiché à côté de l'icône de la barre d'état dans la barre d'état (couleurs support ANSI).

#### `tray.getTitle()` _macOS_

Retourne `String` - le titre affiché à côté de l'icône de la barre d'état

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Définit la possibilité d’ignorer les événements à double clic. Ignorer ces événements vous permet de détecter chaque clic individuel de l’icône du plateau.

Cette valeur est définie à <0>false</0> par défaut.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Retourne un `Boolean` - Si oui ou non les événènements de double clic seront ignorés.

#### `tray.displayBalloon(options)` _Windows_

* `options` objet
  * `icon` ([NativeImage](native-image.md) | Chaîne) (facultatif) - Icône à utiliser lorsque `iconType` est `custom`.
  * `iconType` String (facultatif) - Peut être `none`, `info`, `warning`, `error` ou `custom`. Par défaut est `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (facultatif) - La grande version de l’icône doit être utilisée. La valeur par défaut est `true`. Cartes à [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON].
  * `noSound` Boolean (facultatif) - Ne jouez pas le son associé. Par défaut la valeur est `false`. Cartes à [`NIIF_NOSOUND`][NIIF_NOSOUND].
  * `respectQuietTime` Boolean (facultatif) - N’affichez pas la notification ballon si l’utilisateur actuel est en « temps calme ». Par défaut la valeur est `false`. Cartes à [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME].

Affiche une bulle dans la barre d'État.

#### `tray.removeBalloon()` _Windows_

Enlève un ballon de plateau.

#### `tray.focus()` _Windows_

Les retours se concentrent sur la zone de notification de la barre des tâches. Les icônes de zone de notification doivent utiliser ce message lorsqu’elles ont terminé leur opération d’interface utilisateur. Par exemple, si l’icône affiche un menu raccourci, mais que l’utilisateur appuie sur ESC pour l’annuler, utilisez `tray.focus()` pour retourner la mise au point vers la zone de notification.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (facultatif)
* `position` [Point](structures/point.md) (facultatif) - Position du menu.

Apparaît le menu contexturé de l’icône plateau. Lorsque `menu` est passé, le `menu` sera au lieu du menu contextur de l’icône du plateau.

La `position` n’est disponible que sur Windows, et c’est (0, 0) par défaut.

#### `tray.closeContextMenu()` _macOS_ _Windows_

Ferme un menu context ouvert, tel qu’il est défini par `tray.setContextMenu()`.

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
