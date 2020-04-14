## Клас: BrowserView

> Създаване и контрол на изгледи.

Процеса: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Това е като дете прозорец, освен че е разположен спрямо основния му прозорец. Той е предназначен да бъде алтернатива на `webview` маркер.

## Пример

```javascript
// В процеса main.
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

### `new BrowserView([опции])` _Experimental_

* `options` Object (optional)
  * `webPreferences` Object (по избор) - виж [BrowserWindow](browser-window.md).

### Статични член функции

#### `BrowserView.getAllViews()`

Връща `[BrowserView]` - Масив с всички отворени BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Връща `BrowserView | null`-BrowserView, което притежава даден `webContents` или `null`, ако съдържанието не е собственост на BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Връща `BrowserView` - Изгледът на съответното `id`.

### Инстантни свойства

Обекти създадени с `new BrowserView` имат следните свойства:

#### `view.webContents` _Experimental_

Обект [`WebContents`](web-contents.md) собственост на този изглед.

#### `view.id` _Experimental_

`Integer` представляващ уникално ID на изгледа.

### Инстантни методи

Обекти създадени с `new BrowserView` имат следните методи:

#### `view.destroy()`

Насила затваря изгледа, събитията `unload` и `beforeunload` няма да бъдат излъчени за уеб страницата. Когато сте готови с изгледа, извикайте тази функция, за да освободите памет и други ресурси възможно най-скоро.

#### `view.isDestroyed()`

Връща `Boolean` - Показва дали изгледа е унищожен.

#### `view.setAutoResize(опции)` _Experimental_

* `options` Object
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean - If `true`, the view's x position and width will grow and shrink proportionly with the window. `false` by default.
  * `vertical` Boolean - If `true`, the view's y position and height will grow and shrink proportinaly with the window. `false` by default.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Преоразмерява и премества изгледа към предоставените границите спрямо прозореца.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
