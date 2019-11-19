## Class: Tray

> Добавить иконки и контекстные меню в системную область уведомлений.

Процесс: [Main](../glossary.md#main-process)

`Tray` является [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'ом.

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('Это мое приложение.')
  tray.setContextMenu(contextMenu)
})
```

**Ограничения платформ:**

* В Linux индикатор приложения будет использован, если он поддерживается, иначе будет использован `GtkStatusIcon`.
* В дистрибутивах Linux, которые поддерживают только индикаторы приложений, вы должны установите `libappindicator1`, чтобы значок в трее заработал.
* Индикатор приложения будет отображаться только при наличии контекстного меню.
* Когда индикатор приложения используется в Linux, событие `click` игнорируется.
* На Linux, чтобы изменения, внесенные в отдельные элементы `MenuItem`, вступили в силу, Вы должны снова вызвать `setContextMenu`. Например:

```javascript
const { app, Menu, Tray } = require('electron')



let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    [1],
    
  ])
  enu.items.checked is my application.')
  con.setContextMenu(contextMenu)
})
```

* В Windows рекомендуется использовать значки `ICO` для получения лучших визуальных эффектов.

Если вы хотите добиться одинаковой работы вашего приложения на всех платформах, то не следует полагаться на событие `click` и всегда создавать контекстное меню для иконки в трее.

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

Создаёт новую иконку в трее, связанную с `image`.

### События экземпляра

Модуль `Tray` генерирует следующие события:

#### Событие: 'click'

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the tray icon is clicked.

#### Событие: 'right-click' *macOS* *Windows*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Emitted when the tray icon is right clicked.

#### Событие: 'double-click' *macOS* *Windows*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
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

Возвращает:

* `event` Event
* `files` String[] - The paths of the dropped files.

Emitted when dragged files are dropped in the tray icon.

#### Событие: 'drop-text' *macOS*

Возвращает:

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

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse enters the tray icon.

#### Событие: 'mouse-leave' *macOS*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS* *Windows*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
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

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` *macOS*

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Логическое значение

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Returns `Boolean` - Whether double click events will be ignored.

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

* `menu` Menu | null

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

Возвращает [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.