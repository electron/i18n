# Scrivi la tua prima app Electron

Electron consente di creare applicazioni desktop in JavaScript fornendo un eseguibile inclusivo di numerose API native (sistema operativo). Puoi immaginarlo come una variante di Node.js che si focalizza su applicazioni desktop invece dei web server.

Questo non significa che Electron è un legame tra JavaScript e le librerie della interfaccia grafica (GUI). Al contrario, Electron utilizza pagine web come GUI, quindi puoi immaginarlo come un browser Chromium minimale, controllato da JavaScript.

**Nota**: Questo esempio è anche disponibile come repository, puoi [scaricarlo ed utilizzarlo immediatamente](#trying-this-example).

Fino allo sviluppo, un'app Electron è essenzialmente un'app Node.js. Il punto di partenza è `package.json` che è identico a quello di un modulo Node.js. Un'app Electron molto semplice avrebbe la seguente struttura:

```text
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

**Nota**: Se il `main` field non è presente nel `package.json`, Electron proverà a caricare un file `index.js` (come Node.js). Se questa fosse una semplice applicazione Node, aggiungeresti uno script `start` che istruisce `node` per eseguire questo package:

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

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Sviluppo Electron in breve

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // e viene caricato il file index.html della nostra app.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Creazione della finestra del browser.
  win = new BrowserWindow({ width: 800, height: 600 })

  // e viene caricato il file index.html della nostra app.
  win.loadFile('index.html')

  // Open the DevTools.
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

## Esecuzione della tua App

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clona ed esegui il codice mostrato in questo tutorial utilizzando il repository [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Clona la repository
$ git clone https://github.com/electron/electron-quick-start
# Vai nella repository
$ cd electron-quick-start
# Installa le dependencies
$ npm install
# Avvia l'app
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).