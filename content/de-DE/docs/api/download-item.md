## Klasse: DownloadItem

> Steuern Sie Dateidownloads aus Entferntquellen.

Prozess: [Main](../glossary.md#main-process)

`DownloadItem` ist ein [EventEmitter-][event-emitter] , der ein Downloadelement in Electron darstellt. Es wird in `will-download` Fall von `Session` Klasse verwendet und ermöglicht es Benutzern, das Downloadelement steuern.

```javascript
// Im Hauptprozess.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => '
  * Set the save path, so dass Electron kein Save-Dialog einfordert.
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (ereignis, state) =>
    wenn (Status === 'unterbrochen') -
      Konsole.log('Download wird unterbrochen')
    , wenn (Status === 'Fortschritt') -
      wenn (item.isPaused()) -
        Konsole.log('Download wird angehalten')
      ,
        ,,-Konsole
  
  
    
      .log (ereignis, zustand) =>
    wenn (Status === 'abgeschlossen') ,
      Konsole.log('Download erfolgreich')
    ,
      Konsole.log('Download fehlgeschlagen: ${state}')
    '
  '
)
```

### Instanz Events

#### Veranstaltung: 'aktualisiert'

Rückgabewert:

* `event` Event
* `state` String - Kann `progressing` oder `interrupted`werden.

Emitt, wenn der Download aktualisiert wurde und nicht durchgeführt wird.

Die `state` kann einer der folgenden sein:

* `progressing` - Der Download wird ausgeführt.
* `interrupted` - Der Download wurde unterbrochen und kann fortgesetzt werden.

#### Veranstaltung: 'done'

Rückgabewert:

* `event` Event
* `state` String - Kann `completed`, `cancelled` oder `interrupted`sein.

Ausgelöst, wenn der Download beendet wurde. Dazu gehören ein abgeschlossener Download, ein abgebrochener Download (über `downloadItem.cancel()`) und ein unterbrochener Download, der nicht fortgesetzt werden kann.

Die `state` kann einer der folgenden sein:

* `completed` - Der Download wurde erfolgreich abgeschlossen.
* `cancelled` - Der Download wurde abgebrochen.
* `interrupted` - Der Download wurde unterbrochen und kann nicht fortgesetzt werden.

### Instanz Methoden

Das `downloadItem` -Objekt verfügt über die folgenden Methoden:

#### `downloadItem.setSavePath(Pfad)`

* `path` String - Legen Sie den Dateipfad des Downloadelements fest.

Die API ist nur in der `will-download` -Rückruffunktion der Sitzung verfügbar. Wenn `path` nicht vorhanden ist, versucht Electron, das Verzeichnis rekursiv zu erstellen. Wenn der Benutzer den Speicherpfad nicht über die API festlegt, verwendet Electron die ursprüngliche -Routine, um den Speicherpfad zu bestimmen. Dies fordert in der Regel ein Speicherdialogfeld auf.

#### `downloadItem.getSavePath()`

Gibt `String` zurück - Der Speicherpfad des Downloadelements. Dies ist entweder der Pfad, der über `downloadItem.setSavePath(path)` festgelegt , oder der Pfad, der aus dem angezeigten -Speicherdialog ausgewählt wurde.

#### `downloadItem.setSaveDialogOptions(Optionen)`

* `options` SaveDialogOptions - Legen Sie die Dialogoptionen für die Speicherndatei fest. Dieses Objekt verfügt über dieselben Eigenschaften wie der `options` Parameter [`dialog.showSaveDialog()`](dialog.md).

Mit dieser API kann der Benutzer benutzerdefinierte Optionen für das Speicherdialogfeld festlegen, das standardmäßig für das Downloadelement öffnet. Die API ist nur in der `will-download` -Rückruffunktion der Sitzung verfügbar.

#### `downloadItem.getSaveDialogOptions()`

Gibt `SaveDialogOptions` zurück : Gibt das zuvor von `downloadItem.setSaveDialogOptions(options)`festgelegte Objekt zurück.

#### `downloadItem.pause()`

Hält den Download an.

#### `downloadItem.isPaused()`

Gibt `Boolean` zurück - Gibt an, ob der Download angehalten wurde.

#### `downloadItem.resume()`

Setzt den angehaltenen Download fort.

**Hinweis:** Um wiederverwendbare Downloads zu aktivieren, muss der Server, von dem Sie herunterladen, Bereichsanforderungen unterstützen und sowohl `Last-Modified` als auch `ETag` Headerwerte bereitstellen. Andernfalls werden `resume()` zuvor empfangene Bytes ablehnen und den Download von Anfang an neu starten.

#### `downloadItem.canResume()`

Gibt `Boolean` zurück - Gibt an, ob der Download fortgesetzt werden kann.

#### `downloadItem.cancel()`

Bricht den Downloadvorgang ab.

#### `downloadItem.getURL()`

Gibt `String` zurück : Die Ursprungs-URL, von der das Element heruntergeladen wird.

#### `downloadItem.getMimeType()`

Gibt `String` zurück - Der Dateimime-Typ.

#### `downloadItem.hasUserGesture()`

Gibt `Boolean` zurück - Gibt an, ob der Download eine Benutzergeste hat.

#### `downloadItem.getFilename()`

Gibt `String` zurück - Der Dateiname des Downloadelements.

**Hinweis:** Der Dateiname ist nicht immer derselbe wie der tatsächliche, der auf dem lokalen -Datenträger gespeichert ist. Wenn der Benutzer den Dateinamen in einem Eingabedialogfeld zum Speichern des Downloads ändert, wird der tatsächlicher Name der gespeicherten Datei anders angegeben.

#### `downloadItem.getTotalBytes()`

Gibt `Integer` zurück - Die Gesamtgröße in Bytes des Downloadelements.

Wenn die Größe unbekannt ist, gibt sie 0 zurück.

#### `downloadItem.getReceivedBytes()`

Gibt `Integer` zurück - Die empfangenen Bytes des Downloadelements.

#### `downloadItem.getContentDisposition()`

Gibt `String` zurück - Das Feld Content-Disposition aus der Antwort Header.

#### `downloadItem.getState()`

Gibt `String` zurück - Der aktuelle Status. Kann `progressing`, `completed`, `cancelled` oder `interrupted`sein.

**Hinweis:** Die folgenden Methoden sind besonders nützlich, um ein `cancelled` Element beim Neustart der Sitzung fortzusetzen.

#### `downloadItem.getURLChain()`

Gibt `String[]` zurück - Die gesamte URL-Kette des Elements einschließlich aller Umleitungen.

#### `downloadItem.getLastModifiedTime()`

Gibt `String` zurück - Der Headerwert "Letzte Änderung".

#### `downloadItem.getETag()`

Gibt `String` - ETag-Headerwert zurück.

#### `downloadItem.getStartTime()`

Gibt `Double` zurück - Anzahl der Sekunden seit der UNIX-Epoche, in der der Download gestartet wurde.

### Instanz Eigenschaften

#### `downloadItem.savePath`

Eine `String` Eigenschaft, die den Speicherdateipfad des Downloadelements bestimmt.

Die Eigenschaft ist nur in der `will-download` -Rückruffunktion der Sitzung verfügbar. Wenn der Benutzer den Speicherpfad nicht über die Eigenschaft festlegt, verwendet Electron die ursprüngliche -Routine, um den Speicherpfad zu bestimmen. Dies fordert in der Regel ein Speicherdialogfeld auf.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
