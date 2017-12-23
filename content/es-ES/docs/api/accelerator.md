# Acelerador

> Define keyboard shortcuts.

Accelerators are Strings that can contain multiple modifiers and key codes, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Examples:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Shortcuts are registered with the [`globalShortcut`](global-shortcut.md) module using the [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) method, i.e.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Platform notice

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Modificadores disponibles

* `Comando` (o `Cmd` resumido)
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