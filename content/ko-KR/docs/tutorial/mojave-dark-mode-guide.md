# 모하비 다크 모드

MacOS 10.14 Mojave에서 Apple은 모든 MacOS 컴퓨터에 대해 새로운 [시스템 차원의 다크 모드](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)를 도입했습니다. 기본적으로 Electron 앱은 활성화될 때 해당 UI 및 기본 인터페이스를 다크 모드 설정으로 자동 조정하지 않습니다. 이는 주로 앱 자체 인터페이스가 직접 다크 모드를 지원하지 않는 경우 다크 모드 네이티브 인터페이스를 사용하면 **안 된다**는 Apple의 지침 때문입니다.

If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting.

## Automatically updating the native interfaces

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app. In order to make these interfaces update to dark mode automatically, you need to set the `NSRequiresAquaSystemAppearance` key in your app's `Info.plist` file to `false`. E.g.

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

## Automatically updating your own interfaces

If your app has its own dark mode you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme changed event on Electron's `systemPreferences` module. E.g.

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```