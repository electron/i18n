# Mojave Dark Mode

У macOS 10.14 Mojave, Apple представив новий [загальносистемний темний режим](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) для всіх macOS комп'ютерів.  If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting.

У macOS 10.15 Каталонії Apple представила новий параметр "автоматично" в темному режимі для всіх macOS комп'ютерів. In order for the `isDarkMode` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## Автоматично оновлювати нативні інтерфейси

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app.  The default behavior as of Electron 7.0.0 is to opt in to this automatic theming from the OS.  If you wish to opt out you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`.  Please note that once Electron starts building against the 10.14 SDK it will not be possible for you to opt out of this theming.

## Автоматично оновлювати власні інтерфейси

If your app has its own dark mode you should toggle it on and off in sync with the system's dark mode setting.  You can do this by listening for the theme changed event on Electron's `systemPreferences` module.  E.g.

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```
