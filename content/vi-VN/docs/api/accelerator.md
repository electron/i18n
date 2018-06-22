# Accelerator

> Định phím tắt.

Phím tắt được định nghĩa bởi các chuỗi kí tự – String, những chuỗi này có thể bao gồm một hoặc nhiều các phím biến đổi – modifiers như Ctrl/Alt/Shift hoặc mã phím – key codes bằng cách sử dụng kí tự `+` để kết hợp.

Ví dụ:

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

* `0` đến `9`
* `A` đến `Z`
* `F1` đến `F24`
* Các dấu câu như `~`, `!`, `@`, `#`, `$`, vâng vâng.
* `Cộng`
* `Dấu cách`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* Phím `Return` (hoặc phím `Enter`)
* `Lên`, `Xuống`, `Trái` và `Phải`
* `Home` và `End`
* `PageUp` và `PageDown`
* Phím `Escape` (hoặc phím `Esc`)
* `VolumeUp`, `VolumeDown` and `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
* `PrintScreen`