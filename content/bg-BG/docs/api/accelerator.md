# Ускорител

> Определяне на клавишни комбинации.

Accelerators are Strings that can contain multiple modifiers and a single key code, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Примери:

* `CommandOrControl + A`
* `CommandOrControl + Shift + Z`

Клавишните комбинации са регистрирани с модула [`globalShortcut`](global-shortcut.md), използвайки метода [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), т.е.

```javascript
const {app, globalShortcut} = require('electron')
app.on('ready', () => {
   // Слуша за 'CommandOrControl+Y' клависна команда.
  globalShortcut.register('CommandOrControl+Y', () => {
     // Изпълнява се, когато Y и Command/Control са натиснати.
  })
})
```

## Известие от платформата

На Linux и Windows, клавиша `Command` няма ефект, така че използвайте `CommandOrControl`, която представлява `Command` на macOS и `Control` на Linux и Windows, за да дефинирате някои ускорители.

Използвайте `Alt` вместо `Option`. Клавиша `Option` съществува само на macOS, докато клавиша `Alt` е достъпнен за всички платформи.

Клавиша `Super` е свързан с клавиша `Windows` на Windows и Linux, а клавиша `Cmd` на macOS.

## Достъпни модификатори

* `Command` (или `Cmd` на кратко)
* `Control` (или `Ctrl` на кратко)
* `CommandOrControl` (или `CmdOrCtrl` на кратко)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Достъпни клавиши

* от `0` до `9`
* от `A` до `Z`
* от `F1` до `F24`
* Пунктуационни клавиши като `~`, `!`, `@`, `#`, `$`, и др.
* `+`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (или `Enter`)
* Стрелките `Up`, `Down`, `Left` и `Right`
* `Home` и `End`
* `PageUp` и `PageDown`
* `Escape` (или `Esc` на кратко)
* `VolumeUp`, `VolumeDown` и `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` и `MediaPlayPause`
* `PrintScreen`