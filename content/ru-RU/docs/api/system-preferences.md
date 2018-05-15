# systemPreferences

> Получение системных параметров.

Process: [Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## События

Объект `systemPreferences` включает следующие события:

### Событие: 'accent-color-changed' *Windows*

Возвращает:

* `event` Event
* `newColor` Строка - новый цвет RGBA, назначенный пользователем в качестве акцентного цвета.

### Событие: 'color-changed' *Windows*

Возвращает:

* `event` Event

### Событие: 'inverted-color-scheme-changed' *Windows*

Возвращает:

* `event` Event
* `invertedColorScheme ` Boolean - ` true `, если используется инвертированная цветовая схема, например, тема с высоким контрастом, ` false ` в противном случае.

## Методы

### `systemPreferences.isDarkMode()` *macOS*

Возвращает `Boolean` - если система в Ночном режиме.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Returns `Boolean` - Whether the Swipe between pages setting is on.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

Removes the subscriber with `id`.

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Возвращает `any` - Значение `key` в `NSUserDefaults`.

Самые популярные `key` и `type`:

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

Устанавливает значение `key` в `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Самые популярные `key` и `type`:

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

// Сделать окно прозрачным только когда платформа поддерживает это.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false 
}
// Создание окна.
let win = new BrowserWindow(browserOptions)

 // Навигация.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // Без прозрачности, значит мы загружаем резерв, использующий базовые стили.
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

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). Смотрите [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) для получения более подробной информации.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Возвращает ` Boolean ` - ` true `, если инвертированная цветовая схема, например тема с высоким контрастом, активна, ` false ` в противном случае.