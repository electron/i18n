# evrenselKısayol

> Uygulamanın klavye odağı olmadığı zaman klavye etkinliklerini algılar.

İşlem: [Ana](../glossary.md#main-process)

`globalShortcut` modülü bir evrensel kısayolu işletim sistemi ile kaydedebilir/kaydetmeyebilir bu sayede çeşitli kısayollar için işlemleri özelleştirebilirsiniz.

**Note:** Kısayol evrenseldir; uygulamanın klavye odağı olmasa bile çalışacaktır. Uygulamanın modülünün `ready` etkinliği belirtilmeden bu modülü kullanmamalısınız.

```javascript
const {app, globalShortcut} = require('electron')

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

`accelerator`'ün bir evrensel kısayolunu kaydeder. `callback` kaydedilen kısayol kullanıcı tarafından tıklandığı zaman çağırılır.

Hızlandırıcı zaten diğer uygulamalar tarafından alınmışsa, bu çağrı sessizce başarısız olacaktır. Bu davranış işletim sistemleri tarafından seçilmiştir, uygulamaların evrensel kısayollarla uğraşmasını istemedikleri için.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.unregisterAll()`

Unregisters all of the global shortcuts.