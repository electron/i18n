# Ecrire votre première application Electron

Electron vous permet de créer des applications de bureau avec du pure JavaScript fournissant un runtime avec des API natives riches (système d'exploitation). Vous pourriez le voir comme une variante d'un Node.js directement exécutable sur le bureau au lieu des serveurs Web.

Cela ne signifie pas qu'Electron est une liaison JavaScript à l'interface utilisateur graphique (GUI). Au lieu de cela, Electron utilise des pages Web comme interface graphique utilisateur, donc vous pouvez aussi le voir comme un navigateur Chromium minimal, contrôlé par JavaScript.

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
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Cree la fenetre du navigateur.
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

Le fichier `main.js` devrait créer les fenêtres et gérer tous les événements système que votre application peut rencontrer. Une version plus complète de l'exemple ci-dessus peut ouvrir les outils pour développeurs, gérer la fermeture des fenêtres, ou recréer les fenêtres sur macOs si l'utilisateur click sur l'icône de l'application dans le dock.

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

## Lancer votre Application

Une fois que vous avez créé vos fichiers initiaux `main.js`, `index.html`, et `package.json`, vous pouvez essayer votre application en exécutant `npm start` depuis le répertoire de votre application.

## Essayer cette application

Clonez et lancez le code de ce tutorial en utilisant le dépôt [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Note**: L'exécution nécessite [Git](https://git-scm.com).

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