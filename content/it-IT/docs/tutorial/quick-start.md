# Avvio rapido

Electron consente di creare applicazioni desktop in JavaScript pure fornendo un eseguibile arricchito delle API (del sistema operativo) native. Puoi immaginarlo come una variante di Node.js che si focalizza su applicazioni desktop invece dei web server.

Questo non significa che Electron è un'associazione tra JavaScript e le librerie della interfaccia grafica (GUI). Invece, Electron utilizza pagine web come GUI, quindi puoi immaginarlo come un browser Chromium minimale, controllato da JavaScript.

### Processo principale (main)

In Electron, il processo chiamato `main` che esegue lo script indicato nel file `package.json` è chiamato **il processo principale**. Lo script che viene eseguito nel processo principale può visualizzare una GUI tramite la creazione di pagine web.

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Finally the `index.html` is the web page you want to show:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Run your app

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```bash
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

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
    

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```bash
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For more example apps, see the [list of boilerplates](https://electron.atom.io/community/#boilerplates) created by the awesome electron community.