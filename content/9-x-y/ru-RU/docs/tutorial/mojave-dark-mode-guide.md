# Поддержка Темного режима macOS

В macOS 10.14 Mojave, Apple представила новый [системный темный режим](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) для всех компьютеров macOS.  Если у вашего Electron есть темный режим, вы можете сделать это следуйте настройкам общесистемного режима с помощью [ `родной темы` api](../api/native-theme.md).

В macOS 10.15 Catalina, Apple представила новую "автоматическую" опцию темного режима для всех компьютеров macOS. Для `родной темы. houldUseDarkColors` и `Tray` API для корректной работы в этом режиме на Катализация, у вас должно быть `NSRequiresAquaSystemAppear` значение `false` в вашей информации `. list` file, or be on Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Автоматическое обновление нативных интерфейсов

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Если вы хотите отказаться от использования Electron
&gt; 8.0. , вы должны установить ключ `NSRequiresAquaSystemAppearance` в файле `Info.plist` значение `true`. Обратите внимание, что Electron 8.0. и выше не позволит вашему выбору отказаться от этой темы из-за использования macOS 10.14 SDK.

## Автоматическое обновление ваших интерфейсов

Если ваше приложение имеет свой темный режим, вы должны включить и выключить его в системном тёмном режиме. Вы можете сделать это, прослушивая тему обновленное событие в модуле `родной темы`.

Например:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
