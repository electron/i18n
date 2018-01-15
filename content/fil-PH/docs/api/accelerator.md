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

Gumamit ng `Alt` sa halip ng `Option`. Ang `Option` na key ginagamit lamang sa macOS, samantalang ang `Alt` na key ay nasa lahat ng mga platform.

Ang `Super` na key ay nakatalaga sa `Windows` na key sa Windows at Linux at `Cmd` sa macOS.

## Magagamit na mga Modifier

* `Command` (o `Cmd` para maikli)
* `Control` (o `Ctrl` para maikli)
* `CommandOrControl` (o `CmdOrCtrl` para maikli)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Magagamit na mga Key Code

* `` hanggang `9`
* `A` hanggang `Z`
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