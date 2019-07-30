# Mojave Dark Mode

In macOS 10.14 Mojave, Apple introduced a new [system-wide dark mode](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) for all macOS computers. If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting.

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. Affinché le API `isDarkMode` e `Tray` possano funzionare correttamente in Catalina è necessario che il valore di `NSRequiresAquaSystemAppearance` sia impostato a `false` nel file `Info.plist`, oppure che si stia utilizzando una versione di Electron `>=7.0.0`.

## Automatically updating the native interfaces

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app. The default behavior as of Electron 7.0.0 is to opt in to this automatic theming from the OS. Se si è deciso per l'opt out la chiave `NSRequiresAquaSystemAppearance` nel file `Info.plist` deve contenere il valore `true`. Please note that once Electron starts building against the 10.14 SDK it will not be possible for you to opt out of this theming.

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