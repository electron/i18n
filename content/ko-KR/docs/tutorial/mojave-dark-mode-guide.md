# 모하비 다크 모드

MacOS 10.14 Mojave에서 Apple은 모든 MacOS 컴퓨터에 대해 새로운 [시스템 차원의 다크 모드](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)를 도입했습니다. If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting using [the nativeTheme api](../api/native-theme.md).

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## 기본 인터페이스 자동 업데이트

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app. The default behavior as of Electron 7.0.0 is to opt in to this automatic theming from the OS. If you wish to opt out you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that once Electron starts building against the 10.14 SDK it will not be possible for you to opt out of this theming.

## 사용자 인터페이스 자동 업데이트

앱에 자체 다크 모드가 있는 경우 시스템의 다크 모드 설정과 동기화하여 켜거나 꺼야 합니다. You can do this by listening for the theme updated event on Electron's `nativeTheme` module. 예:

```js
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```