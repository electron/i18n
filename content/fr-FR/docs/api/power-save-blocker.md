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

* `type` String - Type de powerSaveBlocker. 
  * `prevent-app-suspension` - Empêche l'application d'être suspendue. Maintient le système actif mais permet l'écran de s'éteindre. Exemple d'utilisation : Le téléchargement d'un fichier ou la lecture audio.
  * `prevent-display-sleep` - Empêche l'écran de s'éteindre. Maintient le système et l'écran actif. Exemple d'utilisation : Lecture vidéo.

Retourne `Integer` - L'ID du blocage assigné à ce power blocker.

Empêche le système d'entrer en mode de faible puissance. Renvoie un nombre entier identifiant le bloqueur d'économie d'énergie.

**Remarque :** `prevent-display-sleep` a une priorité plus élevée que `prevent-app-suspension`. Seulement le type de priorité le plus élevé prendra effet. En d'autres termes, `prevent-display-sleep` a toujours la priorité sur `prevent-app-suspension`.

Par exemple, une API requête A pour `prevent-app-suspension`, et un autre requête B pour `prevent-display-sleep`. `prevent-display-sleep` sera utilisé jusqu’à ce que la requête B se stoppe. Après cela, `prevent-app-suspension` est utilisé.

### `powerSaveBlocker.stop(id)`

* `id` Integer - L'id du bloqueur d'économie d'énergie renvoyé par `powerSaveBlocker.start`.

Arrête le bloqueur d'économie d'énergie spécifié.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - L'id du bloqueur d'économie d'énergie renvoyé par `powerSaveBlocker.start`.

Returns `Boolean` - Si le `powerSaveBlocker` correspondant a démarré.