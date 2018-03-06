# Accelerator

> Definiere Tastenkürzel

Accelerators are Strings that can contain multiple modifiers and key codes, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

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

* `` bis `9`
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