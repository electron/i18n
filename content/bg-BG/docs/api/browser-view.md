## Клас: BrowserView

> Създаване и контрол на изгледи.

**Забележка:** API на BrowserView в момента е експериментално и може да се промени или да бъде отстранено в бъдещо издание на Електрон.

Процеса: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Това е като дете прозорец, освен че е разположен спрямо основния му прозорец. Той е предназначен да бъде алтернатива на `webview` маркер.

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

Насила затваря изгледа, събитията `unload` и `beforeunload` няма да бъдат излъчени за уеб страницата. Когато сте готови с изгледа, извикайте тази функция, за да освободите памет и други ресурси възможно най-скоро.

#### `view.isDestroyed()`

Връща `Boolean` - Показва дали изгледа е унищожен.

#### `view.setAutoResize(options)` *Experimental*

* `опции` Object 
  * `width` Boolean - Ако е `true`, дължината на изгледа ще се разширява и смалява заедно с основния прозорец. По подразбиране не е `false`.
  * `height` Boolean - Ако е `true`, ширината на изгледа ще се разширява и смалява заедно с основния прозорец. По подразбиране не е `false`.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Преоразмерява и премества изгледа към предоставените границите спрямо прозореца.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Цвят в `#aarrggbb` или `#argb` формат. Алфа канала е задължителен.