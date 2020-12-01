# Zuletzt geöffnete Dokumente (Windows & macOS)

## Übersicht

Windos und macOS bieten die Möglichkeit für Apps, die zuletzt geöffneten Dateien in der Taskbar per JumpList oder dock menu anzuzeigen.

__JumpList:__

![JumpList Zuletzt geöffnete Dateien](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__Dock Menu einer Anwendung:__

![macOS Dock Menü](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Um eine Datei zu den letzten Dokumenten hinzuzufügen, müssen Sie die [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API verwenden.

## Beispiel

### Ein Element zu den letzten Dokumenten hinzufügen

Beginnend mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), fügen Sie folgende Zeilen in die `main.js` Datei ein:

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Nachdem Sie die Electron-Anwendung gestartet haben, klicken Sie mit der rechten Maustaste auf das Symbol der Anwendung. Sie sollten den Artikel sehen, den Sie gerade hinzugefügt haben. In dieser Anleitung ist das Element eine Markdown Datei im Stammverzeichnis des Projekts:

![Aktuelles Dokument](../images/recent-documents.png)

### Liste der letzten Dokumente löschen

Um die Liste der letzten Dokumente zu löschen, müssen Sie [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API in der `main.js` Datei verwenden:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Zusätzliche Informationen

### Bemerkungen zu Windows

Um diese Funktion unter Windows nutzen zu können, muss Ihre Anwendung als ein Handler für den Dateityp des Dokuments registriert sein andernfalls wird die Datei nicht in JumpList angezeigt, auch wenn Sie sie hinzugefügt haben. Alle Informationen zum Registrieren Ihrer Anwendung finden Sie unter [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Sobald ein Nutzer auf eine Datei in der JumpList klickt, wird eine neue Instanz Ihrer Anwendung gestartet mit dem Pfad der Datei als Befehlszeilenargument.

### Bemerkungen zu macOS

#### Fügen Sie die Liste der letzten Dokumente zum Anwendungsmenü hinzu

Sie können Menüeinträge zum Zugriff und Löschen von Dokumenten hinzufügen, indem Sie folgenden Code-Snippet zu Ihrer Menüvorlage hinzufügen:

```json
{
  "Untermenü":[
    {
      "label":"Kürzlich geöffnet",
      "Rolle":"Letzte Dokumente",
      "Untermenü":[
        {
          "label":"Kürzlich löschen",
          "Rolle":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![macOS Letzte Dokumente Menüpunkt](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

Sobald eine Datei vom Menu der zuletzt hinzugefügten Dateien angefordert wird, so wird dafür das `open-file`-Event des `app`-Moduls ausgeworfen.
