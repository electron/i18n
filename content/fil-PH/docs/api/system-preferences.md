# systemPreferences

> Kuhanin ang mga kagustuhan ng sistema.

Proseso:[Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Mga event

Ang `systemPreferences` na object ay naglalabas ng sumusunod na mga pangyayari:

### Pangyayari: 'accent-color-changed' *Windows*

Ibinabalik ang:

* `event` na Pangyayari
* `newColor` na String - Ang bagong kulay ng RGBA na itinatakda ng tagagamit bilang kanilang pansistemang accent na kulay.

### Pangyayari: 'color-changed' *Windows*

Ibinabalik ang:

* `event` na Pangyayari

### Pangyayari: 'inverted-color-scheme-changed' *Windows*

Ibinabalik ang:

* `event` na Pangyayari
* `invertedColorScheme` na Boolean - `true` kapag ang isang binaliktad na pamamaraan ng pagkulay, tulad isang mataas na antas ng temang pangkontrast, ay ginagagami, `false` kapag hindi.

## Mga Pamamaraan

### `systemPreferences.isDarkMode()` *macOS*

Ibinabalik ang `Boolean` - Kapag ang sistema ay naka-Dark Mode.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Ibinabalik ang `Boolean` - Kung ang Swipe sa pagitan ng settiing ng mga pahina ay naka-on.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` na String
* `userInfo` na Object

Naglalathala ng isang `event` bilang natibong paalala ng macOS. Ang `userInfo` ay isang object na naglalaman ng mga diksyunaryong impormasyon ng tagagamit na ipadala kasama ang paalala.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` na String
* `userInfo` na Object

Inilalathala ang `event` bilang pansariling paalala ng macOS. Ang `userInfo` ay isang Object na naglalaman ng impormasyong diksyunaryo ng tagagamit na ipinapadala kasama ang paalala.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` na String
* `callback` Ang Function 
  * `event` na String
  * `userInfo` na Object

Nagsa-subscribe sa pansariling mga paalala ng macOS, ang `callback` ay tatawagin gamit ang `callback(event, userInfo)` kapag ang katumbas na `event` ay nangyayari. Ang `userInfo` ay isang Object na naglalaman ng impormasyong diksyunaryo ng tagagamit na ipinapadala kasama ang paalala.

Ang `id` ng nagsa-subscribe ay ibinabalik, pwede itong gamitin sa pag-unsubscribe sa `event`.

Sa ilalim ng hood, ang API na ito ay nagsa-subscribe sa `NSDistributedNotificationCenter`, ang mga halimbawang halaga ng `event` ay:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` na Integer

Tinatanggal ang nagsa-subscribe kasama ang `id`.

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` na String
* `callback` Function 
  * `event` na String
  * `userInfo` na Object

Kapareho ng `subscribeNotification`, pero gumagamit ng `NSNotificationCenter` para sa lokal na mga default. Kinakailangan ito para sa mga pangyayaring katulad ng `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` na Integer

Kapareho sa `unsubscribeNotification`, pero tinatanggal ang nagsa-subscribe mula sa `NSNotificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Ibinabalik ang `any` - Ang halaga ng `key` sa `NSUserDefaults`.

Ang ilang mga sikat na `key` at `type` ay:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` na String - Tinitingnan ang [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos].
* `value` na String

Itakda ang halaga ng `key` sa `NSUserDefaults`.

Tandaan na dapat tugma ang `type` sa akwal na uri ng `value`. Ang isang nabubukod ay ibinabato kapag hindi ito tugma.

Ang ilang mga sikat na `key` at `type` ay:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

Tinatanggal ang `key` sa `NSUserDefaults`. Maaari itong gamitin sa pagbabalik ng default o pangkalahatang halaga ng isang `key` na naitakda gamit ang `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Ibinabalik ang `Boolean` - `true` kapag ang [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) ay pinagana, at ang `false` kapag hindi.

Ang isang halimbawa ng paggamit nito sa pag-alam kung dapat bang maglikha ka ng isang transparent na window o hindi (ang mga transparent na window ay hindi gumagana nang maayos kapag ang DWM na komposisyon ay hindi pinagana):

```javascript
const {BrowserWindow, systemPreferences} = require('electron')
let browserOptions = {width: 1000, height: 800}

// Gawing transparent ang window kapang sinusuportahan lamang ito ng plataporma.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Nililikha ang window.
let win = new BrowserWindow(browserOptions)

// Mag-navigate.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // Walang transparency kaya, i-load natin ang isang fallback na gumagamit ng mga karaniwang istilo.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows*

Ibinabalik ang `String` - Ang kasulukuyang kagustuhang accent na kulay ng mga tagagamit sa buong sistema na anyong RGBA hexadecimal.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` Ang String - Isa sa sumusunod na mga halaga: 
  * `3d-dark-shadow` - ang madilim na anino para sa mga tatlong dimensyonal na mga elementong pang-display.
  * `3d-face` - kulay ng mukha para sa mga tatlong dimensyonal na elementong pang-display at para sa mga background ng dialog na kahon.
  * `3d-highlight` - kulay ng highlight para sa tatlong dimensyonal na mga elementong pang-display.
  * `3d-light` - Kulay ng ilaw para sa tatlong dimensyonal na mga elementong pang-display.
  * `3d-shadow` - kulay ng anino para sa tatlong dimensyonal na mga elementong pang-display.
  * `active-border` - Aktibong border ng window.
  * `active-caption` - Aktibong title bar ng window. Nagtatakda ng kaliwang bandang kulay sa kulay na gradient ng title bar ng isang aktibong window kapag ang gradient na epekto ay pinapagana.
  * `active-caption-gradient` - Kanang bandang kulay sa kulay na gradient ng tile bar ng isang aktibong window.
  * `app-workspace` - Kulay ng background ng multiple document interface (MDI) na mga aplikasyon.
  * `button-text` - Teksto sa mga push button.
  * `caption-text` - Teksto sa kapsyon, kahong pangsukat, at scroll bar na kahong pang-arrow.
  * `desktop` - Kulay ng background ng desktop.
  * `disabled-text` - Nakakulay gray (hindi pinapagana) na teksto.
  * `highlight` - Ang (mga) aytem na pinili sa isang kontrol.
  * `highlight-text` - Teksto ng (mga) aytem na pinili sa isang kontrol.
  * `hotlight` - Kulay para sa isang hyperlink o hot-tracked na aytem.
  * `inactive-border` - Hindi aktibong border ng window.
  * `inactive-caption` - Hindi aktibong kapsyon. Itinatakda ang kaliwang bandang kulay sa isang kulay na gradient ng title bar ng isang hindi aktibong window kapag pinapagana ang epektong gradient.
  * `inactive-caption-gradient` - Kanang bandang kulay sa kulay na gradient ng title bar ng isang hindi aktibong window.
  * `inactive-caption-text` - Kulay ng teksto sa isang hindi aktibong kapsyon.
  * `info-background` - Kulay ng background para sa mga kontrol ng tooltip.
  * `info-text` - Kulay ng teksto para sa mga kontrol ng tooltip.
  * `menu` - Background ng menu.
  * `menu-highlight` - Ang kulay na ginamit upang i-highlight ang mga aytem ng menu kung saan ang menu ay lumalabas bilang flat na menu.
  * `menubar` - Ang kulay ng background para sa menu bar kapag ang mga menu ay lumalabas bilang mga flat na menu.
  * `menu-text` - Teksto sa mga menu.
  * `scrollbar` - Kulay gray na lugar sa scroll bar.
  * `window` - Background ng Window.
  * `window-frame` - Frame ng window.
  * `window-text` - Teksto sa mga window.

Ibinabalik ang `String` - Ang setting ng pangsistemang kulay ay nasa anyong hexadecimal ng RGB (`#ABCDEF`). Tingan ang [mga doc ng Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) para sa karagdagang mga detalye.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Ibinabalik ang `Boolean` - `true` kapag ang binaliktad na pamamaraan sa pagkulay, katulad ng mataas na temang pangkontrast, ay aktibo, `false` kapag hindi.