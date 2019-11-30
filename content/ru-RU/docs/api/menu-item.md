## Class: MenuItem

> Добавляет элементы в основное меню и контекстное меню приложения.

Process: [Main](../glossary.md#main-process)

Просмотрите [`Menu`](menu.md) для примеров использования.

### `new MenuItem(options)`

* `options` Object 
  * `click` Function (опционально) - будет вызван `click(menuItem, browserWindow, event)` при нажатии на пункт меню. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (опционально) - Может быть `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` или `windowMenu` - Определенное действие элемента меню, если указано, свойство `click` будет игнорироваться. Смотрите [роли](#roles).
  * `type` String (опционально) - Может быть `normal`, `separator`, `submenu`, `checkbox` или `radio`.
  * `label` String (опционально)
  * `sublabel` String (опционально)
  * `toolTip` String (опционально) *macOS* - Текст при наведении на этот пункт меню.
  * `accelerator` [Accelerator](accelerator.md) (опционально)
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
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

**Note:** `acceleratorWorksWhenHidden` is specified as being macOS-only because accelerators always work when items are hidden on Windows and Linux. The option is exposed to users to give them the option to turn it off, as this is possible in native macOS development. This property is only usable on macOS High Sierra 10.13 or newer.

### Роли

Роли позволяют элементам класса menu иметь заранее определенные поведения.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

* `undo - Отменить`
* `redo - Восстановить`
* `cut - Вырезать`
* `copy - Копировать`
* `paste - Вставить`
* `pasteAndMatchStyle - Вставить и применить стиль`
* `selectAll - Выделить все`
* `delete - Удалить`
* `minimize` - Свернуть текущее окно.
* `close` - Закрыть текущее окно.
* `quit` - Выйти из приложения.
* `reload` - Перезагрузить текущее окно.
* `forceReload` - Перезагрузить текущее окно, игнорировать кэш.
* `toggleDevTools` - Включить инструмент разработчика для текущего окна.
* `togglefullscreen` -Включить полноэкранный режим для текущего окна.
* `resetZoom` - Сброс измененного масштаба страницы до исходного размера.
* `zoomIn` - Увеличение масштаба страницы на 10%.
* `zoomOut` - Уменьшение масштаба страницы на 10%.
* `fileMenu` - Полное меню "Файл" по умолчанию (Закрыть/Выйти)
* `editMenu` - Полное меню "Редактировать" (Отменить, копировать и т. д.).
* `viewMenu` - Полное меню "Вид" по умолчанию (перезагрузка, переключение инструментов разработчика и т. д.)
* `windowMenu` - Полное меню "Окно" по умолчанию (Свернуть, масштаб и т. д.).

The following additional roles are available on *macOS*:

* `appMenu` - Полное меню "App" по умолчанию (О программе, службах и т. д.)
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
* `services` - Подменю меню ["Сервисы"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc). Оно предназначено только для использования в Меню Приложений и *не* то же самое, что и подменю "Сервисы", используемое в контекстных меню приложений macOS, которое не реализовано в Electron.
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

`Menu` (опционально), содержащие подменю пункты, если таковые имеются.

#### `menuItem.type`

`Строка`с указанием типа предмета. Может быть `normal`, `separator`, `submenu`, `checkbox` или `radio`.

#### `menuItem.role`

`String` (опционально) с указанием роли элемента, если установлено. Может быть `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` или `windowMenu`

#### `menuItem.accelerator`

`Accelerator` (опционально) с указанием ускорителя элемента, если установлено.

#### `menuItem.icon`

`NativeImage | Строка` (опционально) с указанием иконки элемента, если установлено.

#### `menuItem.sublabel`

`Строка` с указанием подписи элемента, это свойство может быть динамически изменено.

#### `menuItem.toolTip` *macOS*

`String`с указанием текста, который появляется при наведении курсора на элемент.

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

`Boolean` указывает, следует ли регистрировать ускоритель с системой или только что отобразить, это свойство может быть динамически изменено.

#### `menuItem.commandId`

`Номер` с указанием уникального последовательного идентификатора элемента.

#### `menuItem.menu`

`Меню`, частью которого является элемент.