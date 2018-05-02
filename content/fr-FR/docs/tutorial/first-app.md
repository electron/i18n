# Ecrire votre première application Electroon

Electron vous permet de créer des applications de bureau avec du pure JavaScript fournissant un runtime avec des API riches natives (système d'exploitation). Vous pourriez le voir comme une variante d'un Node.js directement exécutable sur le bureau au lieu des serveurs Web.

Cela ne signifie pas qu'Electron est une liaison JavaScript à l'interface utilisateur graphique (GUI). Au lieu de cela, Electron utilise des pages Web comme interface utilisateur, donc vous pouvez aussi le voir comme un navigateur Chromium minimal, contrôlé par JavaScript.

**Remarque** : cet exemple est également disponible dans un dépôt git que vous pouvez [télécharger et exécuter immédiatement](#trying-this-example).

En terme de développement, une application Electron est par essence une application Node.js. Le point de départ est un `package.json` qui est identique à celui d’un module de Node.js. L'application Electron la plus simple pourrait avoir la structure disque suivante :

```text
votre-app/
├── package.json
├── main.js
└── index.html
```

Créez un nouveau dossier vide pour votre nouvelle application Electron. Ouvrez votre terminal et lancez `npm init` depuis ce dossier.

```sh
npm init
```

npm vous guidera dans la création d'un fichier `package.json` basique. Le script spécifié par le champ `main` est le script de démarrage de votre application, celui qui lancera le processus principal. Un exemple de votre fichier `package.json` pourrait ressembler à ceci :

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Note**: Si le champ `main` n'est pas présent dans le fichier `package.json`, Electron tentera de charger un fichier `index.js` (comme le fait Node.js lui-même). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Transformer cette application Node en une application Electron est plutôt simple - nous remplaçons simplement le runtime `node` par le runtime `electron`.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Installer Electron

A ce stade vous aurez besoin d'installer `electron`. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Le développement avec Electron en résumé

Electron apps are developed in JavaScript using the same principals and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might just wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // et charge le index.html de l'application.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Gardez l'objet window dans une constante global, sinon la fenêtre sera fermée
// automatiquement quand l'objet JavaScript sera collecté par le ramasse-miettes.
let win

function createWindow () {
  // Créer le browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // et charge le index.html de l'application.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Ouvre le DevTools.
  win.webContents.openDevTools()

  // Émit lorsque la fenêtre est fermée.
  win.on('closed', () => {
    // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
    // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
    // où vous devez supprimer l'élément correspondant.
    win = null
  })
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.on('ready', createWindow)

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()
  }
})

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
```

Enfin l'`index.html` est la page web à afficher :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Nous utilisons Node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    et Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Lancer votre App

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com).

```sh
# Cloner the repository
$ git clone https://github.com/electron/electron-quick-start
# Aller dans le dossier
$ cd electron-quick-start
# Installer les dépendances
$ npm install
# Lancer l'application
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).