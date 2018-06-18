# Accelerator

> Определить сочетания клавиш.

Ускорители - это строки, которые могут содержать несколько модификаторов, коды клавиш и комбинироваться символом `+`, используются для определения сочетаний клавиш на протяжении всего приложения.

Примеры:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Сочетания клавиш регистрируются с помощью модуля [`globalShortcut`](global-shortcut.md) используя метод [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), т.е.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Регистрация слушателя сочетания клавиш 'CommandOrControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Сделайте что-нибудь, когда Y и Command/Control нажата.
  })
})
```

## Платформа заметок

На Linux и Windows, ключ `Command` не имеет никакого эффекта, так что используйте `CommandOrControl`, который представляет собой `Command` на MacOS и `Control` на Linux и Windows для определения некоторых ускорителей.

Используйте `Alt` вместо `Option`. Ключ `Option` существует только на MacOS, в то время как ключ`Alt` доступен на всех платформах.

Клавиша `Super` сопоставляется с клавишей `Windows` в Windows и Linux и `Cmd` на macOS.

## Доступные модификаторы

* `Command` (или `Cmd` для краткости)
* `Control` (или `Ctrl` для краткости)
* `CommandOrControl` (или `CmdOrCtrl` для краткости)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Доступные коды клавиш

* `0(нуль)` - `9`
* `A` - `Z`
* `F1` - `F24`
* Символы пунктуации, например `~`, `!`, `@`, `#`, `$`, т.д.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (или `Enter` как псевдоним)
* `Up`, `Down`, `Left` и `Right`
* `Home` и `End`
* `PageUp` и `PageDown`
* `Escape` (или `Esc` для краткости)
* `VolumeUp`, `VolumeDown` и `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` и `MediaPlayPause`
* `PrintScreen`