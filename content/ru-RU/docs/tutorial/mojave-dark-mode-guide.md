# Mojave Dark Mode

В macOS 10.14 Mojave, Apple представила новый [системный темный режим](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) для всех компьютеров macOS. Если у вашего приложения есть темный режим, вы можете заставить ваше приложение Electron учитывать настройку системного темного режима.

В macOS 10.15 Catalina, Apple представила новую "автоматическую" опцию темного режима для всех компьютеров macOS. Для корректной работы API `isDarkMode` и `Tray` в этом режиме в Catalina у вас либо должно быть установлено `NSRequiresAquaSystemAppearance` в `false` в вашем файле `Info.plist`, либо должен использоваться Electron версии `>=7.0.0`.

## Автоматическое обновление нативных интерфейсов

"Нативные интерфейсы" включают в себя выбор файлов, границу окна, диалоги, контекстные меню и многое другое; в основном всё, где интерфейс исходит из macOS, а не из вашего приложения. По умолчанию Electron 7.0.0 включает автоматическую тему, установленную ОС. Если вы хотите отключить, установите значение `NSRequiresAquaSystemAppearance` в файле `Info.plist` в `true`. Пожалуйста, обратите внимание, что как только Electron начнет сборку с 10.14 SDK, вы не сможете отключить использование автоматической темы.

## Автоматическое обновление ваших интерфейсов

Если у вашего приложения имеется собственный темный режим, вы должны включить и выключить его при помощи синхронизации с настройками темного режима системы. Вы можете сделать это прослушиванием события изменения темы в модуле Electron `systemPreferences`. Например,

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```