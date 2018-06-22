# Accelerator

> Визначте гарячі клавіші.

Акселератори це стрічки, що можуть містити декілька модифікаторів і коди клавіш, поєднаних знаком `+`, використовуються для визначення гарячих клавіш у вашому застосунку.

Приклади:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Гарячі клавіші реєструються з допомогою модуля [`globalShortcut`](global-shortcut.md), використовуючи метод [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), тобто

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Реєстрація 'CommandOrControl+Y' слухача комбінації.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Виконати коли комбінація натиснута.
  })
})
```

## Зауваження

На Linux і Windows, клавіша `Command` не має ніякого впливу, тому використовуйте `CommandOrControl`, який являє собою `Command` на macOS та `Control` на Linux і Windows, для визначення акселераторів.

Використовуйте `Alt` замість `Option`. Клавіша `Option` існує тільки на macOS, тоді як клавіша `Alt` доступна на всіх платформах.

Клавіша `Super` відповідає клавіші `Windows` на Windows та Linux і `Cmd` на macOS.

## Доступні модифікатори

* `Command` (або скорочено `Cmd`)
* `Control` (або скорочено `Ctrl`)
* `CommandOrControl` (або скорочено `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Доступні коди клавіш

* Від `0` до `9`
* Від `A` до `Z`
* Від `F1` до `F24`
* Символи пунктуації такі як: `~`, `!`, `@`, `#`, `$` тощо.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (або `Enter` як псевдонім)
* `Up`, `Down`, `Left` та `Right`
* `Home` та `End`
* `PageUp` та `PageDown`
* `Escape` (або скорочено `Esc`)
* `VolumeUp`, `VolumeDown` та `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` та `MediaPlayPause`
* `PrintScreen`