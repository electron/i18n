# dialog

> Für das Anzeigen von nativen Systemdialogen beim öffnen und speichern von Dateien, Warnungen, etc.

Prozess: [Main](../glossary.md#main-process)

Ein Beispiel für das Anzeigen eines Dialogfelds zum Auswählen mehrerer Dateien:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog(' eigenschaften: ['openFile', 'multiSelections']
```

## Methoden

Das `dialog` module hat die folgenden Methoden:

### `dialog.showOpenDialogSync([browserWindow, ]Optionen)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  * `title` String (optional)
  * `defaultPath` String (optional)
  * `buttonLabel` String (optional) - Custom label für den Bestätigen-Button. Wenn leer gelassen, dann wird das default label verwendet.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `properties` String[] (optional) - Enthält, welche Features das Dialogfeld verwenden soll. Die folgenden Werte werden unterstützt:
    * `openFile` - Erlaubt die Auswahl von Dateien.
    * `openDirectory` - Erlaubt die Auswahl von Verzeichnissen.
    * `multiSelections` - Erlaubt die Auswahl mehrerer Pfade.
    * `showHiddenFiles` - Zeige versteckte Dateien im Dialog.
    * `createDirectory` _macOS_ - Erlaube das Erstellen neuer Verzeichnisse im Dialog.
    * `promptToCreate` _Windows_ - Aufforderung zur Erstellung, wenn der im Dialogfeld eingegebene Dateipfad nicht vorhanden ist. Dadurch wird die Datei nicht pfad erstellt, sondern es können nicht vorhandene Pfade zurückgegeben werden, die von der Anwendung erstellt werden sollten.
    * `noResolveAliases` _macOS_ - Deaktivieren Sie den automatischen Aliaspfad (Symlink) Auflösung. Ausgewählte Aliase geben nun den Aliaspfad zurück, anstatt ihren Zielpfad .
    * `treatPackageAsDirectory` _macOS_ – Behandeln Sie Pakete, z. B. `.app` Ordner, als Verzeichnis anstelle einer Datei.
    * `dontAddToRecent` _Windows-_ - Fügen Sie das Element, das geöffnet wird, nicht zur Liste der letzten Dokumente hinzu.
  * `message` String (optional) _macOS_ - Nachricht, die über Eingabe -Feldern angezeigt wird.
  * `securityScopedBookmarks` boolesche (optional) _macOS_ _mas_ - Erstellen Sie [Lesezeichen mit Sicherheitsbereich, die](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) , wenn sie für den Mac App Store verpackt werden.

Gibt `String[] | undefined`zurück, die vom Benutzer ausgewählten Dateipfade. Wenn das Dialogfeld abgebrochen wird, wird `undefined`zurückgegeben.

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist.

Der `filters` gibt ein Array von Dateitypen an, die angezeigt oder ausgewählt können, wenn Sie den Benutzer auf einen bestimmten Typ beschränken möchten. Ein Beispiel:

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

Das `extensions` Array sollte Erweiterungen ohne Platzhalter oder Punkte enthalten (z. B. `'png'` ist gut, aber `'.png'` und `'*.png'` sind schlecht). Um alle Dateien anzuzeigen, verwenden Sie den platzhalter `'*'` (kein anderer Platzhalter wird unterstützt).

**Hinweis:** Unter Windows und Linux kann ein geöffnetes Dialogfeld nicht sowohl ein Dateiauswahl- als auch ein Verzeichnisauswahl-Selektor sein. Wenn Sie also `properties` auf diesen Plattformen auf `['openFile', 'openDirectory']` festlegen, wird ein Verzeichnisauswahl- angezeigt.

```js
dialog.showOpenDialogSync(mainWindow,
  Eigenschaften: ['openFile', 'openDirectory']

```

### `dialog.showOpenDialog([browserWindow, ]Optionen)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  * `title` String (optional)
  * `defaultPath` String (optional)
  * `buttonLabel` String (optional) - Custom label für den Bestätigen-Button. Wenn leer gelassen, dann wird das default label verwendet.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `properties` String[] (optional) - Enthält, welche Features das Dialogfeld verwenden soll. Die folgenden Werte werden unterstützt:
    * `openFile` - Erlaubt die Auswahl von Dateien.
    * `openDirectory` - Erlaubt die Auswahl von Verzeichnissen.
    * `multiSelections` - Erlaubt die Auswahl mehrerer Pfade.
    * `showHiddenFiles` - Zeige versteckte Dateien im Dialog.
    * `createDirectory` _macOS_ - Erlaube das Erstellen neuer Verzeichnisse im Dialog.
    * `promptToCreate` _Windows_ - Aufforderung zur Erstellung, wenn der im Dialogfeld eingegebene Dateipfad nicht vorhanden ist. Dadurch wird die Datei nicht pfad erstellt, sondern es können nicht vorhandene Pfade zurückgegeben werden, die von der Anwendung erstellt werden sollten.
    * `noResolveAliases` _macOS_ - Deaktivieren Sie den automatischen Aliaspfad (Symlink) Auflösung. Ausgewählte Aliase geben nun den Aliaspfad zurück, anstatt ihren Zielpfad .
    * `treatPackageAsDirectory` _macOS_ – Behandeln Sie Pakete, z. B. `.app` Ordner, als Verzeichnis anstelle einer Datei.
    * `dontAddToRecent` _Windows-_ - Fügen Sie das Element, das geöffnet wird, nicht zur Liste der letzten Dokumente hinzu.
  * `message` String (optional) _macOS_ - Nachricht, die über Eingabe -Feldern angezeigt wird.
  * `securityScopedBookmarks` boolesche (optional) _macOS_ _mas_ - Erstellen Sie [Lesezeichen mit Sicherheitsbereich, die](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) , wenn sie für den Mac App Store verpackt werden.

Gibt `Promise<Object>` zurück - Auflösen mit einem Objekt, das Folgendes enthält:

* `canceled` boolesch - unabhängig davon, ob das Dialogfeld abgebrochen wurde.
* `filePaths` String[] - Ein Array von Dateipfaden, die vom Benutzer ausgewählt wurden. Wenn das Dialogfeld abgebrochen wird, handelt es sich um ein leeres Array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - Ein Array, das dem `filePaths` Array von base64-codierten Zeichenfolgen entspricht, das Lesezeichendaten mit Sicherheitsbereich enthält. `securityScopedBookmarks` müssen aktiviert sein, damit dies aufgefüllt werden kann. (Rückgabewerte finden Sie hier in [Tabelle](#bookmarks-array).)

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist.

Der `filters` gibt ein Array von Dateitypen an, die angezeigt oder ausgewählt können, wenn Sie den Benutzer auf einen bestimmten Typ beschränken möchten. Ein Beispiel:

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

Das `extensions` Array sollte Erweiterungen ohne Platzhalter oder Punkte enthalten (z. B. `'png'` ist gut, aber `'.png'` und `'*.png'` sind schlecht). Um alle Dateien anzuzeigen, verwenden Sie den platzhalter `'*'` (kein anderer Platzhalter wird unterstützt).

**Hinweis:** Unter Windows und Linux kann ein geöffnetes Dialogfeld nicht sowohl ein Dateiauswahl- als auch ein Verzeichnisauswahl-Selektor sein. Wenn Sie also `properties` auf diesen Plattformen auf `['openFile', 'openDirectory']` festlegen, wird ein Verzeichnisauswahl- angezeigt.

```js
dialog.showOpenDialog(mainWindow,
  Eigenschaften: ['openFile', 'openDirectory']
').then(result => '
  console.log(result.canceled)
  .log console.log(result.filePaths)
.catch(err => '
  console.log(err)
)
```

### `dialog.showSaveDialogSync([browserWindow, ]Optionen)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  * `title` String (optional)
  * `defaultPath` String (optional) - Absoluter Verzeichnispfad, absolute Datei Pfad oder Dateiname, der standardmäßig verwendet werden soll.
  * `buttonLabel` String (optional) - Custom label für den Bestätigen-Button. Wenn leer gelassen, dann wird das default label verwendet.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` String (optional) _macOS_ - Meldung, die über Textfeldern angezeigt wird.
  * `nameFieldLabel` String (optional) _macOS_ - Benutzerdefinierte Bezeichnung für den Text vor dem Textfeld Dateiname angezeigt.
  * `showsTagField` boolesch (optional) _macOS_ - Zeigen Sie das Eingabefeld für Tags an, standardmäßig auf `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Zeige versteckte Dateien im Dialog.
    * `createDirectory` _macOS_ - Erlaube das Erstellen neuer Verzeichnisse im Dialog.
    * `treatPackageAsDirectory` _macOS_ – Behandeln Sie Pakete, z. B. `.app` Ordner, als Verzeichnis anstelle einer Datei.
    * `showOverwriteConfirmation` _Linux_ - Legt fest, ob dem Benutzer ein Bestätigungsdialogfeld angezeigt wird, wenn der Benutzer einen bereits vorhandene Dateinamen eingibt.
    * `dontAddToRecent` _Windows_ - Fügen Sie das element, das gespeichert wird, nicht zur Liste der letzten Dokumente hinzu.
  * `securityScopedBookmarks` boolesche (optional) _macOS_ _mas_ - Erstellen Sie eine</a>

mit Sicherheitsbereich, wenn sie für den Mac App Store verpackt werden. Wenn diese Option aktiviert ist und die Datei noch nicht vorhanden ist, wird eine leere Datei am gewählten Pfad erstellt.</li> </ul></li> </ul> 
    
    Gibt `String | undefined`zurück, den Pfad der vom Benutzer ausgewählten Datei. Wenn das Dialogfeld abgebrochen wird, wird `undefined`zurückgegeben.
    
    Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist.
    
    Die `filters` gibt ein Array von Dateitypen an, die angezeigt werden können, siehe `dialog.showOpenDialog` beispiel.
    
    

### `dialog.showSaveDialog([browserWindow, ]Optionen)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  
    * `title` String (optional)
  * `defaultPath` String (optional) - Absoluter Verzeichnispfad, absolute Datei Pfad oder Dateiname, der standardmäßig verwendet werden soll.
  * `buttonLabel` String (optional) - Custom label für den Bestätigen-Button. Wenn leer gelassen, dann wird das default label verwendet.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` String (optional) _macOS_ - Meldung, die über Textfeldern angezeigt wird.
  * `nameFieldLabel` String (optional) _macOS_ - Benutzerdefinierte Bezeichnung für den Text vor dem Textfeld Dateiname angezeigt.
  * `showsTagField` Boolean (optional) _macOS_ - Zeigen Sie das Eingabefeld für Tags an, das standardmäßig auf `true`verwendet wird.
  * `properties` String[] (optional)
    
        * `showHiddenFiles` - Zeige versteckte Dateien im Dialog.
    * `createDirectory` _macOS_ - Erlaube das Erstellen neuer Verzeichnisse im Dialog.
    * `treatPackageAsDirectory` _macOS_ – Behandeln Sie Pakete, z. B. `.app` Ordner, als Verzeichnis anstelle einer Datei.

    * `showOverwriteConfirmation` _Linux_ - Legt fest, ob dem Benutzer ein Bestätigungsdialogfeld angezeigt wird, wenn der Benutzer einen bereits vorhandene Dateinamen eingibt.

    * `dontAddToRecent` _Windows_ - Fügen Sie das element, das gespeichert wird, nicht zur Liste der letzten Dokumente hinzu.
  * `securityScopedBookmarks` boolesche (optional) _macOS_ _mas_ - Erstellen Sie eine</a> mit Sicherheitsbereich, wenn sie für den Mac App Store verpackt werden. Wenn diese Option aktiviert ist und die Datei noch nicht vorhanden ist, wird eine leere Datei am gewählten Pfad erstellt.</li> </ul></li> </ul> 
    
    Gibt `Promise<Object>` zurück - Auflösen mit einem Objekt, das Folgendes enthält:
    
    * `canceled` boolesch - unabhängig davon, ob das Dialogfeld abgebrochen wurde.
* `filePath` String (optional) - Wenn das Dialogfeld abgebrochen wird, wird dies `undefined`.
* `bookmark` String (optional) _macOS_ _mas_ - Base64 codierte Zeichenfolge, die die sicherheitsfernen Lesezeichendaten für die gespeicherte Datei enthält. `securityScopedBookmarks` muss möglich sein, damit dies vorhanden ist. (Rückgabewerte finden Sie hier in [Tabelle](#bookmarks-array).)

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist.

Die `filters` gibt ein Array von Dateitypen an, die angezeigt werden können, siehe `dialog.showOpenDialog` beispiel.

**Hinweis:** unter macOS wird die Verwendung der asynchronen Version empfohlen, um Probleme beim erweitern und reduzieren des Dialogfelds zu vermeiden.



### `dialog.showMessageBoxSync([browserWindow, ]Optionen)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  
    * `message` String - Inhalt des Meldungsfelds.
  * `type` String (optional) - Kann `"none"`, `"info"`, `"error"`, `"question"` oder `"warning"`sein. Unter Windows zeigt `"question"` dasselbe Symbol wie `"info"`an, es sei denn, Sie ein Symbol mit der Option `"icon"` festlegen. Unter macOS `"warning"` und `"error"` das gleiche Warnsymbol anzeigen.

  * `buttons` String[] (optional) - Array von Texten für Schaltflächen. Unter Windows führt ein leeres Array zu einer Schaltfläche mit der Bezeichnung "OK".

  * `defaultId` Ganzzahl (optional) - Index der Schaltfläche im Schaltflächenarray, die beim Öffnen des Meldungsfelds standardmäßig ausgewählt .
  * `title` String (optional) - Titel des Meldungsfelds, einige Plattformen zeigen es nicht an.
  * `detail` String (optional) - Zusätzliche Informationen der Nachricht.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Standard ist `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist. If `browserWindow` is not shown dialog will not be attached to it. In such case it will be displayed as an independent window.



### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  
    * `message` String - Inhalt des Meldungsfelds.
  * `type` String (optional) - Kann `"none"`, `"info"`, `"error"`, `"question"` oder `"warning"`sein. Unter Windows zeigt `"question"` dasselbe Symbol wie `"info"`an, es sei denn, Sie ein Symbol mit der Option `"icon"` festlegen. Unter macOS `"warning"` und `"error"` das gleiche Warnsymbol anzeigen.

  * `buttons` String[] (optional) - Array von Texten für Schaltflächen. Unter Windows führt ein leeres Array zu einer Schaltfläche mit der Bezeichnung "OK".

  * `defaultId` Ganzzahl (optional) - Index der Schaltfläche im Schaltflächenarray, die beim Öffnen des Meldungsfelds standardmäßig ausgewählt .
  * `title` String (optional) - Titel des Meldungsfelds, einige Plattformen zeigen es nicht an.
  * `detail` String (optional) - Zusätzliche Informationen der Nachricht.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Standard ist `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:

* `response` Number - The index of the clicked button.
* `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box.

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist.



### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.



### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt 
    * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.

* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.



## Bookmarks array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, and `showSaveDialogSync` will return a `bookmarks` array.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
| ---------- | ------------------------------- |:-----------:| ------------------------------ |
| macOS mas  | True                            |   Success   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Error    | `['']` (array of empty string) |
| macOS mas  | False                           |     NA      | `[]` (empty array)             |
| non mas    | any                             |     NA      | `[]` (empty array)             |




## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.
