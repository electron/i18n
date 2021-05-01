# BrowserView

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

## Класс: BrowserView

> Создание и управление видами.

Процесс: [Основной](../glossary.md#main-process)

### Пример

```javascript
// В основном процессе.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Экспериментально_

* `options` Object (опционально)
  * `webPreferences` Объект (опционально) - Смотрите [BrowserWindow](browser-window.md).

### Свойства экземпляра

Объекты, созданные с помощью `new BrowserView`, имеют следующие свойства:

#### `view.webContents` _Экспериментально_

Объект [`WebContents`](web-contents.md), принадлежащий этому виду.

### Методы экземпляра

Объекты, созданные с помощью `new BrowserView`, имеют следующие свойства:

#### `view.setAutoResize(options)` _Экспериментально_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. По умолчанию `false`.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. По умолчанию `false`.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. По умолчанию `false`.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. По умолчанию `false`.

#### `view.setBounds(bounds)` _Экспериментально_

* `bounds` [Rectangle](structures/rectangle.md)

Изменяет и перемещает вид в предоставленные границы, относительно окна.

#### `view.getBounds()` _Экспериментально_

Возвращает [`Rectangle`](structures/rectangle.md)

`bounds` этого экземпляра BrowserView как `Object`.

#### `view.setBackgroundColor(color)` _Экспериментально_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
