# Accelerator

> Определите сочетания клавиш.

Акселераторы - строки, которые могут содержать множество модификаторов и код одной клавиши, комбинированные символом `+`, и используются для определения сочетания клавиш по всему приложению.

Примеры:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Сочетания клавиш регистрируются с помощью модуля [`globalShortcut`](global-shortcut.md), используя метод [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), т.е.

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Сделайте что-нибудь, когда Y и Command/Control нажаты.
  })
})
```

## Платформа заметок

На Linux и Windows, клавиша `Command` не имеет никакого эффекта, так что используйте `CommandOrControl`, который представляет собой `Command` на macOS и `Control` на Linux и Windows для определения некоторых акселераторов.

Используйте `Alt` вместо `опции`. Клавиша `Option` существует только на macOS, в то время как клавиша `Alt` доступна на всех платформах.

The `Super` (or `Meta`) key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Доступные модификаторы

* `Command` (или `Cmd` для краткости)
* `Control` (или `Ctrl` для краткости)
* `CommandOrControl` (или `CmdOrCtrl` для краткости)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`
* `Meta`

## Доступные коды клавиш

* `0` - `9`
* `A` - `Z`
* `F1` - `F24`
* Символы `~`, `!`, `@`, `#`, `$` и т.д.
* `Plus`
* `Space`
* `Tab`
* `Capslock`
* `Numlock`
* `Scrolllock`
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
* NumPad клавиши
  * `num0` - `num9`
  * `numdec` - клавиша десятичный разделитель
  * `numadd` - клавиша `+` на numpad
  * `numsub` - клавиша `-` на numpad
  * `nummult` - клавиша `*` на numpad
  * `numdiv` - клавиша `÷` на numpad
