# Démarrage Rapide

Ce tutoriel vous guidera dans le processus de création d'une application Hello World dans Electron, similaire à [`electron/electron-quick-start`][quick-start].

À la fin de ce tutoriel, votre application ouvrira une fenêtre de navigateur qui affichera une page web avec des informations sur quelles versions de Chromium, de Node.js et d'Electron sont en cours d'exécution.

## Prérequis

Pour utiliser Electron, vous devez installer [Node.js][node-download]. Nous vous recommandons d'utiliser la dernière version `LTS` disponible.

> Veuillez installer Node.js en utilisant des installateurs pré-compilés pour votre plate-forme. Dans le cas contraire, vous pourriez rencontrer des problèmes d'incompatibilité avec différents outils de développement.

Pour vérifier que Node.js a été installé correctement, tapez les commandes suivantes dans votre terminal client :

```sh
node -v
npm -v
```

Les commandes devraient imprimer respectivement les versions de Node.js et npm.

**Remarque :** Puisque Electron embarque Node.js dans son binaire, la version de Node.js exécutant votre code n'est pas lié à la version en cours d'exécution sur votre système.

## Créer votre application

### Échafaudage du projet

Les applications Electron suivent la même structure générale que les autres projets Node.js. Commencez par créer un dossier et initialiser un package npm.

```sh npm2yarn
mkdir my-electron-app && cd my-electron-app
npm init
```

La commande interactive `init` vous demandera de définir quelques champs dans votre configuration. Il y a quelques règles à suivre pour les besoins de ce didacticiel :

* `entry point` devrait être `main.js`.
* `author` et `description` peuvent être n’importe quelle valeur, mais sont nécessaires pour [app packaging](#package-and-distribute-your-application).

Votre fichier `package.json` devrait ressembler à ceci :

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```

Ensuite, installez le package `electron` dans les `devDependencies` de votre application.

```sh npm2yarn
$ npm install --save-dev electron
```

> Remarque : Si vous rencontrez des problèmes avec l'installation d'Electron, veuillez consulter le tutoriel [Installation avancée][advanced-installation].

Enfin, vous voulez pouvoir exécuter Electron. Dans le champ [`scripts`][package-scripts] de votre fichier de configuration `package.json` , ajoutez une commande `start` comme suit :

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

Cette commande `start` vous permettra d'ouvrir votre application en mode développement.

```sh npm2yarn
npm start
```

> Remarque : Ce script indique à Electron de s’exécuter à la racine du dossier de votre projet. À ce stade, votre application va immédiatement lancer une erreur vous disant qu'elle ne trouve pas d'application à exécuter.

### Exécuter le main process

Le point d’entrée de toute application Electron est son script `main`. Ce script contrôle le **main process**, qui s'exécute dans un environnement Node.js et est responsable de contrôler le cycle de vie de votre application, d'afficher les interfaces natives, d'effectuer des opérations privilégiées et de gérer les processus de rendu (plus d'information à ce sujet par la suite).

Pendant l’exécution, Electron va chercher ce script dans le champ [`main`][package-json-main] du fichier de configuration `package.json` de l’application que vous devriez avoir configuré lors de l’étape [Échafaudage du projet](#scaffold-the-project).

Pour initialiser le script `main`, créez un fichier vide nommé `main.js` dans le dossier racine de votre projet.

> Remarque : Si vous exécutez à nouveau le script `start` à ce stade, votre application ne lancera plus d'erreur ! Cependant, il ne fera rien pour le moment parce que nous n'avons pas ajouté de code dans `main.js`.

### Créer une page Web

Avant de pouvoir créer une fenêtre pour notre application, nous devons créer le contenu qui sera chargé dedans. Dans Electron, chaque fenêtre affiche le contenu Web qui peut être chargé à partir d'un fichier HTML local ou d'une URL distante.

Pour ce tutoriel, vous allez faire le premier. Créez un fichier `index.html` à la racine de votre projet :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Nous utilisons Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    et Electron <span id="electron-version"></span>.
  </body>
</html>
```

> Remarque : en regardant ce document HTML, vous pouvez observer que les numéros de version sont manquants du texte du body. Nous les insérerons manuellement plus tard à l’aide de JavaScript.

### Ouverture de votre page web dans une fenêtre de navigateur

Maintenant que vous avez une page web, chargez-la dans une fenêtre d'application. Pour ce faire, vous aurez besoin de deux modules Electron :

* Le module [`app`][app], qui contrôle le cycle de vie des événements de votre application.
* Le module [`BrowserWindow`][browser-window], qui crée et gère les fenêtres d’application.

Étant donné que le main process exécute Node.js, vous pouvez importer ces derniers en tant que modules [CommonJS][commonjs] en haut de votre fichier :

```js
const { app, BrowserWindow } = require('electron')
```

Ensuite, ajoutez une fonction `createWindow()` qui charge `index.html` dans une nouvelle instance `BrowserWindow`.

```js
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}
```

Ensuite, appelez cette fonction `createWindow()` pour ouvrir votre fenêtre.

Dans Electron, les fenêtres du navigateur ne peuvent être créées qu'après que l’événement [`ready`][app-ready] du module `app` est déclenché. Vous pouvez attendre cet événement en utilisant l'API [`app.whenReady()`][app-when-ready]. Appelez `createWindow()` après que `whenReady()` a résolu sa Promise.

```js
app.whenReady().then(() => {
  createWindow()
})
```

> Remarque : À ce stade, votre application Electron devrait ouvrir avec succès une fenêtre qui affiche votre page web !

### Gérer le cycle de vie de votre fenêtre

Bien que vous puissiez maintenant ouvrir une fenêtre de navigateur, vous aurez besoin de code boilerplate supplémentaire pour le rendre plus natif de chaque plate-forme. Les fenêtres d’application se comportent différemment sur chaque système d’exploitation et Electron met la responsabilité sur les développeurs d’implémenter ces conventions dans leur application.

En général, vous pouvez utiliser l'attribut [`platform`][node-platform] de la variable globale `process` pour exécuter du code spécifiquement pour certains systèmes d’exploitation.

#### Quitter l'application lorsque toutes les fenêtres sont fermées (Windows & Linux)

Sur Windows et Linux, quitter toutes les fenêtres quitte généralement une application entièrement.

Pour implémenter cela, écoutez l’événement [`'window-all-closed'`][window-all-closed] du module `app` et appelez [`app.quit()`][app-quit] si l’utilisateur n’est pas sur macOS (`darwin`).

```js
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

#### Ouvrir une fenêtre si aucune n’est ouverte (macOS)

Alors que les applications Linux et Windows se ferment lorsqu’elles n’ont pas de fenêtres ouvertes, les applications macOS continuent généralement de s’exécuter même sans aucune fenêtre ouverte et activer l'application lorsqu’aucune fenêtre n’est disponible devrait en ouvrir une nouvelle.

Pour implémenter cette fonctionnalité, écoutez l'événement [`activate`][activate] du module `app` et appelez votre méthode existante `createWindow()` si aucune fenêtre de navigateur n'est ouverte.

Étant donné que les fenêtres ne peuvent pas être créées avant l’événement `ready` , vous ne devriez écouter l'événement `activate` qu’après l’initialisation de votre application. Pour ce faire, attachez votre event listener à partir de votre callback `whenReady()` existant.

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

> Remarque: À ce stade, vos contrôles de fenêtre doivent être entièrement fonctionnels!

### Accéder à Node.js depuis le moteur de rendu avec un script de préchargement

Maintenant, la dernière chose à faire est d'afficher les numéros de version pour Electron et ses dépendances sur votre page web.

L’accès à ces informations est trivial à faire dans le main process via l’objet global `process` de Node. Cependant, vous ne pouvez pas simplement modifier le DOM à partir du processus principal car il n'a pas accès au contexte du `document` du moteur de rendu. Ils sont dans des processus entièrement différents!

> Note: If you need a more in-depth look at Electron processes, see the [Process Model][] document.

C'est là que l'attachement d'un script **preload** à votre moteur de rendu est pratique. Un script de préchargement s'exécute avant que le processus de rendu soit chargé, et a accès aux deux renderer globals (e. `window` et `document`) et environnement Node.js.

Créer un nouveau script nommé `preload.js` :

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

Le code ci-dessus accède au processus `process.versions` et exécute une fonction d'aide de `replaceText` de base pour insérer les numéros de version dans le document HTML.

To attach this script to your renderer process, pass in the path to your preload script to the `webPreferences.preload` option in your existing `BrowserWindow` constructor.

```js
// include the Node.js 'path' module at the top of your file
const path = require('path')

// modify your existing createWindow() function
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
// ...
```

There are two Node.js concepts that are used here:

* The [`__dirname`][dirname] string points to the path of the currently executing script (in this case, your project's root folder).
* The [`path.join`][path-join] API joins multiple path segments together, creating a combined path string that works across all platforms.

We use a path relative to the currently executing JavaScript file so that your relative path will work in both development and packaged mode.

### Bonus: Add functionality to your web contents

At this point, you might be wondering how to add more functionality to your application.

For any interactions with your web contents, you want to add scripts to your renderer process. Because the renderer runs in a normal web environment, you can add a `<script>` tag right before your `index.html` file's closing `</body>` tag to include any arbitrary scripts you want:

```html
<script src="./renderer.js"></script>
```

The code contained in `renderer.js` can then use the same JavaScript APIs and tooling you use for typical front-end development, such as using [`webpack`][webpack] to bundle and minify your code or [React][react] to manage your user interfaces.

### Recap

After following the above steps, you should have a fully functional Electron application that looks like this:

![Simplest Electron app](../images/simplest-electron-app.png)

<!--TODO(erickzhao): Remove the individual code blocks for static website -->
The full code is available below:

```js
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
```

```js
// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

```html
<!--index.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
```
```fiddle docs/fiddles/quick-start
```

To summarize all the steps we've done:

* We bootstrapped a Node.js application and added Electron as a dependency.
* We created a `main.js` script that runs our main process, which controls our app
  and runs in a Node.js environment. In this script, we used Electron's `app` and
  `BrowserWindow` modules to create a browser window that displays web content
  in a separate process (the renderer).

* In order to access certain Node.js functionality in the renderer, we attached
  a preload script to our `BrowserWindow` constructor.

## Package and distribute your application

The fastest way to distribute your newly created app is using
[Electron Forge](https://www.electronforge.io).

1. Add Electron Forge as a development dependency of your app, and use its `import` command to set up
Forge's scaffolding:

    ```sh npm2yarn
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Thanks for using "electron-forge"!!!
    ```

1. Create a distributable using Forge's `make` command:

    ```sh npm2yarn
    npm run make

    > my-electron-app@1.0.0 make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to package your application before we can make it
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64
    ```

    Electron Forge creates the `out` folder where your package will be located:

    ```plain
    // Example for macOS
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    └── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

[quick-start]: https://github.com/electron/electron-quick-start

[node-download]: https://nodejs.org/en/download/

[advanced-installation]: ./installation.md
[package-scripts]: https://docs.npmjs.com/cli/v7/using-npm/scripts

[package-json-main]: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main

[app]: ../api/app.md
[browser-window]: ../api/browser-window.md
[commonjs]: https://nodejs.org/docs/latest/api/modules.html#modules_modules_commonjs_modules
[app-ready]: ../api/app.md#event-ready
[app-when-ready]: ../api/app.md#appwhenready

[node-platform]: https://nodejs.org/api/process.html#process_process_platform
[window-all-closed]: ../api/app.md#appquit

[activate]: ../api/app.md#event-activate-macos

[Process Model]: ./process-model.md
[dirname]: https://nodejs.org/api/modules.html#modules_dirname
[path-join]: https://nodejs.org/api/path.html#path_path_join_paths

[webpack]: https://webpack.js.org
[react]: https://reactjs.org
