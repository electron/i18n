# globalShortcut

> Отслеживает действия на клавиатуре, когда она не сфокусирована на приложении.

Процесс: [Основной](../glossary.md#main-process)

Модуль `globalShortcut` может регистрировать/отменять регистрацию глобальных сочетаний клавиш, так что вы можете настраивать задачи для различных сочетаний клавиш.

**Примечание:** Сочетания клавиш являются глобальными, они будут работать, даже если ваше приложение не акцентирует внимание на клавиатуре. Этот модуль не может быть использован `ready` до того, как будет излучается событие модуля приложения.

```javascript
const { app, globalShortcut } требуют ('электрон')

app.whenReady ().,тогда ((()>
  // Зарегистрируйте слушателя ярлыка 'CommandOrControl'X'.
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

Регистрирует глобальный ярлык `accelerator`. Имя `callback` , когда зарегистрированный ярлык нажат пользователем.

Когда accelerator уже занят другими приложениями, этот вызов будет молча завершаться ошибкой. Такое поведение назначается операционными системами, поскольку они не хотят, чтобы приложения боролись за глобальные сочетания клавиш.

Следующие accelerators не будут успешно зарегистрированы на macOS 10.14 Mojave, если приложение не было авторизовано в качестве [доверенного клиента специальных возможностей](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - массив [Accelerator](accelerator.md).
* `callback` Function

Регистрирует глобальный ярлык всех `accelerator` в `accelerators`. Время `callback` , когда любой из зарегистрированных ярлыков нажат пользователем.

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
