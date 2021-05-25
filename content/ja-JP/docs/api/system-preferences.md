# systemPreferences

> システムの環境設定を取得します。

プロセス: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## イベント

`systemPreferences` オブジェクトは以下のイベントを発生させます。

### イベント: 'accent-color-changed' _Windows_

戻り値:

* `event` Event
* `newColor` String - ユーザがシステムのアクセントカラーに割り当てる新しいRGBAカラー。

### イベント: 'color-changed' _Windows_

戻り値:

* `event` Event

### イベント: 'inverted-color-scheme-changed' _Windows_ _非推奨_

戻り値:

* `event` Event
* `invertedColorScheme` Boolean - 反転配色 (明るいテキストと暗い背景のハイコントラスト配色) が使用されている場合は `true`、それ以外の場合は `false` です。

**非推奨:** 新しく `nativeTheme` モジュールの [`updated`](native-theme.md#event-updated) イベントを使用する必要があります。

### イベント: 'high-contrast-color-scheme-changed' _Windows_ _非推奨_

戻り値:

* `event` Event
* `highContrastColorScheme` Boolean - ハイコントラストテーマが使用されている場合は `true`、そうでない場合は `false` です。

**非推奨:** 新しく `nativeTheme` モジュールの [`updated`](native-theme.md#event-updated) イベントを使用する必要があります。

## メソッド

### `systemPreferences.isDarkMode()` _macOS_ _Windows_ _非推奨_

戻り値 `Boolean` - システムがダークモードかどうか。

**非推奨:** 新しく [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API を使用する必要があります。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

戻り値 `Boolean` - ページ間をスワイプの設定がオンかどうか。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS_

* `event` String
* `userInfo` Record<String, any>
* `deliverImmediately` Boolean (任意) - サブスクライブ中のアプリがアクティブでなくても通知をすぐに送信する場合は `true` です。

macOS のネイティブ通知として `event` を送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` Record<String, any>

macOS のネイティブ通知として `event` を送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` Record<String, any>

macOS のネイティブ通知として `event` を送信します。 `userInfo` は、通知とともに送信されるユーザ情報辞書を含むオブジェクトです。

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

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

### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

戻り値 `Number` - この登録のID。

`subscribeNotification` と同じですが、ローカルデフォルトでは `NSNotificationCenter` を使用します。 これは、`NSUserDefaultsDidChangeNotification` などのイベントに必要です。

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

戻り値 `Number` - この登録のID。

`subscribeNotification` と同じですが、`NSWorkspace.sharedWorkspace.notificationCenter` を使用します。 これは `NSWorkspaceDidActivateApplicationNotification` といったイベントに必要です。

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

`id` の監視者を削除します。

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

`unsubscribeNotification` と同じですが、`NSNotificationCenter` から監視者を削除します。

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

`unsubscribeNotification` と同じですが、`NSWorkspace.sharedWorkspace.notificationCenter` から監視者を削除します。

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<String, String | Boolean | Number> - ユーザデフォルト (`key: value`) の辞書配列

アプリケーションの `NSUserDefaults` へ指定したデフォルトを追加します。

### `systemPreferences.getUserDefault(key, type)` _macOS_

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

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` String - `string`、`boolean`、`integer`、`float`、`double`、`url`、`array`、`dictionary` のいずれかにできます。
* `value` String

`NSUserDefaults` 内の `key` の値を設定します。

`type` は `value` の実際の型と一致する必要があります。 そうでない場合は例外が送出されます。

いくつかの一般的な `key` と `value` は以下です。

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

`NSUserDefaults` 内のその `key` を削除します。 これは、以前に `setUserDefault`で設定された `key` のデフォルトまたはグローバル値を復元するために使用できます。

### `systemPreferences.isAeroGlassEnabled()` _Windows_

戻り値 `Boolean` - [DWM Composition][dwm-composition] (Aero Glass) が有効な場合は `true`、それ以外は `false`。

透明なウィンドウを作成するかどうかを決定するためにこのメソッドを使用する例です (透明なウィンドウは、DWM Composition が無効のときは正しく動作しません)。

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
const browserOptions = { width: 1000, height: 800 }

// Windowを透明にする。ただしプラットフォームがサポートしている場合に限る。
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// windowを作成します。
const win = new BrowserWindow(browserOptions)

// 移動します。
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // 透明化がないので、基本的なスタールを使用するフォールバックを読み込む。
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` _Windows_ _macOS_

戻り値 `String` - RGBA の16進数形式で、ユーザの現在のシステム全体のアクセント色の設定を表します。

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

この API は macOS 10.14 Mojave 以降でのみ利用可能です。

### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` String - 以下の値のいずれか。
  * **Windows** の場合:
    * `3d-dark-shadow` - 3D 表示要素の暗い影の色。
    * `3d-face` - 3D 表示要素とダイアログボックスの背景の表面の色。
    * `3d-highlight` - 3D 表示要素のハイライト色。
    * `3d-light` - 3D 表示要素の光源色。
    * `3d-shadow` - 3D 表示要素の影の色。
    * `active-border` - アクティブなウインドウの縁の色。
    * `active-caption` - アクティブなウインドウのタイトルバーの色。 グラデーション効果が有効な場合は、その左側の色になります。
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
    * `inactive-caption` - 非アクティブなウインドウのタイトルバーの色。 グラデーション効果が有効な場合は、その左側の色になります。
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
  * **macOS** の場合
    * `alternate-selected-control-text` - リストまたは表の選択された面のテキスト。 _非推奨_
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
    * `placeholder-text` -  コントロールビューまたはテキストビューのプレースホルダ文字列。
    * `quaternary-label` - 透かしテキストなどの3次ラベルよりも重要度の低いラベルのテキスト。
    * `scrubber-textured-background` - タッチバーのスクラバーの背景。
    * `secondary-label` - 小見出しや追加情報を表すために使用されるラベルなど、通常のラベルよりも重要度の低いラベルのテキスト。
    * `selected-content-background` - キーウィンドウまたはビューで選択したコンテンツの背景。
    * `selected-control` - 選択したコントロールの表面
    * `selected-control-text` - 選択したコントロールのテキスト。
    * `selected-menu-item-text` - 選択されたメニューのテキスト
    * `selected-text-background` - 選択したテキストの背景
    * `selected-text` - 選択したテキスト
    * `separator` - コンテンツのさまざまなセクション間の区切り文字。
    * `shadow` - 画面上の隆起したオブジェクトによって投げかけられた仮想の影。
    * `tertiary-label` - 無効なテキストを表すために使用されるラベルなど、2次ラベルより重要度の低いラベルのテキスト。
    * `text-background` - テキストの背景
    * `text` -  文書内のテキスト
    * `under-page-background` -  文書のコンテンツの背景。
    * `unemphasized-selected-content-background` - 非キーウィンドウまたはビューで選択されているコンテンツ。
    * `unemphasized-selected-text-background` - 非キーウィンドウまたはビューで選択されているテキストの背景。
    * `unemphasized-selected-text` - 非キーウィンドウまたはビューで選択されているテキスト。
    * `window-background` - ウィンドウの背景
    * `window-frame-text` - ウィンドウのタイトルバー領域のテキスト。

戻り値 `String` - RGB の16進数形式 (`#ABCDEF`) のシステム色の設定。 詳細は [Windows ドキュメント][windows-colors] 及び [macOS ドキュメント][macos-colors] をご参照ください。

次の色は macOS 10.14 でのみ使用可能です。`find-highlight`、`selected-content-background`、`separator`、`unemphasized-selected-content-background`、`unemphasized-selected-text-background`、`unemphasized-selected-text`。

### `systemPreferences.getSystemColor(color)` _macOS_

* `color` String - 以下の値のいずれか。
  * `blue`
  * `brown`
  * `gray`
  * `green`
  * `orange`
  * `pink`
  * `purple`
  * `red`
  * `yellow`

戻り値 `String` - `#RRGGBBAA` の形式の標準システムカラー。

「コントラストを上げる」や「透明度を下げる」など、鮮やかさやアクセシビリティ設定の変更に自動的に適応する標準のシステムカラーの1つを返します。 詳しくは、[Apple のドキュメント](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors)をご覧ください。

### `systemPreferences.isInvertedColorScheme()` _Windows_ _非推奨_

戻り値 `Boolean` - 反転配色 (明るいテキストと暗い背景のハイコントラスト配色) がアクティブの場合は `true`、それ以外の場合は `false` です。

**非推奨:** 新しく [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API を使用する必要があります。

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _非推奨_

戻り値 `Boolean` - ハイコントラストテーマがアクティブの場合は `true`、それ以外の場合は `false` です。

**非推奨:** 新しい [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API を使用するようにしてください。

### `systemPreferences.getEffectiveAppearance()` _macOS_

戻り値 `String` - `dark`、`light` か `unknown` になります。

[NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc) に割り当てられている、現在アプリケーションに適用されている macOS の外観設定を取得します。

### `systemPreferences.getAppLevelAppearance()` _macOS_ _非推奨_

戻り値 `String` | `null` - `dark`、`light` か `unknown` になります。

[NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc) に割り当てられている、アプリケーションに必要であることを宣言した macOS の外観設定を取得します。 この値を設定するには `setAppLevelAppearance` API が使用できます。

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _非推奨_

* `appearance` String | null - `dark` か `light` にできます

アプリケーションの外観設定を設定します。これはシステムデフォルトを上書きし、`getEffectiveAppearance` の値を上書きします。

### `systemPreferences.canPromptTouchID()` _macOS_

戻り値 `Boolean` - このデバイスが Touch ID を使用できるかどうか。

**注意:** この API は Sierra 10.12.2 より古い macOS システムでは `false` を返します。

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` String - あなたが Touch ID 認証を求める理由

戻り値 `Promise<void>` - ユーザが Touch ID で正常に認証された場合に実行されます。

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('You have successfully authenticated with Touch ID!')
}).catch(err => {
  console.log(err)
})
```

この API 自体はあなたのユーザーデータを保護しません。むしろ、あなたがそうしてもよいようにするメカニズムです。 ネイティブアプリでは、キーチェーンエントリに [アクセスコントロール定数](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) を、[`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) のように設定する必要があります。これを読み取ると、Touch ID の生体認証に自動的に同意するようになります。 これは `node-keytar` で暗号化キーを保存し、`promptTouchID()` の場合にのみそれを取得するように、[`node-keytar`](https://github.com/atom/node-keytar) を使用して実行されます。

**注意:** この API は Sierra 10.12.2 より古い macOS システムでは拒否された Promise になります。

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - 現在のプロセスが信頼できない場合にユーザにプロンプトで通知するかどうか。

戻り値 `Boolean` -現在のプロセスが信頼されたアクセシビリティクライアントである場合 `true` で、そうでない場合は `false` です。

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` String - `microphone`、`camera`、`screen` のいずれかにできます。

戻り値 `String` - `not-determined`、`granted`、`denied`、`restricted` か `unknown` になります。

macOS 10.13 High Sierra 以前では、このユーザーの同意は必要なかったので、このメソッドは常に `granted` を返します。 macOS 10.14 Mojave 以降では、`microphone` と `camera` へのアクセスに同意が必要です。 macOS 10.15 Catalina 以降では、`screen` へのアクセスに同意が必要です。

Windows 10 には、すべての win32 アプリケーションの `microphone` と `camera` へのアクセスを制御するグローバル設定があります。 これは `screen` と古いバージョンの Windows すべてのメディアタイプに対して常に `granted` を返します。

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - 要求されるメディアのタイプで、`microphone`、`camera` にできます。

戻り値 `Promise<Boolean>` - 許可された場合は `true` で、拒否された場合は `false` で解決する Promise。 無効な `mediaType` を渡した場合、Promise は reject されます。 アクセス要求が拒否されて後でシステム環境設定パネルを通して変更した場合、新しい権限の効果を得るためにアプリの再起動が必要です。 すでにアクセスを要求して拒否された場合、設定パネルを通して変更_しなければなりません_。警告はポップアップせずに Promise は現在のアクセス状態で解決します。

**重要:** この API を正しく活用するには、アプリの `Info.plist` ファイルに `NSMicrophoneUsageDescription` と `NSCameraUsageDescription` の文字列を[設定する必要があります](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc)。 これらのキーの値は許可ダイアログに使用され、許可要求の目的についてユーザーに適切に通知されます。 Electron のコンテキスト内でどのようにこれらを設定するのかについての更なる情報は、[Electron アプリケーション頒布](../tutorial/application-distribution.md#macos) を参照してください。

このユーザーの同意は macOS 10.14 Mojave まで必要ではなかったので、システムを 10.13 High Sierra 以下で実行している場合このメソッドは常に `true` を返します。

### `systemPreferences.getAnimationSettings()`

戻り値 `Object`:

* `shouldRenderRichAnimation` Boolean - リッチアニメーションをレンダリングする必要がある場合は true を返します。 セッションの種類 (例えばリモートデスクトップ) とアクセシビリティの設定を調べて、重いアニメーションのガイダンスを提供します。
* `scrollAnimationsEnabledBySystem` Boolean - スクロールアニメーション (例えばホームキーやエンドキーで生成されるもの) を有効にするかどうかがプラットフォームごとに決定されます。
* `prefersReducedMotion` Boolean - ユーザーがプラットフォーム API に基づいてモーションの削減を望むかどうかが決定されます。

システムアニメーション設定を持つオブジェクトを返します。

## プロパティ

### `systemPreferences.appLevelAppearance` _macOS_

`String` 型のプロパティです。`dark`、`light` か `unknown` にできます。 アプリケーションの macOS 外観設定を決定します。 これは [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc) の値に対応します。 これを設定すると、システムのデフォルトと `getEffectiveAppearance` の値が上書きされます。

設定可能な値は `dark` か `light` です。戻り値に取りうる値は `dark`、`light`、および `unknown`。

このプロパティは macOS 10.14 Mojave 以降でのみ利用可能です。

### `systemPreferences.effectiveAppearance` _macOS_ _読み出し専用_

`String` 型のプロパティです。`dark`、`light` か `unknown` にできます。

[NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc) に割り当てられている、現在アプリケーションに適用されている macOS の外観設定を返します。

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
