# 支持 macOS 深色模式

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)。  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

在 macOS 10.15 Catalina 中，苹果为所有macOS电脑引入了一个新的“自动”暗色模式选项。 In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina, you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file, or be on Electron `>=7.0.0`. Both [Electron Packager](https://github.com/electron/electron-packager) and [Electron Forge](https://www.electronforge.io/) have a [`darwinDarkModeSupport` option](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport) to automate the `Info.plist` changes during app build time.

## 自动更新原生界面

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. If you wish to opt out and are using Electron
&gt; 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that Electron 8.0.0 and above will not let your opt out of this theming, due to the use of the macOS 10.14 SDK.

## 自动更新你的接口

If your app has its own dark mode, you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme updated event on Electron's `nativeTheme` module.

例如：

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```
