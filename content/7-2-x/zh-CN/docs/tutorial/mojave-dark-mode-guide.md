# Mojave黑暗模式

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)。  If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting.

在 macOS 10.15 Catalina 中，苹果为所有macOS电脑引入了一个新的“自动”暗色模式选项。 In order for the `isDarkMode` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## 自动更新原生界面

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app.  The default behavior as of Electron 7.0.0 is to opt in to this automatic theming from the OS.  If you wish to opt out you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`.  Please note that once Electron starts building against the 10.14 SDK it will not be possible for you to opt out of this theming.

## 自动更新你的接口

如果你的应用本身就有黑暗模式，那么你需要跟系统同步他的开与关。  你可以通过监听 Electron 的 `systemPreferences` 模块上的主题变更事件来实现。  如下:

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```
