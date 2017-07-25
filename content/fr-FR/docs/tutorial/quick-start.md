# Démarrage Rapide

Electron vous permet de créer des applications desktop avec du JavaScript fournissant un runtime avec des API riches natives (système d'exploitation). Vous pourriez le voir comme une variante d'un Node.js directement exécutable sur le bureau au lieu des serveurs Web.

Cela ne signifie pas qu'Electron est une liaison JavaScript à l'interface utilisateur graphique (GUI). Au lieu de cela, Electron utilise des pages Web comme GUI, donc vous pouvez aussi le voir comme un navigateur Chromium minimal, contrôlé par JavaScript.

### Processus principal

Dans Electron, le processus qui exécute le script `main` dans le `package.json` est appelé le **processus principal**. Le script qui s’exécute dans le processus principal peut afficher une interface graphique en créant des pages web.

### Processus de rendu (renderer process)

Puisque Electron utilise utilise Chromium pour l'affichage de pages web, l'architecture multiprocessus de Chromium est également utilisée. Chaque page web dans Electron s'exécute dans son propre processus, qui s'appelle le **processus de rendu**.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions de niveau bas avec le système d'exploitation.

### Différences entre le processus principal et le processus de rendu

Le processus principal créé des pages web en créant des instances de `BrowserWindow`. Chaque instance de `BrowserWindow` exécute la page web dans son propre processus de rendu. Lorsqu’une instance de `BrowserWindow` est détruite, le processus de rendu correspondant est également arrêté.

Le processus principal gère toutes les pages web et leurs processus de rendu correspondant. Chaque processus de rendu est isolé et se soucie seulement de la page web en cours d’exécution dedans.

Dans les pages web, l'appel aux GUI natifs associés aux APIs n'est pas autorisé car la gestion des ressources GUI natifs dans les pages web est très dangereuse et il est facile d'avoir une fuite de ressource. Si vous voulez effectuer des opérations GUI dans une page web, alors le processus de rendu doit communiquer avec le processus principal pour demander a celui-ci d'effectuer ces opérations.

Avec Electron, nous avons plusieurs façons de communiquer entre le processus principal et les processus de rendu. Comme les modules [`ipcRenderer`](../api/ipc-renderer.md) et [`ipcMain`](../api/ipc-main.md) pour envoyer des messages, et le module [remote](../api/remote.md) pour une communication de style RPC. Il y a également une entrée dans la FAQ sur [le partage des données entre les pages web](../faq.md#how-to-share-data-between-web-pages).

## Écrire votre première application Electron

Généralement, une application Electron est structurée comme suit :

```text
votre-app/
├── package.json
├── main.js
└── index.html
```

Le format de `package.json` est exactement la même que celle des modules Node, et le script spécifié par le champ `main` est le script de démarrage de votre application, qui s'exécutera dans le processus principal. Un exemple de votre `package.json` pourrait ressembler à ceci :

```json
{
  "name"    : "votre-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Remarque** : si le champ `main` n’est pas présent dans le `package.json`, Electron va tenter de charger un `index.js`.

Le `main.js` devrait créer des fenêtres et gérer les événements système, un exemple typique étant :

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

```bash
$ .\node_modules\.bin\electron .
```

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

```bash
$ .\electron\electron.exe your-app\
```

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