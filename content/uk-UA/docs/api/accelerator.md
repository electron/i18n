# Accelerator

> Define keyboard shortcuts.

Accelerators are Strings that can contain multiple modifiers and key codes, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Приклади:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Shortcuts are registered with the [`globalShortcut`](global-shortcut.md) module using the [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) method, i.e.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Platform notice

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Доступні модифікатори

* `Command` (або скорочено `Cmd`)
* `Control` (або скорочено `Ctrl`)
* `CommandOrControl` (або скорочено `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Доступні коди клавіш

* Від `` до `9`
* Від `A` до `Z`
* Від `F1` до `F24`
* Символи пунктуації як `~`, `!`, `@`, `#`, `$` і т.д.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (або `Enter` як псевдонім)
* `Up`, `Down`, `Left` та `Right`
* `Home` та `End`
* `PageUp` та `PageDown`
* `Escape` (або скорочено `Esc`)
* `VolumeUp`, `VolumeDown` та `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` та `MediaPlayPause`
* `PrintScreen`