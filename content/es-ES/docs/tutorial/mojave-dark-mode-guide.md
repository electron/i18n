# Modo oscuro Mojave

En macOS 10.14 Mojave, Apple introdujo un nuevo modo oscuro [para todo el sistema](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) en sus ordenadores macOS. If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting.

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. Para que las APIs `siDarkMode` y `Tray` trabajen correctamente en este modo, en Catalina necesitas tener `NSRequiresAquaSystemAppearance` en `false` en tu archivo `Info.plist` o en Electron `>=7.0.0`.

## Actualizando automáticamente las interfaces nativas

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app. The default behavior as of Electron 7.0.0 is to opt in to this automatic theming from the OS. Si deseas optar por no participar bebes fijar la llave `NSRequiresAquaSystemAppearance` en el archivo `Info.plist` como `true`. Please note that once Electron starts building against the 10.14 SDK it will not be possible for you to opt out of this theming.

## Actualizando automáticamente tus propias interfaces

If your app has its own dark mode you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme changed event on Electron's `systemPreferences` module. Por ejemplo.

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```