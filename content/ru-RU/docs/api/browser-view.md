# BrowserView

`BrowserView` может использоваться для встраивания дополнительного веб-контента в [`BrowserWindow`](browser-window.md). Это как дочернее окно, за исключением того, что оно позиционируется относительно его владельца окна. Он предназначен для того, чтобы быть альтернативой тега `webview`.

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
  * `width` Boolean (опционально) - если `true`, то ширина будет увеличиваться и уменьшаться вместе с окном. По умолчанию `false`.
  * `height` Boolean (опционально) - если `true`, то высота будет увеличиваться и уменьшаться вместе с окном. По умолчанию `false`.
  * `horizontal` Boolean (опционально) - если `true`, то положение по X и ширина будут увеличиваться и уменьшаться вместе с окном. По умолчанию `false`.
  * `vertical` Boolean (опционально) - если `true`, то положение по Y и высота будут увеличиваться и уменьшаться вместе с окном. По умолчанию `false`.

#### `view.setBounds(bounds)` _Экспериментально_

* `bounds` [Rectangle](structures/rectangle.md)

Изменяет и перемещает вид в предоставленные границы, относительно окна.

#### `view.getBounds()` _Экспериментально_

Возвращает [`Rectangle`](structures/rectangle.md)

`bounds` этого экземпляра BrowserView как `Object`.

#### `view.setBackgroundColor(color)` _Экспериментально_

* `color` String - цвет вида `#aarrggbb` или `#argb`. Альфа-канал является опциональным.
