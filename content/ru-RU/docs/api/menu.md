# Menu

## Класс: Menu

> Создайте меню приложения и контекстное меню.

Процесс: [Основной](../glossary.md#main-process)

### `new Menu()`

Создает новое меню.

### Статические методы

Класс `Menu` имеет следующие статические методы:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Устанавливает `меню` в качестве меню приложения на macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

Также на Windows и Linux, Вы можете использовать `&` в названии подменю верхнего списка, чтобы указать, какая буква должна получить сгенерированный акселератор( Accelerator ). Для примера, использование `&File` для меню файла в результате сгенерирует акселератор( Accelerator ) `Alt-F`, который открывает соответствующее меню. The indicated character in the button label then gets an underline, and the `&` character is not displayed on the button label.

In order to escape the `&` character in an item name, add a proceeding `&`. For example, `&&File` would result in `&File` displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Примечание:** Меню по умолчанию будет создано автоматически, если приложение не установит его. Он содержит стандартные элементы, такие как `Файл`, `Редактировать`, `Вид`, `Окно` и `Помощь`.

#### `Menu.getApplicationMenu()`

Возвращает `Menu | null` - меню приложения, если значение задано, в противном случае `null`.

**Примечание:** Возвращенный экземпляр `Menu` не поддерживает динамическое добавление или удаление пунктов меню. [Параметры экземпляра](#instance-properties) все ещё могут быть динамически изменены.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

Посылает `action` первому ответчику приложения. Это используется для эмуляции поведения меню macOS. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

Для дополнительной информации по нативным действиям в macOS смотрите [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7).

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Возвращает `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

Вы также можете прикрепить другие поля к элементу `template` и они станут свойствами элементов созданного меню.

### Методы экземпляра

Объект `меню` имеет следующие методы экземпляра:

#### `menu.popup([options])`

* `options` Object (опционально)
  * `windows` [BrowserWindow](browser-window.md) (опционально) - по умолчанию это сфокусированное окно.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
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

An example of creating the application menu with the simple template API:

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
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
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

To create menus initiated by the renderer process, send the required information to the main process using IPC and have the main process display the menu on behalf of the renderer.

Below is an example of showing a menu when the user right clicks the page:

```js
// renderer
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
  // ...
})

// main
ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: 'Menu Item 1',
      click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})
```

## Замечания о меню приложения в macOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

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

По умолчанию, элементы будут вставлены в том порядке, в котором они существуют в шаблоне, если не используется ни один из указанных ключевых слов позиционирования.

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
