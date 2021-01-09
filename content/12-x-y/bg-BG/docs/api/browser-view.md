## Клас: BrowserView

> Създаване и контрол на изгледи.

Процеса: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Това е като дете прозорец, освен че е разположен спрямо основния му прозорец. Той е предназначен да бъде алтернатива на `webview` маркер.

### Пример

```javascript
// В процеса main.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([опции])` _Experimental_

* `options` Object (optional)
  * `webPreferences` Object (по избор) - виж [BrowserWindow](browser-window.md).

### Инстантни свойства

Обекти създадени с `new BrowserView` имат следните свойства:

#### `view.webContents` _Experimental_

Обект [`WebContents`](web-contents.md) собственост на този изглед.

### Инстантни методи

Обекти създадени с `new BrowserView` имат следните методи:

#### `view.setAutoResize(опции)` _Experimental_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Преоразмерява и премества изгледа към предоставените границите спрямо прозореца.

#### `view.getBounds()` _Experimental_

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
