# Fișier reprezentant pentru macOS BrowserWindows

Pe macOS o fereastră poate seta fișierul reprezentat, astfel încât pictograma fișierului să poată fi afișată în bara de titlu și când vor fi afișate comenzile utilizatorilor sau Control-Click pe titlu o cale popup .

De asemenea, puteți seta starea editată a unei ferestre, astfel încât pictograma fișierului să poată indica dacă documentul din această fereastră a fost modificat.

__Reprezentat meniul popup:__

![Fișier reprezentat][1]

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setReprezentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
