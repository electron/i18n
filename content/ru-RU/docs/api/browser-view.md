## Класс: BrowserView

> Создание и Управление видами.

**Примечание:** BrowserView API в настоящее время экспериментально и может измениться или быть удалено в будущих релизах Electron.

Процесс: [Main](../glossary.md#main-process)

`BrowserView` может использоваться для внедрения дополнительного веб-содержимого в `BrowserWindow`. Это как дочернее окно, за исключением того, что оно позиционируется относительно его владельца окна. Он предназначен для того, чтобы быть альтернативой тега `webview`.

## Пример

```javascript
// В основном процессе.
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

### `new BrowserView([options])` *Экспериментально*

* `options` Object (опиционально) 
  * `webPreferences` Объект (опционально) - см. [BrowserWindow](browser-window.md).

### Статические методы

#### `BrowserView.fromId(id)`

* `id` Integer

Возвращает `BrowserView` - вид с заданным `id`.

### Свойства экземпляра

Объекты, созданные с помощью `new BrowserView`, имеют следующие свойства:

#### `view.webContents` *Экспериментально*

Объект [`WebContents`](web-contents.md), принадлежащий этому виду.

#### `view.id` *Экспериментально*

`Integer`, представляющий уникальный идентификатор вида.

### Методы экземпляра

Объекты, созданные с помощью `new BrowserView`, имеют следующие свойства:

#### `view.setAutoResize(options)` *Экспериментально*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.