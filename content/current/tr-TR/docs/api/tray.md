## Sınıf: Tepsi

> Sistem bildirim alanına simgeler ve bağlam menüleri ekleyin.

İşlem: [Ana](../glossary.md#main-process)

`Tray` bir [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'dir.

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
```

__Platform sınırlamaları:__

* Linux'ta uygulama göstergesi destekleniyorsa kullanılacaktır, otherwise `GtkStatusIcon` will be used instead.
* Linux dağıtımlarında sadece uygulama göstergesi destegi vardir, tepsi ikonu için `libappindicator1` yüklenmelidir.
* Uygulama göstergesi yalnızca bağlam menüsü olduğunda gösterilir.
* Linux'ta uygulama göstergesi kullanıldığındathe `click` event is ignored.
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. Örneğin:

```javascript
const { app, Menu, Tray } = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
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

### Örnek Events

`Tray` modülü aşağıdaki olayları yayar:

#### Olay: 'click'

Döndürür:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Tray ikonunun sınırları.
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Tray simgesi tıklandığında çıkar.

#### Event: 'right-click' _macOS_ _Windows_

Dönüşler:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Tray ikonunun sınırları.

Tray simgesi sağ tıkladığında ortaya çıkar.

#### Event: 'double-click' _macOS_ _Windows_

Dönüşler:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Tray ikonunun sınırları.

Tray simgesi sağ tıkladığında tetiklenir.

#### Event: 'balloon-show' _Windows_

Tray balon gösterildiğinde ortaya çıkar.

#### Event: 'balloon-click' _Windows_

Tepsi balonu tıklandığında ortaya çıkar.

#### Event: 'balloon-closed' _Windows_

Zaman aşımı veya kullanıcı elle tepsinin balonu kapatıldığında ortaya çıkar kapatır.

#### Event: 'drop' _macOS_

Sürüklenen herhangi bir nesne tray simgesine düştüğünde ortaya çıkar.

#### Event: 'drop-files' _macOS_

Dönüşler:

* `event` Olay
* `files` String[] - Düşürülen dosyaların yolları.

Sürüklenen dosyalar yaydıklarında tray simgesine düşer.

#### Event: 'drop-text' _macOS_

Dönüşler:

* `event` Olay
* `text` String - Düşürülen yazı stringi.

Sürüklenen metin tepsi simgesine düştüğünde ortaya çıkar.

#### Event: 'drag-enter' _macOS_

Bir sürükleme işlemi tepsi simgesine girdiğinde ortaya çıkar.

#### Event: 'drag-leave' _macOS_

Bir sürükleme işlemi tepsi simgesinden çıktığında ortaya çıkar.

#### Event: 'drag-end' _macOS_

Bir sürükleme işlemi tepside bittiğinde veya başka bir yerde bittiğinde ortaya çıkar.

#### Event: 'mouse-enter' _macOS_

Dönüşler:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Fare tepsi simgesine girdiğinde ortaya çıkar.

#### Event: 'mouse-leave' _macOS_

Dönüşler:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Fare tepsi simgesinden çıktığında ortaya çıkar.

#### Event: 'mouse-move' _macOS_ _Windows_

Dönüşler:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - event'ın pozisyonu.

Fare tepsi simgesini hareket ettirdikçe ortaya çıkar.

### Örnek Metodlar

The `Tray` sınıfı aşağıdaki yöntemleri içerir:

#### `tray.destroy()`

Tepsi simgesini derhal imha eder.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Bu tepsi simgesiyle ilişkili `image` 'i ayarlar.

#### `tray.setPressedImage(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

MacOS üzerine basıldığında bu tepsi simgesiyle ilişkili `image`'i ayarlar.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Bu tepsi simgesinin üzerine gelen metni ayarlar.

#### `tray.setTitle(title)` _macOS_

* `title` String

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` _macOS_

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` Dizge
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. Varsayılan `true`'dur. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. Varsayılan `false`'dur. Maps to [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010).
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Varsayılan `false`'dur. Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

Bir tepsi balonunu görüntüler.

#### `tray.removeBalloon()` _Windows_

Removes a tray balloon.

#### `tray.focus()` _Windows_

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menü (İsteğe bağlı)
* `position` [Point](structures/point.md) (İsteğe bağlı) - Pop up pozisyonu.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

`position` yalnızca Windows'ta kullanılabilir ve varsayılan olarak (0, 0) değerindedir.

#### `tray.setContextMenu(menu)`

* `menu` Menü | boş

Bu simgenin bağlam menüsünü ayarlar.

#### `tray.getBounds()` _macOS_ _Windows_

[`Rectangle`](structures/rectangle.md) döndürür

`bounds` tepsi simgesinin `Object`' i olarak belirtilir.

#### `tray.isDestroyed()`

Returns `Boolean` - Tepsi simgesinin yok edilip edilmediği.
