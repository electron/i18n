# 모하비 다크 모드

MacOS 10.14 Mojave에서 Apple은 모든 MacOS 컴퓨터에 대해 새로운 [시스템 차원의 다크 모드](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/)를 도입했습니다.  기본적으로 Electron 앱은 활성화될 때 해당 UI 및 기본 인터페이스를 다크 모드 설정으로 자동 조정하지 않습니다. 이는 주로 앱 자체 인터페이스가 직접 다크 모드를 지원하지 않는 경우 다크 모드 네이티브 인터페이스를 사용하면 **안 된다**는 Apple의 지침 때문입니다.

앱에 다크 모드가 있는 경우, Electron 앱이 시스템 차원의 다크 모드 설정을 따르도록 할 수 있습니다.

## 기본 인터페이스 자동 업데이트

"기본 인터페이스"에는 파일 선택기, 창 테두리, 대화 상자, 컨텍스트 메뉴 등과 같은 당신의 앱이 아닌 macOS에서 제공되는 UI가 포함되어 있습니다. 이러한 인터페이스를 자동으로 다크 모드로 업데이트하려면 앱의 `Info.plist` 파일에서 `NSRequiresAquaSystemAppearance` 키를 `false`로 설정해야합니다.  예:

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

## 사용자 인터페이스 자동 업데이트

앱에 자체 다크 모드가 있는 경우 시스템의 다크 모드 설정과 동기화하여 켜거나 꺼야 합니다.  Electron의 `systemPreferences` 모듈에서 테마 변경 이벤트를 수신하여 이를 수행할 수 있습니다.  예:

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```
