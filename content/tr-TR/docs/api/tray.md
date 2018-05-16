## Sınıf: Tepsi

> Sistem bildirim alanına simgeler ve bağlam menüleri ekleyin.

İşlem: [Ana](../glossary.md#main-process)

`Tray` bir [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'dir.

```javascript
const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
```

**Platform sınırlamaları:**

* Linux'ta uygulama göstergesi destekleniyorsa kullanılacaktır, otherwise `GtkStatusIcon` will be used instead.
* Linux dağıtımlarında sadece uygulama göstergesi destegi vardir, tepsi ikonu için `libappindicator1` yüklenmelidir.
* Uygulama göstergesi yalnızca bağlam menüsü olduğunda gösterilir.
* Linux'ta uygulama göstergesi kullanıldığındathe `click` event is ignored.
* Linux'ta bağımsız `MenuItem`'a yapılan değişikliklerin etkili olabilmesi için `setContextMenu`'yü tekrar çağırmalısınız. Örneğin:

```javascript
const {app, Menu, Tray} = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
})
```

* Windows'ta en iyi görsel efektleri almak için `ICO` simgeler kullanılması önerilir.

Eğer diğer platformlarda da tamamen aynı davranışları sergilemeye devam etmek istiyorsan, `tık` olayına bağlı kalmamalısın ve her zaman bağlam menüsüne tepsi simgesi ile ekli kalmalısın.

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

Tray ile ilişkili yeni bir simge oluşturulur`image`.

### Örnek etkinlikler

`Tray` modülü aşağıdaki olayları yayar:

#### Olay: 'click'

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.
* `position` [Point](structures/point.md) - The position of the event.

Tray simgesi tıklandığında çıkar.

#### Event: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Tray simgesi sağ tıkladığında ortaya çıkar.

#### Event: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

Tray simgesi sağ tıkladığında tetiklenir.

#### Event: 'balloon-show' *Windows*

Tray balon gösterildiğinde ortaya çıkar.

#### Event: 'balloon-click' *Windows*

Tepsi balonu tıklandığında ortaya çıkar.

#### Event: 'balloon-closed' *Windows*

Zaman aşımı veya kullanıcı elle tepsinin balonu kapatıldığında ortaya çıkar kapatır.

#### Event: 'drop' *macOS*

Sürüklenen herhangi bir nesne tray simgesine düştüğünde ortaya çıkar.

#### Event: 'drop-files' *macOS*

* `event` Olay
* `files` String[] - Düşürülen dosyaların yolları.

Sürüklenen dosyalar yaydıklarında tray simgesine düşer.

#### Event: 'drop-text' *macOS*

* `event` Olay
* `text` String - the dropped text string.

Sürüklenen metin tepsi simgesine düştüğünde ortaya çıkar.

#### Event: 'drag-enter' *macOS*

Bir sürükleme işlemi tepsi simgesine girdiğinde ortaya çıkar.

#### Event: 'drag-leave' *macOS*

Bir sürükleme işlemi tepsi simgesinden çıktığında ortaya çıkar.

#### Event: 'drag-end' *macOS*

Bir sürükleme işlemi tepside bittiğinde veya başka bir yerde bittiğinde ortaya çıkar.

#### Event: 'mouse-enter' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Fare tepsi simgesine girdiğinde ortaya çıkar.

#### Event: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Fare tepsi simgesinden çıktığında ortaya çıkar.

#### Event: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse moves in the tray icon.

### Örnek Yöntemleri

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

```javascript
const {BrowserWindow, Tray} = require('electron')

const win = new BrowserWindow({width: 800, height: 600})
const tray = new Tray('/path/to/my/icon')

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})
```

#### `tray.displayBalloon(options)` *Windows*

* `seçenekler` Nesne 
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

[`Rectangle`](structures/rectangle.md) döndürür

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.