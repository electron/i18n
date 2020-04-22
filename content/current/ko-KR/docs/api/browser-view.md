## Class: BrowserView

> 뷰들을 생성하고 제어합니다.

프로세스: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

### 예시

```javascript
// 메인 프로세스에서.
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _실험적_

* `options` Object (optional)
  * `webPreferences` 객체 (optional) - [BrowserWindow](browser-window.md) 참조.

### 정적 메서드

#### `BrowserView.getAllViews()`

`BrowserView[]` 반환 - 열린 모든 BrowserViews 배열.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

`BrowserView` 반환 - `id`에 해당하는 뷰.

### Instance Properties (인스턴스 속성)

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` _Experimental_

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` _Experimental_

A `Integer` representing the unique ID of the view.

### 인스턴스 메서드

Objects created with `new BrowserView` have the following instance methods:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` _Experimental_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _실험적_

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.getBounds()` _실험적_

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _실험적_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
