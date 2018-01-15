# Accelerator

> Itakda ang mga shortcut ng keyboard.

Ang accelerator ay mga String na mayroong maraming modifier at mga key code, na pinagsama ng `+` na character, at ginagamit upang itukoy ang mga keyboard shortcut ng iyong buong application.

Mga Halimbawa:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Ang mga shortcut ay irerehistro kasabay ng [`globalShortcut`](global-shortcut.md) module gamit ang [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) na method, i.e.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Irehistro ang isang 'Command OrControl+Y' shortcut na listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Gumawa ng mga bagay-bagay kapang ang Y at alinman sa Command o Control ang pinindot.
  })
})
```

## Paunawa sa Platform

Sa Linux at Windows, ang `Command` na key ay walang epekto kaya dapat gumamit ng `CommandOrControl` na nagrerepresenta ng `Command` sa macOS at `Control` sa Linux at Windows para italaga ang ibang mga accelerator.

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