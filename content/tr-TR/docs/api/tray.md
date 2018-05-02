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
* `bounds` [Rectangle](structures/rectangle.md) - Tray ikonunun sınırları.
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Tray simgesi tıklandığında çıkar.

#### Event: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Tray ikonunun sınırları.

Tray simgesi sağ tıkladığında ortaya çıkar.

#### Event: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Tray ikonunun sınırları.

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
* `text` String - Düşürülen yazı stringi.

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
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Fare tepsi simgesine girdiğinde ortaya çıkar.

#### Event: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Fare tepsi simgesinden çıktığında ortaya çıkar.

#### Olay: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Fare tepsi simgesini hareket ettirdikçe ortaya çıkar.

### Örnek Yöntemleri

The `Tray` sınıfı aşağıdaki yöntemleri içerir:

#### `tray.destroy()`

Tepsi simgesini derhal imha eder.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Bu tepsi simgesiyle ilişkili `image` 'i ayarlar.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

MacOS üzerine basıldığında bu tepsi simgesiyle ilişkili `image`'i ayarlar.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Bu tepsi simgesinin üzerine gelen metni ayarlar.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` Dizge - Aşağıdaki değerlerden biriyle vurgulama modunu seçin: 
  * `selection` - Tepsi simgesini tıklattığınızda ve bağlam menüsü açık olduğunda vurgulayın. Varsayılan budur.
  * `always` - Daima tepsi simgesini vurgulayın.
  * `never` - Asla tepsi simgesini vurgulamayın.

Tepsinin simge arka planı vurgulandığında (mavi renkte) ayarlar.

**Note:** pencere görünürlüğü değiştiğinde `'never'` ve `'always'` modları arasında geçiş yaparak [`BrowserWindow`](browser-window.md) ile `highlightMode` kullanabilirsiniz.

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
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı) -
  * `title` String
  * `content` Dizge

Bir tepsi balonunu görüntüler.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menü (İsteğe bağlı)
* `position` [Point](structures/point.md) (İsteğe bağlı) - Pop up pozisyonu.

Tepsi simgesininİçerik menüsünü açar. `menu` geçildiğinde, `menu` tepsi simgesi içerik menüsü yerine açılır.

`position` yalnızca Windows'ta kullanılabilir ve varsayılan olarak (0, 0) değerindedir.

#### `tray.setContextMenu(menu)`

* `menu` Menü

Bu simgenin bağlam menüsünü ayarlar.

#### `tray.getBounds()` *macOS* *Windows*

[`Rectangle`](structures/rectangle.md) döndürür

`bounds` tepsi simgesinin `Object`' i olarak belirtilir.

#### `tray.isDestroyed()`

Returns `Boolean` - Tepsi simgesinin yok edilip edilmediği.