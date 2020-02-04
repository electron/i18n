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

### イベント: 'inverted-color-scheme-changed' *Windows* *非推奨*

戻り値:

* `event` Event
* `invertedColorScheme` Boolean - 反転配色 (明るいテキストと暗い背景のハイコントラスト配色) が使用されている場合は `true`、それ以外の場合は `false` です。

**非推奨:** 新しく `nativeTheme` モジュールの [`updated`](native-theme.md#event-updated) イベントを使用する必要があります。

### イベント: 'high-contrast-color-scheme-changed' *Windows* *非推奨*

戻り値:

* `event` Event
* `highContrastColorScheme` Boolean - ハイコントラストテーマが使用されている場合は `true`、そうでない場合は `false` です。

**非推奨:** 新しく `nativeTheme` モジュールの [`updated`](native-theme.md#event-updated) イベントを使用する必要があります。

## メソッド

### `systemPreferences.isDarkMode()` *macOS* *Windows* *非推奨*

戻り値 `Boolean` - システムがダークモードかどうか。

**注:** macOS 10.15 Catalina で "自動" ダークモード設定のときにこの API が正しい値を返すためには、`Info.plist` に `NSRequiresAquaSystemAppearance=false` があるか、Electron `>=7.0.0` である必要があります。 より詳しい情報については、[ダークモードガイド](../tutorial/mojave-dark-mode-guide.md) を参照してください。

**非推奨:** 新しく [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API を使用する必要があります。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

戻り値 `Boolean` - ページ間をスワイプの設定がオンかどうか。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `event` String
* `userInfo` Record<String, any>
* `deliverImmediately` Boolean (任意) - サブスクライブ中のアプリがアクティブでなくても通知をすぐに送信する場合は `true` です。

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Record<String, any>

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Record<String, any>

`event` を macOS のネイティブの通知として送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

戻り値 `Number` - この登録のID。

対応する `event` が発生したときに、macOS のネイティブ通知を監視し、`callback` が `callback(event, userInfo)` で呼ばれます。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。 `object` は通知の送信者であり、現時点では `NSString` の値のみをサポートしています。

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
  * `userInfo` Record<String, unknown>
  * `object` String

戻り値 `Number` - この登録のID。

`subscribeNotification` と同じですが、ローカルデフォルトでは `NSNotificationCenter` を使用します。これは、`NSUserDefaultsDidChangeNotification` などのイベントに必要です。

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

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

* `defaults` Record<String, String | Boolean | Number> - ユーザデフォルト (`key: value`) の辞書配列

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

この API は macOS 10.14 Mojave 以降でのみ利用可能です。

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
    * `alternate-selected-control-text` - The text on a selected surface in a list or table. *deprecated*
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
    * `selected-menu-item-text` - The text of a selected menu.
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

戻り値 `String` - RGB の16進数形式 (`#ABCDEF`) のシステム色の設定。 詳しくは、[Windows のドキュメント](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx)と [MacOS のドキュメント](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors)をご覧ください。

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

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

### `systemPreferences.isInvertedColorScheme()` *Windows* *非推奨*

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` *macOS* *Windows* *非推奨*

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Depreacted:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` *macOS*

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.

**[非推奨](modernization/property-updates.md)**

### `systemPreferences.getAppLevelAppearance()` *macOS* *非推奨*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

**[非推奨](modernization/property-updates.md)**

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS* *非推奨*

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

* `mediaType` String - Can be `microphone`, `camera` or `screen`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra or lower so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

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

### `systemPreferences.effectiveAppearance` *macOS* *読み出し専用*

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.