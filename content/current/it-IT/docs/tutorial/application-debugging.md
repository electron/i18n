# Debug Applicazione

Ogni volta che l'applicazione Electron non si comporta come volevate, una serie di strumenti di debug potrebbe aiutarti a trovare errori di programmazione, prestazioni strozzature o opportunità di ottimizzazione.

## Processo di rendering

Lo strumento più completo per il debug dei singoli processi di renderer è il Chromium Developer Toolset. È disponibile per tutti i processi di renderer, comprese le istanze di `BrowserWindow`, `BrowserView`, e `WebView`. È possibile aprirli programmaticamente chiamando l'API `openDevTools()` sul `contenuto web` dell'istanza:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offre [eccellente documentazione per i loro strumenti di sviluppo](https://developer.chrome.com/devtools). Si consiglia di farti familiarizzare con loro - sono di solito una delle utility più potenti in qualsiasi cintura di strumenti di Electron Developer.

## Processo principale (main)

Il debug del processo principale è un po 'più complicato, dal momento che non è possibile aprire strumenti di sviluppo per loro. Gli strumenti per sviluppatori di cromo possono [essere utilizzati per il debug del processo principale di Electron](https://nodejs.org/en/docs/inspector/) grazie ad una più stretta collaborazione tra Google / Chrome e Node. s, ma potresti incontrare stranezze come `richiedono` di non essere presente nella console.

Per ulteriori informazioni, vedere il [Debugging the Main Process documentation](./debugging-main-process.md).

## Crash V8

Se il contesto V8 si blocca, il DevTools visualizzerà questo messaggio.

`DevTools è stato disconnesso dalla pagina. Una volta ricaricata la pagina, DevTools si riconnetterà automaticamente.`

I log di cromo possono essere abilitati tramite la variabile di ambiente `ELECTRON_ENABLE_LOGGING`. Per ulteriori informazioni, vedere la documentazione delle variabili di ambiente [](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

In alternativa, si può passare l'argomento della riga di comando `--enable-logging`. Ulteriori informazioni sono disponibili nella documentazione [della riga di comando switches](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).
