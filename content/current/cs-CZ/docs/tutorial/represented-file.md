# Předložený soubor pro macOS BrowserWindows

Na macOS může okno nastavit zastoupený soubor, aby se ikona souboru mohla zobrazit v záhlaví a po kliknutí uživatele na tlačítko Ovládat název se zobrazí cesta vyskakovací okno.

Můžete také nastavit upravený stav okna tak, aby ikona souboru mohla indikovat zda byl dokument v tomto okně upraven.

__Předložené vyskakovací menu souboru:__

![Předložený soubor](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Chcete-li nastavit reprezentovaný soubor okna, můžete použít [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) a [BrowserWindow.setDocumented](../api/browser-window.md#winsetdocumenteditededited-macos) API:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumented(true)
```
