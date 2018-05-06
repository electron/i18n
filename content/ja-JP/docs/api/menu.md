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

`null`を渡すと、Windows、Linuxではメニューバーを削除しますが、macOSでは何も影響を与えません。

**注:**このAPIは`app`モジュールの`ready`イベントの後に呼び出されます。

#### `Menu.getApplicationMenu()`

戻り値 `Menu | null` - セットされていれば menu を、そうでなければ `null` を返します。

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

#### `menu.popup(options)`

* `options` Object 
  * `window` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。
  * `x` Number (任意) - デフォルトはマウスカーソルの位置。`y` が宣言されている場合はこれを宣言しなければいけない。
  * `y` Number (任意) - デフォルトはマウスカーソルの位置。`x` が宣言されている場合はこれを宣言しなければいけない。
  * `positioningItem` Number (任意) *macOS* - マウスカーソルの位置に配置するメニューアイテムのインデックス。省略値は -1。
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

`new Menu` で作成されたオブジェクトでは以下のイベントが発生します。

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

### インスタンスイベント

`new Menu` で作成されたオブジェクトまたは `Menu.buildFromTemplate` によって返されたオブジェクトは、以下のイベントが発生します。

## サンプル

`Menu` クラスはメインプロセスでのみ有効ですが、[`remote`](remote.md) オブジェクトを介してレンダラープロセス内で使うこともできます。

### メインプロセス

シンプルなテンプレートAPIを使用して、メインプロセスでアプリケーションメニューを作成するサンプル。

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
        click () { require('electron').shell.openExternal('https://electronjs.org') }
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

  // 編集メニュー
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

  // ウインドウメニュー
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

### レンダラープロセス

以下はウェブページ (レンダープロセス) で [`remote`](remote.md) オブジェクトを用いて動的にメニューを作成し、ユーザがページを右クリックしたときに表示するサンプルです。

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 がクリックされた') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({window: remote.getCurrentWindow()})
}, false)
</script>
```

## macOS アプリケーションメニューについて

macOS は、Windows や Linux とは全く異なるスタイルのアプリケーションメニューです。ここにはあなたのアプリのメニューをよりネイティブにするための注意事項があります。

### 標準メニュー

macOS には、`サービス`や`ウインドウ`のような、いくつものシステム定義な標準メニューがあります。 メニューを標準メニューにするには、メニューの `role` を次のいずれかに設定する必要があります。Electron はそれらを認識して標準メニューにします。

* `window`
* `help`
* `services`

### 標準メニューアイテムアクション

macOS はいくつかのメニューアイテムに、`About xxx` や `Hide xxx`、`Hide Others` といった標準アクションを提供しています。 メニューアイテムのアクションを標準アクションに設定するには、メニューアイテムの `role` 属性を設定する必要があります。

### メインメニュー名

macOS のアプリケーションメニューの最初のアイテムのラベルは、設定した名前に関係なく、アプリ名になります。 これを変えるには、アプリのバンドルの `Info.plist` ファイルを変更します。 より詳しくは、[情報プロパティリストファイルについて](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) を参照して下さい。

## 特定のブラウザウインドウのメニューの設定 (*Linux* *Windows*)

ブラウザウインドウの [`setMenu` メソッド](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) は、特定のブラウザウインドウのメニューを設定できます。

## メニューアイテムの位置

`Menu.buildFromTemplate` でメニューを構築するとき、アイテムをどのように配置するかを制御するのに、`position` と `id` を使用できます。

`MenuItem` の `position` 属性は `[placement]=[id]` の形式を取っています。`placement` は `before`、`after`、`endof` のうちの一つで、`id` はアイテムがあるメニュー内の一意なIDです。

* `before` - このアイテムをIDが指すアイテムの前に挿入する。IDが指すアイテムが存在しない場合、アイテムはメニューの最後に挿入される。
* `after` - このアイテムをIDが指すアイテムの後に挿入する。IDが指すアイテムが存在しない場合、アイテムはメニューの最後に挿入される。
* `endof` - このアイテムを、IDが指すアイテムを含んでいる論理グループの最後に挿入する (グループは区切りアイテムによって作成される)。 指定されたアイテムが存在しない場合は、そのIDを持つ新しいセパレータグループが作成され、このアイテムがそのセパレータの後ろに挿入される。

アイテムが position で配置されると、新しく position で配置されるまで、他の配置されていないアイテムはそのアイテムの後ろに挿入されます。 なので、同じ位置にメニューアイテムのグループを配置したい場合は、先頭の position を指定するだけで構いません。

### サンプル

テンプレート:

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

```sh
<br />- 1
- 2
- 3
- 4
- 5
```

テンプレート:

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

```sh
<br />- ---
- a
- b
- c
- ---
- 1
- 2
- 3
```