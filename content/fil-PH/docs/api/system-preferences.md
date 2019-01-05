# systemPreferences

> Kuhanin ang mga kagustuhan ng sistema.

Proseso:[Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
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

### Event: 'appearance-changed' *macOS*

Pagbabalik:

* `newAppearance` String - Can be `dark` or `light`

**NOTE:** This event is only emitted after you have called `startAppLevelAppearanceTrackingOS`

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

Naglalathala ng isang `event` bilang natibong paalala ng macOS. Ang `userInfo` ay isang object na naglalaman ng mga diksyunaryong impormasyon ng tagagamit na ipadala kasama ang paalala.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` na String
* `userInfo` na Object

Naglalathala ng isang `event` bilang natibong paalala ng macOS. Ang `userInfo` ay isang object na naglalaman ng mga diksyunaryong impormasyon ng tagagamit na ipadala kasama ang paalala.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` na String
* `callback` function 
  * `event` na String
  * `userInfo` na Object

Returns `Number` - The ID of this subscription

Nagsa-subscribe sa pansariling mga paalala ng macOS, ang `callback` ay tatawagin gamit ang `callback(event, userInfo)` kapag ang katumbas na `event` ay nangyayari. Ang `userInfo` ay isang Object na naglalaman ng impormasyong diksyunaryo ng tagagamit na ipinapadala kasama ang paalala.

Ang `id` ng nagsa-subscribe ay ibinabalik, pwede itong gamitin sa pag-unsubscribe sa `event`.

Sa ilalim ng hood, ang API na ito ay nagsa-subscribe sa `NSDistributedNotificationCenter`, ang mga halimbawang halaga ng `event` ay:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` na String
* `callback` Punsyon 
  * `event` na String
  * `userInfo` na Object

Returns `Number` - The ID of this subscription

Kapareho ng `subscribeNotification`, pero gumagamit ng `NSNotificationCenter` para sa lokal na mga default. Kinakailangan ito para sa mga pangyayaring katulad ng `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` na String
* `callback` Function 
  * `event` na String
  * `userInfo` na Object

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

Tinatanggal ang nagsa-subscribe kasama ang `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

Kapareho sa `unsubscribeNotification`, pero tinatanggal ang nagsa-subscribe mula sa `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

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
* `type` String - See [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
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
const { BrowserWindow, systemPreferences } = require('electron')
let browserOptions = { width: 1000, height: 800 }

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

### `systemPreferences.getEffectiveAppearance()` *macOS*

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.

### `systemPreferences.getAppLevelAppearance()` *macOS*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS*

* `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` *macOS*

* `prompt` Boolean - whether or not the user will be informed via prompt if the current process is untrusted.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` or `camera`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `granted` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it *must* be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.