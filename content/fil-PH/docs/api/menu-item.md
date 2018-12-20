## Class: MenuItem

> Magdagdag ng mga aytem sa likas na aplikasyon ng mga menu at konteksto ng mga menu.

Proseso:[Pangunahi](../glossary.md#main-process)

Tingnan ang [`Menu`](menu.md) para sa mga halimbawa.

### `bagong MenuItem(opsyon)`

* `pagpipilian` Bagay 
  * `i-klik` Punsyon (opsyonal) - Ay tatawagin na may `i-klik ang(menuItem, browserWindow, event)` kapag ang aytem ng menu ay na-klik na. 
    * `menuItem`MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `kaganapan` kaganapan
  * `role` String (opsyonal) - tukuyin ang aksyon ng mga aytem ng menu, kapag tinukoy ang katangian `click` ay hindi na papansinin. Tingnan ang [roles](#roles).
  * `type` String (opsyonal) - Ay maaaring `normal`, `separator`, `submenu`, `checkbox` o `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (opsyonal)
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal)
  * `enabled` Boolean (opsyonal) - Kung hindi totoo, ang aytem ng menu ay naka-grey out at hindi maki-klik.
  * `visible` Boolean (opsyonal) - Kung hindi totoo, ang aytem ng menu ay lubusang itatago.
  * `checked` Boolean (opsyonal) - Dapat lamang na tinukoy para sa uri ng `checkbox` o `radio` ng mga aytem ng menu.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### Mga tungkulin

Ang mga tungkulin ay nagpapahintulot sa mga aytem ng menu na may paunang tinukoy na mga katangian.

Ito ang mabisang paraan para matukoy ang `role` para sa kahit anong aytem ng menu na pumaparehas sa standard na tungkulin, sa halip na manu-manong sinusubukang i-implementa ang katangian sa isang punsyon ng `click`. Ang dati ng gawang katangian ng `role` ay magbibigay ng pinakanatural na karanasan.

Ang mga halaga ng `label` at `accelerator` ay opsyonal kapag ginagamit ang`role` at magiging default sa naaangkop na halaga para sa bawat plataporma.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

* `undo`
* `redo`
* `cut`
* `kopyahin`
* `paste`
* `pasteAnd MatchStyle`
* `selectAll`
* `delete`
* `minimize` - Paliitin ang kasalukuyang window.
* `close` - Isara ang kasalukuyang window.
* `quit` - Quit the application.
* `reload` - Ikarga ulit ang kasalukuyang window.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen` - Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `editMenu` - Ang kabuoang default na menu ng "Edit" (Undo, Kopya, atbp.).
* `windowMenu` - Ang kabuoang default na menu ng "Window" (Paliitin, Isara, atbp.).

The following additional roles are available on *macOS*:

* `about` - Ibalangkas sa mga aksyon ng `orderFrontStandardAboutPanel`.
* `hide` - Ibalangkas sa mga aksyon ng `hide`.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Ibalangkas sa mga aksyon ng `unhideAllApplications`.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Ibalangkas sa mga aksyon ng `arrangeInFront`.
* `zoom` - Ibalangkas sa mga aksyon ng `performZoom`.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### Katangian ng pagkakataon

The following properties are available on instances of `MenuItem`:

#### `ang menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `ang menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `ang menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `ang menuItem.label`

A `String` representing the menu items visible label.

#### `ang menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.