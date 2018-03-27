# systemPreferences

> システムの環境設定を取得します。

プロセス: [Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## イベント

`systemPreferences` オブジェクトは以下のイベントを発生させます。

### イベント: 'accent-color-changed' *Windows*

戻り値:

* `event` Event
* `newColor` String - ユーザがシステムのアクセントカラーに割り当てる新しいRGBAカラー。

### イベント: 'color-changed' *Windows*

戻り値:

* `event` Event

### イベント: 'inverted-color-scheme-changed' *Windows*

戻り値:

* `event` Event
* `invertedColorScheme` Boolean - ハイコントラストテーマなどの反転した配色が使用されている場合は `true`、そうでない場合は `false`。

## メソッド

### `systemPreferences.isDarkMode()` *macOS*

戻り値 `Boolean` - システムがダークモードかどうか。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

戻り値 `Boolean` - ページ間をスワイプの設定がオンかどうか。

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

対応する `event` が発生したときに、macOS のネイティブ通知を監視し、`callback` が `callback(event, userInfo)` で呼ばれます。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

`event` の登録を解除するために使用できる、監視者の `id` が返されます。

このAPIの下で、`NSDistributedNotificationCenter` に登録します。`event` の値の例は以下になります。

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

`id` の監視者を削除します。

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

`subscribeNotification` と同じですが、ローカルデフォルトでは `NSNotificationCenter` を使用します。これは、`NSUserDefaultsDidChangeNotification` などのイベントに必要です。

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

`unsubscribeNotification` と同じですが、`NSNotificationCenter` から監視者を削除します。

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - `string`、`boolean`、`integer`、`float`、`double`、`url`、`array`、`dictionary` にできます。

戻り値 `any` - `NSUserDefaults` 内の `key` の値。

いくつかの一般的な `key` と `value` は以下です。

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` String - [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos] を参照
* `value` String

`NSUserDefaults` 内の `key` の値を設定します。

`type` は `value` の実際の型と一致する必要があります。そうでない場合は例外がスローされます。

いくつかの一般的な `key` と `value` は以下です。

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

`NSUserDefaults` の `key` を削除します。 これは、以前に `setUserDefault`で設定された `key` のデフォルトまたはグローバル値を復元するために使用できます。

### `systemPreferences.isAeroGlassEnabled()` *Windows*

戻り値 `Boolean` - [DWM Composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) が有効な場合は `true`、それ以外は `false`。

透明なウィンドウを作成するかどうかを決定するためにこのメソッドを使用する例です (透明なウィンドウは、DWM Composition が無効のときは正しく動作しません)。

```javascript
const {BrowserWindow, systemPreferences} = require('electron')
let browserOptions = {width: 1000, height: 800}

// プラットフォームがサポートしている場合にのみウインドウを透明にする。
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// ウインドウを作成。
let win = new BrowserWindow(browserOptions)

// 移動。
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // 透明化がないので、基本的なスタールを使用するフォールバックを読み込む。
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows*

戻り値 `String` - RGBA の16進数形式で、ユーザの現在のシステム全体のアクセント色の設定を表します。

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` String - 以下の値の一つ。 
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