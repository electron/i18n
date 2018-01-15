# Acelerador

> Definir atajos del teclado.

Los Aceleradores son cadenas de texto que pueden contener múltiples modificadores y claves, combinadas por el caracter `+`, y son usadas para definir Atajos de Teclado a través de tu aplicación.

Ejemplos:

* `CommandOControl+A`
* `CommandOControl+Shift+Z`

Los atajos son registrados con el módulo e [`globalShortcut`](global-shortcut.md) usando el método [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), ejemplo.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Registrar un grabador de atajo 'CommandOControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Hacer cosas cuando Y o tanto Command como Control sean presionados.
  })
})
```

## Noticia de plataforma

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

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

* `` a `9`
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