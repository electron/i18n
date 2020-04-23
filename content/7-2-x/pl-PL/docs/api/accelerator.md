# Akcelerator

> Definiowanie skrótów klawiaturowych.

Akceleratory są to ciągi znaków typu String, które mogą zawierać wiele modyfikatorów oraz kod klawiszy, połączonych przez znak `+` i są używane do definiowania skrótów klawiaturowych w całej aplikacji.

Przykłady:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Skróty są zarejestrowane z modułem [`globalShortcut`](global-shortcut.md), za pomocą metody [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), tj.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Uwagi do platform

Na systemach Linux oraz Windows klawisz `Command` nie ma żadnego wpływu, więc należy używać `CommandOrControl`, który reprezentuje `command` na systemie macOS i `control` na systemach Linux oraz Windows, aby zdefiniować niektóre akceleratory.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

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

* od `0` do `9`
* od `A` do `Z`
* od `F1` do `F24`
* Znaki interpunkcyjne takie jak `~`, `!`, `@`, `nr`, `` $, itp.
* `Plus`
* `Space`
* `Tab`
* `Capslock`
* `Numlock`
* `Scrolllock`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (lub `Enter` jako alias)
* strzałki `Up`, `Down`, `Left` oraz `Right`
* `Home` oraz `End`
* `PageUp` oraz `PageDown`
* `Escape` (albo`Esc` w skrócie)
* `VolumeUp`, `VolumeDown` i `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` i `MediaPlayPause`
* `PrintScreen`
* Klawisze numeryczne
  * `num0` - `num9`
  * `numdec` - klawisz cyfry
  * `numadd` - klawisz `+`
  * `numsub` - klawisz `-`
  * `nummult` - klawisz `*`
  * `numdiv` - klawisz `/`
