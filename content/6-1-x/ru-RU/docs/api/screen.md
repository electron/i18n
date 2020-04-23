# screen

> Предоставляет информацию о размере экрана, дисплеях, позиции курсора.

Процесс: [Главный](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

`screen` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM property, so writing `let { screen } = require('electron')` will not work.

An example of creating a window that fills the whole screen:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

Другой пример создания окна на внешнем дисплее:

```javascript
const electron = require('electron')
const { app, BrowserWindow } = require('electron')

let win

app.on('ready', () => {
  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50
    })
    win.loadURL('https://github.com')
  }
})
```

## События

Объект `screen` имеет следующие события:

### Событие: 'display-added'

Возвращает:

* Событие типа `event`
* `newDisplay` [Display](structures/display.md)

Возникает при добавлении `newDisplay`.

### Событие: 'display-removed'

Возвращает:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Возникает при удалении `oldDisplay`.

### Событие: 'display-metrics-changed'

Возвращает:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Возникает при изменении одной или нескольких метрик в `display`. `changedMetrics` является массивом строк, описывающих изменения. Возможные изменения `bounds`, `workArea`, `scaleFactor` и `rotation`.

## Методы

Модуль `screen` имеет следующие методы:

### `screen.getCursorScreenPoint()`

Возвращает [`Point`](structures/point.md)

Текущее абсолютное положение указателя мыши.

### `screen.getPrimaryDisplay()`

Возвращает [`Display`](structures/display.md) - Основной дисплей.

### `screen.getAllDisplays()`

Возвращает [`Display[]`](structures/display.md) - Массив доступных в настоящее время дисплеев.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Возвращает [`Display`](structures/display.md) - Дисплей, ближайший к указанной точке.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Возвращает [`Display`](structures/display.md) - Дисплей, который наиболее близко пересекает заданные границы.

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Возвращает [`Point`](structures/point.md)

Преобразует физическую точку экрана в точку DIP экрана. Масштаб DPI выполняется относительно отображения, содержащего физическую точку.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Возвращает [`Point`](structures/point.md)

Преобразует точку DIP экрана в физическую точку экрана. Масштаб DPI выполняется относительно отображения, содержащего точку DIP.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Возвращает [`Rectangle`](structures/rectangle.md)

Преобразует физический прямоугольник экрана в DIP-прямоугольник экрана. Шкала DPI выполняется относительно дисплея, ближайшего к `window`. Если `window` равен нулю, то масштабирование будет производиться до ближайшего к `rect`.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Возвращает [`Rectangle`](structures/rectangle.md)

Преобразовывает DIP-прямоуголник экрана в физический прямоугольник экрана. Шкала DPI выполняется относительно дисплея, ближайшего к `window`. Если `window` равен нулю, то масштабирование будет производиться до ближайшего к `rect`.
