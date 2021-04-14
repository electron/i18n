# Shell

> Verwalten von Dateien und URLs durch ihre Standardprogramme.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) (nur nicht sandkastenfrei)

Das `shell` -Modul bietet Funktionen im Zusammenhang mit der Desktop-Integration.

Ein Beispiel für das Öffnen einer URL im Standardbrowser des Benutzers:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**Hinweis:** Während das `shell` -Modul im Renderer-Prozess verwendet werden kann, funktioniert es nicht in einem Sandkasten-Renderer.

## Methoden

Das `shell` Modul verfügt über die folgenden Methoden:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Zeigen Sie die angegebene Datei in einem Dateimanager an. Wählen Sie nach Möglichkeit die Datei aus.

### `shell.openPath(path)`

* `path` String

Gibt `Promise<String>` zurück - Behebt mit einer Zeichenfolge, die die Fehlermeldung enthält, die dem Fehler entspricht, wenn ein Fehler aufgetreten ist, andernfalls "".

Öffnen Sie die angegebene Datei standardmäßig auf dem Desktop.

### `shell.openExternal(url[, options])`

* `url` String - Max. 2081 Zeichen in Fenstern.
* `options` Objekt (optional)
  * `activate` boolesch (optional) _macOS_ - `true` , um die geöffnete Anwendung in den Vordergrund zu rücken. Der Standardwert ist `true`.
  * `workingDirectory` String (optional) _Windows_ - Das Arbeitsverzeichnis.

Rückgaben `Promise<void>`

Öffnen Sie die angegebene externe Protokoll-URL standardmäßig auf dem Desktop. (Z. B. mailto: URLs im Standard-Mail-Agent des Benutzers).

### `shell.moveItemToTrash(fullPath[, deleteOnFail])` _veraltete_

* `fullPath` String
* `deleteOnFail` boolesch (optional) - Gibt an, ob das Element einseitig entfernt werden soll, wenn der Papierkorb auf dem Volume deaktiviert oder nicht unterstützt wird. _macOS-_

Gibt `Boolean` zurück : Gibt an, ob das Element erfolgreich in den Papierkorb verschoben oder anderweitig gelöscht wurde.

> HINWEIS: Diese Methode ist veraltet. Verwenden Sie stattdessen `shell.trashItem` .

Verschieben Sie die angegebene Datei in den Papierkorb und geben Sie einen booleschen Status für den Vorgang zurück.

### `shell.trashItem(path)`

* `path` String - Pfad zu dem Element, das in den Papierkorb verschoben werden soll.

Gibt `Promise<void>` zurück - Wird behoben, wenn der Vorgang abgeschlossen wurde. Lehnt ab, wenn beim Löschen des angeforderten Elements ein Fehler aufgetreten ist.

Dadurch wird ein Pfad zum OS-spezifischen Papierkorbspeicherort verschoben (Trash unter macOS, Bin unter Windows und ein Desktop-umgebungsspezifischer Speicherort unter Linux).

### `shell.beep()`

Spielen Sie den Piepton.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows-_

* `shortcutPath` String
* `operation` String (optional) - Standard ist `create`, kann einer der folgenden sein:
  * `create` - Erstellt eine neue Verknüpfung, bei Bedarf überschreibt.
  * `update` - Aktualisiert angegebene Eigenschaften nur für eine vorhandene Verknüpfung.
  * `replace` - Überschreibt eine vorhandene Verknüpfung, schlägt fehl, wenn die Verknüpfung nicht vorhanden .
* `options` [ShortcutDetails](structures/shortcut-details.md)

Gibt `Boolean` zurück : Gibt an, ob die Verknüpfung erfolgreich erstellt wurde.

Erstellt oder aktualisiert eine Verknüpfung unter `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

Rücksendungen [`ShortcutDetails`](structures/shortcut-details.md)

Löst die Verknüpfungsverknüpfung bei `shortcutPath`auf.

Eine Ausnahme wird ausgelöst, wenn ein Fehler auftritt.
