# Soporte para Modo Oscuro macOS

En macOS 10.14 Mojave, Apple introdujo un nuevo modo oscuro [para todo el sistema](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) en sus ordenadores macOS. If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

En macOS 10.15 Catalina, Apple introdujo una nueva opción de modo oscuro "automático" para todas las computadoras macOS. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina, you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file, or be on Electron `>=7.0.0`. Both [Electron Packager](https://github.com/electron/electron-packager) and [Electron Forge](https://www.electronforge.io/) have a [`darwinDarkModeSupport` option](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport) to automate the `Info.plist` changes during app build time.

## Actualizando automáticamente las interfaces nativas

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. If you wish to opt out and are using Electron &gt; 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that Electron 8.0.0 and above will not let your opt out of this theming, due to the use of the macOS 10.14 SDK.

## Actualizando automáticamente tus propias interfaces

If your app has its own dark mode, you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme updated event on Electron's `nativeTheme` module.

Por ejemplo:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```