## Classe: MenuItem

> Aggiungi elementi a menu e menu contestuali di applicazioni native.

Processo: [Main](../glossary.md#main-process)

Vedi [`Menu`](menu.md) per degli esempi.

### `new MenuItem(options)`

* `options` Object
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked.
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * `type` String (optional) - Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `toolTip` String (optional) _macOS_ - Hover text for this menu item.
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `acceleratorWorksWhenHidden` Boolean (optional) _macOS_ - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) _Linux_ _Windows_ - If false, the accelerator won't be registered with the system, but it will still be displayed. Il valore predefinito è true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of  the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

**Note:** `acceleratorWorksWhenHidden` is specified as being macOS-only because accelerators always work when items are hidden on Windows and Linux. The option is exposed to users to give them the option to turn it off, as this is possible in native macOS development. This property is only usable on macOS High Sierra 10.13 or newer.

### Roles

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

La proprietà `role` può avere i seguenti valori:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Riduce la finestra corrente.
* `close` - Chiude la finestra corrente.
* `quit` - Quit the application.
* `reload` - Aggiorna la finestra corrente.
* `forceReload` - Aggiorna la finestra corrente ignorando la cache.
* `toggleDevTools` - Mostra/Nasconde la finestra per gli strumenti di sviluppo.
* `togglefullscreen` - Toggle full screen mode on the current window.
* `resetZoom` - Ripristina lo zoom al valore originario.
* `zoomIn` - Aumenta lo zoom la pagina del 10%.
* `zoomOut` - Riduce lo zoom della pagina del 10%.
* `fileMenu` - Whole default "File" menu (Close / Quit)
* `editMenu` - L'intero menu di default "Modifica" (Annulla, Copia, etc.).
* `viewMenu` - Whole default "View" menu (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Zoom, etc.).

I seguenti valori sono disponibili per _macOS_:

* `appMenu` - Whole default "App" menu (About, Services, etc.)
* `about` - Mappa l'azione `orderFrontStandardAboutPanel`.
* `hide` - Mappa l'azione `hide`.
* `hideOthers` - Mappa l'azione `hideOtherApplications`.
* `unhide` - Mappa l'azione `unhideAllApplications`.
* `startSpeaking` - Mappa l'azione `startSpeaking`.
* `stopSpeaking` - Mappa l'azione `stopSpeaking`.
* `front` - Mappa l'azione `arrangeInFront`.
* `zoom` - Mappa l'azione `performZoom`.
* `toggleTabBar` - Mappa l'azione `toggleTabBar`.
* `selectNextTab` - Mappa l'azione `selectNextTab`.
* `selectPreviousTab` - Mappa l'azione `selectPreviousTab`.
* `mergeAllWindows` - Mappa l'azione `mergeAllWindows`.
* `moveTabToNewWindow` - Mappa l'azione `moveTabToNewWindow`.
* `window` - Il sottomenu è un menu "Window".
* `help` - Il sottomenu è un menu "Help".
* `services` - The submenu is a ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) menu. This is only intended for use in the Application Menu and is *not* the same as the "Services" submenu used in context menus in macOS apps, which is not implemented in Electron.
* `recentDocuments` - Il sottomenu è un menu "Open Recent".
* `clearRecentDocuments` - Mappa l'azione `clearRecentDocuments`.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### Proprietà Istanze

Le seguenti proprietà sono disponibili quando si istanzia la classe `MenuItem`:

#### `menuItem.id`

A `String` indicating the item's unique id, this property can be dynamically changed.

#### `menuItem.label`

A `String` indicating the item's visible label, this property can be dynamically changed.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.
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

#### `menuItem.toolTip` _macOS_

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
