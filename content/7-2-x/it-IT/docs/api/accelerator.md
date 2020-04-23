# Accelerator

> Definisci scorciatoie tastiera.

Gli Accelerators sono Stringhe che possono contenere modificatori multipli e una singola chiave, combinati dal carattere `+`, e sono usate per definire delle scorciatoie della tastiera per tutta la tua applicazione.

Esempi:

* `ComandoOControllo+A`
* `ComandoOControllo+Shift+A`

Le scorciatoie sono registrate con il modulo [`Scorciatoiaglobale`](global-shortcut.md) usando il metodo [`registra`](global-shortcut.md#globalshortcutregisteraccelerator-callback).

```javascript
const { app, globalShortcut } = require('electron')
    
    app.on('ready', () => {
      // Register a 'CommandOrControl+Y' shortcut listener.

  registro.Scorciatoiaglobale('ComandoOControllo+Y', () => {
   // Fai azioni con Y ed entrambi i Comando/Contollo premuti.
  })
})
```

## Avviso piattaforma

Su Linux e Windows, la chiave `Comando` non ha effetto quindi usa `ComandoOControllo` che rappresenta `Comando` su macOS e `Controllo` su Linux e Windows per definire alcuni acceleratori.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

La chiave `Super` è mappata alla chiave `Windows` per Windows e Linux e `Cmd` su macOS.

## Modificatori disponibili

* `Comando` (o `Cmd` in breve)
* `Controllo` (o`Ctrl` in breve)
* `ComandoOControllo` (o `CmdOCtrl` in breve)
* `Alt`
* `Opzione`
* `AltGr`
* `Shift`
* `Super`

## Codici chiave disponibili

* Da `0` a `9`
* Da `A` a `Z`
* Da `F1` a `F24`
* Punteggiature come `~`, `!`, `@`, `#`, `$`, etc.
* `Più`
* `Spazio`
* `Tab`
* `Capslock`
* `Numlock`
* `Scrolllock`
* `Backspace`
* `Cancella`
* `Inserisci`
* `Indietro` (o `Entra` come alternativa)
* `Su`, `Giù`, `Sinistra` e `Destra`
* `Home` e `Fine`
* `PaginaSu` e `PaginaGiù`
* `Escape` (abbreviato `Esc`)
* `VolumeSu`, `VolumeGiù` e `VolumeMuto`
* `MediaProssimaTraccia`, `MediaPrecedenteTraccia`, `MediaStop` e `MediaPlayPausa`
* `StampaSchermo`
* NumPad Keys
  * `num0` - `num9`
  * `numdec` - decimal key
  * `numadd` - numpad `+` key
  * `numsub` - numpad `-` key
  * `nummult` - numpad `*` key
  * `numdiv` - numpad `÷` key
