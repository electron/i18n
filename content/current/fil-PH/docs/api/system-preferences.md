# systemPreferences

> Kuhanin ang mga kagustuhan ng sistema.

Proseso:[Pangunahi](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Mga event

Ang `systemPreferences` na object ay naglalabas ng sumusunod na mga pangyayari:

### Pangyayari: 'accent-color-changed' _Windows_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `newColor` na String - Ang bagong kulay ng RGBA na itinatakda ng tagagamit bilang kanilang pansistemang accent na kulay.

### Pangyayari: 'color-changed' _Windows_

Ibinabalik ang:

* `event` na Kaganapan

### Event: 'inverted-color-scheme-changed' _Windows_ _Deprecated_

Ibinabalik ang:

* `event` na Pangyayari
* `invertedColorScheme` Boolean - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, `false` otherwise.

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

### Event: 'high-contrast-color-scheme-changed' _Windows_ _Deprecated_

Ibinabalik ang:

* `kaganapan` kaganapan
* `highContrastColorScheme` Boolean - `true` if a high contrast theme is being used, `false` otherwise.

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

## Mga Pamamaraan

### `systemPreferences.isDarkMode()` _macOS_ _Windows_ _Deprecated_

Ibinabalik ang `Boolean` - Kapag ang sistema ay naka-Dark Mode.

**Note:** On macOS 10.15 Catalina in order for this API to return the correct value when in the "automatic" dark mode setting you must either have `NSRequiresAquaSystemAppearance=false` in your `Info.plist` or be on Electron `>=7.0.0`.  See the [dark mode guide](../tutorial/mojave-dark-mode-guide.md) for more information.

**Deprecated:** Should use the new [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

Ibinabalik ang `Boolean` - Kung ang Swipe sa pagitan ng settiing ng mga pahina ay naka-on.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS_

* `event` na String
* `userInfo` Record<String, any>
* `deliverImmediately` Boolean (optional) - `true` to post notifications immediately even when the subscribing app is inactive.

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` na String
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` na String
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` na String
* `callback` na Function
  * `event` na String
  * `userInfo` Record<String, unknown>
  * `object` String

Returns `Number` - The ID of this subscription

Nagsa-subscribe sa pansariling mga paalala ng macOS, ang `callback` ay tatawagin gamit ang `callback(event, userInfo)` kapag ang katumbas na `event` ay nangyayari. Ang `userInfo` ay isang Object na naglalaman ng impormasyong diksyunaryo ng tagagamit na ipinapadala kasama ang paalala. The `object` is the sender of the notification, and only supports `NSString` values for now.

Ang `id` ng nagsa-subscribe ay ibinabalik, pwede itong gamitin sa pag-unsubscribe sa `event`.

Sa ilalim ng hood, ang API na ito ay nagsa-subscribe sa `NSDistributedNotificationCenter`, ang mga halimbawang halaga ng `event` ay:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` na String
* `callback` na Function
  * `event` na String
  * `userInfo` Record<String, unknown>
  * `object` String

Returns `Number` - The ID of this subscription

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` na String
* `callback` na Function
  * `event` na String
  * `userInfo` Record<String, unknown>
  * `object` String

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Tinatanggal ang nagsa-subscribe kasama ang `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Kapareho sa `unsubscribeNotification`, pero tinatanggal ang nagsa-subscribe mula sa `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<String, String | Boolean | Number> - a dictionary of (`key: value`) user defaults

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` _macOS_

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

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` String - See [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
* `value` na String

Itakda ang halaga ng `key` sa `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Ang ilang mga sikat na `key` at `type` ay:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

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

### `systemPreferences.getAccentColor()` _Windows_ _macOS_

Ibinabalik ang `String` - Ang kasulukuyang kagustuhang accent na kulay ng mga tagagamit sa buong sistema na anyong RGBA hexadecimal.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` String - One of the following values:
  * On **Windows**:
    * `3d-dark-shadow` - ang madilim na anino para sa mga tatlong dimensyonal na mga elementong pang-display.
    * `3d-face` - kulay ng mukha para sa mga tatlong dimensyonal na elementong pang-display at para sa mga background ng dialog na kahon.
    * `3d-highlight` - kulay ng highlight para sa tatlong dimensyonal na mga elementong pang-display.
    * `3d-light` - Kulay ng ilaw para sa tatlong dimensyonal na mga elementong pang-display.
    * `3d-shadow` - kulay ng anino para sa tatlong dimensyonal na mga elementong pang-display.
    * `active-border` - Aktibong border ng window.
    * `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
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
    * `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
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
  * On **macOS**
    * `alternate-selected-control-text` - The text on a selected surface in a list or table. _deprecated_
    * `control-background` - The background of a large interface element, such as a browser or table.
    * `control` - The surface of a control.
    * `control-text` -The text of a control that isn’t disabled.
    * `disabled-control-text` - The text of a control that’s disabled.
    * `find-highlight` - The color of a find indicator.
    * `grid` - The gridlines of an interface element such as a table.
    * `header-text` - The text of a header cell in a table.
    * `highlight` - The virtual light source onscreen.
    * `keyboard-focus-indicator` - The ring that appears around the currently focused control when using the keyboard for interface navigation.
    * `label` - The text of a label containing primary content.
    * `link` - A link to other content.
    * `placeholder-text` -  A placeholder string in a control or text view.
    * `quaternary-label` - The text of a label of lesser importance than a tertiary label such as watermark text.
    * `scrubber-textured-background` - The background of a scrubber in the Touch Bar.
    * `secondary-label` - The text of a label of lesser importance than a normal label such as a label used to represent a subheading or additional information.
    * `selected-content-background` - The background for selected content in a key window or view.
    * `selected-control` - The surface of a selected control.
    * `selected-control-text` - The text of a selected control.
    * `selected-menu-item-text` - The text of a selected menu.
    * `selected-text-background` - The background of selected text.
    * `selected-text` - Selected text.
    * `separator` - A separator between different sections of content.
    * `shadow` - The virtual shadow cast by a raised object onscreen.
    * `tertiary-label` - The text of a label of lesser importance than a secondary label such as a label used to represent disabled text.
    * `text-background` - Text background.
    * `text` -  The text in a document.
    * `under-page-background` -  The background behind a document's content.
    * `unemphasized-selected-content-background` - The selected content in a non-key window or view.
    * `unemphasized-selected-text-background` - A background for selected text in a non-key window or view.
    * `unemphasized-selected-text` - Selected text in a non-key window or view.
    * `window-background` - The background of a window.
    * `window-frame-text` - The text in the window's titlebar area.

Ibinabalik ang `String` - Ang setting ng pangsistemang kulay ay nasa anyong hexadecimal ng RGB (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) and the [MacOS docs](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) for more details.

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` _macOS_

* `color` String - One of the following values:
  * `blue`
  * `brown`
  * `gray`
  * `green`
  * `orange`
  * `pink`
  * `purple`
  * `red`
  * `yellow`

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for  more details.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _Deprecated_

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _Deprecated_

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Depreacted:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` _macOS_

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

**[Deprecated](modernization/property-updates.md)**

### `systemPreferences.getAppLevelAppearance()` _macOS_ _Deprecated_

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

**[Deprecated](modernization/property-updates.md)**

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _Deprecated_

* `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

**[Deprecated](modernization/property-updates.md)**

### `systemPreferences.canPromptTouchID()` _macOS_

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` String - The reason you are asking for Touch ID authentication

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('You have successfully authenticated with Touch ID!')
}).catch(err => {
  console.log(err)
})
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on the their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - whether or not the user will be informed via prompt if the current process is untrusted.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` _macOS_

* `mediaType` String - Can be `microphone`, `camera` or `screen`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra or lower so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

Nagbabalik ng mga `bagay`:

* `shouldRenderRichAnimation` Boolean - Returns true if rich animations should be rendered. Looks at session type (e.g. remote desktop) and accessibility settings to give guidance for heavy animations.
* `scrollAnimationsEnabledBySystem` Boolean - Determines on a per-platform basis whether scroll animations (e.g. produced by home/end key) should be enabled.
* `prefersReducedMotion` Boolean - Determines whether the user desires reduced motion based on platform APIs.

Returns an object with system animation settings.

## Mga Katangian

### `systemPreferences.appLevelAppearance` _macOS_

A `String` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)
