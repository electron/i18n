# globalShortcut

> Détecte les événements de clavier lorsque l'application n'a pas le focus du clavier.

Processus : [Main](../glossary.md#main-process)

Le module `globalShortcut` peut inscrire/désinscrire un raccourci clavier global avec le système d'exploitation afin que vous puissiez personnaliser les opérations pour les différents raccourcis.

**Remarque :** Le raccourci est global; il fonctionnera même si l'application n'a pas le focus du clavier. Vous ne devez pas utiliser ce module avant que l'événement `ready` du module app soit émis.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Enregistrer un écouteur de raccourci 'CommandOrControl+X'.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('enregistrement échoué')
  }

  // Check si le raccourci est enregistré.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Retire le raccourci.
  globalShortcut.unregister('CommandOrControl+X')

  // Supprime tous les raccourcis.
  globalShortcut.unregisterAll()
})
```

## Méthodes

Le module `globalShortcut` dispose des méthodes suivantes :

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Enregistre un raccourci global avec un `accelerator`. Le `callback` est appelé lorsque le raccourci est utilisé par l'utilisateur.

Lorsque l'accélérateur est déjà utilisé par d'autres applications, cet appel échouera silencieusement. Ce comportement est prévu par les systèmes d'exploitation, car ils ne veulent pas que les applications se battent pour des raccourcis globaux.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.unregisterAll()`

Unregisters all of the global shortcuts.