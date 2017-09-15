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

Retourne `Boolean` - Si l'élément s'est bien affiché

Affiche le fichier donné dans un gestionnaire de fichier. Si possible, sélectionne le fichier.

### `shell.openItem(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully opened.

Open the given file in the desktop's default manner.

### `shell.openExternal(url[, options, callback])`

* `url` String
* `options` Object (facultatif) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `callback` Function (optional) - If specified will perform the open asynchronously. *macOS* 
  * `error` Error

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash

Move the given file to trash and returns a boolean status for the operation.

### `shell.beep()`

Émet un signal sonore.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (facultatif) - La valeur par défaut est `create`, peut être une des valeurs suivantes : 
  * `create` - Creates a new shortcut, overwriting if necessary.
  * `update` - Updates specified properties only on an existing shortcut.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Retourne [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.