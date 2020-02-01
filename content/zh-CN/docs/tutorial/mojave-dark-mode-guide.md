# Mojave黑暗模式

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)。 If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting using [the nativeTheme api](../api/native-theme.md).

在 macOS 10.15 Catalina 中，苹果为所有macOS电脑引入了一个新的“自动”暗色模式选项。 In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## 自动更新原生界面

“原生界面”包括文件选择器、窗口边框、对话框、上下文菜单等等； 这些UI基本来源于 macOS ，而不是您的应用。 Electron 7.0.0默认自动根据系统切换主题。 如果您不想自动切换主题，您必须在 `Info.plist` 文件中将 `NSRequiresAquaSystemAppearance` 设为 `true`。 请注意，一旦Electron开始使用 10.14 SDK 构建，您就不再能禁用主题的切换。

## 自动更新你的接口

如果你的应用本身就有黑暗模式，那么你需要跟系统同步他的开与关。 You can do this by listening for the theme updated event on Electron's `nativeTheme` module. 如下:

```js
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```