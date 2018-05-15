# systemPreferences

> Sistem tercihlerini al.

İşlem: [Ana](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Etkinlikler

`systemPreferences` nesnesi aşağıdaki olayları yayar:

### Event: 'accent-color-changed' *Windows*

Dönüşler:

* `event` Olay
* `newColor` String - Kullanıcının sistemine atadığı yeni RGBA vurgu rengi.

### Event: 'color-changed' *Windows*

Dönüşler:

* `olay` Olay

### Event: 'inverted-color-scheme-changed' *Windows*

Dönüşler:

* `event` Event
* `invertedColorScheme` Boolean - Ters renk şeması yüksek kontrastlı bir tema gibi kullanılıyorsa `true`, kullanılmıyorsa değer `false` olacaktır.

## Metodlar

### `systemPreferences.isDarkMode()` *macOS*

Sistemin karanlık modda olup olmadığına dair `Boolean` döndürür.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Sayfalar arasında kaydırma ayarı açık olup olmadığına dair `Boolean` döndürür.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event`'ı macOS'un yerel bildirimleriymiş gibi gönderir. `userInfo` bildirimle birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir nesnedir.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event`'ı macOS'un yerel bildirimleriymiş gibi gönderir. `userInfo` bildirimle birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir nesnedir.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

İlgili `event` gerçekleştiğinde MacOS'un yerel bildirimlerine abone olup `callback`, `callback(event, userInfo)` ile beraber çağırılmış olacak. `userInfo` bildirim ile birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir objedir.

`event`'ın aboneliğini iptal etmek için kullanılabilecek abonenin `id`'sini döndürür.

Bu başlığının altında API `NSDistributedNotificationCenter`'e abone olur, `event`'ın örnek değerleri şöyledir:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` tamsayı

Aboneyi `id` ile kaldırır.

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` tamsayı

`unsubscribeNotification` gibidir fakat aboneyi `NSNotificationCenter`'den çıkarır.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Returns `any` - The value of `key` in `NSUserDefaults`.

Some popular `key` and `type`s are:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` String - See [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos].
* `value` String

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Returns `Boolean` - `true` if [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

```javascript
const {BrowserWindow, systemPreferences} = require('electron')
let browserOptions = {width: 1000, height: 800}

// Pencereyi sadece platform destekliyorsa şeffaf yapın.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Pencere yaratın.
let win = new BrowserWindow(browserOptions)

// Yönlendirme.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // Şeffaflık yok, bu nedenle temel stilleri kullanan bir geri yükleme yüklüyoruz.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows*

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` String - One of the following values: 
  * `3d-dark-shadow` - Dark shadow for three-dimensional display elements.
  * `3d-face` - Face color for three-dimensional display elements and for dialog box backgrounds.
  * `3d-highlight` - Highlight color for three-dimensional display elements.
  * `3d-light` - Light color for three-dimensional display elements.
  * `3d-shadow` - Shadow color for three-dimensional display elements.
  * `active-border` - Active window border.
  * `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
  * `active-caption-gradient` - Right side color in the color gradient of an active window's title bar.
  * `app-workspace` - Background color of multiple document interface (MDI) applications.
  * `button-text` - Text on push buttons.
  * `caption-text` - Text in caption, size box, and scroll bar arrow box.
  * `desktop` - Desktop background color.
  * `disabled-text` - Grayed (disabled) text.
  * `highlight` - Item(s) selected in a control.
  * `highlight-text` - Text of item(s) selected in a control.
  * `hotlight` - Color for a hyperlink or hot-tracked item.
  * `inactive-border` - Inactive window border.
  * `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
  * `inactive-caption-gradient` - Right side color in the color gradient of an inactive window's title bar.
  * `inactive-caption-text` - Color of text in an inactive caption.
  * `info-background` - Background color for tooltip controls.
  * `info-text` - Text color for tooltip controls.
  * `menu` - Menu background.
  * `menu-highlight` - The color used to highlight menu items when the menu appears as a flat menu.
  * `menubar` - The background color for the menu bar when menus appear as flat menus.
  * `menu-text` - Text in menus.
  * `scrollbar` - Scroll bar gray area.
  * `window` - Window background.
  * `window-frame` - Window frame.
  * `window-text` - Text in windows.

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) for more details.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Returns `Boolean` - `true` if an inverted color scheme, such as a high contrast theme, is active, `false` otherwise.