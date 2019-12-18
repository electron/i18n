# Modo oscuro Mojave

En macOS 10.14 Mojave, Apple introdujo un nuevo modo oscuro [para todo el sistema](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) en sus ordenadores macOS. Si tu aplicación tiene un modo oscuro, puedes hacer que tu aplicación Electron siga la configuración de modo oscuro del sistema.

En macOS 10.15 Catalina, Apple introdujo una nueva opción de modo oscuro "automático" para todas las computadoras macOS. Para que las APIs `siDarkMode` y `Tray` trabajen correctamente en este modo, en Catalina necesitas tener `NSRequiresAquaSystemAppearance` en `false` en tu archivo `Info.plist` o en Electron `>=7.0.0`.

## Actualizando automáticamente las interfaces nativas

"Interfaces Nativas" incluye el selector de archivo, el borde de ventana, diálogos, menús contextuales y mas; básicamente cualquier cosa de la UI proviene de macOS y no de tu aplicación. El comportamiento predeterminado a partir de Electron 7.0.0 es optar por este tema automático del sistema operativo. Si deseas optar por no participar bebes fijar la llave `NSRequiresAquaSystemAppearance` en el archivo `Info.plist` como `true`. Por favor tenga en cuenta que una vez que Electron se empieza a construir con el SDK 10.14 no será posible que optes por este tema.

## Actualizando automáticamente tus propias interfaces

Si tu aplicación tiene su propio modo oscuro deberías activarlo y deshabilitar la sincronización con la configuración de modo oscuro del sistema. Puede hacer esto escuchando por el evento theme changed en el `systemPreferences` del modulo de Electron. Por ejemplo.

```js
const { nativeTheme } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(nativeTheme.shouldUseDarkColors)
  }
)
```