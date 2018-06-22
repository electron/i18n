# 快捷键

> 定义键盘快捷键。

Accelerator 由字符串组成，可以包含多个修饰符和键码，由 `+` 字符组合，用于在整个应用程序中定义键盘快捷键。

示例:

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

使用 `Alt` 代替`Option`. `Option` 键只在 macOS 系统上存在, 而 `Alt` 键在任何系统上都有效.

`Super`键是指 Windows 和 Linux 系统上的 `Windows` 键，但在 macOS 里为 `Cmd` 键.

## 可用的功能键

* `Command` (缩写为`Cmd`)
* `Control` (缩写为`Ctrl`)
* `CommandOrControl` (缩写为 `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## 可用的普通按键

* `0` to `9`
* `A` to `Z`
* `F1` to `F24`
* 类似`~`, `!`, `@`, `#`, `$`的标点符号
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (等同于 `Enter`)
* `Up`, `Down`, `Left` and `Right`
* `Home` 和 `End`
* `PageUp` 和 `PageDown`
* `Escape` (缩写为 `Esc`)
* `VolumeUp`, `VolumeDown` 和 `VolumeMute`
* ` MediaNextTrack `、` MediaPreviousTrack `、` MediaStop ` 和 ` MediaPlayPause `
* `PrintScreen`