## Клас: BrowserView

> Създаване и контрол на изгледи.

**Забележка:** API на BrowserView в момента е експериментално и може да се промени или да бъде отстранено в бъдещо издание на Електрон.

Процеса: [Main](../glossary.md#main-process)

`BrowserView` може да се използва за вграждане на допълнителни уеб съдържание в `BrowserWindow`. Това е като дете прозорец, освен че е разположен спрямо основния му прозорец. Той е предназначен да бъде алтернатива на `webview` маркер.

## Пример

```javascript
// В процеса main.
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

### `new BrowserView([опции])` *Experimental*

* `опции` Object (по избор) 
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

#### `view.webContents` *Experimental*

Обект [`WebContents`](web-contents.md) собственост на този изглед.

#### `view.id` *Experimental*

`Integer` представляващ уникално ID на изгледа.

### Инстантни методи

Обекти създадени с `new BrowserView` имат следните методи:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *Experimental*

* `опции` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.