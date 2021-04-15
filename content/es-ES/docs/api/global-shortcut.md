# globalShortcut

> Detecta los eventos del teclado cuando la aplicación no tiene el enfoque en el teclado.

Proceso: [Main](../glossary.md#main-process)

El módulo `globalShortcut` puede registrar o quitar un atajo del teclado global con el sistema operativo para que se puedan personalizar las operaciones para varios atajos.

**Nota:** El atajo es global; funcionará incluso si la aplicación no tiene enfocado el teclado. This module cannot be used before the `ready` event of the app module is emitted.

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
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

El módulo `globalShortcut` tiene los siguientes métodos:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Devuelve `Boolean` - Si el acceso fue registrado con éxito.

Registra un atajo global del `acelerador`. El `callback` es llamado cuando el atajo registrado es presionado por el usuario.

Cuando el acelerador ha sido tomado por otras aplicaciones, esta llamada fallará silenciosamente. Este comportamiento está diseñado por los sistemas operativos, debido a que no desean que las aplicaciones tengan conflictos por los atajos globales.

Los siguientes aceleradores no serán registrados con correctamente en macOS 10.14 a menos que la aplicación haya sido autorizada como [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - un array de [Accelerator](accelerator.md)s.
* `callback` Función

Registra un atajo global de todos los elementos `acelerador` en `aceleradores`. `callback` es llamado cuando el usuario presiona alguno de los atajos registrados.

Cuando el acelerador ya ha sido tomado por otras aplicaciones, esta llamada fallará silenciosamente. Este comportamiento está diseñado por los sistemas operativos, debido a que no desean que las aplicaciones tengan conflictos por los atajos globales.

Los siguientes aceleradores no serán registrados con correctamente en macOS 10.14 a menos que la aplicación haya sido autorizada como [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Devuelve `Boolean` - Si esta aplicación tiene registrado `accelerator`.

Cuando el acelerador ha sido tomado por otras aplicaciones, esta llamada aun devolverá `false`. Este comportamiento está diseñado por los sistemas operativos, debido a que no desean que las aplicaciones tengan conflictos por los atajos globales.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Anula el registro del atajo del `accelerator`.

### `globalShortcut.unregisterAll()`

Anula el registro todos los atajos globales.
