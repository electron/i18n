## Class: BrowserView

> 建立和控制視景。

**注意:** BrowserView API 目前還在實驗中，將來的 Electron 裡可能還會變動或是被直接移除。

處理序: [主處理序](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a `BrowserWindow`. It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

## 範例

```javascript
// 在主處理序中.
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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([options])` *試驗中*

* `options` 物件 (選用) 
  * `webPreferences` Object (optional) - See [BrowserWindow](browser-window.md).

### 靜態方法

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### 物件屬性

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *試驗中*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *試驗中*

A `Integer` representing the unique ID of the view.

### 物件方法

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *試驗中*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *試驗中*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *試驗中*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.