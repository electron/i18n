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
* `invertedColorScheme` Boolean - 反転配色 (明るいテキストと暗い背景のハイコントラスト配色) が使用されている場合は `true`、それ以外の場合は `false` です。

### イベント: 'high-contrast-color-scheme-changed' *Windows*

戻り値：

* `event` Event
* `highContrastColorScheme` Boolean - ハイコントラストテーマが使用されている場合は `true`、そうでない場合は `false` です。

## メソッド

### `systemPreferences.isDarkMode()` *macOS*

戻り値 `Boolean` - システムがダークモードかどうか。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

戻り値 `Boolean` - ページ間をスワイプの設定がオンかどうか。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `event` String
* `userInfo` Object
* `deliverImmediately` Boolean (任意) - サブスクライブ中のアプリがアクティブでなくても通知をすぐに送信する場合は `true` です。

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

戻り値 `String` - RGB の16進数形式 (`#ABCDEF`) のシステム色の設定。 詳しくは、[Windows のドキュメント](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx)と [MacOS のドキュメント](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors)をご覧ください。

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

「コントラストを上げる」や「透明度を下げる」など、鮮やかさやアクセシビリティ設定の変更に自動的に適応する標準のシステムカラーの1つを返します。 詳しくは、[Apple のドキュメント](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors)をご覧ください。

### `systemPreferences.isInvertedColorScheme()` *Windows*

戻り値 `Boolean` - 反転配色 (明るいテキストと暗い背景のハイコントラスト配色) がアクティブの場合は `true`、それ以外の場合は `false` です。

### `systemPreferences.isHighContrastColorScheme()` *Windows*

戻り値 `Boolean` - ハイコントラストテーマがアクティブの場合は `true`、それ以外の場合は `false` です。

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

### `systemPreferences.canPromptTouchID()` *macOS*

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` *macOS*

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

### `systemPreferences.getAnimationSettings()`

戻り値 `Object`:

* `shouldRenderRichAnimation` Boolean - Returns true if rich animations should be rendered. Looks at session type (e.g. remote desktop) and accessibility settings to give guidance for heavy animations.
* `scrollAnimationsEnabledBySystem` Boolean - Determines on a per-platform basis whether scroll animations (e.g. produced by home/end key) should be enabled.
* `prefersReducedMotion` Boolean - Determines whether the user desires reduced motion based on platform APIs.

Returns an object with system animation settings.