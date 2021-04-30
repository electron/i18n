## Class: MenuItem

> Добавляет элементы в основное меню и контекстное меню приложения.

Процесс: [Основной](../glossary.md#main-process)

Просмотрите [`Menu`](menu.md) для примеров использования.

### `new MenuItem(options)`

* `options` Object
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked.
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md) | undefined - This will not be defined if no window is open.
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define the action of the menu item, when specified the `click` property will be ignored. Смотрите [роли](#roles).
  * `type` String (опционально) - Может быть `normal`, `separator`, `submenu`, `checkbox` или `radio`.
  * `label` String (опционально)
  * `sublabel` String (опционально)
  * `toolTip` String (опционально) _macOS_ - Текст при наведении на этот пункт меню.
  * `accelerator` [Accelerator](accelerator.md) (опционально)
  * `icon` ([NativeImage](native-image.md) | String) (опционально)
  * `enabled` Boolean (опционально) - Если false, пункт меню выделится серым цветом и не будет нажимться.
  * `acceleratorWorksWhenHidden` Boolean (опционально) _macOS_ - по умолчанию `true`, когда `false`, accelerator не допустит активации элемента, если элемент не отображается.
  * `visible` Boolean (опционально) - Если false, пункт меню будет полностью скрыт.
  * `checked` Boolean (опционально) - Должно быть указано только для `checkbox` или `radio` типов элементов меню.
  * `registerAccelerator` Boolean (optional) _Linux_ _Windows_ - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `sharingItem` SharingItem (optional) _macOS_ - The item to share when the `role` is `shareMenu`.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (опционально) - Необходимо указать для `submenu` типы элементов меню. Если `submenu` указано, то `type: 'submenu'` может быть опущен. Если значение не является [`Menu`](menu.md) то оно будет автоматически преобразовано в значение `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (опционально) - Вставляет этот элемент перед элементом с указанным названием. Если указанный элемент не существует, то элемент будет вставлен в конец меню. Кроме того, подразумевается, что рассматриваемый элемент меню размещен в той же "группе", что и сам элемент.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. Если ссылаемый элемент не существует, тогда элемент будет вставлен в конец меню.
  * `beforeGroupContaining` String[] (опционально) - Предоставляет возможность в одном контекстном меню объявить размещение группы, содержащей элемент, перед группой, содержащей элемент с указанной меткой.
  * `afterGroupContaining` String[] (опционально) - Предоставляет возможность в одном контекстном меню объявить размещение группы, содержащей элемент, после группы, содержащей элемент с указанной меткой.

**Примечание:** `acceleratorWorksWhenHidden` указан только как macOS потому, что accelerators всегда работают, когда элементы скрыты в Windows и Linux. Эта опция доступна пользователям для того, чтобы дать им возможность отключить ее, так как это возможно в родной macOS разработке. Это свойство можно использовать только на macOS High Sierra 10.13 или новее.

### Роли

Роли позволяют элементам класса menu иметь заранее определенные поведения.

Лучше всего указать `role` для любого элемента меню, который соответствует стандартной роли, а не пытаться вручную реализовать поведение в функции `click`. Встроенное поведение `role` даст наилучшую нативную возможность использования.

Значения `label` и `accelerator` необязательны при использовании `role` и по умолчанию будут присваиваться для каждой для каждой платформы.

Каждый элемент меню должен иметь `role` или `label`, или в случае разделителя `type`.

Свойство `role` может иметь следующие значения:

* `undo - Отменить`
* `about` - Trigger a native about panel (custom message box on Window, which does not provide its own).
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
* `toggleSpellChecker` - Enable/disable builtin spell checker.
* `fileMenu` - Полное меню "Файл" по умолчанию (Закрыть/Выйти)
* `editMenu` - Полное меню "Редактировать" (Отменить, копировать и т. д.).
* `viewMenu` - Полное меню "Вид" по умолчанию (перезагрузка, переключение инструментов разработчика и т. д.)
* `windowMenu` - Полное меню "Окно" по умолчанию (Свернуть, масштаб и т. д.).

The following additional roles are available on _macOS_:

* `appMenu` - Полное меню "App" по умолчанию (О программе, службах и т. д.)
* `hide` -Сопоставляется с `hide`.
* `hideOthers` - Сопоставляется с `hideOtherApplications`.
* `unhide` - Сопоставляется с `unhideAllApplications`.
* `startSpeaking` - Сопоставляется с `startSpeaking`.
* `stopSpeaking` - Сопоставляется с `stopSpeaking`.
* `front` - Сопоставляется с `arrangeInFront`.
* `zoom` - Сопоставляется с `performZoom`.
* `toggleTabBar` - Сопоставляется с `toggleTabBar`.
* `selectNextTab` - Сопоставляется с `selectNextTab`.
* `selectPreviousTab` - Сопоставляется с `selectPreviousTab`.
* `mergeAllWindows` - Сопоставляется с `mergeAllWindows`.
* `moveTabToNewWindow` - Сопоставляется с `moveTabToNewWindow`.
* `window` - Подменю в меню "Окно".
* `help` - Подменю в меню "Help".
* `services` - Подменю меню ["Сервисы"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc). Оно предназначено только для использования в Меню Приложений и *не* то же самое, что и подменю "Сервисы", используемое в контекстных меню приложений macOS, которое не реализовано в Electron.
* `RecentDocuments` - Подменю представляет собой меню "Открыть недавние".
* `clearRecentDocuments` - Сопоставляется с `clearRecentDocuments`.
* `shareMenu` - The submenu is [share menu][ShareMenu]. The `sharingItem` property must also be set to indicate the item to share.

При задании `role` на macOS, `label` и `accelerator` являются единственными параметрами, которые влияют на пункт меню. Все остальные параметры будут проигнорированы. Нижний регистр `role`, например `toggledevtools`, все еще поддерживается.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on macOS.

### Свойства экземпляра

Для экземпляров `MenuItem` доступны следующие свойства:

#### `menuItem.id`

`Строка` с указанием уникального id элемента, это свойство может быть динамически изменено.

#### `menuItem.label`

A `String` indicating the item's visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

`Menu` (опционально), содержащие подменю пункты, если таковые имеются.

#### `menuItem.type`

`Строка` с указанием типа элемента. Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.

#### `menuItem.role`

`String` (опционально) с указанием роли элемента, если установлено. Может быть `отменено`, `redo`, `сократить`, `копировать`, `вставить`, `pasteAndMatchStyle`, `удалить`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `минимизируйте`, `близко`, `справки`, `о`, `сервисах`, `скрыть`, `скрыть`, `показов`, `выход`, `startSpeaking`, `stopSpeaking`, `масштаба`, `передней`, `меню приложения`, `меню файлов`, `меню редактирования`, `меню просмотра`, `последних документов`, `переключателей панели`, `selectNextTab`, `selectПредыдущая вкладка`, `Объединение Всех Windows`, `clearRecentDocuments`, `moveTabToNewWindow` или `windowMenu`

#### `menuItem.accelerator`

`Accelerator` (опционально) с указанием ускорителя элемента, если установлено.

#### `menuItem.icon`

`NativeImage | Строка` (опционально) с указанием иконки элемента, если установлено.

#### `menuItem.sublabel`

A `String` indicating the item's sublabel.

#### `menuItem.toolTip` _macOS_

`String` с указанием текста, который появляется при наведении курсора на элемент.

#### `menuItem.enabled`

`Boolean` указывает, включен ли элемент, это свойство может быть динамически изменено.

#### `menuItem.visible`

`Boolean` указывает, видим ли элемент, это свойство может быть динамически изменено.

#### `menuItem.checked`

`Boolean` указывает, помечен ли элемент флажком, это свойство может быть динамически изменено.

Элемент меню `checkbox` будет включать и выключать свойство `checked` при его выборе.

`Radio` пункт меню включит его свойство `checked` при нажатии, и отключит это свойство для всех смежных пунктов в том же меню.

Вы можете добавить функцию `click` для дополнительного поведения.

#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed.

This property can be dynamically changed.

#### `menuItem.sharingItem` _macOS_

A `SharingItem` indicating the item to share when the `role` is `shareMenu`.

This property can be dynamically changed.

#### `menuItem.commandId`

`Номер` с указанием уникального последовательного идентификатора элемента.

#### `menuItem.menu`

`Меню`, частью которого является элемент.

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
