# Modo oscuro Mojave

En macOS 10.14 Mojave, Apple introdujo un nuevo modo oscuro [para todo el sistema](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) en sus ordenadores macOS. If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting using [the nativeTheme api](../api/native-theme.md).

En macOS 10.15 Catalina, Apple introdujo una nueva opción de modo oscuro "automático" para todas las computadoras macOS. In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## Actualizando automáticamente las interfaces nativas

"Interfaces Nativas" incluye el selector de archivo, el borde de ventana, diálogos, menús contextuales y mas; básicamente cualquier cosa de la UI proviene de macOS y no de tu aplicación. El comportamiento predeterminado a partir de Electron 7.0.0 es optar por este tema automático del sistema operativo. Si deseas optar por no participar bebes fijar la llave `NSRequiresAquaSystemAppearance` en el archivo `Info.plist` como `true`. Por favor tenga en cuenta que una vez que Electron se empieza a construir con el SDK 10.14 no será posible que optes por este tema.

## Actualizando automáticamente tus propias interfaces

Si tu aplicación tiene su propio modo oscuro deberías activarlo y deshabilitar la sincronización con la configuración de modo oscuro del sistema. You can do this by listening for the theme updated event on Electron's `nativeTheme` module. Por ejemplo.

```js
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```