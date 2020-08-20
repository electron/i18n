# globalShortcut

> Rileva eventi della tastiera quando l'applicazione non è in focus su di essa.

Processo: [Main](../glossary.md#main-process)

Il modulo `globalShortcut` può registrare/eliminare una scorciatoia di tastiera con il sistema operativo in modo che tu possa personalizzare le operazioni con diverse scorciatoie.

**Nota:** La scorciatoia è globale; funzionerà anche se l'app non ha il focus sulla tastiera. Non dovresti utilizzare questo modulo finchè l'evento `ready` dell'app non è stato lanciato.

```javascript
const { app, globalShortcut } = require('electron')

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

* `accelerator` [Accelerator](accelerator.md)
* `callback` Funzione

Returns `Boolean` - Whether or not the shortcut was registered successfully.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

Quando l'accelerator è già stato occupato da un'altra applicazione, fallirà silenziosamente. Questo comportamento è utilizzato dai sistemi operativi, dal momento che non vogliono che le applicazioni entrino in conflitto sulle scorciatoie globali.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - an array of [Accelerator](accelerator.md)s.
* `callback` Funzione

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

When a given accelerator is already taken by other applications, this call will silently fail. Questo comportamento è utilizzato dai sistemi operativi, dal momento che non vogliono che le applicazioni entrino in conflitto sulle scorciatoie globali.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Restituisce `Boolean` - Se l'applicazione ha registrato l'`accelerator`.

Quando l'accelerator è già preso da altre applicazioni, la funzione restituirà lo stesso `false`. Questo comportamento è utilizzato dai sistemi operativi, dal momento che non vogliono che le applicazioni entrino in conflitto sulle scorciatoie globali.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Elimina la scorciatoia dell'`accelerator`.

### `globalShortcut.unregisterAll()`

Elimina tutti le scorciatoie.
