# Avvio rapido

Electron consente di creare applicazioni desktop in JavaScript fornendo un eseguibile inclusivo di numerose API native (sistema operativo). Puoi immaginarlo come una variante di Node.js che si focalizza su applicazioni desktop invece dei web server.

Questo non significa che Electron è un legame tra JavaScript e le librerie della interfaccia grafica (GUI). Al contrario, Electron utilizza pagine web come GUI, quindi puoi immaginarlo come un browser Chromium minimale, controllato da JavaScript.

### Processo principale (main)

In Electron, il processo chiamato `main` che esegue lo script indicato nel file `package.json` è chiamato **processo principale**. Lo script che viene eseguito nel processo principale può visualizzare una GUI tramite la creazione di pagine web.

### Processo di rendering

Poiché Electron utilizza Chromium per la visualizzazione di pagine web, viene utilizzata anche l'architettura multi-processo di Chromium. Ogni pagina web in Electron viene eseguita nel proprio processo, che si chiama **il processo di rendering**.

Nei browser normali, le pagine web vengono eseguite in un ambiente circoscritto nel quale non è consentito l'accesso alle risorse native. Gli utenti di Electron, tuttavia, hanno il potere di usare le API di Node.js nelle pagine web consentendo interazioni di sistema operativo di livello inferiore.

### Differenze tra processo principale (main) e di rendering (renderer)

Il processo principale crea pagine web mediante la creazione di istanze di `BrowserWindow`. In ogni istanza di `BrowserWindow` viene eseguita la pagina web nel proprio processo di rendering. Quando viene eliminata un'istanza di `BrowserWindow`, il processo di rendering corrispondente viene anch'esso terminato.

Il processo principale gestisce tutte le pagine web ed i corrispondenti processi di rendering. Ogni processo di rendering è isolato e si preoccupa solo della pagina web in esecuzione in esso.

Nelle pagine web, chiamare le API dell'interfaccia grafica nativa non è consentito perché la gestione delle risorse nelle pagine web è molto pericolosa and it is easy to leak resources. Se si desidera eseguire operazioni di GUI in una pagina web, il processo di rendering della pagina web deve comunicare con il processo principale per richiedere che il processo principale esegua tali operazioni.

In Electron, ci sono diversi modi di comunicare tra i processi di rendering e processo principale. Come i moduli [`ipcRenderer`](../api/ipc-renderer.md) e [`ipcMain`](../api/ipc-main.md) per l'invio di messaggi e il modulo [remote](../api/remote.md) per la comunicazione in stile RPC. C'è anche una voce FAQ su [come condividere dati tra le pagine web](../faq.md#how-to-share-data-between-web-pages).

## Scrivere la prima App di Electron

In genere, un'app di Electron è strutturata come questo:

```text
tua-app/
├── package.json
├── main.js
└── index.html
```

La struttura del file `package.json` è esattamente la stessa di quella dei moduli di Node.js, e lo script specificato dal campo `main` è lo script di avvio dell'app, che eseguirà il processo principale. Un esempio del tuo file `package.json` potrebbe essere come questo:

```json
{
  "name"    : "tua-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: Se il campo `main` non è presente nel file `package.json`, Electron tenterà di caricare un file `index.js`.

Il `main.js` dovrebbe creare finestre e gestire gli eventi di sistema, di seguito un esempio:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Mantenere un riferimento globale dell'oggetto window, altrimenti la finestra verrà 
// chiusa automaticamente quando l'oggetto JavaScript è raccolto nel Garbage Collector.
let win

function createWindow () {
  // Creazione della finestra del browser.
  win = new BrowserWindow({width: 800, height: 600})

  // e viene caricato il file index.html della nostra app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Apertura degli strumenti per sviluppatori.
  win.webContents.openDevTools()

  // Emesso quando la finestra viene chiusa.
  win.on('closed', () => {
    // Eliminiamo il riferimento dell'oggetto window;  solitamente si tiene traccia delle finestre
    // in array se l'applicazione supporta più finestre, questo è il momento in cui 
    // si dovrebbe eliminare l'elemento corrispondente.
    win = null
  })
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on('ready', createWindow)

// Terminiamo l'App quando tutte le finestre vengono chiuse.
app.on('window-all-closed', () => {
  // Su macOS è comune che l'applicazione e la barra menù 
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Su macOS è comune ri-creare la finestra dell'app quando
  // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
  if (win === null) {
    createWindow()
  }
})

// in questo file possiamo includere il codice specifico necessario 
// alla nostra app. Si può anche mettere il codice in file separati e richiederlo qui.
```

Infine il file `index. html` è la pagina web che si desidera visualizzare:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Stiamo utilizzando Node.js <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    ed Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Esegui la tua applicazione

Una volta creato i tuoi file `main.js`,`index.html` e il `package.json` iniziale, probabilmente vorrai provare ad avviare la tua applicazione in locale per testarla ed essere sicuro che si avvii come previsto.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) è un modulo di `npm` che contiene le versioni pre-compilate di Electron.

Se le hai installate globalmente con `npm`, allora nella directory della tua app ti basta eseguire il comando seguente:

```bash
electron .
```

Se invece l'hai installato localmente esegui:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### File binario scaricato manualemente

Se hai scaricato Electron manualmente, è possibile utilizzare anche il file binario incluso per eseguire l'app direttamente.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

    $ .\electron\electron.exe your-app\
    

`Electron.app` è parte del Electron's release package, lo puoi scaricare da [qui](https://github.com/electron/electron/releases).

### Esegui come distribuzione

Dopo aver finito di scrivere la tua app puoi creare una distribuzione seguendo la guida: [Application Distribution](./application-distribution.md) e eseguire l'app.

### Prova questo esempio

Clona ed esegui questo tutorial usando la repository:[`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Nota**: Per essere eseguita richiede [Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/download/) (che include [npm](https://npmjs.org)) sul tuo sistema.

```bash
# Clona la repository
$ git clone https://github.com/electron/electron-quick-start
# Vai nella repository
$ cd electron-quick-start
# Installa le dependencies
$ npm install
# Avvia l'app
$ npm start
```

Per altre app di esempio guarda la [lista di boilerplates](https://electron.atom.io/community/#boilerplates) creata dalla fantastica community di Electron.