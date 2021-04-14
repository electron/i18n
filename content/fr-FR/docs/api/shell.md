# shell

> Gère des fichiers et URLs à l'aide de leurs applications par défaut.

Processus: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) (non-bac à sable seulement)

Le module `shell` fournit des fonctions liées à l'intégration bureau.

Un exemple d'ouverture d'une URL dans le navigateur par défaut de l'utilisateur :

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**remarque :** que le module `shell` peut être utilisé dans le processus de rendu, il ne fonctionnera pas dans un renderer bac à sable.

## Méthodes

Le module `shell` dispose des méthodes suivantes :

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Affichez le fichier donné dans un gestionnaire de fichiers. Si possible, sélectionnez le fichier.

### `shell.openPath(path)`

* `path` String

Retours `Promise<String>` - Se résout avec une chaîne contenant le message d’erreur correspondant à l’échec en cas d’échec, sinon «  ».

Ouvre le fichier donné dans la manière par défaut de l'ordinateur.

### `shell.openExternal(url[, options])`

* `url` String - 2081 caractères max. sur Windows.
* `options` objet (facultatif)
  * `activate` Boolean (facultatif) _macOS_ - `true` pour mettre l’application ouverte au premier plan. La valeur par défaut `true`.
  * `workingDirectory` String (optional) _Windows_ - Le dossier de travail.

Retourne `Promise<void>`

Ouvrez l’URL de protocole externe donnée de la manière par défaut du bureau. (Par exemple, mailto: URL dans l’agent de messagerie par défaut de l’utilisateur).

### `shell.moveItemToTrash(fullPath[, deleteOnFail])` _Deprecated_

* `fullPath` String
* `deleteOnFail` Boolean (facultatif) - Qu’il s’agisse ou non de supprimer unilatéralement l’élément si la corbeille est désactivée ou non prise en charge sur le volume. _macOS_

Retours `Boolean` - Si l’article a été déplacé avec succès à la poubelle ou autrement supprimé.

> REMARQUE : Cette méthode est dépréciée. Utilisez- `shell.trashItem` à la place.

Déplace le fichier donné dans la poubelle et retourne un booléen.

### `shell.trashItem(path)`

* `path` String - chemin vers l’élément à déplacer à la poubelle.

Retours `Promise<void>` - Se résout lorsque l’opération est terminée. Rejette s’il y a eu une erreur lors de la suppression de l’élément demandé.

Cela déplace un chemin vers l’emplacement des déchets spécifiques à l’OS (Trash on macOS, Recycle Bin sur Windows, et un emplacement spécifique à l’environnement de bureau sur Linux).

### `shell.beep()`

Émet un signal sonore.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (facultatif) - Par défaut est `create`, peut être l’un des suivants:
  * `create` - Créer un nouveau raccourci, écrase si besoin.
  * `update` - Met à jour les propriétés seulement sur un raccourci existant.
  * `replace` - Remplace un raccourci existant, échoue si le raccourci n'existe pas.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Retourne `Boolean` - Si le raccourci a été créé avec succès.

Créer ou met à jour un lien raccourci à `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

Retourne [`ShortcutDetails`](structures/shortcut-details.md)

Résout le lien raccourci à `shortcutPath`.

Une exception sera levée lorsqu’une erreur se produit.
