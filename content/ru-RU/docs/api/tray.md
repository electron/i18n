## Class: Tray

> Добавить иконки и контекстные меню в системную область уведомлений.

Процесс: [Основной](../glossary.md#main-process)

`Tray` является [EventEmitter][event-emitter]'ом.

```javascript
const { app, Menu, Tray } - требуют ('электрон')

пусть лоток - null
app.whenReady ()...,> -
  лоток - новый Tray ('/path/to/my/icon')
  const contextMenu и Menu.buildFromTemplate (я
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  )
  tray.setToolTip ('Это мое приложение.')
  tray.setContextMenu (контекстMenu)
)
```

__Ограничения платформ:__

* В Linux индикатор приложения будет использован, если он поддерживается, иначе будет использован `GtkStatusIcon`.
* В дистрибутивах Linux, которые поддерживают только индикаторы приложений, вы должны установите `libappindicator1`, чтобы значок в трее заработал.
* Индикатор приложения будет отображаться только при наличии контекстного меню.
* Когда индикатор приложения используется в Linux, событие `click` игнорируется.
* На Linux для того, чтобы изменения, внесенные в `MenuItem`, чтобы вступят в силу, вы должны позвонить `setContextMenu` снова. Например:

```javascript
const { app, Menu, Tray } - требуют ('электрон')

пусть appIcon - null
app.whenReady ()...,> -
  appIcon - новый Tray ('/path/to/my/icon')
  const contextMenu и Menu.buildFromTemplate (
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  )

  // Внести изменения в контекст меню
  contextMenu.items[1].checked - ложные

  // Позвоните в это снова для Linux, потому что мы изменили контекстное меню
  appIcon.setContextMenu (contextMenu)
)
```

* В Windows рекомендуется использовать значки `ICO` для получения лучших визуальных эффектов.

Если вы хотите сохранить одинаковое поведение на всех платформах, вам не следует полагаться на событие `click` и всегда прикреплять контекстное меню к значку в трее.

### `новый Tray (изображение, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` Строка (необязательно) _Windows_ - Присваивает GUID значку лотка. Если выполняется подпись и подпись содержит организацию в строке темы, то GUID постоянно ассоциируется с этой подписью. Настройки уровня ОС, такие как положение значка лотка в лотке системы, сохранятся, даже если путь к выполненным изменениям. Если выируемый не подписан кодом, то GUID постоянно связан с пути к исполнению. Изменение пути к исполнению нарушит создание значка лотка, и необходимо использовать новый GUID. Тем не менее, настоятельно рекомендуется использовать параметр GUID только в сочетании с подписанным кодом выполненным. Если приложение определяет несколько значков лотка, то каждый значок должен использовать отдельный GUID.

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

#### Событие: 'мышь-вверх' _macOS_

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Излучается при освобождении мыши от нажатия значка лотка.

Примечание: Это не будет излучаться, если вы установили контекстное меню для вашего Tray с `tray.setContextMenu`, в результате ограничений уровня macOS.

#### Событие: "мышь вниз" _macOS_

Возвращает:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - позиция события.

Излучается при нажатии мыши на значок лотка.

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

#### `tray.setTitle(title[, options])` _macOS_

* `title` String
* `options` Object (опционально)
  * `fontType` String (опционально) - Вариант семейства шрифтов для отображения, может быть `моноширинным` или `цифро-моноширинным`. `monospaced` доступна в macOS 10.15 и `monospacedDigit` доступна в macOS 10.11 .  По умолчанию используют системный шрифт по умолчанию.

Устанавливает заголовок, отображаемый рядом со значком в строке состояния (поддержка ANSI цветов).

#### `tray.getTitle()` _macOS_

Возвращает `String` - заголовок, отображаемый рядом со значком в области уведомлений в строке состояния

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Устанавливает возможность игнорировать события с двойным щелчком мыши. Игнорирование этих событий позволяет обнаружить каждый отдельный щелчок значка лотка.

Значение по умолчанию установлено в значение false.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Возвращает `Boolean` - будет ли игнорироваться события двойного щелчка.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | Строка) (необязательно) - Значок для использования, `iconType` это `custom`.
  * `iconType` String (по желанию) - может быть `none`, `info`, `warning`, `error` или `custom`. По умолчанию `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (по желанию) - большая версия значка должна быть использована. По умолчанию - `true`. Карты для [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON].
  * `noSound` Boolean (опционально) - Не проигрывать соответствующий звук. По умолчанию - `false`. Карты для [`NIIF_NOSOUND`][NIIF_NOSOUND].
  * `respectQuietTime` Boolean (по желанию) - Не отображать уведомление шар, если текущий пользователь находится в "тихое время". По умолчанию - `false`. Карты для [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME].

Отображает всплывающее сообщение в трее.

#### `tray.removeBalloon()` _Windows_

Удаляет всплывающее уведомление в трее.

#### `tray.focus()` _Windows_

Возвращает фокус в область уведомления панели задач. Значки области уведомлений должны использовать это сообщение, когда они завершили свою операцию пользовательского интерфейса. Например, если значок отображает меню ярлыка, но пользователь нажимает ESC, чтобы отменить его, использовать `tray.focus()` , чтобы вернуть фокус в область уведомлений.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (опционально)
* `position` [Point](structures/point.md) (опционально) - Позиция всплывающего сообщения.

Всплывает контекстное меню значка лотка. Когда `menu` будет пройдена, `menu` будет вместо контекстной меню значка лотка.

`position` доступна только для Windows, и это (0, 0) по умолчанию.

#### `tray.closeContextMenu()` _macOS_ _Windows_

Закрывает меню открытого контекста, как это `tray.setContextMenu()`.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Устанавливает контекстное меню для этого значка.

#### `tray.getBounds()` _macOS_ _Windows_

Возвращает [`Rectangle`](structures/rectangle.md)

`bounds` значка в трее как `Object`.

#### `tray.isDestroyed()`

Возвращает `Boolean` - уничтожен ли значок в трее.

[NIIF_NOSOUND]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010
[NIIF_LARGE_ICON]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020
[NIIF_RESPECT_QUIET_TIME]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
