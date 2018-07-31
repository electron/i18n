# globalShortcut

> Rileva eventi della tastiera quando l'applicazione non è in focus su di essa.

Processo: [Main](../glossary.md#main-process)

Il modulo `globalShortcut` può registrare/eliminare una scorciatoia di tastiera con il sistema operativo in modo che tu possa personalizzare le operazioni con diverse scorciatoie.

**Nota:** La scorciatoia è globale; funzionerà anche se l'app non ha il focus sulla tastiera. Non dovresti utilizzare questo modulo finchè l'evento `ready` dell'app non è stato lanciato.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Registra un listener per la combinazione 'CommandOrControl+X'.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('Hai premuto CommandOrControl+X')
  })

  if (!ret) {
    console.log('Registrazione fallit')
  }

  // Controlla se una scorciatoia è già registrata.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Elimina una scorciatoia.
  globalShortcut.unregister('CommandOrControl+X')

  // Elimina tutte le scorciatoie.
  globalShortcut.unregisterAll()
})
```

## Metodi

Il modulo `globalShortcut` ha i seguenti metodi:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Acceleratore](accelerator.md)
* `callback` Funzione

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Acceleratore](accelerator.md)

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Acceleratore](accelerator.md)

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.unregisterAll()`

Unregisters all of the global shortcuts.