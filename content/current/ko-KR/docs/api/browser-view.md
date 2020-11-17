## Class: BrowserView

> 뷰들을 생성하고 제어합니다.

프로세스: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

### 예시

```javascript
// 메인 프로세스에서.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _실험적_

* `options` Object (optional)
  * `webPreferences` 객체 (optional) - [BrowserWindow](browser-window.md) 참조.

### Instance Properties

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` _Experimental_

A [`WebContents`](web-contents.md) object owned by this view.

### Instance Methods (인스턴스 메소드)

Objects created with `new BrowserView` have the following instance methods:

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
