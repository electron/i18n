## Class: Tray

> Добавляет иконки и контекстное меню в область уведомлений ОС.

Процесс: [Main](../glossary.md#main-process)

`Tray` это [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
```

**Ограничения платформ:**

* В Linux индикатор приложения будет использован, если он поддерживается, иначе будет использован `GtkStatusIcon`.
* On Linux distributions that only have app indicator support, you have to install `libappindicator1` to make the tray icon work.
* Значок приложения будет показан только в случае присутствия у приложения контекстного меню.
* Если приложение запущено на Linux, то событие `click` по иконке не сработает.
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. For example:

```javascript
const {app, Menu, Tray} = require('electron')



let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    [1],
    
  ])
  enu.items.checked is my application.')
  con.setContextMenu(contextMenu)
})
```

* Для лучшего качества иконок на платформе Windows рекомендуется использовать `ICO` иконки.

Если вы хотите добиться одинаковой работы вашего приложения на всех платформах, то не следует полагаться на событие `click` и всегда создавать контекстное меню для иконки в трее.

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

Создаёт новую иконку в трее, связанная с `image`.

### События экземпляра

Модуль `Tray` имеет эти события:

#### Событие: 'click'

* `событие` Событие 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the tray icon is clicked.

#### Событие: 'right-click' *macOS* *Windows*

* `событие` Событие 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Emitted when the tray icon is right clicked.

#### Событие: 'double-click' *macOS* *Windows*

* `событие` Событие 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Вызывается при двойном нажатии на иконку в трее.

#### Событие: 'balloon-show' *Windows*

Emitted when the tray balloon shows.

#### Событие: 'balloon-click' *Windows*

Emitted when the tray balloon is clicked.

#### Событие: 'balloon-closed' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Событие: 'drop' *macOS*

Emitted when any dragged items are dropped on the tray icon.

#### Событие: 'drop-files' *macOS*

* `event` Event
* `files` String[] - The paths of the dropped files.

Emitted when dragged files are dropped in the tray icon.

#### Событие: 'drop-text' *macOS*

* `event` Event
* `text` String - the dropped text string.

Emitted when dragged text is dropped in the tray icon.

#### Событие: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Событие: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Событие: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Событие: 'mouse-enter' *macOS*

* `событие` Событие 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse enters the tray icon.

#### Событие: 'mouse-leave' *macOS*

* `событие` Событие 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS*

* `событие` Событие 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse moves in the tray icon.

### Методы экземпляра

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

```javascript
const {BrowserWindow, Tray} = require('electron')

const win = new BrowserWindow({width: 800, height: 600})
const tray = new Tray('/path/to/my/icon')

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})
```

#### `tray.displayBalloon(options)` *Windows*

* `options` Object 
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.