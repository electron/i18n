# globalShortcut

> Rileva eventi della tastiera quando l'applicazione non è in focus su di essa.

Processo: [Main](../glossary.md#main-process)

Il modulo `globalShortcut` può registrare/eliminare una scorciatoia di tastiera con il sistema operativo in modo che tu possa personalizzare le operazioni con diverse scorciatoie.

**Nota:** La scorciatoia è globale; funzionerà anche se l'app non ha il focus sulla tastiera. Non dovresti utilizzare questo modulo finchè l'evento `ready` dell'app non è stato lanciato.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+X' shortcut listener.
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

* `accelerator` [Accelerator](accelerator.md)
* `callback` Funzione

Registra la scorciatoia di `accelerator`. Il `callback` viene chiamato quando la scorciatoia registrata viene premuta dall'utente.

Quando l'accelerator è già stato occupato da un'altra applicazione, fallirà silenziosamente. Questo comportamento è utilizzato dai sistemi operativi, dal momento che non vogliono che le applicazioni entrino in conflitto sulle scorciatoie globali.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Restituisce `Boolean` - Se l'applicazione ha registrato l'`accelerator`.

Quando l'accelerator è già preso da altre applicazioni, la funzione restituirà lo stesso `false`. Questo comportamento è utilizzato dai sistemi operativi, dal momento che non vogliono che le applicazioni entrino in conflitto sulle scorciatoie globali.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Elimina la scorciatoia dell'`accelerator`.

### `globalShortcut.unregisterAll()`

Elimina tutti le scorciatoie.