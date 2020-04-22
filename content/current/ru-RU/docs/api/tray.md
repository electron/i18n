## Class: Tray

> Добавить иконки и контекстные меню в системную область уведомлений.

Процесс: [Главный](../glossary.md#main-process)

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

__Ограничения платформ:__

* В Linux индикатор приложения будет использован, если он поддерживается, иначе будет использован `GtkStatusIcon`.
* В дистрибутивах Linux, которые поддерживают только индикаторы приложений, вы должны установите `libappindicator1`, чтобы значок в трее заработал.
* Индикатор приложения будет отображаться только при наличии контекстного меню.
* Когда индикатор приложения используется в Linux, событие `click` игнорируется.
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. Например:

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

#### Событие: 'right-click' _macOS_ _Windows_

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - границы иконки в трее.

Возникает при правом клике на иконке в трее.

#### Событие: 'double-click' _macOS_ _Windows_

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - границы иконки в трее.

Вызывается при двойном нажатии на иконку в трее.

#### Событие: 'balloon-show' _Windows_

Возникает при всплывающем сообщении в трее.

#### Событие: 'balloon-click' _Windows_

Вызывается при клике на всплывающем сообщении в трее.

#### Событие: 'balloon-closed' _Windows_

Возникает, когда всплывающее сообщение в трее закрыто из-за тайм-аута или вручную пользователем.

#### Событие: 'drop' _macOS_

Возникает при перетаскивании элементов на значок в трее.

#### Событие: 'drop-files' _macOS_

Возвращает:

* `event` Event
* `files` String[] - пути брошенных файлов.

Возникает при перетаскивании файлов на значок в трее.

#### Событие: 'drop-text' _macOS_

Возвращает:

* `event` Event
* `text` String - брошенная текстовая строка.

Возникает при перетаскивании строки на значок в трее.

#### Событие: 'drag-enter' _macOS_

Возникает, когда операция перетаскивания происходит на иконке в трее.

#### Событие: 'drag-leave' _macOS_

Возникает, когда операция перетаскивания завершилась на иконке в трее.

#### Событие: 'drag-end' _macOS_

Возникает, когда операция перетаскивания заканчивается в трее или заканчивается в другом месте.

#### Событие: 'mouse-enter' _macOS_

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Возникает при входе курсора мыши на иконку в трее.

#### Событие: 'mouse-leave' _macOS_

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Возникает при выходе курсора мыши с иконки в трее.

#### Событие: 'mouse-move' _macOS_ _Windows_

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

#### `tray.setPressedImage(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Устанавливает `image`, связанное с этим значком в трее, при нажатии в macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Устанавливает текст отображаемый при наведении на значок в трее.

#### `tray.setTitle(title)` _macOS_

* `title` String

Устанавливает заголовок, отображаемый рядом со значком в строке состояния (поддержка ANSI цветов).

#### `tray.getTitle()` _macOS_

Возвращает `String` - заголовок, отображаемый рядом со значком в области уведомлений в строке состояния

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Логическое значение

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

Значение по умолчанию установлено в значение false.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Возвращает `Boolean` - будет ли игнорироваться события двойного щелчка.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. По умолчанию - `true`. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. По умолчанию - `false`. Maps to [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010).
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". По умолчанию - `false`. Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

Отображает всплывающее сообщение в трее.

#### `tray.removeBalloon()` _Windows_

Removes a tray balloon.

#### `tray.focus()` _Windows_

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - позиция всплывающего сообщения.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

`position` доступна только для Windows, и это (0, 0) по умолчанию.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Устанавливает контекстное меню для этого значка.

#### `tray.getBounds()` _macOS_ _Windows_

Возвращает [`Rectangle`](structures/rectangle.md)

`bounds` значка в трее как `Object`.

#### `tray.isDestroyed()`

Возвращает `Boolean` - уничтожен ли значок в трее.
