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

No Linux e no Windows, a tecla `Command` não tem nenhum efeito, então, para definir alguns aceleradores é recomendado utilizar `CommandOrControl` que representa `Command` no macOS e `Control` no Linux e no Windows.

Utilize `Alt` ao invés de `Option`. A tecla `Option` só existe no macOS, em compensação, a tecla `Alt` está disponível em todas as plataformas.

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