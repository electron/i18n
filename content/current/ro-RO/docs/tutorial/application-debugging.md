# Depanarea aplicației

Ori de câte ori aplicarea ta Electron nu se comportă așa cum ai dorit, o serie de instrumente de depanare vă pot ajuta să găsiți erori de codificare, performanță blocaje sau oportunități de optimizare.

## Procesul de redare

Instrumentul cel mai cuprinzător pentru depanarea proceselor individuale de redare este Unelte de Dezvoltator Chromium. Este disponibil pentru toate procesele de redare, inclusiv instanţele `BrowserWindow`, `BrowserView`şi `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google oferă [documentație excelentă pentru instrumentele lor de dezvoltator](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Procesul principal

Depanarea procesului principal este puțin mai complicată, deoarece nu poți deschide instrumente de dezvoltare pentru ei. Instrumentele de dezvoltare Chromium pot fi [folosite pentru a depana procesul principal al Electron](https://nodejs.org/en/docs/inspector/) mulțumită unei colaborări mai strânse între Google / Chrome și Node. , dar ai putea întâlni ciudăți ca `necesită` să nu fie prezent în consolă.

Pentru mai multe informații, a se vedea [Debugging the Main Process documentation](./debugging-main-process.md).

## Accidente V8

În cazul în care contextul V8 se blochează, DevTools va afișa acest mesaj.

`DevTools a fost deconectat de la pagină. Odată reîncărcată pagina, DevTools se vor reconecta automat.`

Jurnalele de crom pot fi activate prin intermediul variabilei `ELECTRON_ENABLE_LOGGING`. For more information, see the [environment variables documentation](../api/environment-variables.md#electron_enable_logging).

Alternativ, argumentul liniei de comandă `--active-logging` poate fi pasat. More information is available in the [command line switches documentation](../api/command-line-switches.md#--enable-logging).
