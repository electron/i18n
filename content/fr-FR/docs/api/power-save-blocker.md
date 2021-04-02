# powerSaveBlocker

> Bloquer le système de passer en mode de faible puissance (sommeil).

Processus : [Main](../glossary.md#main-process)

Par exemple :

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Méthodes

Le module `powerSaveBlocker` dispose des méthodes suivantes :

### `powerSaveBlocker.start(type)`

* `type` String - Type de bloqueur d’économiseur de puissance.
  * `prevent-app-suspension` - Empêcher la suspension de la demande. Maintient le système actif, mais permet d’éteindre l’écran. Exemple de cas d’utilisation : télécharger un fichier ou lire de l’audio.
  * `prevent-display-sleep` - Empêchez l’affichage d’aller dormir. Maintient système et l’écran actifs. Exemple de cas d’utilisation : lecture vidéo.

Retourne `Integer` - L'ID du blocage assigné à ce power blocker.

Commence à empêcher le système d’entrer en mode basse puissance. Renvoie un integer le bloqueur d’économiseur d’énergie.

**Note:** `prevent-display-sleep` a une priorité plus élevée sur `prevent-app-suspension`. Seulement le type de priorité le plus élevé prendra effet. En d'autres termes, `prevent-display-sleep` a toujours la priorité sur `prevent-app-suspension`.

Par exemple, une API requête A pour `prevent-app-suspension`, et un autre requête B pour `prevent-display-sleep`. `prevent-display-sleep` sera utilisé jusqu’à ce que la requête B se stoppe. Après cela, `prevent-app-suspension` est utilisé.

### `powerSaveBlocker.stop(id)`

* `id` Integer - L'id du bloqueur d'économie d'énergie renvoyé par `powerSaveBlocker.start`.

Arrête le bloqueur d'économie d'énergie spécifié.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - L'id du bloqueur d'économie d'énergie renvoyé par `powerSaveBlocker.start`.

Returns `Boolean` - Si le `powerSaveBlocker` correspondant a démarré.
