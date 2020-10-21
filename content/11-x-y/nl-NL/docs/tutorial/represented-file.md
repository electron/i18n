# Representatief bestand voor macOS BrowserWindows

Op macOS kan een venster een bestand instellen zodat het pictogram van het bestand kan worden weergegeven in de titelbalk en wanneer gebruikers commando-Klik of Control-Klik op de titel een pad popup zal tonen.

U kunt ook de bewerkte status van een venster instellen zodat het pictogram van het bestand kan aangeven of het document in dit venster is gewijzigd.

__Representatief bestand popup menu:__

![Representatief bestand][1]

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
