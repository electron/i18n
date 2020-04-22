## Class: MenuItem

> Добавляет элементы в основное меню и контекстное меню приложения.

Процесс: [Главный](../glossary.md#main-process)

Просмотрите [`Menu`](menu.md) для примеров использования.

### `new MenuItem(options)`

* `options` Object
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked.
    * `menuItem` MenuItem
    * ` browserWindow </ 0> <a href="browser-window.md"> BrowserWindow </ 1>Line</li>
<li><code>event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (опционально) - Может быть `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` или `windowMenu` - Определенное действие элемента меню, если указано, свойство `click` будет игнорироваться. Смотрите [роли](#roles).
  * `type` String (опционально) - Может быть `normal`, `separator`, `submenu`, `checkbox` или `radio`.
  * `label` String (опционально)
  * `sublabel` String (опционально)
  * `accelerator` [Accelerator](accelerator.md) (опционально)
  * `icon` ([NativeImage](native-image.md) | String) (опционально)
  * `enabled` Boolean (опционально) - Если false, пункт меню выделится серым цветом и не будет нажимться.
  * `acceleratorWorksWhenHidden` Boolean (optional) - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`. _macOS_
  * `visible` Boolean (опционально) - Если false, пункт меню будет полностью скрыт.
  * `checked` Boolean (опционально) - Должно быть указано только для `checkbox` или `radio` типов элементов меню.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
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

The following additional roles are available on _macOS_:

* `appMenu` - Полное меню "App" по умолчанию (О программе, службах и т. д.)
* `about` - Сопоставляется с `orderFrontStandardAboutPanel`.
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

При задании `role` на macOS, `label` и `accelerator` являются единственными параметрами, которые влияют на пункт меню. Все остальные параметры будут проигнорированы. Нижний регистр `role`, например `toggledevtools`, все еще поддерживается.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### Свойства экземпляра

Для экземпляров `MenuItem` доступны следующие свойства:

#### `menuItem.id`

`Строка` с указанием уникального id элемента, это свойство может быть динамически изменено.

#### `menuItem.label`

`Строка` указывает видимую метку элемента, это свойство может быть динамически изменено.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.
* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

`Menu` (опционально), содержащие подменю пункты, если таковые имеются.

#### `menuItem.type`

`Строка` с указанием типа элемента.

#### `menuItem.role`

`Строка` (опционально) с указанием роли элемента, если установлено. Может быть `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` или `windowMenu`

#### `menuItem.accelerator`

`Строка` (опционально) с указанием ускорителя элемента, если установлено.

#### `menuItem.icon`

`NativeImage | Строка` (опционально) с указанием иконки элемента, если установлено.

#### `menuItem.sublabel`

`Строка` с указанием подписи элемента, это свойство может быть динамически изменено.

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
