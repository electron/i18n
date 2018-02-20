## クラス: BrowserView

> ビューを作成したり、制御したりします。

**注:** 現在のところ、BrowserView APIは実験的な機能であり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。

プロセス: [Main](../glossary.md#main-process)

`BrowserView` は、`BrowserWindow` に追加のWebコンテンツを埋め込むのに使用することができます。 外側のウインドウを基準にして配置される点を除いて、子ウインドウのようなものです。 `webview` タグの代替となるものです。

## 例

```javascript
// メインプロセス
const {BrowserView, BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

let view = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` *実験的*

* `options` Object (任意) 
  * `webPreferences` Object (任意) - [BrowserWindow](browser-window.md) を参照してください。

### 静的メソッド

#### `BrowserView.getAllViews()`

戻り値 `BrowserView[]` - 開かれたすべてのBrowserViewの配列。

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### インスタンスプロパティ

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` (*実験的*)

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` (*実験的*)

A `Integer` representing the unique ID of the view.

### インスタンスメソッド

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` (*実験的*)

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` (*実験的*)

* `bounds` [Rectangle](structures/rectangle.md) 

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` (*実験的*)

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.