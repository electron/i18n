## クラス: Menu

> ネイティブアプリケーションのメニューとコンテキストメニューを作成します。

プロセス: [Main](../glossary.md#main-process)

### `new Menu()`

新しいメニューを作成します

### 静的メソッド

`Menu` クラスは以下の静的メソッドを持ちます。

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

更に Windows と Linux では、最上位のアイテム名に `&` を使用して、アクセラレータを生成させるときに取得する文字を指定できます。 たとえば、ファイルメニューに `&File` を使用すると、その関連付けされたメニューを開く `Alt-F` アクセラレータが生成されます。 そのボタンラベルの指定された文字には下線が引かれます。 `&` 文字はボタンラベル上に表示されません。

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. これは `ファイル`、`編集`、`表示`、`ウィンドウ`、`ヘルプ` のような標準のアイテムを含みます。

#### `Menu.getApplicationMenu()`

戻り値 `Menu | null` - セットされていれば menu を、そうでなければ `null` を返します。

**Note:** The returned `Menu` instance doesn't support dynamic addition or removal of menu items. [インスタンス プロパティ](#instance-properties) は動的に変更ができます。

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

`action` をアプリケーションの最初のレスポンダーに送信します。 macOS メニューの既定の動作をエミュレートするために使用されます。 通常は [`MenuItem`](menu-item.md) の [`role`](menu-item.md#roles) プロパティを使用します。

macOSネイティブなアクションに関しては[macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)を参照してください。

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

戻り値 `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

`template` の要素に他のフィールドを付けることもでき、それらは構築されたメニューアイテムのプロパティになります。

### インスタンスメソッド

`menu` オブジェクトには以下のメソッドがあります。

#### `menu.popup([options])`

* `options` Object (optional)
  * `window` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (任意) - メニューが閉じたしたときに呼ばれます。

この menu を [`BrowserWindow`](browser-window.md) 内のコンテキストメニューとしてポップアップします。

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。

`browserWindow` 内のこのコンテキストメニューを閉じます。

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

menu に `menuItem` を追加します。

#### `menu.getMenuItemById(id)`

* `id` String

戻り値 `MenuItem` - 指定した `id` のアイテム。

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

menu の `pos` の位置に `menuItem` を挿入します。

### インスタンスイベント

`new Menu` で作成されたオブジェクトまたは `Menu.buildFromTemplate` によって返されたオブジェクトは、以下のイベントが発生します。

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### イベント: 'menu-will-show'

戻り値:

* `event` Event

`menu.popup()` が呼ばれたときに発生します。

#### イベント: 'menu-will-close'

戻り値:

* `event` Event

手動か `menu.closePopup()` でポップアップが閉じられたときに発生します。

### インスタンスプロパティ

`menu` オブジェクトには更に以下のプロパティがあります。

#### `menu.items`

menu のアイテムが入った配列 `MenuItem[]`。

それぞれの `Menu` は複数の [`MenuItem`](menu-item.md) で構成され、それぞれの `MenuItem` はサブメニューを持つことができます。

## サンプル

`Menu` クラスはメインプロセスでのみ有効ですが、[`remote`](remote.md) オブジェクトを介してレンダラープロセス内で使うこともできます。

### メインプロセス

シンプルなテンプレートAPIを使用して、メインプロセスでアプリケーションメニューを作成するサンプル。

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
    label: 'ファイル',
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

### レンダープロセス (render process)

以下はウェブページ (レンダープロセス) で [`remote`](remote.md) オブジェクトを用いて動的にメニューを作成し、ユーザがページを右クリックしたときに表示するサンプルです。

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

macOS ではシステムが定義する標準メニューがいくつかある。例えば、[`サービス`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) や`ウインドウ` メニューが該当する。 メニューを標準メニューにするには、メニューの `role` を次のいずれかに設定する必要があります。Electron はそれらを認識して標準メニューにします。

* `window`
* `help`
* `services`

### 標準メニューアイテムアクション

macOS はいくつかのメニューアイテムに、`About xxx` や `Hide xxx`、`Hide Others` といった標準アクションを提供しています。 メニューアイテムのアクションを標準アクションに設定するには、メニューアイテムの `role` 属性を設定する必要があります。

### メインメニュー名

macOS のアプリケーションメニューの最初のアイテムのラベルは、設定した名前に関係なく、アプリ名になります。 これを変えるには、アプリのバンドルの `Info.plist` ファイルを変更します。 より詳しくは、[情報プロパティリストファイルについて](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) を参照して下さい。

## Setting Menu for Specific Browser Window (*Linux* *Windows*)

ブラウザウインドウの [`setMenu` メソッド](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) は、特定のブラウザウインドウのメニューを設定できます。

## メニューアイテムの位置

`Menu.buildFromTemplate` でメニューを構築するとき、アイテムをどのように配置するかを制御するのに、`before`, `after`, `beforeGroupContaining`, `afterGroupContaining`, `id` が使用できます。

* `before` - 指定したラベルの前にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。 また、与えられたメニューアイテムをそのアイテムと同じ「グループ」に配置する必要があることを意味します。
* `after` - 指定したラベルの後にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。 また、与えられたメニューアイテムをそのアイテムと同じ「グループ」に配置する必要があることを意味します。
* `beforeGroupContaining` - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの前に、そのグループの配置を宣言する手段を提供します。
* ` afterGroupContaining ` - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの後に、そのグループの配置を宣言する手段を提供します。

デフォルトでは、指定された位置指定キーワードのうち1つも使用されていない限り、アイテムはテンプレートに存在する順序で挿入されます。

### サンプル

テンプレート:

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
- 1
- 2
- 3
- 4
```

テンプレート:

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
- 3
- 4
- ---
- 1
- ---
- 2
```

テンプレート:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menu:

```sh
- ---
- 3
- 2
- 1
```
