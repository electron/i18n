# powerSaveBlocker

> Bloquer le système de passer en mode de faible puissance (sommeil).

Processus : [Main](../glossary.md#main-process)

Par exemple :

```javascript
const {powerSaveBlocker} = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Méthodes

Le module `powerSaveBlocker` dispose des méthodes suivantes :

### `powerSaveBlocker.start(type)`

* `type` String - Type de powerSaveBlocker. 
  * `prevent-app-suspension` - Empêche l'application d'être suspendu. Maintient le système actif mais permet l'écran de s'éteindre. Exemple d'utilisation : Le téléchargement d'un fichier ou la lecture audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns `Integer` - The blocker ID that is assigned to this power blocker

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.