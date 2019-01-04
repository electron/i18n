# globalShortcut

> Виявляє клавіатурні події навіть якщо програма зараз не у фокусі.

Процес: [Main](../glossary.md#main-process)

Модуль `globalShortcut` може зареєструвати/скасувати реєстрацію глобального сполучення клавіш в операційній системі, тож ви можете налаштувати операції для різних сполучень клавіш.

**Примітка:** Це сполучення клавіш глобальне; воно буде працювати навіть якщо програма зараз не у фокусі. Ви не повинні використовувати цей модуль, поки не відбудеться Подія `ready`.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Реєстрація слухача сполучення клавіш 'CommandOrControl+X'.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X було натиснуто')
  })

  if (!ret) {
    console.log('реєстрація була невдалою')
  }

  // Перевірити чи сполучення клавіш зареєстровано.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Скасувати реєстрацію сполучення клавіш.
  globalShortcut.unregister('CommandOrControl+X')

  // Скасувати реєстрацію всіх сполучень клавіш.
  globalShortcut.unregisterAll()
})
```

## Методиa

Модуль `GlobalShortcut` має такі методи:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Реєструє глобальне сполучення клавіш `accelerator`. `callback` буде викликаний коли зареєстроване сполучення клавіш буде натиснуте користувачем.

Коли акселератор вже зайнятий іншою програмою, виклик просто не вдасться. Така поведінка призначена операційними системами, оскільки вони не хочуть, щоб програми конфліктували через глобальні комбінації клавіш.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Повертає `Boolean` - Якщо додаток має зареєстрований `accelerator`.

Коли акселератор вже зайнятий іншою програмою, виклик поверне `false`. Така поведінка призначена операційними системами, оскільки вони не хочуть, щоб програми конфліктували через глобальні комбінації клавіш.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Скасовує реєстрацію глобального сполучення клавіш `accelerator`.

### `globalShortcut.unregisterAll()`

Скасовує реєстрацію всіх глобальних сполучень клавіш.