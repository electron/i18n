## Class: MenuItem

> Добавляет элементы в основное меню и контекстное меню приложения.

Process: [Main](../glossary.md#main-process)

Просмотрите [`Menu`](menu.md) для примеров использования.

### `new MenuItem(options)`

* `options` Object 
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * `role` Строка(опционально) - Может принимать значения `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu` или `windowMenu` - Определите действие пункта меню, когда указанное свойство `click` будет проигнорировано. See [roles](#roles).
  * `type` String (optional) - Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### Роли

Роли позволяют элементам класса menu иметь заранее определенные поведения.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

* `undo`
* `redo`
* `cut`
* `копировать`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Minimize current window.
* `close` - Close current window.
* `quit` - Quit the application.
* `reload` - Reload the current window.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen` - Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `fileMenu` - Whole default "File" menu (Close / Quit)
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
* `viewMenu` - Whole default "View" menu (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Zoom, etc.).

The following additional roles are available on *macOS*:

* `appMenu` - Whole default "App" menu (About, Services, etc.)
* `about` - Map to the `orderFrontStandardAboutPanel` action.
* `hide` - Map to the `hide` action.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Map to the `unhideAllApplications` action.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Map to the `arrangeInFront` action.
* `zoom` - Map to the `performZoom` action.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) menu. This is only intended for use in the Application Menu and is *not* the same as the "Services" submenu used in context menus in macOS apps, which is not implemented in Electron.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### Свойства экземпляра

The following properties are available on instances of `MenuItem`:

#### `menuItem.id`

`Строка` с указанием уникального id элемента, это свойство может быть динамически изменено.

#### `menuItem.label`

`Строка` указывает видимую метку элемента, это свойство может быть динамически изменено.

#### `menuItem.click`

`Функция` которая выполняется, когда MenuItem получает событие щелчка. Она может быть вызвана с `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

A `Menu` (optional) containing the menu item's submenu, if present.

#### `menuItem.type`

`Строка` с указанием типа элемента.

#### `menuItem.role`

`Строка` (опционально) с указанием роли элемента, если установлено. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu` or `windowMenu`

#### `menuItem.accelerator`

`Строка` (опционально) с указанием ускорителя элемента, если установлено.

#### `menuItem.icon`

`NativeImage | Строка` (опционально) с указанием иконки элемента, если установлено.

#### `menuItem.sublabel`

`Строка` с указанием подписи элемента, это свойство может быть динамически изменено.

#### `menuItem.enabled`

`Boolean` указывает, включен ли элемент, это свойство может быть динамически изменено.

#### `menuItem.visible`

`Boolean` указывает, видим ли элемент, это свойство может быть динамически изменено.

#### `menuItem.checked`

`Boolean` указывает, помечен ли элемент флажком, это свойство может быть динамически изменено.

`Сheckbox` пункт меню переключит `checked` при выборе.

`Radio` пункт меню включит его свойство `checked` при нажатии, и отключит это свойство для всех смежных пунктов в том же меню.

Вы можете добавить функцию `щелчка` для дополнительного поведения.

#### `menuItem.registerAccelerator`

`Boolean` указывает, следует ли регистрировать ускоритель с системой или только что отобразить, это свойство может быть динамически изменено.

#### `menuItem.commandId`

`Номер` с указанием уникального последовательного идентификатора элемента.

#### `menuItem.menu`

`Меню`, частью которого является элемент.