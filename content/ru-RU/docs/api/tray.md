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

Если вы хотите сохранить одинаковое поведение на всех платформах, вам не следует полагаться на событие `click` и всегда прикреплять контекстное меню к значку в трее.

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

Создаёт новую иконку в трее, связанную с `image`.

### События экземпляра

Модуль `Tray` генерирует следующие события:

#### Событие: 'click'

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - границы иконки в трее.
* `position` [Point](structures/point.md) - позиция события.

Вызывается при двойном клике на иконке в трее.

#### Событие: 'right-click' *macOS* *Windows*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - границы иконки в трее.

Возникает при правом клике на иконке в трее.

#### Событие: 'double-click' *macOS* *Windows*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - границы иконки в трее.

Вызывается при двойном нажатии на иконку в трее.

#### Событие: 'balloon-show' *Windows*

Возникает при всплывающем сообщении в трее.

#### Событие: 'balloon-click' *Windows*

Вызывается при клике на всплывающем сообщении в трее.

#### Событие: 'balloon-closed' *Windows*

Возникает, когда всплывающее сообщение в трее закрыто из-за тайм-аута или вручную пользователем.

#### Событие: 'drop' *macOS*

Возникает при перетаскивании элементов на значок в трее.

#### Событие: 'drop-files' *macOS*

Возвращает:

* `event` Event
* `files` String[] - пути брошенных файлов.

Возникает при перетаскивании файлов на значок в трее.

#### Событие: 'drop-text' *macOS*

Возвращает:

* `event` Event
* `text` String - брошенная текстовая строка.

Возникает при перетаскивании строки на значок в трее.

#### Событие: 'drag-enter' *macOS*

Возникает, когда операция перетаскивания происходит на иконке в трее.

#### Событие: 'drag-leave' *macOS*

Возникает, когда операция перетаскивания завершилась на иконке в трее.

#### Событие: 'drag-end' *macOS*

Возникает, когда операция перетаскивания заканчивается в трее или заканчивается в другом месте.

#### Событие: 'mouse-enter' *macOS*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Возникает при входе курсора мыши на иконку в трее.

#### Событие: 'mouse-leave' *macOS*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Возникает при выходе курсора мыши с иконки в трее.

#### Событие: 'mouse-move' *macOS* *Windows*

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Возникает при перемещении мыши на значке в трее.

### Методы экземпляра

Класс `Tray` имеет следующие методы:

#### `tray.destroy()`

Немедленно уничтожить иконку в трее.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Устанавливает `image` ассоциированный с значком в трее.

#### `tray.setPressedImage(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Устанавливает `image`, связанное с этим значком в трее, при нажатии в macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Устанавливает текст отображаемый при наведении на значок в трее.

#### `tray.setTitle(title)` *macOS*

* `title` String

Устанавливает заголовок, отображаемый рядом со значком в строке состояния (поддержка ANSI цветов).

#### `tray.getTitle()` *macOS*

Возвращает `String` - заголовок, отображаемый рядом со значком в области уведомлений в строке состояния

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Boolean

Устанавливает опцию игнорирования событий двойного щелчка. Игнорирование этих событий позволяет вам обнаруживать каждый отдельный щелчок по иконке в трее.

Значение по умолчанию установлено в значение false.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Возвращает `Boolean` - будет ли игнорироваться события двойного щелчка.

#### `tray.displayBalloon(options)` *Windows*

* `options` Object 
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Отображает всплывающее сообщение в трее.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - позиция всплывающего сообщения.

Контекстное меню всплывает вверх со значка в трее. Когда `menu` передается, `menu` будет отображаться вместо контекстного меню иконки в трее.

`position` доступна только для Windows, и это (0, 0) по умолчанию.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Устанавливает контекстное меню для этого значка.

#### `tray.getBounds()` *macOS* *Windows*

Возвращает [`Rectangle`](structures/rectangle.md)

`bounds` значка в трее как `Object`.

#### `tray.isDestroyed()`

Возвращает `Boolean` - уничтожен ли значок в трее.