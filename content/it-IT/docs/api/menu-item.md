## Classe: MenuItem

> Aggiungi elementi a menu e menu contestuali di applicazioni native.

Processo: [Main](../glossary.md#main-process)

Vedi [`Menu`](menu.md) per degli esempi.

### `new MenuItem(options)`

* `options` Oggetto 
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * `role` String (optional) - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * `type` String (optional) - Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `position` String (optional) - This field allows fine-grained definition of the specific location within a given menu.

### Roles

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

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
* `quit`- Chiude l'applicazione.
* `reload` - Aggiorna la finestra corrente.
* `forceReload` - Aggiorna la finestra corrente ignorando la cache.
* `toggleDevTools` - Mostra/Nasconde la finestra per gli strumenti di sviluppo.
* `toggleFullScreen`- Attiva/Disattiva la modalità a schermo intero per la finestra corrente.
* `resetZoom` - Ripristina lo zoom al valore originario.
* `zoomIn` - Aumenta lo zoom la pagina del 10%.
* `zoomOut` - Riduce lo zoom della pagina del 10%.
* `editMenu` - L'intero menu di default "Modifica" (Annulla, Copia, etc.).
* `windowMenu` - L'intero menu di default "Finestra" (Riduci, Chiudi, etc.).

I seguenti valori sono disponibili per *macOS*:

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
* `services` - Il sottomenu è un menu "Services".
* `recentDocuments` - Il sottomenu è un menu "Open Recent".
* `clearRecentDocuments` - Mappa l'azione `clearRecentDocuments`.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### Proprietà Istanze

Le seguenti proprietà sono disponibili quando si istanzia la classe `MenuItem`:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.