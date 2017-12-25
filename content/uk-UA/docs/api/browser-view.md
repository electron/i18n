## Клас: BrowserView

> Створюйте та керуйте виглядами.

**Примітка:** BrowserView API наразі є експериментальним і може бути зміненим чи видаленим з майбутніх версій Electron.

Процес: [Main](../glossary.md#main-process)

`BrowserView` може бути використаний для вбудовування додаткового веб-контенту в `BrowserWindow`. По муті він є дочірнім вікном, за винятком того, що позиціонується відносно батьківського вікна. Він покликаний бути альтернативою тегу `webview`.

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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([options])` *Експериментальний*

* `options` Object (опціонально) 
  * `webPreferences` Object (опціонально) - Дивись [BrowserWindow](browser-window.md).

### Статичні Методи

#### `BrowserView.fromId(id)`

* `id` Integer

Повертає `BrowserView` - Вигляд з отриманим `id`.

### Властивості Екземпляра

Об'єкт створений за допомогою `new BrowserView` має наступні властивості:

#### `view.webContents` *Експериментальний*

Об'єкт [`WebContents`](web-contents.md), яким володіє цей вигляд.

#### `view.id` *Експериментальний*

`Integer`, яке представляє унікальний ID вигляду.

### Методи Екземпляра

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.