# globalShortcut

> 在應用程式沒有取得鍵盤焦點的情況下偵測鍵盤事件。

處理序: [主處理序](../glossary.md#main-process)

The `globalShortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.

**Note:** The shortcut is global; it will work even if the app does not have the keyboard focus. You should not use this module until the `ready` event of the app module is emitted.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // 註冊 'CommandOrControl+X' 快速鍵監聽器。
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X 被按了')
  })

  if (!ret) {
    console.log('註冊失敗')
  }

  // 檢查快速鍵是否註冊成功。
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // 取消註冊快速鍵。
  globalShortcut.unregister('CommandOrControl+X')

  // 取消註冊所有快速鍵。
  globalShortcut.unregisterAll()
})
```

## 方法

The `globalShortcut` module has the following methods:

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