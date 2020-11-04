# 支持 macOS 深色模式

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)。  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

在 macOS 10.15 Catalina 中，苹果为所有macOS电脑引入了一个新的“自动”暗色模式选项。 为了 `本土主题。 houldUseDarkColors` and `托盘` APIs 需要在这种模式下正常工作于 Catalina, 您需要有 `NSRequiresAquaSystem外观` 设置为 `false` 在您的 `信息中。 邮件列表` 文件或在 Electron `>=7.0.0` Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## 自动更新原生界面

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. 如果您希望退出并正在使用 Electron
&gt; 8.0。 ，您必须在 `Info.plist` 文件中设置 `NSRequireesAquaSystem外观` 键值为 `true` 请注意Electron 8.0。 由于使用 macOS 10.14 SDK 的 ，您将不会选择退出这个主题。

## 自动更新你的接口

如果您的应用有自己的黑暗模式，您应该在与系统黑暗 模式设置同步时切换。 您可以通过在Electron的 `原生主题` 模块上聆听更新的主题事件来做到这一点。

例如：

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated, function theThemeHasChanged () format@@
  upateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
