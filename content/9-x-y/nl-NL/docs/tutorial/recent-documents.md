# Recente Documenten (Windows & macOS)

Windows en macOS bieden toegang tot een lijst van recente documenten die geopend zijn door de applicatie via respectievelijk JumpList of dock menu.

__JumpList:__

![JumpList Recente Bestanden][1]

__Programma dock menu:__

![macOS Dock Menu][2]

To add a file to recent documents, you can use the [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments][clearrecentdocuments] API to empty the recent documents list:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows Notities

Om deze functie te kunnen gebruiken op Windows, de applicatie moet worden geregistreerd als afzender van het bestandstype van het document. anders wordt het bestand niet weergegeven in de JumpLijst, zelfs niet nadat je het hebt toegevoegd. You can find everything on registering your application in [Application Registration][app-registration].

Wanneer een gebruiker op een bestand klikt van de JumpList, een nieuwe instantie van uw applicatie zal worden gestart met het pad van het bestand dat is toegevoegd als opdrachtregelargument.

## macOS notities

Wanneer een bestand wordt aangevraagd uit het menu recente documenten, de `open-file` event van `app` module zal worden uitgestoten.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
