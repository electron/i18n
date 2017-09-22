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

Nelle pagine web, chiamare le API dell'interfaccia grafica nativa non è consentito perché la gestione delle risorse nelle pagine web è molto pericolosa and it is easy to leak resources. If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

In Electron, we have several ways to communicate between the main process and renderer processes. Like [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## Write your First Electron App

Generally, an Electron app is structured like this:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

The format of `package.json` is exactly the same as that of Node's modules, and the script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js`.

The `main.js` should create windows and handle system events, a typical example being:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
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