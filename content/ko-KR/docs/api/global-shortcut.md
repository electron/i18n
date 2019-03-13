# globalShortcut

> Detect keyboard events when the application does not have keyboard focus.

프로세스:[Main](../glossary.md#main-process)

The `globalShortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.

**Note:** The shortcut is global; it will work even if the app does not have the keyboard focus. You should not use this module until the `ready` event of the app module is emitted.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // 'CommandOrControl+X' 단축키 리스너 등록
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X 눌러짐.')
  })

  if (!ret) {
    console.log('등록 실패')
  }

  // 단축키가 등록되었는지 확인합니다.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // 단축키를 등록 해제합니다.
  globalShortcut.unregister('CommandOrControl+X')

  // 모든 단축키를 등록 해제합니다.
  globalShortcut.unregisterAll()
})
```

## 메서드

The `globalShortcut` module has the following methods:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

` accelerator`의 전역 단축키를 등록합니다. `callback`은 등록된 단축키가 사용자에 의해서 눌러졌을 때 호출합니다.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

`Boolean`을 반환합니다. - 애플리케이션이 `accelerator`를 등록했는지에 대한 여부입니다.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

` accelerator`의 전역 단축키를 등록 해제합니다.

### `globalShortcut.unregisterAll()`

모든 전역 단축키를 등록 해제합니다.