# globalShortcut

> アプリケーションにキーボードフォーカスがないときにキーボードイベントを検出します。

プロセス: [Main](../glossary.md#main-process)

`globalShortcut` モジュールは、さまざまなショートカットの操作をカスタマイズできるように、グローバルキーボードショートカットをオペレーティングシステムに登録/登録解除できます。

**注釈:** ショートカットはグローバル――アプリにキーボードフォーカスがない場合でも動作します。 このモジュールは、アプリケーションモジュールの `ready` イベントが発行されるまで使用しないでください。

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // 'CommandOrControl+X' をショートカットリスナーに登録する。
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // ショートカットが登録されているかどうかチェックする。
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // ショートカットを登録解除する。
  globalShortcut.unregister('CommandOrControl+X')

  // すべてのショートカットを登録解除する。
  globalShortcut.unregisterAll()
})
```

## メソッド

`globalShortcut` モジュールには以下のメソッドがあります。

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