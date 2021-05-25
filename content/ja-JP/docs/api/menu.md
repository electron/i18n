# Menu

## クラス: Menu

> ネイティブアプリケーションのメニューとコンテキストメニューを作成します。

プロセス: [Main](../glossary.md#main-process)

### `new Menu()`

新しいメニューを作成します

### 静的メソッド

`Menu` クラスは以下の静的メソッドを持ちます。

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

macOS では、 `menu` をアプリケーションメニューとして設定します。 Windows と Linux では、 `menu` は各ウィンドウのトップメニューとして設定されます。

更に Windows と Linux では、最上位のアイテム名に `&` を使用して、アクセラレータを生成させるときに取得する文字を指定できます。 たとえば、ファイルメニューに `&File` を使用すると、その関連付けされたメニューを開く `Alt-F` アクセラレータが生成されます。 ボタンラベルでその指定をした文字には下線が引かれ、`&` 文字はボタンラベルに表示されません。

メニューアイテム名の `&` 文字をエスケープするには、`&` を続けて書きます。 例えば、`&&File` とするとボタンラベルに `&File` が表示されます。

`null` を渡すと、既定のメニューが表示されなくなります。 Windows と Linux では、さらにウィンドウからメニューバーを削除します。

**注:** アプリが何も設定しない場合は自動でデフォルトメニューが作成されます。 これは `ファイル`、`編集`、`表示`、`ウィンドウ`、`ヘルプ` のような標準のアイテムを含みます。

#### `Menu.getApplicationMenu()`

戻り値 `Menu | null` - セットされていれば menu を、そうでなければ `null` を返します。

**注:** 返される `Menu` のインスタンスは、メニューアイテムの動的な追加または削除をサポートしていません。 [インスタンス プロパティ](#instance-properties) は動的に変更ができます。

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

`action` をアプリケーションの最初のレスポンダーに送信します。 macOS メニューの既定の動作をエミュレートするために使用されます。 通常は [`MenuItem`](menu-item.md) の [`role`](menu-item.md#roles) プロパティを使用します。

macOSネイティブなアクションに関しては[macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)を参照してください。

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

戻り値 `Menu`

一般的に、`template` は [MenuItem](menu-item.md) を構築するための `options` の配列です。 使用方法は上記を参照できます。

`template` の要素に他のフィールドを付けることもでき、それらは構築されたメニューアイテムのプロパティになります。

### インスタンスメソッド

`menu` オブジェクトには以下のメソッドがあります。

#### `menu.popup([options])`

* `options` Object (任意)
  * `window` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。
  * `x` Number (任意) - 既定ではマウスカーソルの現在位置です。 `y` が宣言されている場合は宣言する必要があります。
  * `y` Number (任意) - 既定ではマウスカーソルの現在位置です。 `x` が宣言されている場合は宣言する必要があります。
  * `positioningItem` Number (任意) _macOS_ - マウスカーソルの位置に配置するメニューアイテムのインデックス。 既定値は -1 です。
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

戻り値 `MenuItem | null` - 指定した `id` のアイテム。

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

menu の `pos` の位置に `menuItem` を挿入します。

### インスタンスイベント

`new Menu` で作成されたオブジェクトまたは `Menu.buildFromTemplate` によって返されたオブジェクトは、以下のイベントが発生します。

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

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

以下は簡易テンプレート API でアプリケーションメニューを作成した例です。

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

### レンダープロセス (render process)

レンダラープロセスが起点となってメニューを作成するには、IPC を使用して必要な情報をメインプロセスに送信し、メインプロセスがレンダラーに代わってメニューを表示するようにします。

以下は、ユーザーがページを右クリックしたときにメニューを表示する例です。

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

## macOS アプリケーションメニューについて

macOS は、Windows 及び Linux とは全く異なるスタイルのアプリケーションメニューを持ちます。 ここでは、アプリのメニューをよりネイティブのようにする方法について、いくつかの注意点を示します。

### 標準メニュー

macOS ではシステムが定義する標準メニューがいくつかある。例えば、[`サービス`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) や`ウインドウ` メニューが該当する。 メニューを標準メニューにするには、メニューの `role` を次のいずれかに設定する必要があります。Electron はそれらを認識して標準メニューにします。

* `window`
* `help`
* `services`

### 標準メニューアイテムアクション

macOS はいくつかのメニューアイテムに、`About xxx` や `Hide xxx`、`Hide Others` といった標準アクションを提供しています。 メニューアイテムのアクションを標準アクションに設定するには、メニューアイテムの `role` 属性を設定する必要があります。

### メインメニュー名

macOS のアプリケーションメニューの最初のアイテムのラベルは、設定した名前に関係なく、アプリ名になります。 これを変えるには、アプリのバンドルの `Info.plist` ファイルを変更します。 より詳しくは、[情報プロパティリストファイルについて][AboutInformationPropertyListFiles] を参照して下さい。

## 特定のブラウザウィンドウのメニューの設定 (*Linux* *Windows*)

ブラウザウインドウの [`setMenu` メソッド][setMenu] は、特定のブラウザウインドウのメニューを設定できます。

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

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows
