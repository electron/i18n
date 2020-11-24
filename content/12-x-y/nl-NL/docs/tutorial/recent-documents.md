# Recente Documenten (Windows & macOS)

## Overview

Windows en macOS bieden toegang tot een lijst van recente documenten die geopend zijn door de applicatie via respectievelijk JumpList of dock menu.

__JumpList:__

![JumpList Recente Bestanden][1]

__Programma dock menu:__

![macOS Dock Menu][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## Voorbeeld

### Een item toevoegen aan recente documenten

Vanaf een werkende applicatie uit de [Snelstartgids](quick-start.md), voeg de volgende regels toe aan het `main.js` bestand:

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Na het starten van de Electron applicatie, klik met de rechtermuisknop op het toepassingspictogram. Je zou het item dat je net hebt toegevoegd moeten zien. In deze handleiding, is het artikel een Markdown bestand gelegen in de hoofdmap van het project:

![Recent document](../images/recent-documents.png)

### Leeg de lijst van recente documenten

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Extra informatie

### Windows Notities

Om deze functie te gebruiken in Windows, moet de applicatie geregistreerd zijn als een handler van het bestandstype van het document, anders wordt het bestand niet weergegeven in de JumpList zelfs als je het hebt toegevoegd. You can find everything on registering your application in [Application Registration][app-registration].

Wanneer een gebruiker op een bestand klikt van de JumpList, een nieuwe instantie van uw applicatie zal worden gestart met het pad van het bestand dat is toegevoegd als opdrachtregelargument.

### macOS notities

#### Voeg de recente documentenlijst toe aan het applicatie menu

You can add menu items to access and clear recent documents by adding the following code snippet to your menu template:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocumenten",
      "submenu":[
        {
          "label":"Verwijder Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![macOS Recente Documenten menu-item][6]

Wanneer een bestand wordt aangevraagd uit het menu recente documenten, de `open-file` event van `app` module zal worden uitgestoten.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
