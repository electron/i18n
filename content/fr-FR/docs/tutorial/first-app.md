# Créer votre première App

Electron vous permet de créer des applications de bureau avec du pur JavaScript fournissant un runtime avec des API natives riches (système d'exploitation). Vous pouvez le voir comme une variante de node.js qui se concentre sur les applications de bureau au lieu des serveur web.

Cela ne veut pas dire qu'Electron est juste une liaison entre du javascript et une librairie d'interface graphique (GUI). Au lieu de cela, Electron utilise des pages Web comme interface graphique utilisateur, donc vous pouvez aussi le voir comme un navigateur Chromium minimal, contrôlé par JavaScript.

**Note**: Cette exemple est également disponible sur un dépôt que vous pouvez [télécharger et lancer immédiatement](#trying-this-example).

En terme de développement, une application Electron est par essence une application Node.js. Le point de départ est un `package.json` qui est identique à celui d’un module de Node.js. A most basic Electron app would have the following folder structure:

```plaintext
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

**Note**: Si le champ `main` n'est pas présent dans le fichier `package.json`, Electron tentera de charger un fichier `index.js` (comme le fait Node.js lui-même). En fait si c'était une simple application Node, vous ajouteriez un script `start` qui demanderait à `node` d'exécuter le package courant:

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

A ce stade vous aurez besoin d'installer `electron`. La manière recommandée de faire, est de l'installer en tant que dépendance de développement dans votre application, ce qui vous permettra de travailler sur de multiples applications avec des versions différentes d'Electron. Pour ce faire, lancez la ligne de commande suivante depuis le répertoire de votre application :

```sh
npm install --save-dev electron
```

D'autres moyens d'installer Electron existent. Veuillez consulter le [guide d'installation](installation.md) pour apprendre à l'utiliser avec des proxies, des miroirs et des caches personnalisés.

## Le développement avec Electron en résumé

Les applications Electron sont développées en JavaScript en utilisant les mêmes principes et méthodes que celles que l'on trouve dans le développement avec Node.js. Toutes les API et fonctionnalités que l'on trouve dans Electron sont accessibles par le module `electron`, qui peut être requis comme tout autre module Node.js :

```javascript
const electron = require('electron')
```

Le module `electron` expose des fonctionnalités dans des espaces de noms. A titre d'exemple, le cycle de vie de l'application est géré par `electron.app`, des fenêtres peuvent être créées en utilisant la classe `electron.BrowserWindow`. Un simple fichier`main.js` peut attendre que l'application soit prête et ouvrir une fenêtre :

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

Le fichier `main.js` devrait créer les fenêtres et gérer tous les événements système que votre application peut rencontrer. Une version plus complète de l'exemple ci-dessus peut ouvrir les outils pour développeurs, gérer la fermeture des fenêtres, ou recréer les fenêtres sur macOs si l'utilisateur click sur l'icône de l'application dans le dock.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cree la fenetre du navigateur.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Enfin l'`index.html` est la page web à afficher :

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

## Lancer votre Application

Une fois que vous avez créé vos fichiers initiaux `main.js`, `index.html`, et `package.json`, vous pouvez essayer votre application en exécutant `npm start` depuis le répertoire de votre application.

## Essayer cette application

Clonez et lancez le code de ce tutorial en utilisant le dépôt [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Note**: Le lancement nécessite [Git](https://git-scm.com) et [npm](https://www.npmjs.com/).

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

Pour obtenir une liste de boilerplates et d'outils pour lancer votre processus de développement, consulter [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).