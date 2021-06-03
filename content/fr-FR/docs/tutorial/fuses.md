# Electron Fuses

> Activation de fonctionnalités au moment du packaging

## Que sont les fuses ?

Pour n'utiliser qu'un sous-ensemble de fonctionnalités d'Electron, il semble logique de désactiver certaines fonctionnalités pour l'ensemble d'une application.  Par exemple, 99% des applications n'utilisent pas `ELECTRON_RUN_AS_NODE`, leurs concepteurs veulent être en mesure de livrer un exécutable qui n'utilise pas cette fonctionnalité.  Nous ne voulons pas non plus que les utilisateurs d'Electron génère Electron à partir des sources car ce serait à la fois un défi technique énorme et aurait un coût élevé que ce soit en temps ou en argent.

Les fuses sont la solution à ce problème, à un haut niveau, ils sont des "bits magiques" dans l'exécutable d'Electron qui peuvent être activés ou non au moment du packaging de votre application Electron pour activer ou désactiver certaines fonctionnalités ou restrictions.  Comme ils sont activés au moment du packaging et donc avant que vous ne signiez votre application, l'OS devient responsable de s'assurer que ces bits n'ont pas été désactivés via la validation du code du système d'exploitation (Gatekeeper / App Locker).

## Comment activer les fuses ?

### La manière simple

Nous avons créé un module pratique `@electron/fuses` pour faciliter l'activation de ces fuses.  Consultez le README de ce module pour plus de détails sur l'utilisation et les éventuels cas d'erreur.

```js
require('@electron/fuses').flipFuses(
  // Chemin vers electron
  require('electron'),
  // Les Fuses à activer
  {
    runAsNode: false
  }
)
```

### Manière plus compliquée

#### Glossaire rapide

* **Fuse Wire**: Une séquence d’octets dans le binaire d'Electron utilisé pour gérer les fuses
* **Sentinel**: Une séquence statique d’octets connue que vous pouvez utiliser pour localiser le <0>fuse wire</0>
* **Fuse Schema**: Le format et les valeurs autorisées pour le <0>fuse wire</0>

Pour activer les fuses manuellement, il est nécessaire d'éditer le binaire d'Electron et modifier la séquence d'octets du fuse wire pour qu'elle représente l'état des fuses désiré.

Quelque part dans le binaire Electron, il y a une séquence d'octets qui ressembler à ceci :

```text
| ...binary | sentinel_bytes | fuse_version | fuse_wire_length | fuse_wire | ...binary |
```

* `sentinel_bytes` est toujours exactement cette chaîne `dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX`
* `fuse_version` est un seul octet dont la valeur de type unsigned integer représente la version du schéma du fuse
* `fuse_wire_length` est un seul octet dont la valeur de type unsigned integer représente le nombre de fuses dans le fuse wire
* `fuse_wire` est une séquence de N octets, chaque octet représentant un seul fuse et son état.
  * "0" (0x30) indique que le fusible est inactif
  * "1" (0x31) indique que le fusible est actif
  * "r" (0x72) indique que le fuse a été supprimé et le changement de l'octet à 1 ou 0 n'aura aucun effet.

Pour actionner un fuse, vous devez trouver sa position dans le fuse wire et le mettre à "0" ou "1" selon l'état que vous désirez.

Vous pouvez voir le schéma actuel [ici](https://github.com/electron/electron/blob/master/build/fuses/fuses.json5).
