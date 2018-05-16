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

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` na Integer

Kapareho sa `unsubscribeNotification`, pero tinatanggal ang nagsa-subscribe mula sa `NSNotificationCenter`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array`, `dictionary`

Returns `any` - The value of `key` in system preferences.

This API uses `NSUserDefaults` on macOS. Some popular `key` and `type`s are:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` String - See [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos]
* `value` String

Set the value of `key` in system preferences.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

This API uses `NSUserDefaults` on macOS. Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Returns `Boolean` - `true` if [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

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