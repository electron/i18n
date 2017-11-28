# globalShortcut

> Виявляє клавіатурні події навіть якщо програма зараз не у фокусі.

Процес: [Main](../glossary.md#main-process)

Модуль `globalShortcut` може зареєструвати/скасувати реєстрацію глобального сполучення клавіш в операційній системі, тож ви можете налаштувати операції для різних сполучень клавіш.

**Примітка:** Це сполучення клавіш глобальне; воно буде працювати навіть якщо програма зараз не у фокусі. Ви не повинні використовувати цей модуль, поки не відбудеться Подія `ready`.

```javascript
const {app, globalShortcut} = require('electron')

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

## Методи

Модуль `GlobalShortcut` має такі методи:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Функція

Реєструє глобальне сполучення клавіш `accelerator`. `callback` буде викликаний коли зареєстроване сполучення клавіш буде натиснуте користувачем.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Повертає `Boolean` - Якщо додаток має зареєстрований `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Скасовує реєстрацію глобального сполучення клавіш `accelerator`.

### `globalShortcut.unregisterAll()`

Скасовує реєстрацію всіх глобальних сполучень клавіш.