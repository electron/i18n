## Classe : MenuItem

> Ajoute des éléments aux menus et menus contextuels de l’application native.

Processus : [Main](../glossary.md#main-process)

Voir [`Menu`](menu.md) pour des exemples.

### `new MenuItem(options)`

* `options` Objet 
  * `click` Fonction (optionnel) - Sera appelé avec `click(menuItem, browserWindow, event)` lorsque l'élément du menu est cliqué. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * `type` String (optional) - Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `toolTip` String (optional) *macOS* - Hover text for this menu item.
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `acceleratorWorksWhenHidden` Boolean (optional) *macOS* - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) *Linux* *Windows* - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (facultatif) - Fournit un moyen pour un seul menu contextuel de déclarer le placement de leur groupe contenant avant le groupe contenant l'élément avec l'étiquette spécifiée.
  * `afterGroupContaining` String[] (facultatif) - Fournit un moyen pour un seul menu contextuel de déclarer le placement de leur groupe contenant après le groupe contenant de l'élément avec l'étiquette spécifiée.

**Remarque :** `acceleratorWorksWhenHidden` est spécifié comme étant macOS uniquement parce que les accélérateurs fonctionnent toujours lorsque des éléments sont cachés sous Windows et Linux. L'option est exposée aux utilisateurs pour leur donner la possibilité de la désactiver, car cela est possible dans le développement natif de macOS. Cette propriété n'est utilisable que sur macOS Haute Sierra 10.13 ou plus récente.

### Rôles

Les rôles permettent à des éléments du menu d'avoir des comportements prédéfinis.

Il est préférable de spécifier `rôle` pour tout élément de menu qui correspond à un rôle standard, plutôt que d'essayer d'implémenter manuellement le comportement dans une fonction `clic`. Le comportement `rôle` intégré donnera la meilleure expérience native.

Les valeurs `label` et `accélérateur` sont optionnelles lorsque vous utilisez un `rôle` et par défaut des valeurs appropriées pour chaque plateforme.

Chaque lien de menu doit avoir soit un `rôle`, `label`, soit dans le cas d'un séparateur un `type`.

La propriété `role` peut avoir les valeurs suivantes :

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Minimise la fenêtre courante.
* `close` - Ferme la fenêtre courante.
* `quitter` - Quitter l'application.
* `reload` - Recharge la fenêtre courante.
* `forceReload` - Recharge la fenêtre courante ignorant le cache.
* `toggleDevTools` - Bascule les outils de développement dans la fenêtre actuelle.
* `togglefullscreen` - Basculer en mode plein écran dans la fenêtre actuelle.
* `resetZoom` - Réinitialise le niveau de zoom de la page ciblée à la taille d'origine.
* `zoomIn` - Zoom sur la page ciblée par 10%.
* `zoomOut` - Zoom arrière de la page ciblée de 10%.
* `fileMenu` - Menu par défaut entier "Fichier" (Close / Quitter)
* `editMenu` - Tout le menu "Edit" par défaut (Annuler, Copier, etc.).
* `viewMenu` - Menu "Affichage" par défaut (Recharger, Activer/désactiver les outils de développement, etc.)
* `windowMenu` - Menu par défaut entier "Windows" (Minimize, Zoom, etc.).

Les rôles supplémentaires suivants sont disponibles sur *macOS*:

* `appMenu` - Tout le menu "App" par défaut (About, Services, etc.)
* `about` - Mapper à l'action `orderFrontStandardAboutPanel`.
* `hide` - Mappez à l'action `caché`.
* `hideOthers` - Mappez à l'action `hideOtherApplications`.
* `unhide` - Mappez à l'action `unhideAllApplications`.
* `startSpeaking` - Carte à l'action `startSpeaking`.
* `stopSpeaking` - Carte à l'action `stopSpeaking`.
* `front` - Mappez à l'action `arrangeInFront`.
* `zoom` - Mappez à l'action `performZoom`.
* `toggleTabBar` - Mappez à l'action `toggleTabBar`.
* `selectNextTab` - Mappez à l'action `selectNextTab`.
* `selectPreviousTab` - Mappez à l'action `selectPreviousTab`.
* `mergeAllWindows` - Mappez à l'action `mergeAllWindows`.
* `moveTabToNewWindow` - Mappez à l'action `moveTabToNewWindow`.
* `window` - Le sous-menu est un menu "Windows".
* `help` - Le sous-menu est un menu "Aide".
* `services` - Le sous-menu est un menu ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc). Ceci est uniquement destiné à être utilisé dans le menu de l'application et n'est *pas* le même que le sous-menu "Services" utilisé dans les menus contextuels des applications macOS, qui n'est pas implémentée dans Electron.
* `recentDocuments` - Le sous-menu est un menu "Ouvrir Récents".
* `clearRecentDocuments` - Carte à l'action `clearRecentDocuments`.

Lorsque vous spécifiez un `rôle` sur macOS, `label` et `accélérateur` sont les seules options qui affecteront l'élément de menu. Toutes les autres options seront ignorées. La minuscule `rôle`, par exemple `toggledevtools`, est toujours supportée.

**Nota Bene:** Les propriétés `activées` et `visibilité` ne sont pas disponibles pour les éléments de menu de premier niveau sur MacOS.

### Instance Properties

Les propriétés suivantes sont disponibles pour les instances de `MenuItem` :

#### `menuItem.id`

Une `String` indiquant l'identifiant unique de l'élément, cette propriété peut être modifiée dynamiquement.

#### `menuItem.label`

Une `String` indiquant l'étiquette visible de l'élément, cette propriété peut être modifiée dynamiquement.

#### `menuItem.click`

Une `Fonction` qui est lancée lorsque l'élément de menu reçoit un événement de clic. Elle peut être appelée avec `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

A `Menu` (optional) containing the menu item's submenu, if present.

#### `menuItem.type`

A `String` indicating the type of the item. Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.

#### `menuItem.role`

A `String` (optional) indicating the item's role, if set. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`

#### `menuItem.accelerator`

A `Accelerator` (optional) indicating the item's accelerator, if set.

#### `menuItem.icon`

A `NativeImage | String` (optional) indicating the item's icon, if set.

#### `menuItem.sublabel`

A `String` indicating the item's sublabel, this property can be dynamically changed.

#### `menuItem.toolTip` *macOS*

A `String` indicating the item's hover text.

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed, this property can be dynamically changed.

#### `menuItem.commandId`

A `Number` indicating an item's sequential unique id.

#### `menuItem.menu`

A `Menu` that the item is a part of.