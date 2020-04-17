# Scrivi la tua prima app Electron

Electron consente di creare applicazioni desktop in JavaScript fornendo un eseguibile inclusivo di numerose API native (sistema operativo). Puoi immaginarlo come una variante di Node.js che si focalizza su applicazioni desktop invece dei web server.

Questo non significa che Electron è un legame tra JavaScript e le librerie della interfaccia grafica (GUI). Al contrario, Electron utilizza pagine web come GUI, quindi puoi immaginarlo come un browser Chromium minimale, controllato da JavaScript.

**Nota**: Questo esempio è anche disponibile come repository, puoi [scaricarlo ed utilizzarlo immediatamente](#trying-this-example).

Fino allo sviluppo, un'app Electron è essenzialmente un'app Node.js. Il punto di partenza è `package.json` che è identico a quello di un modulo Node.js. Un'app Electron molto semplice avrebbe la seguente struttura:

```plaintext
tua-app/
├── package.json
├── main.js
└── index.html
```

Crea una nuova cartella vuota per la tua applicazione Electron. Apri il tuo client di linea di comando ed esegui `npm init` in quella cartella.

```sh
npm init
```

npm ti guiderà nella creazione di un file `package.json`. Lo script specificato nel `main` field è lo script d'avvio della tua app, che avvierà il processo principale. Il tuo `package.json` potrebbe apparire in questo modo:

```json
{
  "name": "tua-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Nota__: Se il `main` field non è presente nel `package.json`, Electron proverà a caricare un file `index.js` (come Node.js). Se questa fosse una semplice applicazione Node, aggiungeresti uno script `start` che istruisce `node` per eseguire questo package:

```json
{
  "name": "tua-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Trasformare quest'applicazione Node in un'applicazione Electron è abbastanza semplice - semplicemente rimpiazziamo il `node` runtime con l'`electron` runtime.

```json
{
  "name": "tua-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Installare Electron

A questo punto, dovrai installare `electron` stesso. Il metodo consigliato per farlo è installare come dependency della tua app, che ti permette di lavorare su più applicazioni con versioni di Electron differenti. Per fare ciò, esegui il seguente comando dalla cartella della tua applicazione:

```sh
npm install --save-dev electron
```

Esistono anche altri modi per installare Electron. Perfavore, consulta la [guida d'installazione](installation.md) per imparare come usare proxies, mirrors e caches personalizzate.

## Sviluppo Electron in breve

Le applicazioni Electron sono sviluppate in JavaScript utilizzando gli stessi principi e metodi utilizzati nello sviluppo di Node.js. Tutte le API e le funzionalità presenti in Electron sono accessibili tramite il modulo `electron`, che può essere richiesto come qualsiasi altro Modulo Node.js:

```javascript
const electron = require('electron')
```

Il modulo `electron` espone le caratteristiche nei namespaces. Ad esempio, il ciclo di vita dell'applicazione è gestito tramite `electron.app`, le finestre possono essere create usando la classe `electron.BrowserWindow`. Un semplice file `main.js` potrebbe attendere che l'applicazione sia pronta e aprire una finestra:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la finestra del browser
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // e carica l'index.html dell'app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

Il file `main.js` dovrebbe creare le finestre e gestire tutti gli eventi di sistema dell'applicazione. Una versione più completa dell'esempio precedente potrebbe aprire gli strumenti di sviluppo, gestire la finestra chiusa o ricreare finestre su macOS se l'utente fa clic sull'icona dell'app nel dock.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la finestra del browser
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Apre il Pannello degli Strumenti di Sviluppo.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Si può anche mettere il codice in file separati e richiederlo qui.
```

Infine il file `index. html` è la pagina web che si desidera visualizzare:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Esecuzione della tua App

Dopo aver creato il `main.js` iniziale, il file`index.html`, ed il `package.json`, puoi provare la tua app eseguendo il comando `npm start` dalla cartella della tua applicazione.

## Provando quest'esempio

Clona ed esegui il codice mostrato in questo tutorial utilizzando il repository [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Clona il repository
$ git clone https://github.com/electron/electron-quick-start
# Accedi al repository
$ cd electron-quick-start
# Installa le dipendenze
$ npm install
# Avvia l'app
$ npm start
```

Per una lista degli standard e degli strumenti per iniziare il proprio processo di sviluppo, vedi la [Documentazione per gli Standard e le Command Line Interfaces](./boilerplates-and-clis.md).
