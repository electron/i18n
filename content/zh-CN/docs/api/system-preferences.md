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

### 事件： "倒色方案更改" _Windows_ _弃用_

返回:

* `event` Event
* `invertedColorScheme` 布尔 - `true` 如果使用倒置配色方案（带有浅文本和深色背景的高对比度配色方案），则 `false` 。

**弃用：** 应该使用 `nativeTheme` 模块上的新 [`updated`](native-theme.md#event-updated) 事件。

### 事件： "高对比度配色方案改变" _视窗_ _弃用_

返回:

* `event` Event
* `highContrastColorScheme` 布尔 - `true` ， 如果一个高对比度的主题被使用， 否则 `false` 。

**弃用：** 应该使用 `nativeTheme` 模块上的新 [`updated`](native-theme.md#event-updated) 事件。

## 方法

### `systemPreferences.isDarkMode()` _macOS_ _视窗_ _弃用_

返回`Boolean`，表示系统是否处于Dark模式

**弃用：** 应该使用新的 [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API。

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

返回值 `Boolean` - 是否在页面设置之间进行滑动。

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _马科斯_

* `event` String
* `userInfo` 记录<String, any>
* `deliverImmediately` Boolean （可选） - 即使订阅应用程序处于非活动状态， `true` 立即发布通知。

帖子 `event` 为 macOS 的原生通知。 `userInfo` 是包含随通知一起发送的用户信息字典的对象 。

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` 记录<String, any>

帖子 `event` 为 macOS 的原生通知。 `userInfo` 是包含随通知一起发送的用户信息字典的对象 。

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` 记录<String, any>

帖子 `event` 为 macOS 的原生通知。 `userInfo` 是包含随通知一起发送的用户信息字典的对象 。

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` 记录<String, unknown>
  * `object` 字符串

返回 `Number` - 该订阅的 ID

订阅macOS的原生通知，当通信的 `event</ 0>发生时，将调用 <code>callback(event, userInfo)` 。 ` userInfo `是一个Object，它包含随通知一起发送的用户信息字典。 `object` 是通知的发送者， 并且仅支持当前 `NSString` 值。

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
  * `userInfo` 记录<String, unknown>
  * `object` 字符串

返回 `Number` - 该订阅的 ID

与 `subscribeNotification`相同，但使用 `NSNotificationCenter` 进行本地默认。 这是必要的事件，如 `NSUserDefaultsDidChangeNotification`。

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` 记录<String, unknown>
  * `object` 字符串

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

* `defaults` 记录<String, String | Boolean | Number> - （`key: value`） 用户默认的字典

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
* `type` 弦-可以 `string`， `boolean`， `integer`， `float`， `double`， `url`， `array` 或 `dictionary`。
* `value` String

设置 `NSUserDefaults` 中 `key` 的值.

请注意， `type` 应与实际类型的 `value`相匹配。 例外被抛出 如果他们不这样做。

常用的 `key` 和 `type` 的类型为:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

删除 `NSUserDefaults`中的 `key` 。 这可用于恢复以前设置 `setUserDefault`的 `key` 的默认 或全球值。

### `systemPreferences.isAeroGlassEnabled()` _Windows_

返回 `Boolean` - `true` 如果启用了 [DWM composition][dwm-composition] (Aero Glass), 否则为 `false`.

使用它来确定是否应创建透明窗口的示例 (当禁用 DWM 组合时, 透明窗口无法正常工作):

```javascript
康斯特 { BrowserWindow, systemPreferences } =要求（"电子"）
浏览器选项= { width: 1000, height: 800 }

//使窗口透明，只有当平台支持它。
如果（进程.平台！]="win32"||系统预置。iseroGlass可（）{
  浏览器选项。透明=真正的
  浏览器选项。frame=虚假
=

/创建窗口。
续赢=新的浏览器窗口（浏览器选项）

//导航。
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // No transparency, so we load a fallback that uses basic styles.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` _窗口_ _马科斯_

返回 `String` - 用户当前系统偏好颜色，RGBA 十六进制形式.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

此 API 仅适用于 macOS 10.14 莫哈韦或较新的。

### `systemPreferences.getColor(color)` _窗口_ _马科斯_

* `color` 字符串 - 以下值之一：
  * 在 **窗口**：
    * `3d-dark-shadow` - 三维显示元素的暗阴影。
    * `3d-face` - 面向三维显示元素和对话框背景的颜色。
    * `3d-highlight` - 三维显示元素的高亮色.
    * `3d-light` - 三维显示元素的亮色.
    * `3d-shadow` - 三维显示元素的阴影颜色.
    * `active-border` - 活动窗口边框。
    * `active-caption` - 活动窗口标题栏。 如果启用了渐变 效应，则 活动窗口标题栏的颜色梯度中指定左侧颜色。
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
    * `inactive-caption` - 非活动窗口标题。 如果启用了渐变 效果，则指定处于非活动窗口标题栏颜色渐变中的左侧颜色 。
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
  * 在 **马科斯**
    * `alternate-selected-control-text` - 列表或表格中所选表面上的文本。 _弃_
    * `control-background` - 大型界面元素（如浏览器或表）的背景。
    * `control` - 控制的表面。
    * `control-text` - 不禁用的控件的文本。
    * `disabled-control-text` - 禁用的控件文本。
    * `find-highlight` - 查找指示器的颜色。
    * `grid` - 界面元素（如表）的网格线。
    * `header-text` - 桌子上的标题单元格的文本。
    * `highlight` - 屏幕上的虚拟光源。
    * `keyboard-focus-indicator` - 使用键盘进行界面导航时，围绕当前聚焦控制出现的环。
    * `label` - 包含主要内容的标签的文本。
    * `link` - 指向其他内容的链接。
    * `placeholder-text` - 控制或文本视图中的占位符字符串。
    * `quaternary-label` - 比水印文本等第三级标签重要性较小的标签的文本。
    * `scrubber-textured-background` - 触摸栏中洗涤器的背景。
    * `secondary-label` - 比普通标签重要的标签（如用于表示副标题或其他信息的标签）的文本。
    * `selected-content-background` - 关键窗口或视图中所选内容的背景。
    * `selected-control` - 选定控制的表面。
    * `selected-control-text` - 选定的控件的文本。
    * `selected-menu-item-text` - 选定菜单的文本。
    * `selected-text-background` - 选定文本的背景。
    * `selected-text` - 选定的文本。
    * `separator` - 不同内容部分之间的分离器。
    * `shadow` - 屏幕上凸起的物体投下的虚拟阴影。
    * `tertiary-label` - 比次要标签（如用于表示禁用文本的标签）重要性较小的标签的文本。
    * `text-background` - 文本背景。
    * `text` - 文档中的文本。
    * `under-page-background` - 文档内容背后的背景。
    * `unemphasized-selected-content-background` - 非密钥窗口或视图中的选定内容。
    * `unemphasized-selected-text-background` - 非密钥窗口或视图中所选文本的背景。
    * `unemphasized-selected-text` - 非密钥窗口或视图中的选定文本。
    * `window-background` - 窗户的背景。
    * `window-frame-text` - 窗口标题栏区域中的文本。

返回 `String` -系统颜色设置为RGB十六进制格式 (`#ABCDEF`). 有关详细信息，请参阅</a> 的

Windows 文档和 [macOS 文档][macos-colors] 。</p> 

以下颜色仅适用于 macOS 10.14： `find-highlight`、 `selected-content-background`、 `separator`、 `unemphasized-selected-content-background`、 `unemphasized-selected-text-background`和 `unemphasized-selected-text`。



### `systemPreferences.getSystemColor(color)` _马科斯_

* `color` 字符串 - 以下值之一： 
    * `蓝色`
  * `棕色`
  * `灰色`
  * `绿色`
  * `橙`
  * `粉红色`
  * `紫色`
  * `红`
  * `黄色`

返回 `String` - 标准系统颜色格式为 `#RRGGBBAA`。

返回几个标准系统颜色之一，这些颜色可自动适应可访问性设置的活力和变化，如"增加对比度"和"降低透明度"。 有关详细信息，请参阅 [苹果文档](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) 。



### `systemPreferences.isInvertedColorScheme()` _视窗_ _弃用_

返回 `Boolean` - 如果倒置配色方案（带有浅文本和深色背景的高对比度配色方案）是活跃的，则 `true` ，否则 `false` 。

**弃用：** 应该使用新的 [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API。



### `systemPreferences.isHighContrastColorScheme()` _macOS_ _视窗_ _弃用_

返回 `Boolean` - `true` 如果一个高对比度的主题是活跃的，否则 `false` 。

**弃用：** 应该使用新的 [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API。



### `systemPreferences.getEffectiveAppearance()` _macOS_

返回 `String` - 其值可能是 `dark`、`light` 或 `unknown`.

获取当前应用到你的程序上的 macOS 设置项，会映射到 [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)



### `systemPreferences.getAppLevelAppearance()` _马科斯_ _弃用_

返回 `String` | `null` - 其值可能为 `dark`、`light` 或 `unknown`。

获取您已声明要 应用程序的 macOS 外观设置， [NS应用程序](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc)的地图。 您可以使用 `setAppLevelAppearance` API 来设置此值。



### `systemPreferences.setAppLevelAppearance(appearance)` _马科斯_ _弃用_

* `appearance` String | null - 可以是 `dark` 或 `light`

设定您的应用程序的外观设置，这应该覆盖系统默认值以及覆盖 `getEffectiveAppearance` 的值。



### `systemPreferences.canPromptTouchID()` _马科斯_

返回 `Boolean` - 此设备是否具有使用 Touch ID 的能力。

**注：** 此 API 将在超过塞拉 10.12.2 的 macOS 系统上返回 `false` 。



### `systemPreferences.promptTouchID(reason)` _马科斯_

* `reason` 字符串 - 您要求触摸 ID 身份验证的原因

返回 `Promise<void>` - 如果用户已成功使用 Touch ID 进行身份验证，则解析。



```javascript
const { systemPreferences } =要求（"电子"）

系统Prepres.提示触摸ID（"要获得安全门事件的同意"）。然后（成功=> {
  控制台.log（"您已成功通过触摸ID进行身份验证！
[）。catch（呃=> {
  控制台.log（呃）
}）
```


此 API 本身不会保护您的用户数据：相反，它是一种机制，让你这样做。 原生应用需要在其钥匙链条目上设置 [访问控制常数](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) ，如 [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) ，以便阅读它会自动提示 Touch ID 生物识别同意。 这可以通过 [`node-keytar`](https://github.com/atom/node-keytar)来完成，这样，人们就会用 `node-keytar` 存储一个加密密钥，并且只有在 `promptTouchID()` 解决的情况下才能取出它。

**注：** 此 API 将在超过 Sierra 10.12.2 的 macOS 系统上返回被拒绝的承诺。



### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - 如果当前流程不受信任，是否会通过提示通知用户。

返回 `Boolean` - `true` 当前流程是否是值得信赖的可访问性客户端，如果流程不是，则 `false` 。



### `systemPreferences.getMediaAccessStatus(mediaType)` _窗口_ _马科斯_

* `mediaType` 弦-可以 `microphone`， `camera` 或 `screen`。

返回 `String` -可以 `not-determined`， `granted`， `denied`， `restricted` 或 `unknown`。

此用户的同意不需要在 macOS 10.13 高塞拉或更低，所以这种方法将永远返回 `granted`。 macOS 10.14 莫哈韦或更高要求同意 `microphone` 和 `camera` 访问。 macOS 10.15 卡塔利娜或更高要求同意 `screen` 访问。

Windows 10 具有控制 `microphone` 的全球设置，并为所有 win32 应用程序 `camera` 访问权限。 它始终会在旧版本的 Windows 上返回 `screen` 和所有媒体类型的 `granted` 。



### `systemPreferences.askForMediaAccess(mediaType)` _马科斯_

* `mediaType` 字符串 - 请求的媒体类型;可以 `microphone`， `camera`。

返回 `Promise<Boolean>` - 承诺，如果同意， `true` 解决，如果 `false` ，如果拒绝。 如果无效 `mediaType` 通过，承诺将被拒绝。 如果访问请求被拒绝，随后通过系统首选项窗格更改，则需要重新启动应用才能生效。 如果访问已被请求和拒绝，则 _必须_ 通过首选项窗格更改访问：警报不会弹出，承诺将解决与现有的访问状态。

**重要：** 为了正确利用此 API，您 [必须在应用 `Info.plist` 文件中设置](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) `NSMicrophoneUsageDescription` 和 `NSCameraUsageDescription` 字符串。 这些密钥的值将用于填充权限对话，以便正确告知用户权限请求的目的。 有关如何在电子上下文中设置这些信息，请参阅 [电子应用分布](https://electronjs.org/docs/tutorial/application-distribution#macos) 。

此用户同意是不需要的，直到 macOS 10.14 Mojave， 所以这种方法将永远返回 `true` ，如果你的系统运行 10.13 高塞拉或更低.



### `系统预置。获取动画设置（）`

返回 ` Object `:

* `shouldRenderRichAnimation` 布尔 - 返回真实， 如果丰富的动画应该呈现。 查看会话类型（例如远程桌面）和辅助功能设置，为重动画提供指导。
* `scrollAnimationsEnabledBySystem` Boolean - 根据每个平台确定是否应启用滚动动画（例如由主页/端键生成）。
* `prefersReducedMotion` 布尔 - 确定用户是否希望基于平台 ABI 降低运动量。

返回带有系统动画设置的对象。



## Properties



### `systemPreferences.appLevelAppearance` _马科斯_

可 `dark`、 `light` 或 `unknown`的 `String` 财产。 它决定了 应用的 macOS 外观设置。 此映射到值在： [NS应用。外观](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc)。 设置这将覆盖 系统默认值以及 `getEffectiveAppearance`值。

可以设置的可能值是 `dark` 和 `light`的，可能的回报值是 `dark`、 `light`和 `unknown`。

此属性仅适用于 macOS 10.14 莫哈韦或较新的。



### `systemPreferences.effectiveAppearance` _马科斯_ _只_

可 `dark`、 `light` 或 `unknown`的 `String` 财产。

返回当前应用于您的应用程序的 macOS 外观设置， 地图以 [NS 应用程序](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)。

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
