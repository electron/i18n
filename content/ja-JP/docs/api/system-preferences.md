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

### Event: 'inverted-color-scheme-changed' *Windows* *Deprecated*

戻り値:

* `event` Event
* `invertedColorScheme` Boolean - 反転配色 (明るいテキストと暗い背景のハイコントラスト配色) が使用されている場合は `true`、それ以外の場合は `false` です。

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

### Event: 'high-contrast-color-scheme-changed' *Windows* *Deprecated*

戻り値:

* `event` Event
* `highContrastColorScheme` Boolean - ハイコントラストテーマが使用されている場合は `true`、そうでない場合は `false` です。

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

## メソッド

### `systemPreferences.isDarkMode()` *macOS* *Windows* *Deprecated*

Returns `Boolean` - Whether the system is in Dark Mode.

**Note:** On macOS 10.15 Catalina in order for this API to return the correct value when in the "automatic" dark mode setting you must either have `NSRequiresAquaSystemAppearance=false` in your `Info.plist` or be on Electron `>=7.0.0`. See the [dark mode guide](../tutorial/mojave-dark-mode-guide.md) for more information.

**Deprecated:** Should use the new [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Returns `Boolean` - Whether the Swipe between pages setting is on.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `event` String
* `userInfo` Record<String, any>
* `deliverImmediately` Boolean (任意) - サブスクライブ中のアプリがアクティブでなくても通知をすぐに送信する場合は `true` です。

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

戻り値 `Number` - この登録のID。

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification. The `object` is the sender of the notification, and only supports `NSString` values for now.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

戻り値 `Number` - この登録のID。

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

Removes the subscriber with `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Record<String, String | Boolean | Number> - a dictionary of (`key: value`) user defaults

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - `string`、`boolean`、`integer`、`float`、`double`、`url`、`array` または `dictionary` にできます。

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
* `type` String - [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos) を参照してください。
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

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

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
    * `alternate-selected-control-text` - リストまたは表の選択された面のテキスト。
    * `control-background` - ブラウザやテーブルなど、大きなインターフェイス要素の背景。
    * `control` - コントロールの表面。
    * `control-text` - 無効にされていないコントロールのテキスト。
    * `disabled-control-text` - 無効になっているコントロールのテキスト。
    * `find-highlight` - 検索インジケーターの色。
    * `grid` - テーブルなどのインタフェース要素のグリッド線。
    * `header-text` - テーブル内のヘッダーセルのテキスト。
    * `highlight` - 画面上の仮想光源
    * `keyboard-focus-indicator` - インタフェースナビゲーションにキーボードを使用しているときに、現在フォーカスされているコントロールの周囲に表示されるリング。
    * `label` - 一次コンテンツを含むラベルのテキスト。
    * `link` - 他のコンテンツへのリンク。
    * `placeholder-text` - コントロールビューまたはテキストビューのプレースホルダ文字列。
    * `quaternary-label` - 透かしテキストなどの3次ラベルよりも重要度の低いラベルのテキスト。
    * `scrubber-textured-background` - タッチバーのスクラバーの背景。
    * `secondary-label` - 小見出しや追加情報を表すために使用されるラベルなど、通常のラベルよりも重要度の低いラベルのテキスト。
    * `selected-content-background` - キーウィンドウまたはビューで選択したコンテンツの背景。
    * `selected-control` - 選択したコントロールの表面
    * `selected-control-text` - 選択したコントロールのテキスト。
    * `selected-menu-item` - 選択されたメニューのテキスト
    * `selected-text-background` - 選択したテキストの背景
    * `selected-text` - 選択したテキスト
    * `separator` - コンテンツのさまざまなセクション間の区切り文字。
    * `shadow` - 画面上の隆起したオブジェクトによって投げかけられた仮想の影。
    * `tertiary-label` - 無効なテキストを表すために使用されるラベルなど、2次ラベルより重要度の低いラベルのテキスト。
    * `text-background` - テキストの背景
    * `text` - 文書内のテキスト
    * `under-page-background` - 文書のコンテンツの背景。
    * `unemphasized-selected-content-background` - 非キーウィンドウまたはビューで選択されているコンテンツ。
    * `unemphasized-selected-text-background` - 非キーウィンドウまたはビューで選択されているテキストの背景。
    * `unemphasized-selected-text` - 非キーウィンドウまたはビューで選択されているテキスト。
    * `window-background` - ウィンドウの背景
    * `window-frame-text` - ウィンドウのタイトルバー領域のテキスト。

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) and the [MacOS docs](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) for more details.

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

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for more details.

### `systemPreferences.isInvertedColorScheme()` *Windows* *Deprecated*

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` *macOS* *Windows* *Deprecated*

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Depreacted:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` *macOS*

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.

**[非推奨](modernization/property-updates.md)**

### `systemPreferences.getAppLevelAppearance()` *macOS* *Deprecated*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

**[非推奨](modernization/property-updates.md)**

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS* *Deprecated*

* `appearance` String | null - `dark` か `light` にできます

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

**[非推奨](modernization/property-updates.md)**

### `systemPreferences.canPromptTouchID()` *macOS*

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

**[非推奨](modernization/property-updates.md)**

### `systemPreferences.promptTouchID(reason)` *macOS*

* `reason` String - あなたが Touch ID 認証を求める理由

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

### `systemPreferences.isTrustedAccessibilityClient(prompt)` *macOS*

* `prompt` Boolean - 現在のプロセスが信頼できない場合にユーザにプロンプトで通知するかどうか。

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` か `camera`。

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `granted` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - 要求されるメディアのタイプで、`microphone`、`camera` にできます。

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it *must* be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

戻り値 `Object`:

* `shouldRenderRichAnimation` Boolean - リッチアニメーションをレンダリングする必要がある場合は true を返します。 セッションの種類 (例えばリモートデスクトップ) とアクセシビリティの設定を調べて、重いアニメーションのガイダンスを提供します。
* `scrollAnimationsEnabledBySystem` Boolean - スクロールアニメーション (例えばホームキーやエンドキーで生成されるもの) を有効にするかどうかがプラットフォームごとに決定されます。
* `prefersReducedMotion` Boolean - ユーザーがプラットフォーム API に基づいてモーションの削減を望むかどうかが決定されます。

Returns an object with system animation settings.

## プロパティ

### `systemPreferences.appLevelAppearance` *macOS*

A `String` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` *macOS* *Readonly*

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.