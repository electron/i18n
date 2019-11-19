# dialog

> Affiche une boîte de dialogue du système natif pour ouvrir et enregistrer des fichiers, alertes, etc...

Processus : [Main](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

La boîte de dialogue est ouverte depuis le thread principal d'Electron. Si vous voulez utiliser l'objet dialog depuis un renderer process, n'oubliez pas d'y accéder en utilisant remote :

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Méthodes

Le module `dialog` dispose des méthodes suivantes :

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `title` String (facultatif)
  * `defaultPath` String (facultatif)
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `properties` String[] (facultatif) - Contient les fonctionnalités que la boîte de dialogue devrait utiliser. Les valeurs suivantes sont prises en charge : 
    * `openFile` - Permet la sélection de fichiers.
    * `openDirectory` - Permet la sélection de dossiers.
    * `multiSelections` - Permet la sélection de multiples chemins.
    * `showHiddenFiles` - Affiche les fichiers cachés dans la boîte de dialogue.
    * `createDirectory` *macOS* - Permet la création de nouveaux dossiers depuis la boîte de dialogue.
    * `promptToCreate` *Windows* - Demande la création du dossier si le chemin d'accès du fichier entré dans la boîte de dialogue n'existe pas. Cela ne créer par réellement le fichier dans le chemin d'accès mais permet de donner des chemins d'accès inexistant qui devraient être créés par l'application.
    * `noResolveAliases` *macOS* - Désactive la resolution automatique des alias (symlink). Les alias sélectionnés retourneront dorénavant leur chemin au lieu de celui de leur cible.
    * `treatPackageAsDirectory` *macOS* - Considérer les paquets, tels que les dossiers `.app`, comme des dossiers plutôt que des fichiers.
  * `message` String (facultatif) *macOS* - Message à afficher au-dessus des zones de saisie.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Les `filters` spécifie un tableau de types de fichiers pouvant être affichés ou sélectionnés lorsque vous souhaitez limiter l'utilisateur à un type spécifique. Par exemple :

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Le tableau d'`extensions` devrait contenir les extensions sans caractères génériques ou de point (par exemple `'png'` est correct, mais `'.png'` et `'*.png'` ne l'est pas). Pour afficher tous les fichiers, utilisez le caractère générique `'*'` (aucun autre caractère générique n'est pris en charge).

**Remarque :** Sur Windows et Linux, une boîte de dialogue ne peux pas être à la fois une sélection de fichier et une sélection de dossier, donc si vous définissez `properties` à `['openFile', 'openDirectory']` sur ces plateformes, c'est la sélection de dossier qui s'affichera.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `title` String (facultatif)
  * `defaultPath` String (facultatif)
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `properties` String[] (facultatif) - Contient les fonctionnalités que la boîte de dialogue devrait utiliser. Les valeurs suivantes sont prises en charge : 
    * `openFile` - Permet la sélection de fichiers.
    * `openDirectory` - Permet la sélection de dossiers.
    * `multiSelections` - Permet la sélection de multiples chemins.
    * `showHiddenFiles` - Affiche les fichiers cachés dans la boîte de dialogue.
    * `createDirectory` *macOS* - Permet la création de nouveaux dossiers depuis la boîte de dialogue.
    * `promptToCreate` *Windows* - Demande la création du dossier si le chemin d'accès du fichier entré dans la boîte de dialogue n'existe pas. Cela ne créer par réellement le fichier dans le chemin d'accès mais permet de donner des chemins d'accès inexistant qui devraient être créés par l'application.
    * `noResolveAliases` *macOS* - Désactive la resolution automatique des alias (symlink). Les alias sélectionnés retourneront dorénavant leur chemin au lieu de celui de leur cible.
    * `treatPackageAsDirectory` *macOS* - Considérer les paquets, tels que les dossiers `.app`, comme des dossiers plutôt que des fichiers.
  * `message` String (facultatif) *macOS* - Message à afficher au-dessus des zones de saisie.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Les `filters` spécifie un tableau de types de fichiers pouvant être affichés ou sélectionnés lorsque vous souhaitez limiter l'utilisateur à un type spécifique. Par exemple :

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
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

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `title` String (facultatif)
  * `defaultPath` String (facultatif) - Chemin d'accès absolu, le chemin d'accès absolu du fichier, ou le nom du fichier à utiliser par défaut.
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `message` String (facultatif) *macOS* - Message à afficher au-dessus des champs de texte.
  * `nameFieldLabel` String (facultatif) *macOS* - Étiquette personnalisé pour le texte affiché dans la zone de texte du nom de fichier.
  * `showsTagField` Boolean (facultatif) *macOS* - Affiche le champ de texte. `true` par défaut.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Les `filters` spécifie un tableau de types de fichiers qui peuvent être affichés, allez voir `dialog.showOpenDialog` pour un exemple.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `title` String (facultatif)
  * `defaultPath` String (facultatif) - Chemin d'accès absolu, le chemin d'accès absolu du fichier, ou le nom du fichier à utiliser par défaut.
  * `buttonLabel` String (facultatif) - Étiquette personnalisé pour le bouton de confirmation. Si laissé vide, l'étiquette par défaut sera utilisé.
  * `filters` [FileFilter[]](structures/file-filter.md) (facultatif)
  * `message` String (facultatif) *macOS* - Message à afficher au-dessus des champs de texte.
  * `nameFieldLabel` String (facultatif) *macOS* - Étiquette personnalisé pour le texte affiché dans la zone de texte du nom de fichier.
  * `showsTagField` Boolean (facultatif) *macOS* - Affiche le champ de texte. `true` par défaut.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `Promise<Object>` - Resolve with an object containing the following:

    * `canceled` Boolean - whether or not the dialog was canceled.
    * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
    * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.
    

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

Les `filters` spécifie un tableau de types de fichiers qui peuvent être affichés, allez voir `dialog.showOpenDialog` pour un exemple.

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `type` String (facultatif) - Peut être `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Par défaut la valeur est `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `type` String (facultatif) - Peut être `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Par défaut la valeur est `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:

    * `response` Number - The index of the clicked button.
    * `checkboxChecked` Boolean - The checked state of the checkbox if
    `checkboxLabel` was set. Otherwise `false`.
    

Shows a message box, it will block the process until the message box is closed.

L'argument `browserWindow` permet à la boîte de dialogue de s'attacher elle-même à la fenêtre parent, la rendant modale.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Objet 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Feuilles

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.