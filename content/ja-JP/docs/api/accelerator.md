# Accelerator

> キーボードショートカットを定義します。

Accelerator は、`+` によって結合された複数の修飾キーとキーコードを含む文字列で、アプリケーション全体でキーボードショートカットを定義するために使われます。

例:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

以下のようにショートカットは [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) メソッドを使って [`globalShortcut`](global-shortcut.md) モジュールに登録されます。

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // 'CommandOrControl+Y' をショートカットリスナーに登録します。
  globalShortcut.register('CommandOrControl+Y', () => {
    // Y と Command/Control のいずれかが押下されると、処理を行います。
  })
})
```

## プラットフォームに関する注意事項

LinuxとWindowsの場合、`Command` キーは効果がないため、Acceleratorを定義するため、macOSでは `Command`、LinuxとWindowsでは `Control` を表す `CommandOrControl` を使うようにしてください。

`Option` の代わりに `Alt` を使うようにしてください。`Option` キーはmacOSにしか存在しませんが、`Alt` キーは全てのプラットフォームで利用可能です。

`Super` キーは、WindowsとLinuxの場合、`Windows` キー、macOSの場合、`Cmd` にマッピングされます。

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
* `Plus`
* `Space`
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