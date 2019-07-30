## Класс: BrowserView

> Создание и управление видами.

Процесс: [Основной](../glossary.md#main-process)

`BrowserView` может использоваться для встраивания дополнительного веб-контента в [`BrowserWindow`](browser-window.md). Это как дочернее окно, за исключением того, что оно позиционируется относительно его владельца окна. Он предназначен для того, чтобы быть альтернативой тега `webview`.

## Пример

```javascript
// В основном процессе.
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

### `new BrowserView([options])` *Экспериментально*

* `options` Object (опционально) 
  * `webPreferences` Объект (опционально) - Смотрите [BrowserWindow](browser-window.md).

### Статические методы

#### `BrowserView.getAllViews()`

Возвращает `BrowserView[]` - массив всех открытых BrowserView.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Возвращает `BrowserView | null` - BrowserView, который владеет данным `webContents` или `null`, если содержимое не принадлежит BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Возвращает `BrowserView` - вид, с заданным `id`.

### Свойства экземпляра

Объекты, созданные с помощью `new BrowserView`, имеют следующие свойства:

#### `view.webContents` *Экспериментально*

Объект [`WebContents`](web-contents.md), принадлежащий этому виду.

#### `view.id` *Экспериментально*

`Integer`, представляющий уникальный идентификатор вида.

### Методы экземпляра

Объекты, созданные с помощью `new BrowserView`, имеют следующие свойства:

#### `view.destroy()`

Немедленное закрытие вида, события `unload` и `beforeunload` не будут происходить для веб-страницы. После того, как Вы закончите с видом, вызовите эту функцию как можно скорее, чтобы освободить память и другие ресурсы.

#### `view.isDestroyed()`

Возвращает `Boolean` - был ли вид уничтожен.

#### `view.setAutoResize(options)` *Экспериментально*

* `options` Object 
  * `width` Boolean - если `true`, то ширина будет увеличиваться и уменьшаться вместе с окном. По умолчанию `false`.
  * `height` Boolean - если `true`, то высота будет увеличиваться и уменьшаться вместе с окном. По умолчанию `false`.
  * `horizontal` Boolean - If `true`, the view's x position and width will grow and shrink proportionly with the window. `false` by default.
  * `vertical` Boolean - If `true`, the view's y position and height will grow and shrink proportinaly with the window. `false` by default.

#### `view.setBounds(bounds)` *Экспериментально*

* `bounds` [Rectangle](structures/rectangle.md)

Изменяет и перемещает вид в предоставленные границы, относительно окна.

#### `view.setBackgroundColor(color)` *Экспериментально*

* `color` String - цвет вида `#aarrggbb` или `#argb`. Альфа-канал является опциональным.