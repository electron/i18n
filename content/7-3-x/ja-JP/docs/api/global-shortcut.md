# globalShortcut

> アプリケーションにキーボードフォーカスがないときにキーボードイベントを検出します。

プロセス: [Main](../glossary.md#main-process)

`globalShortcut` モジュールは、オペレーティングシステムに対してグローバルショートカットを登録/登録解除することができます。そのため、様々なショートカットに対する操作をカスタマイズすることができます。

**注:** ショートカットはグローバルです。そのため、アプリにキーボードフォーカスがない場合でも機能します。 アプリモジュールの `ready` イベントが発生するまではこのモジュールを使用してはいけません。

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // 'CommandOrControl+X' をショートカットリスナーに登録します。
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // ショートカットが登録されているかどうかをチェックします。
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // ショートカットを登録解除します。
  globalShortcut.unregister('CommandOrControl+X')

  // すべてのショートカットを登録解除します。
  globalShortcut.unregisterAll()
})
```

## メソッド

`globalShortcut` モジュールには以下のメソッドがあります。

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

戻り値 `Boolean` - ショートカットが正常に登録されたかどうか.

`accelerator` のグローバルショートカットを登録します。 `callback` は登録したショートカットがユーザに押下されたときに呼び出されます。

アクセラレータが他のアプリケーションによってすでに使用されている場合、この呼び出しは何も通知することなく失敗します。 この動作は、アプリケーションにグローバルショートカットの取り合いをさせたくないため、オペレーティングシステムによって意図されたものです。

以下のアクセラレータは、アプリが [信頼できるアクセシビリティクライアント](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html) として認識されていない限り macOS 10.14 Mojave に正常に登録されません。

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - [Accelerator](accelerator.md)の配列
* `callback` Function

`accelerators` 内の全ての `accelerator` のグローバルショートカットを登録します。 `callback` は登録したいずれかのショートカットがユーザに押下されたときに呼び出されます。

与えられたアクセラレータが他のアプリケーションによってすでに使用されている場合、この呼び出しは何も通知することなく失敗します。 この動作は、アプリケーションにグローバルショートカットの取り合いをさせたくないため、オペレーティングシステムによって意図されたものです。

以下のアクセラレータは、アプリが [信頼できるアクセシビリティクライアント](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html) として認識されていない限り macOS 10.14 Mojave に正常に登録されません。

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

戻り値 `Boolean` - このアプリケーションが `accelerator` を登録したかどうか。

アクセラレータが他のアプリケーションによってすでに使用されている場合、この呼び出しは `false` を返すはずです。 この動作は、アプリケーションにグローバルショートカットの取り合いをさせたくないため、オペレーティングシステムによって意図されたものです。

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

`accelerator` のグローバルショートカットを登録解除します。

### `globalShortcut.unregisterAll()`

すべてのグローバルショートカットを登録解除します。
