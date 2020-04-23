# shell

> Gère des fichiers et URLs à l'aide de leurs applications par défaut.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Le module `shell` fournit des fonctions liées à l'intégration bureau.

Un exemple d'ouverture d'une URL dans le navigateur par défaut de l'utilisateur :

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## Méthodes

Le module `shell` dispose des méthodes suivantes :

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` String

Retourne `Boolean` - Si l'élément s'est bien ouvert.

Ouvre le fichier donné dans la manière par défaut de l'ordinateur.

### `shell.openExternal(url[, options])`

* `url` String - 2081 caractères max. sur Windows.
* `options` Object (optional)
  * `activate` Boolean (optional) _macOS_ - `true` to bring the opened application to the foreground. The default is `true`.
  * `workingDirectory` String (optional) _Windows_ - Le dossier de travail.

Retourne `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath[, deleteOnFail])`

* `fullPath` String
* `deleteOnFail` Boolean (optional) - Whether or not to unilaterally remove the item if the Trash is disabled or unsupported on the volume. _macOS_

Returns `Boolean` - Whether the item was successfully moved to the trash or otherwise deleted.

Déplace le fichier donné dans la poubelle et retourne un booléen.

### `shell.beep()`

Émet un signal sonore.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following:
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
