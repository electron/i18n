# Aceleradores

> Definem atalhos de teclado.

Aceleradores são Strings que podem conter múltiplos modificadores e um código de teclas combinados pelo '`+`' e que são utilizados para definir atalhos de teclado para sua aplicação.

Exemplos:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Os atalhos são registrados com o módulo [`globalShortcut`](global-shortcut.md) usando o método [`registrar`](global-shortcut.md#globalshortcutregisteraccelerator-callback), ou seja:

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
  // Fazer algo quando Y e Command ou Control forem pressionados.
  }) 
})
```

## Aviso de plataforma

No Linux e no Windows, a tecla `Command` não tem nenhum efeito, então, para definir alguns aceleradores é recomendado utilizar `CommandOrControl` que representa `Command` no macOS e `Control` no Linux e no Windows.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` (or `Meta`) key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Modificadores disponíveis

* `Command` (ou `Cmd`)
* `Control` (ou `Ctrl`)
* `CommandOrControl` (ou `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`
* `Meta`

## Códigos de tecla disponíveis

* `0` a `9`
* `A` a `Z`
* `F1` a `F24`
* Punctuation like `~`, `!`, `@`, `#`, `$`, etc.
* `Plus (+)`
* `Space (Espaço)`
* `Tab`
* `CapsLock`
* `NumLock`
* `Scrolllock`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (ou `Enter`)
* `Up`, `Down`, `Left` e `Right` (Setas do teclado: cima, baixo, esquerda e direita respectivamente)
* `Home` e `End`
* `PageUp` e `PageDown`
* `Escape` (ou `Esc`)
* `VolumeUp`, `VolumeDown` e `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` e `MediaPlayPause`
* `PrintScreen`
* Teclas numéricas
  * `num0` - `num9`
  * `numdec` - tecla decimal
  * `numadd` - tecla `+`
  * `numsub` - tecla `-`
  * `nummult` - tecla `*`
  * `numdiv` - tecla `÷`
