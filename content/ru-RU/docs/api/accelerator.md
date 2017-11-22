# Accelerator

> Определить сочетания клавиш.

Ускорители - это Strings, которые могут содержать несколько модификаторов, коды клавиш и комбинироваться символом `+`, используются определения сочетаний клавиш на протяжении всего приложения.

Примеры:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Сочетания клавиш регистрируются с помощью модуля [`globalShortcut`](global-shortcut.md) используя метод [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), т.е.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Регистрация 'CommandOrControl+Y' слушателя шортката.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Сделайте что-нибудь, когда Y и Command/Control нажата.
  })
})
```

## Платформа заметок

На Linux и Windows, `Command` ключ не имеет никакого эффекта, так используйте `CommandOrControl` который представляет собой `Command` на MacOS и `Control` на Linux и Windows для определения некоторых ускорителей.

Используйте `Alt` вместо `Option`. Ключ `Option` существует только на MacOS, в то время как ключ`Alt` доступен на всех платформах.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Доступные модификаторы

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