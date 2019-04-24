## クラス: Menu

> ネイティブアプリケーションのメニューとコンテキストメニューを作成します。

プロセス: [Main](../glossary.md#main-process)

### `new Menu()`

新しいメニューを作成します

### 静的メソッド

`Menu`クラスは以下の静的メソッドを持ちます。

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

macOSではアプリケーション メニューとして `menu` を設定します。Windows と Linuxでは、`menu` は各ウィンドウの上部のメニューとして設定されます。

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

Returns `Menu | null` - The application menu, if set, or `null`, if not set.

**Note:** The returned `Menu` instance doesn't support dynamic addition or removal of menu items. [Instance properties](#instance-properties) can still be dynamically modified.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

Sends the `action` to the first responder of application. This is used for emulating default macOS menu behaviors. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

See the [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) for more information on macOS' native actions.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Returns `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### インスタンスメソッド

The `menu` object has the following instance methods:

#### `menu.popup(options)`

* `options` Object (任意) 
  * `window` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。
  * `x` Number (任意) - デフォルトはマウスカーソルの位置。`y` が宣言されている場合はこれを宣言しなければいけない。
  * `y` Number (任意) - デフォルトはマウスカーソルの位置。`x` が宣言されている場合はこれを宣言しなければいけない。
  * `positioningItem` Number (任意) *macOS* - マウスカーソルの位置に配置するメニューアイテムのインデックス。省略値は -1。
  * `callback` Function (任意) - メニューが閉じたしたときに呼ばれます。

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。

Closes the context menu in the `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Appends the `menuItem` to the menu.

#### `menu.getMenuItemById(id)`

* `id` String

Returns `MenuItem` the item with the specified `id`

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Inserts the `menuItem` to the `pos` position of the menu.

### インスタンスイベント

Objects created with `new Menu` emit the following events:

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### イベント: 'menu-will-show'

戻り値:

* `event` Event

Emitted when `menu.popup()` is called.

#### イベント: 'menu-will-close'

戻り値:

* `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### インスタンスプロパティ

`menu` objects also have the following properties:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.

### インスタンスイベント

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## サンプル

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### メインプロセス

An example of creating the application menu in the main process with the simple template API:

```javascript
const { app, Menu } = require('electron')

const template = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
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
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
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
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
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
        click () { require('electron').shell.openExternalSync('https://electronjs.org') }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### レンダラープロセス

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](remote.md) module, and showing it when the user right clicks the page:

```html
<!-- index.html -->
<script>
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)
</script>
```

## macOS アプリケーションメニューについて

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### 標準メニュー

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### 標準メニューアイテムアクション

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### メインメニュー名

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## 特定のブラウザウインドウのメニューの設定 (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## メニューアイテムの位置

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - 指定したラベルの前にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。 また、与えられたメニューアイテムをそのアイテムと同じ「グループ」に配置する必要があることを意味します。
* `after` - 指定したラベルの後にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。 また、与えられたメニューアイテムをそのアイテムと同じ「グループ」に配置する必要があることを意味します。
* `beforeGroupContaining` - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの前に、そのグループの配置を宣言する手段を提供します。
* ` afterGroupContaining ` - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの後に、そのグループの配置を宣言する手段を提供します。

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### サンプル

Template:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Menu:

```sh
<br />- 1
- 2
- 3
- 4
```

Template:

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

Menu:

```sh
<br />- 3
- 4
- ---
- 1
- ---
- 2
```

Template:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menu:

```sh
<br />- ---
- 3
- 2
- 1
```