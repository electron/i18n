# systemPreferences

> システムの環境設定を取得します。

プロセス: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
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
* `invertedColorScheme` Boolean - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, `false` otherwise.

### Event: 'high-contrast-color-scheme-changed' *Windows*

戻り値：

* `event` Event
* `highContrastColorScheme` Boolean - `true` if a high contrast theme is being used, `false` otherwise.

### イベント: 'appearance-changed' *macOS*

戻り値:

* `newAppearance` String - `dark` か `light`。

**注意:** このイベントはあなたが `startAppLevelAppearanceTrackingOS` を呼び出した後にのみ発生します。

## メソッド

### `systemPreferences.isDarkMode()` *macOS*

戻り値 `Boolean` - システムがダークモードかどうか。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

戻り値 `Boolean` - ページ間をスワイプの設定がオンかどうか。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `event` String
* `userInfo` Object
* `deliverImmediately` Boolean (optional) - `true` to post notifications immediately even when the subscribing app is inactive.

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

戻り値 `Number` - この登録のID。

対応する `event` が発生したときに、macOS のネイティブ通知を監視し、`callback` が `callback(event, userInfo)` で呼ばれます。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

`event` の登録を解除するために使用できる、監視者の `id` が返されます。

このAPIの下で、`NSDistributedNotificationCenter` に登録します。`event` の値の例は以下になります。

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

戻り値 `Number` - この登録のID。

`subscribeNotification` と同じですが、ローカルデフォルトでは `NSNotificationCenter` を使用します。これは、`NSUserDefaultsDidChangeNotification` などのイベントに必要です。

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

`subscribeNotification` と同じですが、`NSWorkspace.sharedWorkspace.notificationCenter` を使用します。 これは `NSWorkspaceDidActivateApplicationNotification` といったイベントに必要です。

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

`id` の監視者を削除します。

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

`unsubscribeNotification` と同じですが、`NSNotificationCenter` から監視者を削除します。

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Integer

`unsubscribeNotification` と同じですが、`NSWorkspace.sharedWorkspace.notificationCenter` から監視者を削除します。

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - ユーザデフォルト (`key: value`) の辞書配列 

アプリケーションの `NSUserDefaults` へ指定したデフォルトを追加します。

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - `string`、`boolean`、`integer`、`float`、`double`、`url`、`array` または `dictionary` にできます。

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
* `type` String - [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos) を参照してください。
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
const { BrowserWindow, systemPreferences } = require('electron')
let browserOptions = { width: 1000, height: 800 }

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

### `systemPreferences.getAccentColor()` *Windows* *macOS*

戻り値 `String` - RGBA の16進数形式で、ユーザの現在のシステム全体のアクセント色の設定を表します。

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` *Windows* *macOS*

* `color` String - 以下の値の一つ。 
  * On **Windows**: 
    * `3d-dark-shadow` - 3D 表示要素の暗い影の色。
    * `3d-face` - 3D 表示要素とダイアログボックスの背景の表面の色。
    * `3d-highlight` - 3D 表示要素のハイライト色。
    * `3d-light` - 3D 表示要素の光源色。
    * `3d-shadow` - 3D 表示要素の影の色。
    * `active-border` - アクティブなウインドウの縁の色。
    * `active-caption` - アクティブなウインドウのタイトルバー色。グラデーション効果が有効な場合は、その左側の色になります。
    * `active-caption-gradient` - アクティブなウィンドウのタイトルバーのグラデーション色における右側の色。
    * `app-workspace` - マルチドキュメントインターフェース (MDI) アプリケーションの背景色。
    * `button-text` - 押しボタンのテキスト色。
    * `caption-text` - キャプション、サイズボックス、スクロールバー、矢印ボックス内のテキスト色。
    * `desktop` - デスクトップ背景色。
    * `disabled-text` - グレーの (無効化された) テキスト色。
    * `highlight` - コントロール内で選択されたアイテム色。
    * `highlight-text` - コントロール内で選択されたアイテムのテキスト色。
    * `hotlight` - ハイパーリンクかホットトラックされたアイテムの色。
    * `inactive-border` - 非アクティブなウインドウの縁の色。
    * `inactive-caption` - 非アクティブなウインドウのキャプション色。グラデーション効果が有効な場合は、その左側の色になります。
    * `inactive-caption-gradient` - 非アクティブなウィンドウのタイトルバーのグラデーション色における右側の色。
    * `inactive-caption-text` - 非アクティブなキャプション内のテキストの色。
    * `info-background` - ツールチップコントロールの背景色。
    * `info-text` - ツールチップコントロールのテキスト色。
    * `menu` - メニューの背景色。
    * `menu-highlight` - メニューがフラットメニューとして表示されたときにメニュー項目をハイライト表示するために使用される色。
    * `menubar` - メニューがフラットメニューとして表示されたときのメニューの背景色。
    * `menu-text` - メニューのテキスト色。
    * `scrollbar` - スクロールバーのグレーの領域の色。
    * `window` - ウインドウの背景色。
    * `window-frame` - ウインドウフレームの色。
    * `window-text` - ウインドウ内のテキスト色。
  * On **macOS** 
    * `alternate-selected-control-text` - The text on a selected surface in a list or table.
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
    * `placeholder-text` - A placeholder string in a control or text view.
    * `quaternary-label` - The text of a label of lesser importance than a tertiary label such as watermark text.
    * `scrubber-textured-background` - The background of a scrubber in the Touch Bar.
    * `secondary-label` - The text of a label of lesser importance than a normal label such as a label used to represent a subheading or additional information.
    * `selected-content-background` - The background for selected content in a key window or view.
    * `selected-control` - The surface of a selected control.
    * `selected-control-text` - The text of a selected control.
    * `selected-menu-item` - The text of a selected menu.
    * `selected-text-background` - The background of selected text.
    * `selected-text` - Selected text.
    * `separator` - A separator between different sections of content.
    * `shadow` - The virtual shadow cast by a raised object onscreen.
    * `tertiary-label` - The text of a label of lesser importance than a secondary label such as a label used to represent disabled text.
    * `text-background` - Text background.
    * `text` - The text in a document.
    * `under-page-background` - The background behind a document's content.
    * `unemphasized-selected-content-background` - The selected content in a non-key window or view.
    * `unemphasized-selected-text-background` - A background for selected text in a non-key window or view.
    * `unemphasized-selected-text` - Selected text in a non-key window or view.
    * `window-background` - The background of a window.
    * `window-frame-text` - The text in the window's titlebar area. 

戻り値 `String` - RGB の16進数形式 (`#ABCDEF`) のシステム色の設定。 See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) and the [MacOS docs](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) for more details.

### `systemPreferences.getSystemColor(color)` *macOS*

* `color` String - 以下の値の一つ。 
  * `blue`
  * `brown`
  * `gray`
  * `green`
  * `orange`
  * `pink`
  * `purple`
  * `red`
  * `yellow`

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for more details.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

### `systemPreferences.isHighContrastColorScheme()` *Windows*

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

### `systemPreferences.getEffectiveAppearance()` *macOS*

戻り値 `String` - `dark`、`light` か `unknown` になります。

[NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc) に割り当てられている、現在アプリケーションに適用されている macOS の外観設定を取得します。

Electron が 10.14 SDK をターゲットにして構築されるまでは、アプリケーションの `effectiveAppearance`はデフォルトで 'light' になり、OS の設定は継承されません。 暫定的に、アプリケーションがOSの設定を継承するためには、アプリケーションの `Info.plist`の `NSRequiresAquaSystemAppearance` キーを `false` に設定する必要があります。 `electron-packager` または `electron-forge` を使用している場合は、`enableDarwinDarkMode` パッケージャーオプションを `true` に設定するだけです。 詳細については [Electron パッケージャー API](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) を参照してください

### `systemPreferences.getAppLevelAppearance()` *macOS*

戻り値 `String` | `null` - `dark`、`light` か `unknown` になります。

[NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc) に割り当てられている、アプリケーションに必要であることを宣言した macOS の外観設定を取得します。 この値を設定するには `setAppLevelAppearance` API が使用できます。

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS*

* `appearance` String | null - `dark` か `light` にできます

アプリケーションの外観設定を設定します。これはシステムデフォルトを上書きし、`getEffectiveAppearance` の値を上書きします。

### `systemPreferences.isTrustedAccessibilityClient(prompt)` *macOS*

* `prompt` Boolean - 現在のプロセスが信頼できない場合にユーザにプロンプトで通知するかどうか。

戻り値 `Boolean` -現在のプロセスが信頼されたアクセシビリティクライアントである場合 `true` で、そうでない場合は `false` です。

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` か `camera`。

戻り値 `String` - `not-determined`、`granted`、`denied`、`restricted` か `unknown` になります。

このユーザーの同意は macOS 10.14 Mojave まで必要ではなかったので、システムを 10.13 High Sierra 以下で実行している場合このメソッドは常に `granted` を返します。

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - 要求されるメディアのタイプで、`microphone`、`camera` にできます。

戻り値 `Promise<Boolean>` - 許可された場合は `true` で、拒否された場合は `false` で解決する Promise。 無効な `mediaType` を渡した場合、Promise は reject されます。 アクセス要求が拒否されて後でシステム環境設定パネルを通して変更した場合、新しい権限の効果を得るためにアプリの再起動が必要です。 すでにアクセスを要求して拒否された場合、設定パネルを通して変更*しなければなりません*。警告はポップアップせずに Promise は現在のアクセス状態で解決します。

**重要:** この API を正しく活用するには、アプリの `Info.plist` ファイルに `NSMicrophoneUsageDescription` と `NSCameraUsageDescription` の文字列を[設定する必要があります](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc)。 これらのキーの値は許可ダイアログに使用され、許可要求の目的についてユーザーに適切に通知されます。 Electron のコンテキスト内でどのようにこれらを設定するのかについての更なる情報は、[Electron アプリケーション頒布](https://electronjs.org/docs/tutorial/application-distribution#macos) を参照してください。

このユーザーの同意は macOS 10.14 Mojave まで必要ではなかったので、システムを 10.13 High Sierra 以下で実行している場合このメソッドは常に `true` を返します。