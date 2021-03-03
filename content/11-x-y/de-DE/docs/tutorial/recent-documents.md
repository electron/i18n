# Zuletzt geöffnete Dokumente (Windows & macOS)

Windos und macOS bieten die Möglichkeit für Apps, die zuletzt geöffneten Dateien in der Taskbar per JumpList oder dock menu anzuzeigen.

__JumpList:__

![JumpList Zuletzt geöffnete Dateien][1]

__Dock Menu einer Anwendung:__

![macOS Dock Menü][2]

Um eine Datei zu den zuletzt verwendeten Dokumenten hinzuzufügen können Sie die [app.addRecentDocument][addrecentdocument] API verwenden:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Und Sie können die [app.clearRecentDocuments][clearrecentdocuments] API verwenden um die Liste der zuletzt verwendeten Dokumente zu leeren:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Bemerkungen zu Windows

Um diese Funktion unter Windows zu nutzen, muss die Anwendung als Handler für den Dateityp des Dokuments registriert sein, ansonsten wird die Datei nicht in der JumpList erscheinen, auch nachdem sie hinzugefügt wurde. Alle Informationen zum Registrieren Ihrer Anwendung finden Sie unter [Application Registration][app-registration].

Sobald ein Nutzer auf eine Datei in der JumpList klickt, wird eine neue Instanz Ihrer Anwendung gestartet mit dem Pfad der Datei als Befehlszeilenargument.

## Bemerkungen zu macOS

### Hinzufügen der Liste der letzten Dokumente in das Anwendungsmenü:

![macOS Letzte Dokumente Menüpunkt][6]

Sie können Menüeinträge hinzufügen, um auf neue Dokumente zuzugreifen und zu löschen, indem Sie das folgende Code-Snippet in die Vorlage Ihres Menüs einfügen.

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

Sobald eine Datei vom Menu der zuletzt hinzugefügten Dateien angefordert wird, so wird dafür das `open-file`-Event des `app`-Moduls ausgeworfen.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
