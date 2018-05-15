# Accelerator

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

* Da `` a `9`
* Da `A` a `Z`
* Da `F1` a `F24`
* Punteggiature come `~`, `!`, `@`, `#`, `$`, etc.
* `Più`
* `Spazio`
* `Tab`
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