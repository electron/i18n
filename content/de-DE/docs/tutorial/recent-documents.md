# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Dock Menu einer Anwendung:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Um eine Datei zu den zuletzt verwendeten Dokumenten hinzuzufügen können Sie die [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API verwenden:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Und Sie können die [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API verwenden um die Liste der zuletzt verwendeten Dokumente zu leeren:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Bemerkungen zu Windows

Um diese Funktion unter Windows zu nutzen, muss die Anwendung als Handler für den Dateityp des Dokuments registriert sein, ansonsten wird die Datei nicht in der JumpList erscheinen, auch nachdem sie hinzugefügt wurde. Alle Informationen zum Registrieren Ihrer Anwendung finden Sie unter [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Sobald ein Nutzer auf eine Datei in der JumpList klickt, wird eine neue Instanz Ihrer Anwendung gestartet mit dem Pfad der Datei als Befehlszeilenargument.

## Bemerkungen zu macOS

Sobald eine Datei vom Menu der zuletzt hinzugefügten Dateien angefordert wird, so wird dafür das `open-file`-Event des `app`-Moduls ausgeworfen.