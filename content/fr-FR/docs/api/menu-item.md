## Classe : MenuItem

> Ajoute des éléments aux menus et menus contextuels de l’application native.

Processus : [Main](../glossary.md#main-process)

Voir [`Menu`](menu.md) pour des exemples.

### `new MenuItem(options)`

* Objet `options`
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked.
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md) | undefined - This will not be defined if no window is open.
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define the action of the menu item, when specified the `click` property will be ignored. Voir [rôles](#roles).
  * `type` String (facultatif) - Peut être `normal`, `séparateur`, `sous-menu`, `checkbox` ou `radio`.
  * `label` String (optionnel)
  * `sublabel` String (optionnel)
  * `toolTip` String (facultatif) _macOS_ - Texte de survol pour ce lien de menu.
  * `accélérateur` [Accelerator](accelerator.md) (facultatif)
  * `icon` ([NativeImage](native-image.md) | String) (facultatif)
  * `activé` Booléen (facultatif) - Si faux, l'élément de menu sera grisé et non cliquable.
  * `acceleratorWorksWhenHidden` Boolean (facultatif) _macOS_ - la valeur par défaut est `true`, et lorsque `false` empêchera l'accélérateur de déclencher l'élément si l'élément n'est pas visible`.
  * `visible` Boolean (facultatif) - Si false, l'élément de menu sera entièrement masqué.
  * `coché` Booléen (facultatif) - Ne doit être spécifié que pour `case à cocher` ou `radio` type des liens de menu .
  * `registerAccelerator` Boolean (optional) _Linux_ _Windows_ - If false, the accelerator won't be registered with the system, but it will still be displayed. Par défaut, true.
  * `sharingItem` SharingItem (optional) _macOS_ - The item to share when the `role` is `shareMenu`.
  * `sous-menu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (facultatif) - Doit être spécifié pour `sous-menu` type éléments de menu. Si `sous-menu` est spécifié, le `type: 'submenu'` peut être omis. Si la valeur n'est pas un [`Menu`](menu.md) alors elle sera automatiquement convertie en un en utilisant `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `avant` String[] (facultatif) - Insère cet élément avant l'élément avec le libellé spécifié. Si l'élément référencé n'existe pas, l'élément sera inséré à la fin du menu. Implique également que l'élément de menu en question doit être placé dans le même « groupe » que l'élément.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. Si l'élément référencé n'existe pas, l'élément sera inséré à la fin de le menu.
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
* `about` - Trigger a native about panel (custom message box on Window, which does not provide its own).
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
* `toggleSpellChecker` - Activer/désactiver le pocheur de sorts intégré.
* `fileMenu` - Menu par défaut entier "Fichier" (Close / Quitter)
* `editMenu` - Tout le menu "Edit" par défaut (Annuler, Copier, etc.).
* `viewMenu` - Menu "Affichage" par défaut (Recharger, Activer/désactiver les outils de développement, etc.)
* `windowMenu` - Menu par défaut entier "Windows" (Minimize, Zoom, etc.).

Les rôles supplémentaires suivants sont disponibles sur _macOS_:

* `appMenu` - Tout le menu "App" par défaut (About, Services, etc.)
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
* `shareMenu` - The submenu is [share menu][ShareMenu]. The `sharingItem` property must also be set to indicate the item to share.

Lorsque vous spécifiez un `rôle` sur macOS, `label` et `accélérateur` sont les seules options qui affecteront l'élément de menu. Toutes les autres options seront ignorées. La minuscule `rôle`, par exemple `toggledevtools`, est toujours supportée.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on macOS.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `MenuItem` :

#### `menuItem.id`

Une `String` indiquant l'identifiant unique de l'élément, cette propriété peut être modifiée dynamiquement.

#### `menuItem.label`

A `String` indicating the item's visible label.

#### `menuItem.click`

Une `Function` qui est activée lorsque l'élément MenuItem reçoit un événement de clic. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

Un `Menu` (facultatif) contenant le sous-menu de l'élément de menu s'il est présent.

#### `menuItem.type`

A `String` indicating the type of the item. Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.

#### `menuItem.role`

Un `String` (facultatif) indiquant le rôle de l'élément, si défini. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`

#### `menuItem.accelerator`

Un `Accélérateur` (facultatif) indiquant l'accélérateur de l'élément, si défini.

#### `menuItem.icon`

A `NativeImage | String` (facultatif) indiquant l'icône de l'élément , si défini.

#### `menuItem.sublabel`

A `String` indicating the item's sublabel.

#### `menuItem.toolTip` _macOS_

Une `Chaîne` indiquant le texte du survol de l'élément.

#### `menuItem.enabled`

Un `Booléen` indiquant si l'élément est activé, cette propriété peut être modifiée dynamiquement.

#### `menuItem.visible`

Un `Booléen` indiquant si l'élément est visible, cette propriété peut être modifiée dynamiquement.

#### `menuItem.checked`

Un `Booléen` indiquant si l'élément est vérifié, cette propriété peut être modifiée dynamiquement.

Une `case à cocher` lien de menu activera et éteindra la propriété `cochée` lorsque sera sélectionné.

Un lien de menu `radio` activera sa propriété `cochée` une fois cliqué, et désactivera cette propriété pour tous les éléments adjacents du même menu.

Vous pouvez ajouter une fonction `clic` pour un comportement supplémentaire.

#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed.

This property can be dynamically changed.

#### `menuItem.sharingItem` _macOS_

A `SharingItem` indicating the item to share when the `role` is `shareMenu`.

This property can be dynamically changed.

#### `menuItem.commandId`

Un `Nombre` indiquant l'identifiant unique d'un élément.

#### `menuItem.menu`

Un `Menu` dont l'item fait partie.

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
