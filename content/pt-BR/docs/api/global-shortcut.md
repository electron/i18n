# globalShortcut

> Detecta eventos de teclado quando o aplicativo não tiver o foco do teclado.

Processo: [Main](../glossary.md#main-process)

O módulo `globalShortcut` pode registrar/cancelar o registro de um atalho de teclado global com o sistema operativo que você possa personalizar as operações para os vários atalhos.

** Nota:** O atalho é global; Isso funcionará mesmo se o aplicativo não tenha o foco do teclado. Não deve usar este módulo até que o evento`ready` do módulo do aplicativo é emitido.

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

## Métodos

O módulo `globalShortcut` tem os seguintes métodos:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Registra um atalho global de `accelerator`. O ` callback` é chamado quando o atalho registrado é pressionado pelo utilizador.

Quando o acelerador já está sendo utilizado por outras aplicações, esta chamada falhará silenciosamente. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Retorna `Boolean` - Se esta aplicação registrou o `accelerator`.

Quando o acelerador já está sendo utilizado por outras aplicações, esta ainda retorna `false`. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Não registra o atalho global de `accelerator`.

### `globalShortcut.unregisterAll()`

Não registra todos os atalhos globais.