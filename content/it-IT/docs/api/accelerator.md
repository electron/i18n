# Acceleratore

> Definisci scorciatoie tastiera.

Gli acceleratori sono stringhe che possono contenere modificatori multipli e codici chiave combinati dal carattere `+` ed usate per definire le scorciatoie della tastiera attraverso la tua applicazione.

Esempi:

* `ComandoOControllo+A`
* `ComandoOControllo+Shift+A`

Le scorciatoie sono registrate con il modulo [`Scorciatoiaglobale`](global-shortcut.md) usando il metodo [`registra`](global-shortcut.md#globalshortcutregisteraccelerator-callback).

```javascript
const {app, globalShortcut} = richiedi('electron')

App.on('pronto', () => {
 // Registra una scorciatoia d'ascolto 'ComandoOControllo+Y'.
  registro.Scorciatoiaglobale('ComandoOControllo+Y', () => {
   // Fai azioni con Y ed entrambi i Comando/Contollo premuti.
  })
})
```

## Avviso piattaforma

Su Linux e Windows, la chiave `Comando` non ha effetto quindi usa `ComandoOControllo` che rappresenta `Comando` su macOS e `Controllo` su Linux e Windows per definire alcuni acceleratori.

Usa `Alt` al posto di `Opzione`. La chiave `opzione` esiste solo su macOS mentre la chiave `Alt` è disponibile su tutte le piattaforme.

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