## Клас: BrowserView

> Створюйте та керуйте виглядами.

Процес: [Main](../glossary.md#main-process)

`BrowserView` Може бути використаний для вставки додаткового веб контенту у [`BrowserWindow`](browser-window.md). По cуті він є дочірнім вікном, за винятком того, що позиціонується відносно батьківського вікна. Він покликаний бути альтернативою тегу `webview`.

### Приклад

```javascript
// В головному процесі.
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

### `new BrowserView([options])` _Експериментальний_

* `options` Object (optional)
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

#### `view.webContents` _Експериментальна_

Об'єкт [`WebContents`](web-contents.md), яким володіє цей вигляд.

#### `view.id` _Експериментальна_

`Integer`, яке представляє унікальний ID вигляду.

### Методи Екземпляра

Об'єкт створений за допомогою `new BrowserView` має наступні методи:

#### `view.destroy()`

Після примусового закриття view, події `unload` та `beforeunload` не будуть викликані. Після того як ви закінчили з view, викличіть функцію для того щоб звільнити пам'ять і інші ресурси тоді коли це стане можливим.

#### `view.isDestroyed()`

Повертає тип`Boolean`-Чи view закрито (True/False).

#### `view.setAutoResize(options)` _Експериментальний_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Експериментальний_

* `bounds` [Rectangle](structures/rectangle.md)

Змінює розмір і рухає вигляд до переданої межі відносно вікна.

#### `view.getBounds()` _Експериментальний_

Повертає [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Експериментальний_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
