# Тёмный режим Mojave

В macOS 10.14 Mojave, Apple представила новый [системный темный режим](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) для всех компьютеров macOS. If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting using [the nativeTheme api](../api/native-theme.md).

В macOS 10.15 Catalina, Apple представила новую "автоматическую" опцию темного режима для всех компьютеров macOS. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## Автоматическое обновление нативных интерфейсов

"Нативные интерфейсы" включают в себя выбор файлов, границу окна, диалоги, контекстные меню и многое другое; в основном всё, где интерфейс исходит из macOS, а не из вашего приложения. По умолчанию Electron 7.0.0 включает автоматическую тему, установленную ОС. Если вы хотите отключить, установите значение `NSRequiresAquaSystemAppearance` в файле `Info.plist` в `true`. Пожалуйста, обратите внимание, что как только Electron начнет сборку с 10.14 SDK, вы не сможете отключить использование автоматической темы.

## Автоматическое обновление ваших интерфейсов

Если у вашего приложения имеется собственный темный режим, вы должны включить и выключить его при помощи синхронизации с настройками темного режима системы. You can do this by listening for the theme updated event on Electron's `nativeTheme` module. Например,

```js
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```