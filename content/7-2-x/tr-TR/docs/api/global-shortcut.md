# evrenselKısayol

> Uygulamanın klavye odağı olmadığı zaman klavye etkinliklerini algılar.

İşlem: [Ana](../glossary.md#main-process)

`globalShortcut` modülü bir evrensel kısayolu işletim sistemi ile kaydedebilir/kaydetmeyebilir bu sayede çeşitli kısayollar için işlemleri özelleştirebilirsiniz.

**Note:** Kısayol evrenseldir; uygulamanın klavye odağı olmasa bile çalışacaktır. Uygulamanın modülünün `ready` etkinliği belirtilmeden bu modülü kullanmamalısınız.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
```

## Yöntemler

`globalShortcut` modülü aşağıdaki yöntemlere sahiptir:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Returns `Boolean` - Whether or not the shortcut was registered successfully.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

Hızlandırıcı zaten diğer uygulamalar tarafından alınmışsa, bu çağrı sessizce başarısız olacaktır. Bu davranış işletim sistemleri tarafından seçilmiştir, uygulamaların evrensel kısayollarla uğraşmasını istemedikleri için.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - an array of [Accelerator](accelerator.md)s.
* `callback` Function

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

When a given accelerator is already taken by other applications, this call will silently fail. Bu davranış işletim sistemleri tarafından seçilmiştir, uygulamaların evrensel kısayollarla uğraşmasını istemedikleri için.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

`Boolean`'a döner - Bu uygulamanın `accelerator`'ü kaydedip kaydetmediğine göre.

Hızlandırıcı zaten diğer uygulamalar tarafından alınmışsa, bu çağrı hala `false`'a dönecektir. Bu davranış işletim sistemleri tarafından seçilmiştir, uygulamaların evrensel kısayollarla uğraşmasını istemedikleri için.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

`accelerator` evrensel kısayolunun kaydını siler.

### `globalShortcut.unregisterAll()`

Bütün evrensel kısayol kayıtlarını siler.
