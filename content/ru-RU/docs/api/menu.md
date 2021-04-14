## Класс: Menu

> Создайте меню приложения и контекстное меню.

Процесс: [Основной](../glossary.md#main-process)

### `new Menu()`

Создает новое меню.

### Статические методы

Класс `Menu` имеет следующие статические методы:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Устанавливает `меню` в качестве меню приложения на macOS. На Windows и Linux, `menu` будет установлен в качестве верхнего меню каждого окна.

Также на Windows и Linux, Вы можете использовать `&` в названии подменю верхнего списка, чтобы указать, какая буква должна получить сгенерированный акселератор( Accelerator ). Для примера, использование `&File` для меню файла в результате сгенерирует акселератор( Accelerator ) `Alt-F`, который открывает соответствующее меню. Указанный символ в названии кнопки будет подчеркнут. Символ `&` не отображается в названии кнопки.

Прохождение `null` будет подавлять меню по умолчанию. На Windows и Linux это имеет дополнительный эффект удаления бара меню из окна.

**Примечание:** Меню по умолчанию будет создано автоматически, если приложение не установит его. Он содержит стандартные элементы, такие как `Файл`, `Редактировать`, `Вид`, `Окно` и `Помощь`.

#### `Menu.getApplicationMenu()`

Возвращает `Menu | null` - меню приложения, если установлено, иначе `null`.

**Примечание:** Возвращенный экземпляр `Menu` не поддерживает динамическое добавление или удаление пунктов меню. [Параметры экземпляра](#instance-properties) все ещё могут быть динамически изменены.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

Посылает `action` первому ответчику приложения. Это используется для эмуляции поведения меню macOS. Чаще всего вы будет использовать свойство [`role`](menu-item.md#roles) экземпляра [`MenuItem`](menu-item.md).

Для дополнительной информации по нативным действиям в macOS смотрите [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7).

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Возвращает `Menu`

Как правило, `template` представляет 500 `options` для построения [MenuItem](menu-item.md). На использование можно ссылаться выше.

Вы также можете прикрепить другие поля к элементу `template` и они станут свойствами элементов созданного меню.

### Методы экземпляра

Объект `меню` имеет следующие методы экземпляра:

#### `menu.popup([options])`

* `options` Object (опционально)
  * `windows` [BrowserWindow](browser-window.md) (опционально) - по умолчанию это сфокусированное окно.
  * `x` (необязательно) - по умолчанию текущее положение курсора мыши. Должно быть объявлено, `y` объявлено.
  * `y` (необязательно) - по умолчанию текущее положение курсора мыши. Должно быть объявлено, `x` объявлено.
  * `positioningItem` (необязательно) _macOS_ - Индекс пункта меню для может быть расположен под курсором мыши в указанных координатах. Значение по умолчанию -1.
  * `callback` Функция (опционально) - вызывается, когда меню закрыто.

Переключает это меню в контекстное меню в [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально) - по умолчанию это сфокусированное окно.

Закрывает контекстное меню в `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Добавляет `menuItem` в меню.

#### `menu.getMenuItemById(id)`

* `id` String

Возвращает элемент `MenuItem` с указанным `id`

#### `menu.insert(pos, menuItem)`

* `port` Integer
* `menuItem` [MenuItem](menu-item.md)

Вставляет `menuItem` в меню на позицию `pos`.

### События экземпляра

Объекты созданные с помощью `new Menu` или возвращенные из `Menu.buildFromTemplate` вызывают следующие события:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### Событие: 'menu-will-show'

Возвращает:

* `event` Event

Вызывается при вызове `menu.popup()`.

#### Событие: 'menu-will-close'

Возвращает:

* `event` Event

Вызывается, когда всплывающее окно закрывается вручную или с помощью `menu.closePopup()`.

### Свойства экземпляра

Объекты `menu` также имеют следующие свойства:

#### `menu.items`

Массив `MenuItem[]` содержит элементы меню.

Каждое `Menu` состоит из нескольких [`MenuItem`](menu-item.md) и каждое `MenuItem` может иметь подменю.

## Примеры

Пример создания меню приложений с помощью простого API шаблона:

```javascript
const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? 
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        и
          : «Речь»,
          субмену:
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }


      :
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      )
    ,
  ,
  // { role: 'viewMenu' }

    метка: "Вид",
    submenu:
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ,
  ,
  // { role: 'windowMenu' }

    этикетка: "Окно",
    submenu:
      { role: 'minimize' },
      { role: 'zoom' },
      ... (isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Графический процесс

Для создания меню, инициированного процессом рендерера, отправьте необходимую информацию в основной процесс с помощью IPC и отправьте основной процесс отображения меню от имени рендерера.

Ниже приведен пример отображения меню, когда пользователь право нажимает на страницу:

```js
рендерер
window.addEventListener ('contextmenu', (e) -> -
  e.preventDefault()
  ipcRenderer.send ('show-context-menu')
q)

ipcRenderer.on ('context-menu-command', (например, команда) ->
  // ...
В)

// главный
ipcMain.on ('шоу-контекст-меню', (событие) -> -
  шаблон const ,
    -
      метка: 'Menu Item 1',
      нажмите: () -> - event.sender.send ('контекст-меню-команда', 'меню-элемент-1') -
    ,
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  -
  const menu.buildFromTemplate (шаблон)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
)
```

## Замечания о меню приложения в macOS

macOS имеет совершенно другой стиль меню приложений от Windows и Linux. Вот несколько заметок о том, как сделать меню вашего приложения более родным.

### Стандартные меню

На macOS есть много стандратных системных меню, таких как [`Службы`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) и `Окно`. Чтобы сделать меню стандартным меню, Вы должны установить значение `role` у меню в одно из следующих, а Electron распознает их и сделает их стандартным меню:

* `window`
* `help`
* `services`

### Действия элементов стандартного меню

macOS представляет стандартные действия для некоторых элементов меню, таких как `About xxx`, `Hide xxx` и `Hide Others`. Чтобы установить действие элемента меню на стандартное действие, Вы должны установить атрибут `role` элемента меню.

### Имя главного меню

На macOS название первого элемента меню приложения - всегда название Вашего приложения, независимо от того, какое название элемента Вы установили. Чтобы изменить его, измените файл `Info.plist` Вашей сборки приложения. См. [О информации свойств списка файлов][AboutInformationPropertyListFiles] для большей информации.

## Настройка меню для конкретного окна браузера (*Linux* *Windows*)

[Метод `setMenu`][setMenu] окна браузера может установить меню определенных окон браузера.

## Позиция элемента меню

Вы можете использовать `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` и `id`, чтобы контролировать то, как элементы будут размещены, при создании меню с помощью `Menu.buildFromTemplate`.

* `before` - вставляет этот элемент перед элементом с указанным названием. Если ссылаемый элемент не существует, тогда элемент будет вставлен в конец меню. Кроме того, подразумевается, что рассматриваемый элемент меню размещен в той же "группе", что и сам элемент.
* `after` - вставляет элемент после элемента с указанным названием. Если ссылаемый элемент не существует, тогда элемент будет вставлен в конец меню. Кроме того, подразумевается, что рассматриваемый элемент меню размещен в той же "группе", что и сам элемент.
* `beforeGroupContaining` - представляет средства для одного контекстного меню, чтобы объявить размещение их содержащей группы перед содержащей группы элемента с указанным названием.
* `afterGroupContaining` - представляет средства для одного контекстного меню, чтобы объявить размещение их содержащей группы после содержащей группы элемента с указанным названием.

По умолчанию, элементы будут вставлены в том порядке, в котором они существуют в шаблоне, если не используется одно из указанных ключевых слов позиционирования.

### Примеры

Шаблон:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Меню:

```sh
- 1
- 2
- 3
- 4
```

Шаблон:

```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```

Меню:

```sh
- 3
- 4
- ---
- 1
- ---
- 2
```

Шаблон:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Меню:

```sh
- ---
- 3
- 2
- 1
```

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows
