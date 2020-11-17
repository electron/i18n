# Předložený soubor pro macOS BrowserWindows

Na macOS může okno nastavit zastoupený soubor, aby se ikona souboru mohla zobrazit v záhlaví a po kliknutí uživatele na tlačítko Ovládat název se zobrazí cesta vyskakovací okno.

Můžete také nastavit upravený stav okna tak, aby ikona souboru mohla indikovat zda byl dokument v tomto okně upraven.

__Předložené vyskakovací menu souboru:__

![Předložený soubor][1]

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumented(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
