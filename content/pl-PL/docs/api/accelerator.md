# Akcelerator

> Definiowanie skrótów klawiaturowych.

Akceleratory są to ciągi znaków typu String, które mogą zawierać wiele modyfikatorów i kodów klawiszy, połączonych przez znak `+` i są używane do definiowania skrótów klawiaturowych w całej aplikacji.

Przykłady:

* `CommandOrControl + A`
* `CommandOrControl + Shift + Z`

Skróty są zarejestrowane z modułem [`globalShortcut`](global-shortcut.md), za pomocą metody [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), tj.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Uwagi do platform

Na systemach Linux oraz Windows klawisz `Command` nie ma żadnego wpływu, więc należy używać `CommandOrControl`, który reprezentuje `command` na systemie macOS i `control` na systemach Linux oraz Windows, aby zdefiniować niektóre akceleratory.

Używaj `Alt` zamiast `Option`. Klawisz `Option` istnieje tylko na systemie macOS, mając na uwadze, że klawisz `Alt` jest dostępny na wszystkich systemach.

Klawisz `Super` jest mapowany do klawisza`Windows` w systemach Windows i Linux oraz jako `Cmd` na macOS.

## Dostępne modyfikatory

* `Command` (lub `Cmd` w skrócie)
* `Control` (lub `Ctrl` w skrócie)
* `CommandOrControl` (lub `CmdOrCtrl` w skrócie)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Dostępne kody klucza

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