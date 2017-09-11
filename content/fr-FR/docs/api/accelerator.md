# Accelerator

> Définit des raccourcis clavier.

Les accelerators sont des chaînes de caractères pouvant contenir plusieurs modificateurs et touches, combinés avec le caractère `+`. Ils sont utilisés pour définir des raccourcies clavier dans votre application.

Exemples :

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Les raccourcis sont enregistrés avec le module [`globalShortcut`](global-shortcut.md) en utilisant la méthode [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), c.-à-d.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Enregistre un écouteur de raccourci 'CommandOrControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Lance le code ici quand Y et Command/Control sont pressés en même temps.
  })
})
```

## Platform notice

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Modificateurs disponibles

* `Command` (ou `Cmd` pour faire court)
* `Control` (ou `Ctrl` pour faire court)
* `CommandOrControl` (ou `CmdOrCtrl` pour faire court)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Touches disponibles

* `` à `9`
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