# アクセラレータ

> 使用可能なキーボードショートカット

Accelerators are Strings that can contain multiple modifiers and key codes, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

例：

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

## プラットフォーム通知

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## 使用可能な修飾子

* `Command` (または略して `Cmd`)
* `Control` (または略して `Ctrl`)
* `CommandOrControl` (または略して `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## 利用可能なキーコード

* `` から `9`
* `A` から `Z`
* `F1` から `F24`
* `~`, `!`, `@`, `#`, `$`, などのような句読点
* `プラス`
* `スペース`
* `タブ`
* `バックスペース`
* `Delete`
* `Insert`
* `Return` (またはエイリアスとして `Enter`)
* `Up` と `Down`、 `Left`、 `Right`
* `Home` と `End`
* `PageUp` と `PageDown`
* `Escape` (または略して `Esc`)
* `VolumeUp` と `VolumeDown`、 `VolumeMute`
* `MediaNextTrack` と `MediaPreviousTrack`、 `MediaStop`、 `MediaPlayPause`
* `PrintScreen`