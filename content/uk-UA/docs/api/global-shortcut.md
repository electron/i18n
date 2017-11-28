# globalShortcut

> Detect keyboard events when the application does not have keyboard focus.

Process: [Main](../glossary.md#main-process)

The `globalShortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.

**Note:** The shortcut is global; it will work even if the app does not have the keyboard focus. You should not use this module until the `ready` event of the app module is emitted.

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

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
```

## Методи

Модуль `GlobalShortcut` має такі методи:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Функція

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.unregisterAll()`

Unregisters all of the global shortcuts.