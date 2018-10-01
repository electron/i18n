# Combinaciones de teclas

> Definir atajos del teclado.

Accelerators are Strings that can contain multiple modifiers and a single key code, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Ejemplos:

* `CommandOControl+A`
* `CommandOControl+Shift+Z`

Los atajos son registrados con el módulo e [`globalShortcut`](global-shortcut.md) usando el método [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), ejemplo.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Registrar un grabador de atajo 'CommandOControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Hacer algo cuando se presiona tanto Tecla Command o Control + Y.
  })
})
```

## Nota sobre plataformas

En Linux y Windows, la clave `Command` no tiene ningún efecto, así que se utilizar `CommandOrControl` que representa `Command` para macOS y `Control` para Linux y Windows para definir algunos Aceleradores.

Usa `Alt` en vez de `Option`. La clave `Option` solo existe en macOS, mientras la clave `Alt` esta disponible en todas las plataformas.

La clave `Super` esta asignada a la tecla `Windows` en Windows y Linux y `Cmd` para macOS.

## Modificadores disponibles

* `Command` (o `Cmd` resumido)
* `Control` (o `Ctrl` resumido)
* `ComandoOControl` (o `CmdOrCtrl` resumido)
* `Alt`
* `Opción`
* `Alt derecha`
* `Shift`
* `Super`

## Códigos claves disponibles

* `0` a `9`
* `A` a `Z`
* `F1` a `F24`
* Signos de puntuación como `~`, `!`, `@`, `#`, `` $, etcétera.
* `Más`
* `Espacio`
* `Tab`
* `Retroceso`
* `Delete`
* `Insert`
* `Return` (o `Enter` como alias)
* `Arriba`, `Abajo`, `Izquierda` y `Derecha`
* `Home` y `End`
* `PageUp` y `PageDown`
* `Escape` (o `Esc` resumido)
* `VolumeUp`, `VolumeDown` y `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` y `MediaPlayPause`
* `PrintScreen`