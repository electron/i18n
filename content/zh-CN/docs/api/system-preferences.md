# systemPreferences

> 获取system preferences.

进程：[主进程](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## 事件

` systemPreferences ` 对象触发以下事件:

### Event: 'accent-color-changed' *Windows*

返回:

* `event` Event
* `newColor` String - 用户指定的新 RGBA 颜色作为系统偏好颜色.

### Event: 'color-changed' *Windows*

返回:

* `event` Event

### Event: 'inverted-color-scheme-changed' *Windows*

返回:

* `event` Event
* `invertedColorScheme` Boolean - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, `false` otherwise.

### Event: 'high-contrast-color-scheme-changed' *Windows*

返回:

* `event` Event
* `highContrastColorScheme` Boolean - `true` if a high contrast theme is being used, `false` otherwise.

### 事件: 'appearance-changed' *macOS*

返回:

* `newAppearance` String - 可以为 `dark` 或 `light`

**注意:** 此事件仅在调用了`startAppLevelAppearanceTrackingOS`后触发

## 方法

### `systemPreferences.isDarkMode()` *macOS*

返回`Boolean`，表示系统是否处于Dark模式

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

返回值 `Boolean` - 是否在页面设置之间进行滑动。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `event` String
* `userInfo` Object
* `deliverImmediately` Boolean (optional) - `true` to post notifications immediately even when the subscribing app is inactive.

发送 `event` 作为macOS的原生通知。 `userInfo`是一个Object，它包含随通知一起发送的用户信息字典。

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

发送 `event` 作为macOS的原生通知。 `userInfo`是一个Object，它包含随通知一起发送的用户信息字典。

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

发送 `event` 作为macOS的原生通知。 `userInfo`是一个Object，它包含随通知一起发送的用户信息字典。

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

返回 `Number` - 此订阅的 ID

订阅macOS的原生通知，当通信的 `event</ 0>发生时，将调用 <code>callback(event, userInfo)` 。 ` userInfo `是一个Object，它包含随通知一起发送的用户信息字典。

返回订阅的 ` id `, 可用于取消该订阅的 `event`.

在这个API下订阅` NSDistributedNotificationCenter `， `event` 的示例值为：

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

返回 `Number` - 此订阅的 ID

与` subscribeNotification `相同，但使用` NSNotificationCenter `作为本地默认值。 这对事件` NSUserDefaultsDidChangeNotification `是必需的。

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

与 `subscribeNotification`一样, 但使用`NSWorkspace.sharedWorkspace.notificationCenter`。 这对事件 `NSWorkspaceDidActivateApplicationNotification` 是必需的。

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

使用 ` id ` 删除订阅。

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

与` unsubscribeNotification `相同，但将订户从` NSNotificationCenter `中删除。

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Integer

与 `unsubscribeNotification` 一样，但是它从 `NSWorkspace.sharedWorkspace.notificationCenter` 中移除订阅者。

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - 用户默认选项集 (`key: value`) 

在应用的`NSUserDefaults`配置项中添加其它默认设置。

### `systemPreferences.getUserDefault(key, type)` *macOS*

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

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` String - 参见 [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
* `value` String

设置 `NSUserDefaults` 中 `key` 的值.

请注意，`type`应与`value`的实际类型匹配。 如果不存在，则抛出异常。

常用的 `key` 和 `type` 的类型为:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

删除 `NSUserDefaults` 中的 `key`. 这可以用来恢复默认值或之前用 `setUserDefault` 设置的 `key`的全局值。

### `systemPreferences.isAeroGlassEnabled()` *Windows*

返回 `Boolean` - `true` 如果启用了 [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass), 否则为 `false`.

使用它来确定是否应创建透明窗口的示例 (当禁用 DWM 组合时, 透明窗口无法正常工作):

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
let browserOptions = { width: 1000, height: 800 }

// Make the window transparent only if the platform supports it.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Create the window.
let win = new BrowserWindow(browserOptions)

// Navigate.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // No transparency, so we load a fallback that uses basic styles.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows* *macOS*

返回 `String` - 用户当前系统偏好颜色，RGBA 十六进制形式.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` *Windows* *macOS*

* `color` String - 下列值之一: 
  * On **Windows**: 
    * `3d-dark-shadow` - 三维显示元素的暗阴影。
    * `3d-face` - 面向三维显示元素和对话框背景的颜色。
    * `3d-highlight` - 三维显示元素的高亮色.
    * `3d-light` - 三维显示元素的亮色.
    * `3d-shadow` - 三维显示元素的阴影颜色.
    * `active-border` - 活动窗口边框。
    * `active-caption` -活动窗口标题栏。 如果启用了渐变效果，则指定活动窗口标题栏的颜色渐变中的左侧颜色。
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
    * ` inactive-caption` -非活动窗口标题栏。 如果启用了渐变效果，则指定非活动窗口标题栏的颜色渐变中的左侧颜色。
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

返回 `String` -系统颜色设置为RGB十六进制格式 (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) and the [MacOS docs](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) for more details.

### `systemPreferences.getSystemColor(color)` *macOS*

* `color` String - 下列值之一: 
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

返回 `String` - 其值可能是 `dark`、`light` 或 `unknown`.

获取当前应用到你的程序上的 macOS 设置项，会映射到 [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

需要注意的是，在 构建针对Electron 10.14 SDK 之前的版本时，你的程序的`effectiveAppearance`默认为 "light" 并且不会继承系统的设置。 In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. 查看 [Electron Packager API](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) 以获得更多细节。

### `systemPreferences.getAppLevelAppearance()` *macOS*

返回 `String` | `null` - 其值可能为 `dark`、`light` 或 `unknown`。

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). 您可以使用 `setAppLevelAppearance` API 来设置此值。

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS*

* `appearance` String | null - 可以是 `dark` 或 `light`

设定您的应用程序的外观设置，这应该覆盖系统默认值以及覆盖 `getEffectiveAppearance` 的值。

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