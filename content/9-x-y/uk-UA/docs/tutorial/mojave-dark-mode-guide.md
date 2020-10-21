# Підтримка темної теми macOS

У macOS 10.14 Mojave, Apple представив новий [загальносистемний темний режим](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) для всіх macOS комп'ютерів.  Якщо у вас застосунок Electron має темний режим, ви можете змусити його слідувати за параметром затемненого режиму за допомогою функції [ `власної теми` і](../api/native-theme.md).

У macOS 10.15 Каталонії Apple представила новий параметр "автоматично" в темному режимі для всіх macOS комп'ютерів. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina, you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file, or be on Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Автоматично оновлювати нативні інтерфейси

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Якщо ви хочете відмовитися і використовувати Electron
&gt; 8.0. , ви повинні встановити `NSRequiresAquaSystemAppearance` ключ `Info.plist` для `true`. Будь ласка, зверніть увагу, що Electron 8.0. і вище не дозволять вам відмовитися від цієї теми, через використання macOS 10.14 SDK.

## Автоматично оновлювати власні інтерфейси

Якщо ваш додаток має свій темний режим, ви повинні увімкнути і вимкнути його синхронізованим у фоновому режимі з темним режимом. Ви можете це зробити, прослухаючи подію з оновленою темою на модуль Electron's `nativeTheme`.

Наприклад:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
