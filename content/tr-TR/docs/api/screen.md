# screen

> Ekran boyutu, ekranlar, imleç konumu vb. hakkında bilgi alın.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

`app` modülü `ready` yayınlanıncaya hazır olana kadar bu modülü kullanamazsınız.

`screen` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** Oluşturucu / DevTools'da `window.screen`, ayrılmış bir DOM özelliği olduğundan, `let {screen} = require('electron')` komutu çalışmaz.

Tüm ekranı kaplayan bir pencere oluşturmanın örneği:

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width, height})
  win.loadURL('https://github.com')
})
```

Harici ekranda bir pencere oluşturmanın bir diğer örneği:

```javascript
const electron = require('electron')
const {app, BrowserWindow} = require('electron')

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

## Etkinlikler

`ekran` modülü aşağıdaki olayları yayar:

### Etkinlik: 'görünüm-eklendi'

Dönüşler:

* `event` Event
* `newDisplay` [Display](structures/display.md)

`newDisplay` eklendiğinde ortaya çıkar.

### Olay: 'Görünüm-kaldırıldı'

Dönüşler:

* `olay` Olay
* `oldDisplay` [Display](structures/display.md)

`oldDisplay` kaldırıldığında yayılır.

### Etkinlik: 'display-metrics-changed'

Dönüşler:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Bir veya daha fazla metrik `display` değiştiğinde yayılıyor. `changedMetrics`, değişiklikleri açıklayan dizeler dizgisidir. Olası değişiklikler `bounds`, `workArea`, `scaleFactor` ve `rotation`'dir.

## Metodlar

`ekran` modülü aşağıdaki olayları içerir:

### `screen.getCursorScreenPoint()`

[`Point`](structures/point.md) geri alır

Fare işaretçisinin geçerli mutlak konumu.

### `screen.getMenuBarHeight()` *macOS*

Returns `Integer` - The height of the menu bar in pixels.

### `screen.getPrimaryDisplay()`

Returns [`Display`](structures/display.md) - The primary display.

### `screen.getAllDisplays()`

Returns [`Display[]`](structures/display.md) - An array of displays that are currently available.

### `screen.getDisplayNearestPoint(point)`

* `nokta` [Nokta](structures/point.md)

Returns [`Display`](structures/display.md) - The display nearest the specified point.

### `screen.getDisplayMatching(rect)`

* `dikdörtgen` [Dikdörtgen](structures/rectangle.md)

Returns [`Display`](structures/display.md) - The display that most closely intersects the provided bounds.