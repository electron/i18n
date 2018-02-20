## クラス: BrowserView

> Create and control views.

**Note:**BrowserView API は現在実験的な機能です。将来的に変更されたり削除されたりする可能性があります。

プロセス: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a `BrowserWindow`. It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

## サンプル

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

### `new BrowserView([options])` *Experimental*

* `options` Object (optional) 
  * `webPreferences` Object (optional) - See [BrowserWindow](browser-window.md).

### 静的メソッド

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

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