# globalShortcut

> 애플리케이션이 키보드 포커스를 받고 있지 않고 있을 때 키보드 이벤트를 감지합니다.

프로세스:[Main](../glossary.md#main-process)

The `globalShortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.

**주의:** 단축키는 전역입니다; 앱이 키보드 포커스를 받고 있지 않을 때도 작동합니다. 앱 모듈의 `ready` 이벤트가 발생하기 전에 이 모듈을 사용하면 안 됩니다.

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

`globalShortcut` 모듈은 다음 매서드를 가지고 있습니다:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

` accelerator`의 전역 단축키를 등록합니다. `callback`은 등록된 단축키가 사용자에 의해서 눌러졌을 때 호출합니다.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

다음 accelerators는 macOS 10.14 Mojave에서 [신뢰 된 손쉬운 사용 클라이언트](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)로 등록되어 있지 않으면 성공적으로 등록되지 않습니다.

* "미디어 재생/일시 정지"
* "미디어 다음 트랙"
* "미디어 이전 트랙"
* "미디어 일시 정지"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

`Boolean`을 반환합니다. - 애플리케이션이 `accelerator`를 등록했는지에 대한 여부입니다.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

` accelerator`의 전역 단축키를 등록 해제합니다.

### `globalShortcut.unregisterAll()`

모든 전역 단축키를 등록 해제합니다.