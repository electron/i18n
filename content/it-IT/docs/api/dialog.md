# dialogo

> Visualizza finestre di dialogo per l'apertura e il salvataggio di file, avvisi ecc.

Processo: [Main](../glossary.md#main-process)

Un esempio è l'apertura di una finestra per la selezione multipla di file e/o cartelle:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

La finestra viene aperta dal processo principale di Electron. Se si vuole accedere all'oggetto della finestra dal processo "rendere", ricorda di utilizzare "remote":

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Metodi

Il modulo `"dialog"` espone i seguenti metodi:

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (opzionale)
* `options` Oggetto 
  * `title` String (opzionale)
  * `defaultPath` String (opzionale)
  * `buttonLabel` String (opzionale) - Etichetta personalizzata per il pulsante di conferma, se lasciata vuota verrà utilizzata quella di default.
  * `filters` [FileFilter[]](structures/file-filter.md) (opzionale)
  * `properties` String[] (opzionale) - Indica le caratteristiche che la finestra di dialogo renderà disponibili. A seguire i valori supportati: 
    * `openFile` - Permette la selezione dei file.
    * `openDirectory` - Permette la selezione delle cartelle.
    * `multiSelections` - Permette di selezionare più di un percorso.
    * `showHiddenFiles` - Mostra i file nascosti.
    * `createDirectory` *macOS* - Permette la creazione di nuove cartelle all'interno della finestra.
    * 0>promptToCreate</code> *Windows* - Effettua la creazione del file se il percorso inserito nel dialog non esiste. This does not actually create the file at the path but allows non-existent paths to be returned that should be created by the application.
    * `noResolveAliases` *macOS* - Disabilita la risoluzione automatica dei collegamenti (symlink). I collegamenti selezionati non ritorneranno il proprio percorso, bensì il percorso a cui puntano.
    * `treatPackageAsDirectory` *macOS* - Considera packages, come ad esempio la cartella `.app`, come cartelle anzichè file.
  * `message` String (opzionale) *macOS* - Messaggio da mostrare sopra alle caselle di input.
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Function (opzionale) 
  * `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be `undefined`.
  * `bookmarks` String[] (optional) *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

Returns `String[] | undefined`, an array of file paths chosen by the user, if the callback is provided it returns `undefined`.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. For example:

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

L'array `extensions` deve contenere estensioni di file senza caratteri wildcard o punti (es. `'png'` va bene `'.png'` ma `'*.png'` no). Per mostrare tutti i file, usare il carattere wildcard `'*'` (non sono supportati altri caratteri wildcard).

Se viene passata una `callback`, la chiamata alla API sarà asincrona ed il risultato sarà disponibile tramite `callback(filenames)`.

**Nota:** Su Windows e Linux un dialogo aperto non può essere sia un selettore di file che uno di cartelle, quindi se imposti `properties` a `['openFile', 'openDirectory']` su questi sistemi, verrà mostrato un selettore di cartelle.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (opzionale)
* `options` Oggetto 
  * `title` String (opzionale)
  * `defaultPath` String (opzionale) - Indirizzo assoluto a cartella, indirizzo assoluto a file, o nome di file da usare di default.
  * `buttonLabel` String (opzionale) - Etichetta personalizzata per il pulsante di conferma, se lasciata vuota verrà utilizzata quella di default.
  * `filters` [FileFilter[]](structures/file-filter.md) (opzionale)
  * `message` String (opzionale) *macOS* - Messaggio da mostrare sopra ai campi di testo.
  * `nameFieldLabel` String (opzionale) *macOS* - Etichetta personalizzata per il testo mostrato sopra al campo di testo del nome file.
  * `showsTagField` Boolean (optional) *macOS* - Show the tags input box, defaults to `true`.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
* `callback` Function (opzionale) 
  * `filename` String (optional) If the dialog is cancelled this will be `undefined`.
  * `bookmark` String (optional) *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Returns `String | undefined`, the path of the file chosen by the user, if a callback is provided or the dialog is cancelled it returns `undefined`.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`.

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (opzionale)
* `options` Oggetto 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Di default è `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.
* `callback` Function (opzionale) 
  * `response` Number - The index of the button that was clicked.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

If the `callback` and `browserWindow` arguments are passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (opzionale)
* `options` Oggetto 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback` Funzione

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.