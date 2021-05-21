# Accelerator

> キーボードショートカットを定義します。

Accelerator は、`+` によって結合された複数の修飾キーと単一のキーコードを含む文字列で、アプリケーション全体でキーボードショートカットを定義するために使われます。

例:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

以下のようにショートカットは [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) メソッドを使って [`globalShortcut`](global-shortcut.md) モジュールに登録されます。

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Y と Command/Control が押下されたときに処理を行います。
  })
})
```

## プラットフォームに関する注意事項

Linux と Windows の場合、`Command` キーは効果がありません。Accelerator を定義するのに、macOS では `Command`、Linux と Windows では `Control` を表す、`CommandOrControl` を使うようにしてください。

`Option` ではなく `Alt` を使用してください。 `Option` キーは macOS にしか存在しませんが、`Alt` キーは全てのプラットフォームで利用可能です。

`Super` (または `Meta`) キーは、WindowsとLinuxの場合は `Windows` キー、macOSの場合は `Cmd` にマッピングされます。

## 利用可能な修飾キー

* `Command` (または略して `Cmd`)
* `Control` (または略して `Ctrl`)
* `CommandOrControl` (または略して `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`
* `メタ情報`

## 利用可能なキーコード

* `0` から `9`
* `A` から `Z`
* `F1` から `F24`
* `~`、`!`、`@`、`#`、`$` などの記号
* `Plus`
* `Space`
* `Tab`
* `Capslock`
* `Numlock`
* `Scrolllock`
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
* NumPad Keys
  * `num0` から `num9`
  * `numdec` - 数字キー
  * `numadd` - テンキーの `+` キー
  * `numsub` - テンキーの `-` キー
  * `nummult` - テンキーの `*` キー
  * `numdiv` - テンキーの `÷` キー
