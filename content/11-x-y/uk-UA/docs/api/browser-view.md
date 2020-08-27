## Клас: BrowserView

> Створюйте та керуйте виглядами.

Процес: [Main](../glossary.md#main-process)

`BrowserView` Може бути використаний для вставки додаткового веб контенту у [`BrowserWindow`](browser-window.md). По cуті він є дочірнім вікном, за винятком того, що позиціонується відносно батьківського вікна. Він покликаний бути альтернативою тегу `webview`.

### Приклад

```javascript
// В головному процесі.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Експериментальний_

* `options` Object (optional)
  * `webPreferences` Object (опціонально) - Дивись [BrowserWindow](browser-window.md).

### Властивості Екземпляра

Об'єкт створений за допомогою `new BrowserView` має наступні властивості:

#### `view.webContents` _Експериментальна_

Об'єкт [`WebContents`](web-contents.md), яким володіє цей вигляд.

### Методи Екземпляра

Об'єкт створений за допомогою `new BrowserView` має наступні методи:

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
