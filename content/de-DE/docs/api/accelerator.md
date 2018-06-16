# Tastenkürzel

> Definiere Tastenkürzel

Acceleratoren sind Strings, welche mehrere Modifikatoren und Tastencodes enthalten. Sie werden mit dem `+` Zeichen kombiniert, und werden benutzt um Tastenkürzel in deiner App zu definieren.

Beispiele

* `[Cmd+A] oder [Ctrl+A]`
* `[Cmd+Shift+Z] oder [Ctrl+Shift+Z]`

Tastenkürzel werden registriert mit dem [`globalShortcut`](global-shortcut.md) Modul durch die [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) Methode.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Plattformdiversitäten

Unter Linux und Windows hat die `Command` Taste keinen Effekt, weshalb `CommandOrControl` benutzt werden sollte. Es repräsentiert `Command` unter macOS und `Control` unter Linux und Windows um Tastenkürzel zu definieren.

Benutze `Alt` statt `Option`. `Option` existiert nur unter macOS, wohingegen `Alt` auf allen Plattformen verfügbar ist.

`Super` ist auf die `Windows` Taste unter Windowsx und Linux gemappt. Unter macOS is es auf `Cmd` gemappt.

## Verfügbare Modifikatoren

* `Command` (or `Cmd` for short)
* `Control` (or `Ctrl` for short)
* `CommandOrControl` (or `CmdOrCtrl` for short)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Verfügbare Tastencodes

* `0` bis `9`
* `A` bis `Z`
* `F1` bis `F24`
* Sonderzeichen wie `~`, `!`, `@`, `#`, `$`, etc.
* `Plus`
* `Space`
* `Tab`
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