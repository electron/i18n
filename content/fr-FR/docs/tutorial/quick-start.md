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

// Gardez l'objet window dans une constante global, sinon la fenêtre sera fermée
// automatiquement quand l'objet JavaScript voudra récupérer de la mémoire.
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

## Exécuter votre application

Une fois que vous avez créé votre premier `main.js`, `index.html` et `package.json`, vous voudriez probablement exécuter votre application localement afin de le tester et vous assurez qu’il fonctionne comme prévu.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) est un module `npm` contenant les version pré-compilées d'Electron.

Si vous l'avez installé globalement avec `npm`, alors vous devrez exécuter seulement la commande suivante dans le répertoire source de votre application :

```bash
electron .
```

Si vous l'avez installé localement, alors exécutez :

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### Binaire d'Electron téléchargé manuellement

Si vous avez téléchargé Electron manuellement, vous pouvez également utiliser le binaire inclus pour exécuter votre application.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron votre-app/
```

#### Linux

```bash
$ ./electron/electron votre-app/
```

#### Windows

    $ .\electron\electron.exe votre-app\
    

`Electron.app` ici, fait partie des versions empaquetées d’Electron, vous pouvez le télécharger [ici](https://github.com/electron/electron/releases).

### Exécuter en tant qu’une distribution

Après avoir fini d'écrire votre application, vous pouvez créer une distribution en suivant le guide [Distribution d'une application](./application-distribution.md) et exécuter l'application empaquetée.

### Essayer cet exemple

Clonez et exécutez le code dans ce tutoriel en utilisant le repository [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Remarque** : l’exécution nécessite [Git](https://git-scm.com) et [Node.js](https://nodejs.org/en/download/) (qui comprend [npm](https://npmjs.org)) sur votre système.

```bash
# Cloner the repository
$ git clone https://github.com/electron/electron-quick-start
# Aller dans le dossier
$ cd electron-quick-start
# Installer les dépendances
$ npm install
# Lancer l'application
$ npm start
```

Pour plus d'exemples, voir la [liste de boilerplates](https://electron.atom.io/community/#boilerplates) créée par la superbe communauté Electron.