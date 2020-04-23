# Mojave黑暗模式

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)。  在黑暗模式激活的情况下，Electron 应用默认是不会自动调整UI和本地接口来与其匹配的。 这个的主要原因是 Apple 自身的指导方针指出，在您的应用本身的接口不支持黑暗模式的情况下，您就**没有必要**使用黑暗模式的本地接口了。

如果您的应用有黑暗模式的话，那么你就可以让您的Electron应用遵循系统级的黑暗模式设置了。

## 自动更新原生界面

“本地接口”包含了文件选择器，窗口边框，对话框，内容菜单以及其他；基本上就是任何使用了macOS的UI而不是你的应用UI的地方。为了让这些地方自动更新到黑暗模式，你需要在应用的`info.plist`文件中将`NSRequiresAquaSystemAppearance`键设置为`false`。  如下:

```xml
<plist>
<dict>
  ...
  <key>NSRequiresAquaSystemAppearance</key>
  <false />
  ...
</dict>
</plist>
```

If you are using [`electron-packager` >= 12.2.0](https://github.com/electron-userland/electron-packager) or [`electron-forge` >= 6](https://github.com/electron-userland/electron-forge) you can set the [`darwinDarkModeSupport`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) option when packaging and this key will be set for you.

If you are using [`electron-builder` >= 20.37.0](https://github.com/electron-userland/electron-builder) you can set the [`darkModeSupport`](https://www.electron.build/configuration/mac.html) option.

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
