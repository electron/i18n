# globalShortcut

> Отслеживает действия на клавиатуре, когда она не сфокусирована на приложении.

Процесс: [Главный](../glossary.md#main-process)

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

Возвращает `Boolean` - было ли сочетание клавиш успешно зарегистрировано.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

Когда accelerator уже занят другими приложениями, этот вызов будет молча завершаться ошибкой. Такое поведение назначается операционными системами, поскольку они не хотят, чтобы приложения боролись за глобальные сочетания клавиш.

Следующие accelerators не будут успешно зарегистрированы на macOS 10.14 Mojave, если приложение не было авторизовано в качестве [доверенного клиента специальных возможностей](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - массив [Accelerator](accelerator.md).
* `callback` Function

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

Когда определенный accelerator уже занят другими приложениями, этот вызов будет молча завершаться ошибкой. Такое поведение назначается операционными системами, поскольку они не хотят, чтобы приложения боролись за глобальные сочетания клавиш.

Следующие accelerators не будут успешно зарегистрированы на macOS 10.14 Mojave, если приложение не было авторизовано в качестве [доверенного клиента специальных возможностей](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Возвращает `Boolean` - независимо от того, зарегистрировало ли это приложение `accelerator`.

Когда ускоритель уже занят другими приложениями, этот вызов будет возвращать `false`. Такое поведение назначается операционными системами, поскольку они не хотят, чтобы приложения боролись за глобальные сочетания клавиш.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Отмена регистрации сочетания клавиш `accelerator`.

### `globalShortcut.unregisterAll()`

Отменяет регистрацию всех глобальных ярлыков.
