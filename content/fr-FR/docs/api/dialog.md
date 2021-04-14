# dialog

> Affiche une boîte de dialogue du système natif pour ouvrir et enregistrer des fichiers, alertes, etc...

Processus : [Main](../glossary.md#main-process)

Un exemple d'afficher une boîte de dialogue pour sélectionner plusieurs fichiers :

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

## Méthodes

Le module `dialog` dispose des méthodes suivantes :

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `title` String (facultatif)
  * `defaultPath` String (facultatif)
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `propriétés` String[] (facultatif) - Contient les fonctionnalités que la boîte de dialogue utilise. Les valeurs suivantes sont prises en charge :
    * `openFile` - Permet la sélection de fichiers.
    * `openDirectory` - Permet la sélection de dossiers.
    * `multiSelections` - Permet la sélection de multiples chemins.
    * `showHiddenFiles` - Affiche les fichiers cachés dans la boîte de dialogue.
    * `createDirectory` _macOS_ - Permet la création de nouveaux dossiers depuis la boîte de dialogue.
    * `promptToCreate` _Windows_ - Demande la création du dossier si le chemin d'accès du fichier entré dans la boîte de dialogue n'existe pas. Cela ne créer par réellement le fichier dans le chemin d'accès mais permet de donner des chemins d'accès inexistant qui devraient être créés par l'application.
    * `noResolveAliases` _macOS_ - Désactiver le chemin d’accès automatique alias (symlink) résolution. Les alias sélectionnés retourneront désormais le chemin alias au lieu de leur chemin cible.
    * `treatPackageAsDirectory` _macOS_ - Considérer les paquets, tels que les dossiers `.app`, comme des dossiers plutôt que des fichiers.
    * `dontAddToRecent` _Windows_ - N'ajoutez pas l'élément en cours d'ouverture à la liste des documents récents.
  * `message` String (facultatif) _macOS_ - Message à afficher au-dessus des zones de saisie.
  * `securityScopedBookmarks` Boolean (facultatif) _macOS_ _mas_ - Créez [signets à portée de sécurité](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) lorsqu'ils sont empaquetés pour le Mac App Store.

Retourne `String[] | undefined` - le chemin du fichier choisi par l'utilisateur ; si la boîte de dialogue est annulée retourne `undefined`.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Le `filters` spécifie un tableau de types de fichiers qui peuvent être affichés ou sélectionnés lorsque vous souhaitez limiter l’utilisateur à un type spécifique. Par exemple :

```javascript
{
  filtres: [
    { name : 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Films', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Type de fichier personnalisé', extensions: ['as'] },
    { name: 'Tous les fichiers', extensions: ['*'] }
  ]
}
```

Le tableau d'`extensions` devrait contenir les extensions sans caractères génériques ou de point (par exemple `'png'` est correct, mais `'.png'` et `'*.png'` ne l'est pas). Pour afficher tous les fichiers, utilisez le caractère générique `'*'` (aucun autre caractère générique n'est pris en charge).

**Remarque :** Sur Windows et Linux, une boîte de dialogue ne peux pas être à la fois une sélection de fichier et une sélection de dossier, donc si vous définissez `properties` à `['openFile', 'openDirectory']` sur ces plateformes, c'est la sélection de dossier qui s'affichera.

```js
dialog.showOpenDialogSync(mainWindow, {
  propriétés: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `title` String (facultatif)
  * `defaultPath` String (facultatif)
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `propriétés` String[] (facultatif) - Contient les fonctionnalités que la boîte de dialogue utilise. Les valeurs suivantes sont prises en charge :
    * `openFile` - Permet la sélection de fichiers.
    * `openDirectory` - Permet la sélection de dossiers.
    * `multiSelections` - Permet la sélection de multiples chemins.
    * `showHiddenFiles` - Affiche les fichiers cachés dans la boîte de dialogue.
    * `createDirectory` _macOS_ - Permet la création de nouveaux dossiers depuis la boîte de dialogue.
    * `promptToCreate` _Windows_ - Demande la création du dossier si le chemin d'accès du fichier entré dans la boîte de dialogue n'existe pas. Cela ne créer par réellement le fichier dans le chemin d'accès mais permet de donner des chemins d'accès inexistant qui devraient être créés par l'application.
    * `noResolveAliases` _macOS_ - Désactiver le chemin d’accès automatique alias (symlink) résolution. Les alias sélectionnés retourneront désormais le chemin alias au lieu de leur chemin cible.
    * `treatPackageAsDirectory` _macOS_ - Considérer les paquets, tels que les dossiers `.app`, comme des dossiers plutôt que des fichiers.
    * `dontAddToRecent` _Windows_ - N'ajoutez pas l'élément en cours d'ouverture à la liste des documents récents.
  * `message` String (facultatif) _macOS_ - Message à afficher au-dessus des zones de saisie.
  * `securityScopedBookmarks` Boolean (facultatif) _macOS_ _mas_ - Créez [signets à portée de sécurité](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) lorsqu'ils sont empaquetés pour le Mac App Store.

Retourne `Promise<Object>` - Résoudre avec un objet contenant les éléments suivants :

* `annulé` Booléen - que la boîte de dialogue ait été annulée ou non.
* `filePaths` String[] - Un tableau de chemins d'accès choisi par l'utilisateur. Si le dialogue est annulé, il s’agit d’un tableau vide.
* `signets` String[] (facultatif) _macOS_ _mas_ - Un tableau correspondant au tableau `filePaths` de chaînes encodées en base64 qui contient des données de marque-pages à portée de sécurité. `securityScopedBookmarks` doit être activé pour que ceci soit rempli. (Pour les valeurs de retour, voir la [table ici](#bookmarks-array).)

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Le `filters` spécifie un tableau de types de fichiers qui peuvent être affichés ou sélectionnés lorsque vous souhaitez limiter l’utilisateur à un type spécifique. Par exemple :

```javascript
{
  filtres: [
    { name : 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Films', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Type de fichier personnalisé', extensions: ['as'] },
    { name: 'Tous les fichiers', extensions: ['*'] }
  ]
}
```

Le tableau d'`extensions` devrait contenir les extensions sans caractères génériques ou de point (par exemple `'png'` est correct, mais `'.png'` et `'*.png'` ne l'est pas). Pour afficher tous les fichiers, utilisez le caractère générique `'*'` (aucun autre caractère générique n'est pris en charge).

**Remarque :** Sur Windows et Linux, une boîte de dialogue ne peux pas être à la fois une sélection de fichier et une sélection de dossier, donc si vous définissez `properties` à `['openFile', 'openDirectory']` sur ces plateformes, c'est la sélection de dossier qui s'affichera.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `title` String (facultatif)
  * `defaultPath` String (facultatif) - Chemin d'accès absolu, le chemin d'accès absolu du fichier, ou le nom du fichier à utiliser par défaut.
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `message` String (facultatif) _macOS_ - Message à afficher au-dessus des champs de texte.
  * `nameFieldLabel` String (facultatif) _macOS_ - Étiquette personnalisé pour le texte affiché dans la zone de texte du nom de fichier.
  * `showsTagField` Boolean (facultatif) _macOS_ - Affiche le champ de texte. `true` par défaut.
  * `properties` String[] (facultatif)
    * `showHiddenFiles` - Affiche les fichiers cachés dans la boîte de dialogue.
    * `createDirectory` _macOS_ - Permet la création de nouveaux dossiers depuis la boîte de dialogue.
    * `treatPackageAsDirectory` _macOS_ - Considérer les paquets, tels que les dossiers `.app`, comme des dossiers plutôt que des fichiers.
    * `showOverwriteConfirmation` _Linux_ - Définit si une boîte de dialogue de confirmation sera affichée lorsque l’utilisateur tape un nom de fichier déjà existant.
    * `dontAddToRecent` _Windows_ - N'ajoutez pas l'élément en cours d'ouverture à la liste des documents récents.
  * `securityScopedBookmarks` Boolean (facultatif) _macOS_ _mas_ - Créez un marque-page à portée de sécurité</a> lorsque empaqueté pour le Mac App Store. Si cette option est activée et que le fichier n'existe pas encore, un fichier vide sera créé dans le chemin choisi.

Retourne `String | undefined`, le chemin du fichier choisi par l'utilisateur ; si la boîte de dialogue est annulée, elle retourne `undefined`.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Les `filters` spécifie un tableau de types de fichiers qui peuvent être affichés, allez voir `dialog.showOpenDialog` pour un exemple.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `title` String (facultatif)
  * `defaultPath` String (facultatif) - Chemin d'accès absolu, le chemin d'accès absolu du fichier, ou le nom du fichier à utiliser par défaut.
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `message` String (facultatif) _macOS_ - Message à afficher au-dessus des champs de texte.
  * `nameFieldLabel` String (facultatif) _macOS_ - Étiquette personnalisé pour le texte affiché dans la zone de texte du nom de fichier.
  * `showsTagField` Boolean (facultatif) _macOS_ - Affiche le champ de texte, par défaut à `true`.
  * `properties` String[] (facultatif)
    * `showHiddenFiles` - Affiche les fichiers cachés dans la boîte de dialogue.
    * `createDirectory` _macOS_ - Permet la création de nouveaux dossiers depuis la boîte de dialogue.
    * `treatPackageAsDirectory` _macOS_ - Considérer les paquets, tels que les dossiers `.app`, comme des dossiers plutôt que des fichiers.
    * `showOverwriteConfirmation` _Linux_ - Définit si une boîte de dialogue de confirmation sera affichée lorsque l’utilisateur tape un nom de fichier déjà existant.
    * `dontAddToRecent` _Windows_ - N'ajoutez pas l'élément en cours d'ouverture à la liste des documents récents.
  * `securityScopedBookmarks` Boolean (facultatif) _macOS_ _mas_ - Créez un marque-page à portée de sécurité</a> lorsque empaqueté pour le Mac App Store. Si cette option est activée et que le fichier n'existe pas encore, un fichier vide sera créé dans le chemin choisi.

Retourne `Promise<Object>` - Résoudre avec un objet contenant les éléments suivants :

* `annulé` Booléen - que la boîte de dialogue ait été annulée ou non.
* `filePath` String (facultatif) - Si le dialogue est annulé, ce sera `undefined`.
* `bookmark` String (facultatif) _macOS_ _mas_ - Base64 encodé qui contient les données de signet à portée de sécurité pour le fichier enregistré. `securityScopedBookmarks` doit être activée pour que cela soit présent. (Pour les valeurs de retour, voir la [table ici](#bookmarks-array).)

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Les `filters` spécifie un tableau de types de fichiers qui peuvent être affichés, allez voir `dialog.showOpenDialog` pour un exemple.

**Remarque :** Sur macOS, l'utilisation de la version asynchrone est recommandée pour éviter les problèmes lorsque étend et réduit la boîte de dialogue.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `message` Chaîne - Contenu de la boîte de message.
  * `type` String (facultatif) - Peut être `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. Sur Windows, `"question"` affiche la même icône que `"info"`, sauf si vous définissez une icône en utilisant l'option `"icône"`. Sur macOS, `"avertissement"` et `"erreur"` affichent la même icône d'avertissement.
  * `buttons` String[] (facultatif) - Tableau des textes pour boutons. Sur Windows, un tableau se traduira par un bouton étiqueté « OK ».
  * `defaultId` Integer (facultatif) - Index du bouton dans le tableau des boutons qui seront sélectionnés par défaut lorsque la boîte de message s'ouvrira.
  * `title` String (facultatif) - Titre de la boîte de message, certaines plateformes ne l'afficheront pas.
  * `detail` String (facultatif) - Informations supplémentaires du message.
  * `checkboxLabel` String (facultatif) - Si fourni, la case de message inclura une case à cocher avec l'étiquette donnée.
  * `checkboxChecked` Boolean (facultatif) - État vérifié initial de la case contrôle. `false` par défaut.
  * `icon` ([NativeImage](native-image.md) | String) (facultatif)
  * `cancelId` Integer (facultatif) - L'index du bouton à utiliser pour annuler la boîte de dialogue, via la touche `Esc`. Par défaut, ceci est assigné au premier bouton avec l'étiquette "annuler" ou "non". Si aucun bouton de ce type n'existe et que cette option n'est pas définie, `0` sera utilisé comme valeur de retour .
  * `noLink` Booléen (optionnel) - Sous Windows, Electron essaiera de déterminer lequel des les boutons `` sont des boutons courants (comme "Annuler" ou "Oui"), et affichent le d'autres comme liens de commande dans le dialogue. Cela peut faire apparaître la boîte de dialogue dans le style des applications Windows modernes. Si vous n'aimez pas ce comportement, vous pouvez définir `noLink` à `true`.
  * `normalizeAccessKeys` Boolean (facultatif) - Normalise les clés d'accès au clavier sur toutes les plateformes. Par défaut la valeur est `false`. Activer ceci suppose que `&` est utilisé dans les étiquettes des boutons pour le placement de la touche d'accès du raccourci clavier et les étiquettes seront converties pour qu'elles fonctionnent correctement sur chaque plateforme, `&` les caractères sont supprimés sur macOS, convertis en `_` sous Linux, et intactés sur Windows. Par exemple, une étiquette de bouton de `Vie&w` sera converti en `Vie_w` sous Linux et `Vie` sous macOS et peut être sélectionné via `Alt-W` sur Windows et Linux.

Retourne `Integer` - l'index du bouton cliqué.

Affiche une boîte de message, elle bloque le processus jusqu'à ce que la boîte de message soit fermée. Il renvoie l’index du bouton cliqué.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale. Si `browserWindow` n’est pas affiché, le dialogue ne lui sera pas attaché. Dans ce cas, il sera affiché comme une fenêtre indépendante.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `message` Chaîne - Contenu de la boîte de message.
  * `type` String (facultatif) - Peut être `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. Sur Windows, `"question"` affiche la même icône que `"info"`, sauf si vous définissez une icône en utilisant l'option `"icône"`. Sur macOS, `"avertissement"` et `"erreur"` affichent la même icône d'avertissement.
  * `buttons` String[] (facultatif) - Tableau des textes pour boutons. Sur Windows, un tableau se traduira par un bouton étiqueté « OK ».
  * `defaultId` Integer (facultatif) - Index du bouton dans le tableau des boutons qui seront sélectionnés par défaut lorsque la boîte de message s'ouvrira.
  * `title` String (facultatif) - Titre de la boîte de message, certaines plateformes ne l'afficheront pas.
  * `detail` String (facultatif) - Informations supplémentaires du message.
  * `checkboxLabel` String (facultatif) - Si fourni, la case de message inclura une case à cocher avec l'étiquette donnée.
  * `checkboxChecked` Boolean (facultatif) - État vérifié initial de la case contrôle. `false` par défaut.
  * `icon` [NativeImage](native-image.md) (facultatif)
  * `cancelId` Integer (facultatif) - L'index du bouton à utiliser pour annuler la boîte de dialogue, via la touche `Esc`. Par défaut, ceci est assigné au premier bouton avec l'étiquette "annuler" ou "non". Si aucun bouton de ce type n'existe et que cette option n'est pas définie, `0` sera utilisé comme valeur de retour .
  * `noLink` Booléen (optionnel) - Sous Windows, Electron essaiera de déterminer lequel des les boutons `` sont des boutons courants (comme "Annuler" ou "Oui"), et affichent le d'autres comme liens de commande dans le dialogue. Cela peut faire apparaître la boîte de dialogue dans le style des applications Windows modernes. Si vous n'aimez pas ce comportement, vous pouvez définir `noLink` à `true`.
  * `normalizeAccessKeys` Boolean (facultatif) - Normalise les clés d'accès au clavier sur toutes les plateformes. Par défaut la valeur est `false`. Activer ceci suppose que `&` est utilisé dans les étiquettes des boutons pour le placement de la touche d'accès du raccourci clavier et les étiquettes seront converties pour qu'elles fonctionnent correctement sur chaque plateforme, `&` les caractères sont supprimés sur macOS, convertis en `_` sous Linux, et intactés sur Windows. Par exemple, une étiquette de bouton de `Vie&w` sera converti en `Vie_w` sous Linux et `Vie` sous macOS et peut être sélectionné via `Alt-W` sur Windows et Linux.

Retourne `Promise<Object>` - résout avec une promesse contenant les propriétés suivantes :

* `response` numéro - L’index du bouton cliqué.
* `checkboxChecked` Boolean - L’état vérifié de la case à cocher si `checkboxLabel` a été défini. Sinon, `false`.

Affiche une boîte à messages.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

### `dialog.showErrorBox(title, content)`

* `titre` Chaîne - Le titre à afficher dans la boîte d'erreur.
* `contenu` Chaîne - Le contenu du texte à afficher dans la boîte d'erreur.

Affiche une boîte de dialogue modale qui affiche un message d'erreur.

Cette API peut être appelée en toute sécurité avant l'évènement `prêt` que le module `app` émet, il est généralement utilisé pour signaler des erreurs au début du démarrage. Si appelé avant l'application `prêt`événement sous Linux, le message sera émis sur stderr, et aucune fenêtre GUI n'apparaîtra.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif)
* `options` objet
  * `certificat` [certificat](structures/certificate.md) - Le certificat de confiance/importation.
  * `message` String - Le message à afficher à l'utilisateur.

Retourne `Promise<void>` - résout lorsque la boîte de dialogue de confiance du certificat est affichée.

Sur macOS, ceci affiche une boîte de dialogue modale présentant un message, les informations du certificat et donnant à l'utilisateur la possibilité de se fier/importer le certificat. Si vous fournissez une argument `browserWindow`, la boîte de dialogue sera attachée à la fenêtre parente.

Sous Windows, les options sont plus limitées, en raison des API Win32 utilisées:

* L'argument `message` n'est pas utilisé, car l'OS fournit sa propre boîte de dialogue de confirmation.
* L'argument `browserWindow` est ignoré car il n'est pas possible de rendre cette fenêtre de confirmation modale.

## Tableau des signets

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, et `showSaveDialogSync` retournera un tableau `bookmarks` .

| Type de compilation | sécuritéScopedBookmarks boolean | Type de retour | Valeur de retour               |
| ------------------- | ------------------------------- |:--------------:| ------------------------------ |
| mas macOS           | True                            |     Succès     | `['LONGBOOKMARKSTRING']`       |
| mas macOS           | True                            |     Error      | `['']` (tableau de corde vide) |
| mas macOS           | False                           |       NA       | `[]` (tableau vide)            |
| non mas             | any                             |       NA       | `[]` (tableau vide)            |

## Feuilles

Sur macOS, les dialogues sont présentés comme des feuilles attachées à une fenêtre si vous fournissez une référence [`BrowserWindow`](browser-window.md) dans le paramètre `browserWindow`, ou modales si aucune fenêtre n'est fournie.

Vous pouvez appeler `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` pour changer le décalage depuis la fenêtre où les feuilles sont attachées.
