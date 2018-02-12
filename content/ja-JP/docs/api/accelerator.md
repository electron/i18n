# アクセラレータ

> キーボードショートカットを定義します。

アクセラレータは、`+` によって結合された複数の修飾キーとキーコードを含む文字列で、アプリケーション全体でキーボードショートカットを定義するために使われます。

例:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

以下のようにショートカットは [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) メソッドを使って [`globalShortcut`](global-shortcut.md) モジュールに登録されます。

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // 'CommandOrControl+Y' ショートカットリスナーに登録します。
  globalShortcut.register('CommandOrControl+Y', () => {
    // Y と Command/Control のいずれかが押下されると、処理を行います。
  })
})
```

## プラットフォームごとの通知

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## 利用可能な修飾キー

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
* `~`、`!`、`@`、`#`、`$` などの記号。
* `プラス`
* `スペース`
* `Tab`
* `Backspace`
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