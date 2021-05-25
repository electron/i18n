# systemPreferences

> 获取system preferences.

进程：[主进程](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## 事件

` systemPreferences ` 对象触发以下事件:

### Event: 'accent-color-changed' _Windows_

返回:

* `event` Event
* `newColor` String - 用户指定的新 RGBA 颜色作为系统偏好颜色.

### Event: 'color-changed' _Windows_

返回:

* `event` Event

### Event: 'inverted-color-scheme-changed' _Windows_ _Deprecated_

返回:

* `event` Event
* `invertedColorScheme` Boolean - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, `false` otherwise.

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

### Event: 'high-contrast-color-scheme-changed' _Windows_ _Deprecated_

返回:

* `event` Event
* `highContrastColorScheme` Boolean - `true` if a high contrast theme is being used, `false` otherwise.

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

## 方法

### `systemPreferences.isDarkMode()` _macOS_ _Windows_ _Deprecated_

返回`Boolean`，表示系统是否处于Dark模式

**已废弃：** 请使用新的 [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

返回值 `Boolean` - 是否在页面设置之间进行滑动。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS_

* `event` String
* `userInfo` Record<String, any>
* `deliverImmediately` Boolean (optional) - `true` to post notifications immediately even when the subscribing app is inactive.

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

返回 `Number` - 该订阅的 ID

订阅macOS的原生通知，当通信的 `event</ 0>发生时，将调用 <code>callback(event, userInfo)` 。 ` userInfo `是一个Object，它包含随通知一起发送的用户信息字典。 The `object` is the sender of the notification, and only supports `NSString` values for now.

返回订阅的 ` id `, 可用于取消该订阅的 `event`.

在这个API下订阅` NSDistributedNotificationCenter `， `event` 的示例值为：

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

返回 `Number` - 该订阅的 ID

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. 这对事件 `NSUserDefaultsDidChangeNotification` 是必需的。

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` Record<String, unknown>
  * `object` String

返回 `Number` - 该订阅的 ID

与 `subscribeNotification`一样, 但使用`NSWorkspace.sharedWorkspace.notificationCenter`。 这对事件 `NSWorkspaceDidActivateApplicationNotification` 是必需的。

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

使用 ` id ` 删除订阅。

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

与` unsubscribeNotification `相同，但将订户从` NSNotificationCenter `中删除。

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

与 `unsubscribeNotification` 一样，但是它从 `NSWorkspace.sharedWorkspace.notificationCenter` 中移除订阅者。

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<String, String | Boolean | Number> - a dictionary of (`key: value`) user defaults

在应用的`NSUserDefaults`配置项中添加其它默认设置。

### `systemPreferences.getUserDefault(key, type)` _macOS_

* `key` String
* `type` String - 可以为 `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` 或 `dictionary`.

返回 `any` - `NSUserDefaults` 中 `key` 的值.

常用的 `key` 和 `type` 的类型为:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.
* `value` String

设置 `NSUserDefaults` 中 `key` 的值.

请注意， `type` 应匹配实际类型的 `value`。 如果他们没有，就会抛出一个异常。

常用的 `key` 和 `type` 的类型为:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

删除 `NSUserDefaults`中的 `key` 。 可以用来恢复默认值或之前用 `setUserDefault` 为一个 `key` 设置的全局变量。

### `systemPreferences.isAeroGlassEnabled()` _Windows_

返回 `Boolean` - `true` 如果启用了 [DWM composition][dwm-composition] (Aero Glass), 否则为 `false`.

使用它来确定是否应创建透明窗口的示例 (当禁用 DWM 组合时, 透明窗口无法正常工作):

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
const browserOptions = { width: 1000, height: 800 }

// Make the window transparent only if the platform supports it.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Create the window.
const win = new BrowserWindow(browserOptions)

// Navigate.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // No transparency, so we load a fallback that uses basic styles.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` _Windows_ _macOS_

返回 `String` - 用户当前系统偏好颜色，RGBA 十六进制形式.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

此 API 仅在 macOS 10.14 Mojave 或更高版本上可用。

### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` String - One of the following values:
  * On **Windows**:
    * `3d-dark-shadow` - 三维显示元素的暗阴影。
    * `3d-face` - 面向三维显示元素和对话框背景的颜色。
    * `3d-highlight` - 三维显示元素的高亮色.
    * `3d-light` - 三维显示元素的亮色.
    * `3d-shadow` - 三维显示元素的阴影颜色.
    * `active-border` - 活动窗口边框。
    * `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
    * `active-caption-gradient` - 活动窗口标题栏的颜色渐变中的右侧颜色。
    * `app-workspace` - 多文档界面 (MDI) 应用程序的背景颜色。
    * `button-text` - 按钮上的文本。
    * `caption-text` - 标题，大小框和滚动条箭头框中的文本。
    * `desktop` - 桌面的背景色。
    * `disabled-text` - 灰色 (禁用的) 文字.
    * `highlight` - 在控件中选择的项目。
    * `highlight-text` - 在控件中选择的项目文本。
    * `hotlight` - 超链接或热追踪项目的颜色。
    * `inactive-border` - 非活动窗口边框。
    * `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
    * `inactive-caption-gradient` - 非活动窗口标题栏的颜色渐变中的右侧颜色。
    * `inactive-caption-text` - 非活动标题中的文字颜色。
    * `info-background` - 工具提示控件的背景颜色。
    * `info-text` - 工具提示控件的文本颜色。
    * `menu` - 菜单的背景色.
    * `menu-highlight` - 当菜单显示为平面菜单时用于突出显示菜单项的颜色。
    * `menubar` - 菜单显示为平面菜单时菜单栏的背景颜色。
    * `menu-text` - 菜单的文字.
    * `scrollbar` - 滚动条的灰色区域.
    * `window` - 窗口的背景色.
    * `window-frame` - 窗口框.
    * `window-text` - 窗口的文字。
  * On **macOS**
    * `alternate-selected-control-text` - The text on a selected surface in a list or table. _已废弃_
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

返回 `String` -系统颜色设置为RGB十六进制格式 (`#ABCDEF`). 更多详细信息请参阅 [Windows docs][windows-colors] 和 [macOS 文档][macos-colors]。

以下颜色仅在 macOS 10.14 上可用：`find-hightlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, 和 `unemphasized-selected-text`

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

返回 `String` - 标准系统颜色，格式为 `#RRGGBBAA`。

返回几个标准系统颜色之一，这些颜色可自动适应鲜艳度的变化并更改辅助功能设置，如"增加对比度"和"降低透明度"。 有关更多详细信息，请参阅[ apple 文档 ](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors)。

### `systemPreferences.isInvertedColorScheme()` _Windows_ _Deprecated_

返回 `Boolean` - 如果使用反转颜色方案(亮文字暗背景的高对比度主题) 则为`true`，否则为`false`。

**已废弃：** 请使用新的 [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API。

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _Deprecated_

返回 `Boolean` - 如果启用了高对比度主题为`true`，否则为`false`。

**已废弃：** 请使用新的 [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API。

### `systemPreferences.getEffectiveAppearance()` _macOS_

返回 `String` - 其值可能是 `dark`、`light` 或 `unknown`.

获取当前应用到你的程序上的 macOS 设置项，会映射到 [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _Deprecated_

返回 `String` | `null` - 其值可能为 `dark`、`light` 或 `unknown`。

获取您在macOS上为您的应用程序设置的外观，映射到[NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc)。 您可以使用 `setAppLevelAppearance` API 来设置此值。

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _Deprecated_

* `appearance` String | null - 可以是 `dark` 或 `light`

设定您的应用程序的外观设置，这应该覆盖系统默认值以及覆盖 `getEffectiveAppearance` 的值。

### `systemPreferences.canPromptTouchID()` _macOS_

返回 `Boolean` - 此设备是否有能力使用 Touch ID。

**注意：**在 macOS 系统的版本低于 Sierra 10.12.2时，此 API 将返回 `false` 。

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` String - The reason you are asking for Touch ID authentication

返回 `Promise<void>` - resolve如果用户已成功通过Touch ID授权。

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('You have successfully authenticated with Touch ID!')
}).catch(err => {
  console.log(err)
})
```

此 API 本身不会保护您的用户数据；相反，这是一个机制，让你这样做。 原生应用需要在其密钥链入口设置 [访问控制常量](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) ，如 [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) ，当应用读取到后将自动提示 Touch ID 生物识别许可。 该操作可以通过 [`node-keytar`](https://github.com/atom/node-keytar)完成，这样，应用就会用 `node-keytar` 存储加密密钥，并且只有在 `promptTouchID()` resolve时才能取出。

**注意：**在 macOS 系统的版本低于 Sierra 10.12.2时，此 API 返回的Promise将reject 。

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - whether or not the user will be informed via prompt if the current process is untrusted.

返回 `Boolean` - 如果当前进程是受信任的无障碍客户端，则为`true`，否则为 `false` 。

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` String - 可以是 `microphone`, `camera` 或 `screen`.

返回 `String` - 值可以是 `not-determined`， `granted`， `denied`， `restricted` 或 `unknown`。

在 macOS 10.13 High Sierra 或更低版本上不需要用户授权，因此此方法总是返回 `granted`。 macOS 10.14 Mojave 或更高版本需要授权访问 `麦克风` 和 `摄像头`。 macOS 10.15 Catalina 或更高版本需要授权访问 `屏幕`。

Windows 10的全局设置控制了所有win32 应用程序对 `麦克风` 和 `摄像头`的访问权限。 It will always return `granted` for `screen` and for all media types on older versions of Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](../tutorial/application-distribution.md#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

返回 ` Object `:

* `shouldRenderRichAnimation` Boolean - Returns true if rich animations should be rendered. Looks at session type (e.g. remote desktop) and accessibility settings to give guidance for heavy animations.
* `scrollAnimationsEnabledBySystem` Boolean - Determines on a per-platform basis whether scroll animations (e.g. produced by home/end key) should be enabled.
* `prefersReducedMotion` Boolean - Determines whether the user desires reduced motion based on platform APIs.

Returns an object with system animation settings.

## Properties

### `systemPreferences.appLevelAppearance` _macOS_

一个类型为`String`的属性，此属性可能的值为：`dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` _macOS_ _只读_

一个类型为`String`的属性，此属性可能的值为：`dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
