# Accelerator

> Definiere Tastenkürzel

Acceleratoren sind String die mehrere Modifikatoren und einzelne Key Codes enthalten können. Diese werden mit einem `+` Zeichen verknüpft und werden dazu verwendet, Tastenkürzel für deine App zu definieren.

Beispiele:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Tastenkürzel werden registriert mit dem  [`globalShortcut`](global-shortcut.md) Modul durch die  [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) Methode, z.B.

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Hinweis zu Betriebssystemen

Unter Linux und Windows hat die `Command` Taste keinen Effekt, weshalb `CommandOrControl` benutzt werden sollte. Es repräsentiert  `Command` unter macOS und  `Control` unter Linux und Windows um Tastenkürzel zu definieren.

Verwenden Sie `Alt` anstelle von `Option`. `Option` existiert nur unter macOS, wohingegen `Alt` in allen Betriebssystemen verfügbar ist.

The `Super` (or `Meta`) key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Verfügbare Modifikatoren

* `Command` (oder kurz `Cmd`)
* `Control` (oder kurz `Ctrl`)
* `CommandOrControl` (oder kurz `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`
* `Meta`

## Verfügbare Tastencodes

* `0` bis `9`
* `A` bis `Z`
* `F1` bis `F24`
* Sonderzeichen wie `~`, `!`, `@`, `#`, `$`, etc.
* `Plus`
* `Space (Leerzeichen)`
* `Tab`
* `Capslock`
* `Numlock`
* `Scrolllock`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (Oder `Enter` als Alias)
* `Up`, `Down`, `Left` und `Right`
* `Home` und `End`
* `PageUp` und `PageDown`
* `Escape` (oder `Esc` als Abkürzung)
* `VolumeUp`, `VolumeDown` und `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` und `MediaPlayPause`
* `PrintScreen`
* NumPad-Tasten
  * `num0` - `num9`
  * `numdec` - decimal key
  * `numadd` - numpad `+` key
  * `numsub` - numpad `-` key
  * `nummult` - numpad `*` key
  * `numdiv` - numpad `÷` key
