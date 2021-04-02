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
  * `checkboxLabel` String (optional) - Wenn angegeben, wird das Meldungsfeld ein Kontrollkästchen mit der angegebenen Bezeichnung enthalten.
  * `checkboxChecked` Boolean (optional) - Der zunächst überprüfte Status des Kontrollkästchens . `false` standardmäßig.
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `cancelId` Ganzzahl (optional) - Der Index der Schaltfläche, die zum Abbrechen des Dialogs verwendet werden soll, über die `Esc` -Taste. Standardmäßig wird dies der ersten Schaltfläche mit "abbrechen" oder "nein" als -Label zugewiesen. Wenn keine solchen beschrifteten Schaltflächen vorhanden sind und diese Option nicht festgelegt ist, wird `0` als Rückgabewert verwendet.
  * `noLink` Boolean (optional) - Unter Windows wird Electron versuchen herauszufinden, welche der die `buttons` häufigen Schaltflächen sind (wie "Abbrechen" oder "Ja"), und die anderen als Befehlslinks im Dialog zeigen. Dadurch kann das Dialogfeld in Stil moderner Windows-Apps angezeigt werden. Wenn Ihnen dieses Verhalten nicht gefällt, können Sie `noLink` auf `true`festlegen.
  * `normalizeAccessKeys` boolesch (optional) - Normalisieren Sie die Tastaturzugriffstasten plattformübergreifend. Standard ist `false`. Wenn Sie dies aktivieren, wird davon ausgegangen `&` in den Schaltflächenbeschriftungen für die Platzierung der Tastenkombinationstaste verwendet wird und Beschriftungen werden konvertiert, damit sie auf jeder Plattform ordnungsgemäß funktionieren, `&` Zeichen unter macOS entfernt, unter Linux in `_` konvertiert und unter Windows unberührt bleiben. Beispielsweise wird eine Schaltflächenbezeichnung `Vie&w` in `Vie_w` unter Linux und `View` unter macOS konvertiert und kann über `Alt-W` unter Windows und Linux ausgewählt werden.

Gibt `Integer` zurück - den Index der angeklickten Schaltfläche.

Zeigt ein Meldungsfeld an, das den Prozess blockiert, bis das Meldungsfeld geschlossen wird. Es gibt den Index der angeklickten Schaltfläche zurück.

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist. Wenn `browserWindow` nicht angezeigt wird, wird das Dialogfeld nicht angefügt. In diesem Fall wird es als unabhängiges Fenster angezeigt.



### `dialog.showMessageBox([browserWindow, ]Optionen)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt
  
    * `message` String - Inhalt des Meldungsfelds.
  * `type` String (optional) - Kann `"none"`, `"info"`, `"error"`, `"question"` oder `"warning"`sein. Unter Windows zeigt `"question"` dasselbe Symbol wie `"info"`an, es sei denn, Sie ein Symbol mit der Option `"icon"` festlegen. Unter macOS `"warning"` und `"error"` das gleiche Warnsymbol anzeigen.

  * `buttons` String[] (optional) - Array von Texten für Schaltflächen. Unter Windows führt ein leeres Array zu einer Schaltfläche mit der Bezeichnung "OK".

  * `defaultId` Ganzzahl (optional) - Index der Schaltfläche im Schaltflächenarray, die beim Öffnen des Meldungsfelds standardmäßig ausgewählt .
  * `title` String (optional) - Titel des Meldungsfelds, einige Plattformen zeigen es nicht an.
  * `detail` String (optional) - Zusätzliche Informationen der Nachricht.
  * `checkboxLabel` String (optional) - Wenn angegeben, wird das Meldungsfeld ein Kontrollkästchen mit der angegebenen Bezeichnung enthalten.
  * `checkboxChecked` Boolean (optional) - Der zunächst überprüfte Status des Kontrollkästchens . `false` standardmäßig.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Ganzzahl (optional) - Der Index der Schaltfläche, die zum Abbrechen des Dialogs verwendet werden soll, über die `Esc` -Taste. Standardmäßig wird dies der ersten Schaltfläche mit "abbrechen" oder "nein" als -Label zugewiesen. Wenn keine solchen beschrifteten Schaltflächen vorhanden sind und diese Option nicht festgelegt ist, wird `0` als Rückgabewert verwendet.
  * `noLink` Boolean (optional) - Unter Windows wird Electron versuchen herauszufinden, welche der die `buttons` häufigen Schaltflächen sind (wie "Abbrechen" oder "Ja"), und die anderen als Befehlslinks im Dialog zeigen. Dadurch kann das Dialogfeld in Stil moderner Windows-Apps angezeigt werden. Wenn Ihnen dieses Verhalten nicht gefällt, können Sie `noLink` auf `true`festlegen.
  * `normalizeAccessKeys` boolesch (optional) - Normalisieren Sie die Tastaturzugriffstasten plattformübergreifend. Standard ist `false`. Wenn Sie dies aktivieren, wird davon ausgegangen `&` in den Schaltflächenbeschriftungen für die Platzierung der Tastenkombinationstaste verwendet wird und Beschriftungen werden konvertiert, damit sie auf jeder Plattform ordnungsgemäß funktionieren, `&` Zeichen unter macOS entfernt, unter Linux in `_` konvertiert und unter Windows unberührt bleiben. Beispielsweise wird eine Schaltflächenbezeichnung `Vie&w` in `Vie_w` unter Linux und `View` unter macOS konvertiert und kann über `Alt-W` unter Windows und Linux ausgewählt werden.

Gibt `Promise<Object>` zurück - löst mit einem Versprechen auf, das die folgenden Eigenschaften enthält:

* `response` - Der Index der angeklickten Schaltfläche.
* `checkboxChecked` Boolean - Der aktivierte Status des Kontrollkästchens, wenn `checkboxLabel` festgelegt wurde. Ansonsten `false`.

Zeigt ein Meldungsfeld an.

Das Argument `browserWindow` ermöglicht es dem Dialogfeld, sich selbst an ein übergeordnetes Fenster anzufügen, sodass es modal ist.



### `dialog.showErrorBox(title, content)`

* `title` String - Der Titel, der im Fehlerfeld angezeigt werden soll.
* `content` String - Der Textinhalt, der im Fehlerfeld angezeigt werden soll.

Zeigt ein modales Dialogfeld an, in dem eine Fehlermeldung angezeigt wird.

Diese API kann sicher aufgerufen werden, bevor das `ready` -Ereignis das `app` -Modul ausgibt, es in der Regel verwendet wird, um Fehler in der frühen Phase des Startvorgangs zu melden. Wenn vor dem App- `ready`-Ereignis unter Linux aufgerufen wird, wird die Nachricht an stderr, und kein GUI-Dialog angezeigt.



### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` -Objekt 
    * `certificate` [Zertifikat](structures/certificate.md) - Das Zertifikat, dem Vertrauenswürdige/Import ist.
  * `message` String - Die Meldung, die dem Benutzer angezeigt werden soll.

Gibt `Promise<void>` zurück - löst auf, wenn das Dialogfeld zertifikatsvertrauensangezeigt wird.

Unter macOS wird ein modales Dialogfeld angezeigt, das eine Meldung und ein Zertifikat Informationen anzeigt und dem Benutzer die Möglichkeit gibt, dem Zertifikat zu vertrauen/zu importieren. Wenn Sie ein `browserWindow` Argument angeben, wird das Dialogfeld an das übergeordnete Fenster angefügt, sodass es modal ist.

Unter Windows sind die Optionen aufgrund der verwendeten Win32-APIs eingeschränkter:

* Das `message` -Argument wird nicht verwendet, da das Betriebssystem eine eigene Bestätigung Dialog bietet.

* Das `browserWindow` -Argument wird ignoriert, da es nicht möglich ist, diesem Bestätigungsdialogfeld modal zu machen.



## Lesezeichen-Array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`und `showSaveDialogSync` geben ein `bookmarks` Array zurück.

| Buildtyp  | securityScopedBookmarks boolesch | Rückgabetyp | Rückgabewert                           |
| --------- | -------------------------------- |:-----------:| -------------------------------------- |
| macOS mas | STIMMT                           |   Erfolg    | `['LONGBOOKMARKstring']`               |
| macOS mas | STIMMT                           |    Error    | `['']` (Array der leeren Zeichenfolge) |
| macOS mas | FALSE                            |     Na      | `[]` (leeres Array)                    |
| nicht mas | jegliche                         |     Na      | `[]` (leeres Array)                    |




## Blätter

Unter macOS werden Dialogfelder als Blätter angezeigt, die an ein Fenster angefügt sind, wenn Sie einen [`BrowserWindow`](browser-window.md) Verweis im Parameter `browserWindow` oder Modals angeben, wenn kein Fenster angegeben ist.

Sie können `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` aufrufen, um den Versatz aus dem Fensterrahmen zu ändern, an dem Blätter befestigt sind.
