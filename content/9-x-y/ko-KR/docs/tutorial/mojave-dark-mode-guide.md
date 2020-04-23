# macOS 다크 모드 지원

MacOS 10.14 Mojave에서 Apple은 모든 MacOS 컴퓨터에 대해 새로운 [시스템 차원의 다크 모드](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)를 도입했습니다.  만약 당신의 Electron 앱이 다크 모드를 가지고 있다면 [`nativeTheme` api](../api/native-theme.md)를 사용해서 시스템 전체 다크모드를 적용할 수 있습니다.

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina, you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file, or be on Electron `>=7.0.0`. Both [Electron Packager](https://github.com/electron/electron-packager) and [Electron Forge](https://www.electronforge.io/) have a [`darwinDarkModeSupport` option](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport) to automate the `Info.plist` changes during app build time.

## 기본 인터페이스 자동 업데이트

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. If you wish to opt out and are using Electron
&gt; 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that Electron 8.0.0 and above will not let your opt out of this theming, due to the use of the macOS 10.14 SDK.

## 사용자 인터페이스 자동 업데이트

If your app has its own dark mode, you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme updated event on Electron's `nativeTheme` module.

예시:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```
