# Aselerador

> Ipaliwanag ang mga shortcut ng keyboard.

Ang aselerador ay mga String na maaaring naglalaman ng maramihang mga modifier at mga key code, na pinagsama sa pamamagitan ng `+` na character, at ginamit upang ipaliwanag ang mga shortcut ng keyboard sa kabuuan ng iyong aplikasyon.

Mga Halimbawa:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Ang mga shortcut ay irehistro kasabay ang modyul ng [`globalShortcut`](global-shortcut.md) na gamit ang paraan ng [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), i.e.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Magrehistro ng isang 'CommandOrControl+Y' mga tagapakinig ng shortcut.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Gumawa ng bagay-bagay kapag ang Y at alinman sa Command/Control ay napindot na.
  })
})
```

## Paunawa sa Platform

Sa Linux at Windows, ang key na `Command` ay walang anumang epekto kaya dapat gamitin ang `CommandOrControl` na kumakatawan sa mga `Command` sa macOS at `Control` sa Linux at Windows upang bigyang kahulugan ang ilang mga aselerador.

Gamitin ang `Alt` sa halip na `Option`. Ang key na `Option` ay umiiral lamang sa macOS, samantalang ang key ng `Alt` ay magagamit sa lahat ng mga platform.

Ang key ng `Super` ay naka-balangkas sa key ng `Windows` sa Windows at Linux at `Cmd` naman sa macOS.

## Ang magagamit na mga modifier

* `Command` (o `Cmd` kapag pinaikli)
* `Control` (o `Ctrl` kapag pinaikli)
* `CommandOrControl` (o `CmdOrCtrl` kapag pinaikli)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Ang mga key code na magagamit

* Mula `0` hanggang `9`
* Mula `A` hanggang `Z`
* Mula `F1` hanggang `F24`
* Mga bantas tulad ng `~`, `!`, `@`, `#`, `$`, atbp.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (o `Enter` bilang alyas)
* `Up`, `Down`, `Left`, at `Right`
* `Home` at `End`
* `PageUp` at `PageDown`
* `Escape` (o `Esc` kapag pinaikli)
* `VolumeUp`, `VolumeDown` at `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` at `MediaPlayPause`
* `PrintScreen`