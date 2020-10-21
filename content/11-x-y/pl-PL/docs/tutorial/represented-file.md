# Reprezentowany plik dla macOS BrowserWindows

Na macOS okno może ustawić reprezentowany plik, aby ikona pliku mogła wyświetlać się na pasku tytułowym i kiedy pojawi się polecenie kliknięcie lub przycisk "Control" na tytule, na którym pojawi się wyskakujące okno .

Możesz również ustawić stan edycji okna, aby ikona pliku mogła wskazywać czy dokument w tym oknie został zmodyfikowany.

__Reprezentowane menu wyskakujące pliki:__

![Reprezentowany plik][1]

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
