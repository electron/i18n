## Клас: BrowserView

> Створюйте та керуйте виглядами.

**Примітка:** BrowserView API наразі є експериментальним і може бути зміненим чи видаленим з майбутніх версій Electron.

Процес: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). По муті він є дочірнім вікном, за винятком того, що позиціонується відносно батьківського вікна. Він покликаний бути альтернативою тегу `webview`.

## Приклад

```javascript
// В головному процесі.
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

### `new BrowserView([options])` *Експериментальний*

* `options` Object (опціонально) 
  * `webPreferences` Object (опціонально) - Дивись [BrowserWindow](browser-window.md).

### Статичні Методи

#### `BrowserView.getAllViews()`

Повертає `BrowserView[]` - Масив всіх відкритих BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Повертає `BrowserView | null` - BrowserView, який володіє переданим `webContents` чи `null`, якщо контент не належить BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Повертає `BrowserView` - Вигляд з отриманим `id`.

### Властивості Екземпляра

Об'єкт створений за допомогою `new BrowserView` має наступні властивості:

#### `view.webContents` *Експериментальна*

Об'єкт [`WebContents`](web-contents.md), яким володіє цей вигляд.

#### `view.id` *Експериментальна*

`Integer`, яке представляє унікальний ID вигляду.

### Методи Екземпляра

Об'єкт створений за допомогою `new BrowserView` має наступні методи:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *Експериментальний*

* `options` Object 
  * `width` Boolean - Якщо `true`, ширина вигляду буде збільшуватися і зменшуватися разом з вікном. `false` за замовчуванням.
  * `width` Boolean - Якщо `true`, висота вигляду буде збільшуватися і зменшуватися разом з вікном. `false` за замовчуванням.

#### `view.setBounds(bounds)` *Експериментальний*

* `bounds` [Rectangle](structures/rectangle.md)

Змінює розмір і рухає вигляд до переданої межі відносно вікна.

#### `view.setBackgroundColor(color)` *Експериментальний*

* `color` String - Колір у `#aarrggbb` чи `#argb` формі. Альфа канал є опціональним.