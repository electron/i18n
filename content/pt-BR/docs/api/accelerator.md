# Aceleradores

> Definem atalhos de teclado.

Aceleradores são Strings que podem conter múltiplos modificadores e códigos de teclas combinados pelo '`+`' e que são utilizados para definir atalhos de teclado para sua aplicação.

Exemplos:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Os atalhos são registrados com o módulo [`globalShortcut`](global-shortcut.md) usando o método [`registrar`](global-shortcut.md#globalshortcutregisteraccelerator-callback), ou seja:

```javascript
const {app, globalShortcut} = require('electron') app.on('ready', () => {   // Registrar um 'listener' para o atalho 'CommandOrControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {     //  Fazer algo quando Y e Command ou Control forem pressionados.
  }) 
})
```

## Aviso de plataforma

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Available modifiers

* `Command` (or `Cmd` for short)
* `Control` (or `Ctrl` for short)
* `CommandOrControl` (or `CmdOrCtrl` for short)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Available key codes

* `` to `9`
* `A` to `Z`
* `F1` to `F24`
* Punctuations like `~`, `!`, `@`, `#`, `$`, etc.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (or `Enter` as alias)
* `Up`, `Down`, `Left` and `Right`
* `Home` and `End`
* `PageUp` and `PageDown`
* `Escape` (or `Esc` for short)
* `VolumeUp`, `VolumeDown` and `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
* `PrintScreen`