# systemPreferences

> 获取system preferences.

进程：[主进程](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
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
* `invertedColorScheme` Boolean - 如果正在使用诸如高对比度主题的色彩方案，则为`true`， 否则为 `false`.

## 方法

### `systemPreferences.isDarkMode()` *macOS*

返回`Boolean`，表示系统是否处于Dark模式

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

返回值 `Boolean` - 是否在页面设置之间进行滑动。

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

发送 `event` 作为macOS的原生通知。 `userInfo`是一个Object，它包含随通知一起发送的用户信息字典。

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

发送 `event` 作为macOS的原生通知。 `userInfo`是一个Object，它包含随通知一起发送的用户信息字典。

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function - 回调函数 
  * `event` String
  * `userInfo` Object

订阅macOS的原生通知，当通信的 `event</ 0>发生时，将调用 <code>callback(event, userInfo)` 。 ` userInfo `是一个Object，它包含随通知一起发送的用户信息字典。

返回订阅的 ` id `, 可用于取消该订阅的 `event`.

在这个API下订阅` NSDistributedNotificationCenter `， `event` 的示例值为：

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

使用 ` id ` 删除订阅。

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function - 回调函数 
  * `event` String
  * `userInfo` Object

与` subscribeNotification `相同，但使用` NSNotificationCenter `作为本地默认值。 这对于诸如` NSUserDefaultsDidChangeNotification `的事件是必需的.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

与` unsubscribeNotification `相同，但将订户从` NSNotificationCenter `中删除。

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
* `type` String - 请看 [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos].
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
const {BrowserWindow, systemPreferences} = require('electron')
let browserOptions = {width: 1000, height: 800}

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

### `systemPreferences.getAccentColor()` *Windows*

返回 `String` - 用户当前系统偏好颜色，RGBA 十六进制形式.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` String - 下列值之一: 
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

返回 `String` -系统颜色设置为RGB十六进制格式 (`#ABCDEF`). 更多详细信息, 请查阅 [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) 。

### `systemPreferences.isInvertedColorScheme()` *Windows*

返回 `Boolean` - `true` 如果反转颜色方案（如高对比度主题）处于活动状态，否则为`false`