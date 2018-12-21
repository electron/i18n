# globalShortcut

> Отслеживает действия на клавиатуре, когда она не сфокусирована на приложении.

Process: [Main](../glossary.md#main-process)

Модуль `globalShortcut` может регистрировать/отменять регистрацию глобальных сочетаний клавиш, так что вы можете настраивать задачи для различных сочетаний клавиш.

**Примечание:** Сочетания клавиш являются глобальными, они будут работать, даже если ваше приложение не акцентирует внимание на клавиатуре. **Примечание:** Вам не следует использовать данный модуль до тех пор, пока событие `ready` приложения не произошло.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Регистрируем слушатель для сочетания клавиш 'CommandOrControl+X'.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('ошибка регистрации')
  }

  // Проверяем, было ли сочетание зарегистрировано.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Отменяем регистрацию сочетания клавиш.
  globalShortcut.unregister('CommandOrControl+X')

  // Отменяем регистрацию всех сочетаний.
  globalShortcut.unregisterAll()
})
```

## Методы

Модуль `globalShortcut` имеет следующие методы:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

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