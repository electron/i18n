## クラス: Menu

> ネイティブアプリケーションのメニューとコンテキストメニューを作成します。

プロセス: [Main](../glossary.md#main-process)

### `new Menu()`

新しいメニューを作成します

### 静的メソッド

`Menu`クラスは以下の静的メソッドを持ちます。

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu

macOSではアプリケーション メニューとして `menu` を設定します。Windows と Linuxでは、`menu` は各ウィンドウの上部のメニューとして設定されます。

`null`を渡すと、Windows、Linuxではメニューバーを削除しますが、macOSでは何も影響を与えません。

**注:**このAPIは`app`モジュールの`ready`イベントの後に呼び出されます。

#### `Menu.getApplicationMenu()`

Returns `Menu` - The application menu, if set, or `null`, if not set.

**注釈:** 返される `Menu` のインスタンスは、メニューアイテムの動的な追加または削除をサポートしていません。 [インスタンス プロパティ](#instance-properties) は動的に変更ができます。

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

`action` をアプリケーションの最初のレスポンダーに送信します。 macOS メニューの既定の動作をエミュレートするために使用されます。 通常 [`MenuItem`](menu-item.md) の [`roll`](menu-item.md#roles) プロパティのみを使用します。

macOSネイティブなアクションに関しては[macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)を参照してください。

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

戻り値 `Menu`

一般的に、`template` は [MenuItem](menu-item.md) を構築するための `options` の配列です。上記の使用方法を参照できます。

`template` の要素に他のフィールドを付けることもでき、それらは構築されたメニューアイテムのプロパティになります。

### インスタンスメソッド

`menu` オブジェクトには以下のメソッドがあります。

#### `menu.popup([browserWindow, options])`

* `browserWindow` BrowserWindow (任意) - 省略値はフォーカス中のウインドウ。
* `options` Object (任意) 
  * `x` Number (任意) - デフォルトはマウスカーソルの位置。`y` が宣言されている場合はこれを宣言しなければいけない。
  * `y` Number (任意) - デフォルトはマウスカーソルの位置。`x` が宣言されている場合はこれを宣言しなければいけない。
  * `async` Boolean (任意) - `true` にすると即座にメソッドを抜け、`false` にするとメニューが選択されたか閉じた後に処理が戻る。 省略値は `false` 。
  * `positioningItem` Number (任意) *macOS* - マウスカーソルの位置に配置するメニューアイテムのインデックス。省略値は -1。

この menu を `browserWindow` 内のコンテキストメニューとしてポップアップします。

#### `menu.closePopup([browserWindow])`

* `browserWindow` BrowserWindow (任意) - 省略値はフォーカス中のウインドウ。

`browserWindow` 内のこのコンテキストメニューを閉じます。

#### `menu.append(menuItem)`

* `menuItem` MenuItem

menu に `menuItem` を追加します。

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` MenuItem

Inserts the `menuItem` to the `pos` position of the menu.

### インスタンスプロパティ

`menu` objects also have the following properties:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.

## サンプル

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### メインプロセス (main process)

An example of creating the application menu in the main process with the simple template API:

```javascript
const {app, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### レンダープロセス (render process)

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](remote.md) module, and showing it when the user right clicks the page:

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
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

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### サンプル

Template:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

Menu:

    <br />- 1
    - 2
    - 3
    - 4
    - 5
    

Template:

```javascript
[
  {label: 'a', position: 'endof=letters'},
  {label: '1', position: 'endof=numbers'},
  {label: 'b', position: 'endof=letters'},
  {label: '2', position: 'endof=numbers'},
  {label: 'c', position: 'endof=letters'},
  {label: '3', position: 'endof=numbers'}
]
```

Menu:

    <br />- ---
    - a
    - b
    - c
    - ---
    - 1
    - 2
    - 3