# shell

> Gère des fichiers et URLs à l'aide de leurs applications par défaut.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Le module `shell` fournit des fonctions liées à l'intégration bureau.

Un exemple d'ouverture d'une URL dans le navigateur par défaut de l'utilisateur :

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Méthodes

Le module `shell` dispose des méthodes suivantes :

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Retourne `Boolean` - Si l'élément s'est bien affiché.

Affiche le fichier donné dans un gestionnaire de fichier. Si possible, sélectionne le fichier.

### `shell.openItem(fullPath)`

* `fullPath` String

Retourne `Boolean` - Si l'élément s'est bien ouvert.

Ouvre le fichier donné dans la manière par défaut de l'ordinateur.

### `shell.openExternal(url[, options, callback])`

* `url` String - 2081 caractères maximum sur windows, sinon la fonction retourne false.
* `options` Object (facultatif) *macOS* 
  * `activate` Boolean - `true` pour mettre l'application ouverte au premier-plan. La valeur par défaut est `true`.
* `callback` Function (facultatif) *macOS* - Si spécifié, l'ouverture sera fera de façon asynchrone. 
  * `error` Error

Retourne `Boolean` - Si une application à pu ouvrir l'URL. Si le callback est spécifié, cela retournera toujours true.

Ouvre le protocole externe donné dans la manière par défaut de l'ordinateur. (Par exemple, les URLs mailto: dans l'agent de messagerie par défaut de l'utilisateur).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Retourne `Boolean` - Si l'élément s'est bien déplacé dans la poubelle.

Déplace le fichier donné dans la poubelle et retourne un booléen.

### `shell.beep()`

Émet un signal sonore.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (facultatif) - La valeur par défaut est `create`, peut être une des valeurs suivantes : 
  * `create` - Créer un nouveau raccourci, écrase si besoin.
  * `update` - Met à jour les propriétés seulement sur un raccourci existant.
  * `replace` - Remplace un raccourci existant, échoue si le raccourci n'existe pas.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Retourne `Boolean` - Si le raccourci a été créé avec succès.

Créer ou met à jour un lien raccourci à `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Retourne [`ShortcutDetails`](structures/shortcut-details.md)

Résout le lien raccourci à `shortcutPath`.

Une exception sera levée lorsqu’une erreur se produit.