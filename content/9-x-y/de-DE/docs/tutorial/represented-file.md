# Repräsentative Datei für macOS BrowserWindows

Auf macOS kann ein Fenster seine repräsentierte Datei festlegen damit das Dateisymbol in die Titelleiste anzeigen kann und wenn Benutzer Befehlsklick oder Strg-Klick auf den Titel anzeigen, wird ein Pfad Popup angezeigt.

Sie können auch den Bearbeitungsstatus eines Fensters so einstellen, dass das Dateisymbol angeben kann, ob das Dokument in diesem Fenster geändert wurde.

__Repräsentiertes Datei-Popup-Menü:__

![Repräsentierte Datei][1]

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
