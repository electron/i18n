# 快速鍵

> 定義鍵盤快速鍵。

Accelerators are Strings that can contain multiple modifiers and key codes, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

範例:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Shortcuts are registered with the [`globalShortcut`](global-shortcut.md) module using the [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) method, i.e.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // 註冊 'CommandOrControl+Y' 快捷鍵監聽器。
  globalShortcut.register('CommandOrControl+Y', () => {
    // 做同時按 Y 和 Command 跟 Control 其中一個鍵時要做的事。
  })
})
```

## 平臺注意事項

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Available modifiers

* `Command` (或縮寫成 `Cmd`)
* `Control` (或縮寫成 `Ctrl`)
* `CommandOrControl` (或縮寫成 `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## 能用的按鍵碼

* `0` 到 `9`
* `A` 到 `Z`
* `F1` 到 `F24`
* `~`, `!`, `@`, `#`, `$` 等半型標點符號。
* `<code>Plus` (加號)</code>
* `<code>Space` (空白鍵)</code>
* `Tab`
* `<code>Backspace` (倒退)</code>
* `Delete`
* `Insert (插入)`
* `Return` (也可寫成 `Enter`)
* `Up` (上), `Down` (下), `Left` (左) 及 `Right` (右)
* `Home` 及 `End`
* `PageUp` 及 `PageDown`
* `Escape` (或縮寫成 `Esc`)
* `VolumeUp`, `VolumeDown` 及 `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` 及 `MediaPlayPause`
* `PrintScreen`