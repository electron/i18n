# Modo oscuro Mojave

En macOS 10.14 Mojave, Apple introdujo un nuevo modo oscuro [para todo el sistema](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) en sus ordenadores macOS.  Si tu aplicación tiene un modo oscuro, puedes hacer que tu aplicación Electron siga la configuración de modo oscuro del sistema.

En macOS 10.15 Catalina, Apple introdujo una nueva opción de modo oscuro "automático" para todas las computadoras macOS. Para que las APIs `siDarkMode` y `Tray` trabajen correctamente en este modo, en Catalina necesitas tener `NSRequiresAquaSystemAppearance` en `false` en tu archivo `Info.plist` o en Electron `>=7.0.0`.

## Actualizando automáticamente las interfaces nativas

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app.  The default behavior as of Electron 7.0.0 is to opt in to this automatic theming from the OS.  Si deseas optar por no participar bebes fijar la llave `NSRequiresAquaSystemAppearance` en el archivo `Info.plist` como `true`.  Por favor tenga en cuenta que una vez que Electron se empieza a construir con el SDK 10.14 no será posible que optes por este tema.

## Actualizando automáticamente tus propias interfaces

Si tu aplicación tiene su propio modo oscuro deberías activarlo y deshabilitar la sincronización con la configuración de modo oscuro del sistema.  Puede hacer esto escuchando por el evento theme changed en el `systemPreferences` del modulo de Electron.  Por ejemplo.

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```
