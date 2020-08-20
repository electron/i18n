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

Retourne `Boolean` - Si le raccourci a été enregistré avec succès.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

Lorsque l'accélérateur est déjà utilisé par d'autres applications, cet appel échouera silencieusement. Ce comportement est prévu par les systèmes d'exploitation, car ils ne veulent pas que les applications se battent pour des raccourcis globaux.

Les accélérateurs suivants ne seront pas enregistrés correctement sur macOS 10.14 Mojave à moins que l'application ait été autorisée en tant qu'[application client approuvée](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html) :

* "Media Play/Pause"
* "Media Piste Suivante"
* "Media Piste Précédente"
* "Media Stop"

### `globalShortcut.registerAll(accélérateurs, callback)`

* `accélérateur` String[] - un tableau de [Accelerator](accelerator.md)s.
* `callback` Function

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

Lorsqu'un accélérateur donné est déjà pris par d'autres applications, cet appel échouera silencieusement. Ce comportement est prévu par les systèmes d'exploitation, car ils ne veulent pas que les applications se battent pour des raccourcis globaux.

Les accélérateurs suivants ne seront pas enregistrés correctement sur macOS 10.14 Mojave à moins que l'application ait été autorisée en tant qu'[application client approuvée](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html) :

* "Media Play/Pause"
* "Media Piste Suivante"
* "Media Piste Précédente"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Retourne un `Boolean` - Si l'application à enregistrer l'`accelerator`.

Lorsque l'accelerator est déjà utilisé par d'autres applications, cet appel retournera toujours `false`. Ce comportement est prévu par les systèmes d'exploitation, car ils ne veulent pas que les applications se battent pour des raccourcis globaux.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Supprime le raccourci global de l'`accelerator`.

### `globalShortcut.unregisterAll()`

Supprime tous les raccourcis globaux.
