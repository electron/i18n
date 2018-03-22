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

`accelerator` のグローバルショートカットを登録します。登録されたショートカットがユーザによって押されたときに `callbback` が呼ばれます。

accelerator がすでに他のアプリケーションによって使用されている場合、この呼び出しは音沙汰無く失敗します。 この動作は、アプリケーションがグローバルショートカットのために競合しないようにするため、オペレーティングシステムが意図しています。

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

戻り値 `Boolean` - このアプリケーションが `accelerator` を登録したかどうか。

accelerator がすでに他のアプリケーションによって使用されている場合、この呼び出しは `false` を返します。 この動作は、アプリケーションがグローバルショートカットのために競合しないようにするため、オペレーティングシステムが意図しています。

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

`accelerator` のグローバルショートカットを登録解除します。

### `globalShortcut.unregisterAll()`

すべてのグローバルショートカットを登録解除します。