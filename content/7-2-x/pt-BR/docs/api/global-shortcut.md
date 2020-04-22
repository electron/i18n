# globalShortcut

> Detecta eventos de teclado quando o aplicativo não tiver o foco do teclado.

Processo: [Main](../glossary.md#main-process)

O módulo `globalShortcut` pode registrar/cancelar o registro de um atalho de teclado global com o sistema operativo que você possa personalizar as operações para os vários atalhos.

** Nota:** O atalho é global; Isso funcionará mesmo se o aplicativo não tenha o foco do teclado. Não deve usar este módulo até que o evento`ready` do módulo do aplicativo é emitido.

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

## Métodos

O módulo `globalShortcut` tem os seguintes métodos:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Returns `Boolean` - Whether or not the shortcut was registered successfully.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

Quando o acelerador já está sendo utilizado por outras aplicações, esta chamada falhará silenciosamente. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - an array of [Accelerator](accelerator.md)s.
* `callback` Function

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

When a given accelerator is already taken by other applications, this call will silently fail. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Retorna `Boolean` - Se esta aplicação registrou o `accelerator`.

Quando o acelerador já está sendo utilizado por outras aplicações, esta ainda retorna `false`. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Não registra o atalho global de `accelerator`.

### `globalShortcut.unregisterAll()`

Não registra todos os atalhos globais.
