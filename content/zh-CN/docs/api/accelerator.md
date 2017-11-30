# Accelerator

> 定义键盘快捷键。

Accelerator 由字符串组成，可以包含多个修饰符和键码，由+字符组合，用于在整个应用程序中定义键盘快捷键。

示例

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

快捷方式使用 [` register `](global-shortcut.md#globalshortcutregisteraccelerator-callback) 方法在 [` globalShortcut `](global-shortcut.md) 模块中注册, 即:

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## 跨平台提醒

在 Linux 和 Windows 上, ` Command ` 键没有任何效果, 所以使用 ` CommandOrControl `表述, macOS 是 ` Command ` ，在 Linux 和 Windows 上是` Control `。

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