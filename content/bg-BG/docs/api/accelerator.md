# Ускорител

> Определяне на клавишни комбинации.

Ускорители са низове, които могат да съдържат множество модификатори и ключови кодове, комбинирани със символа `+`, като се използват за определяне на клавишни комбинации в приложението.

Примери:

* `CommandOrControl + A`
* `CommandOrControl + Shift + Z`

Клавишните комбинации са регистрирани с модула [`globalShortcut`](global-shortcut.md), използвайки метода [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), т.е.

```javascript
const {app, globalShortcut} = require('electron')
app.on('ready', () => {
   // Слуша за 'CommandOrControl+Y' клависна команда.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Platform notice

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