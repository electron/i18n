# Guide de démarrage rapide

## Démarrage rapide

Electron est un framework qui vous permet de créer des applications de bureau avec JavaScript, HTML et CSS. Ces applications peuvent ensuite être empaquetées pour être exécutées directement sur macOS, Windows ou Linux, ou distribuées via le Mac App Store ou le Microsoft Store.

Généralement, vous créez une application de bureau pour un système d'exploitation (OS) en utilisant les frameworks natifs de chaque système d'exploitation. Electron permet d'écrire votre application une fois en utilisant des technologies que vous connaissez déjà.

### Prerequisites

Avant de procéder avec Electron, vous devez installer [nœud.js][node-download]. Nous vous recommandons d'installer soit la dernière version `LTS` ou `actuelle` disponible.

> Veuillez installer Node.js en utilisant des installateurs pré-compilés pour votre plate-forme. Dans le cas contraire, vous pourriez rencontrer des problèmes d'incompatibilité avec différents outils de développement.

Pour vérifier que Node.js a été installé correctement, tapez les commandes suivantes dans votre terminal client:

```sh
node -v
npm -v
```

Les commandes doivent afficher les versions de Node.js et npm en conséquence. Si les deux commandes ont réussi, vous êtes prêt à installer Electron.

### Créer une application élémentaire

Du point de vue du développement, une application Electron est essentiellement une application Node.js. Cela signifie que le point de départ de votre application Electron sera un fichier `package.json` comme dans toute autre application Node.js. Une application Electron minimale a la structure suivante :

```plaintext
my-electron-app/
ン―― package.json
ン―― main.js
ンン-― préchargement.js
― indice.html
```

Créons une application de base basée sur la structure ci-dessus.

#### Install Electron

Créez un dossier pour votre projet et installez y Electron:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Créer le fichier de script principal

Le script principal spécifie le point d'entrée de votre application Electron (dans notre cas, le fichier `main.js` ) qui exécutera le processus principal. Généralement, le script qui s'exécute dans le processus principal contrôle le cycle de vie de l'application, affiche l'interface utilisateur graphique et ses éléments, effectue des interactions natives avec le système d'exploitation, et crée des processus de rendu au sein des pages Web. Une application Electron ne peut avoir qu'un seul processus principal.

Le script principal peut ressembler à ceci :

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require ('electron')
const path = require ('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile ('index.html')
}

app.whenReady().then()=> {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow... getAllWindows ().longueur === 0) {
      createWindow()
    }
  })
})

app.on ('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

##### Que se passe-t-il ci-dessus?

1. Ligne 1 : Tout d'abord, importez les modules `app` et `BrowserWindow` du package `electron` afin de pouvoir gérer les événements du cycle de vie de votre application et créer ou contrôler les fenêtres du navigateur.
2. Ligne 2 : Puis, vous importez le paquet `path` qui fournit des fonctions utilitaires pour les chemins de fichiers.
3. Ligne 4: Après cela, définir une fonction qui crée une nouvelle [browser window](../api/browser-window.md#new-browserwindowoptions) avec un script de préchargement, charger le fichier `index. html` dans cette fenêtre (ligne 13, nous discuterons du fichier plus tard).
4. Ligne 16 : Vous créez une nouvelle fenêtre de navigateur en appelant la fonction `createWindow` une fois que l'application Electron [est initialisée](../api/app.md#appwhenready).
5. Ligne 18 : Vous ajoutez un nouvel écouteur qui créera une nouvelle fenêtre de navigateur seulement si l'application n'a pas de fenêtre visible après avoir été activée. Par exemple lors du premier lancement de l'application ou du rechargement de l'application en cours.
6. Ligne 25 : Vous ajoutez un nouveau listener qui tente de quitter l'application quand il n'a plus de fenêtres ouvertes. Ce listener est un non-op sur macOS en raison du comportement [window management behavior](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) du système d'exploitation.

#### Créer une page web

Ceci est la page Web que vous voulez afficher une fois l'application initialisée. Cette page web représente le processus de Rendu. Vous pouvez créer plusieurs fenêtres de navigateur, où chaque fenêtre utilise son propre moteur de rendu indépendant. Vous pouvez accorder en option l’accès à des API .js nœuds supplémentaires en les exposant à partir de votre script de préchargement.

La page `index.html` ressemble à ceci:

```html fiddle='docs/fiddles/quick-start'
<! DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        Nous utilisons Node.js <span id="node-version"></span>,
        Chrome <span id="chrome-version"></span>,
        et Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

#### Définir un script de préchargement

Your preload script (in our case, the `preload.js` file) acts as a bridge between Node.js and your web page. Il vous permet d'exposer des API et des comportements spécifiques sur votre page web plutôt que d'exposer de manière non sécurisée la totalité de l'API Node.js. Dans cet exemple, nous utiliserons le script de préchargement pour lire les informations de version à partir de l'objet `process` et mettre à jour la page web avec ces informations.

```javascript fiddle='docs/fiddles/quick-start'
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

##### Que se passe-t-il avec le code ci dessus?

1. Ligne 1 : Tout d'abord, vous définissez un event listener qui vous indiquera que la page web a été chargée
2. Ligne 2: Puis vous définissez une fonction utilitaire utilisée pour définir le texte des espaces réservés dans l' `index.html`
3. Ligne 7 : On boucle alors dans la liste des composants dont on veux afficher la version
4. Ligne 8 : Enfin, vous appelez `replaceText` pour rechercher les espaces réservés à la version dans `index.html` et attribuez les valeurs de `process.versions` à leur propriété text.

#### Modifier votre fichier package.json

Votre application Electron utilise le fichier `package.json` comme point d'entrée principal (comme n'importe quelle autre application Node.js). Le script principal de votre application étant `main.js`, modifiez le fichier `package.json` en conséquence :

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> REMARQUE : Si le champ `main` est omis, Electron tentera de charger le fichier `index.js` à partir du répertoire contenant `package.json`.

> NOTE : Les champs `author` et `description` sont requis pour l'emballage, en leur absence une erreur se produira lors de l'exécution de `npm run make`.

Par défaut, la commande `npm start` exécutera le script principal avec Node.js. Pour exécuter le script avec Electron, vous devez le modifier comme suit:

```json
{
    « nom »: « my-electron-app »,
    « version »: « 0.1.0 »,
    « author »: « your name »,
    « description »: « My Electron app »,
    « main »: « main.js »,
    « scripts »: {
        « start »: « electron ».
    }
}
```

#### Exécuter votre application

```sh
npm start
```

Votre application Electron en cours d'exécution devrait ressembler à ceci:

![Application Electron la plus simple](../images/simplest-electron-app.png)

### Préparer l'application pour la distribuer

Le moyen le plus simple et le plus rapide de distribuer votre application nouvellement créée est d'utiliser [Electron Forge](https://www.electronforge.io).

1. Importer Electron Forge dans votre dossier d'application:

    ```sh
    npm install0save-dev@electron-forge/cli
npx electron-forge import
Testant votre systeme
Inicier Repertoire Git
Ecrire un fichier json de paquet modifie
Installer Outils
Ecrire fichier json de paquet modifie
Fixer.gitigonre
Nous avons ESSAYER de convertir votre app en une forme supportee par electron-forge.

    Merci d'utiliser "electron-forge"!!!
    ```

1. Créer un distribuable:

    ```sh
    npm run make

    > mon-gsod-electron-app@1.0. make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    Nous avons besoin d'empaqueter votre application avant de pouvoir la faire
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64
    ```

    Electron-forge crée le dossier `out` où se trouve votre paquet:

    ```plain
    // Exemple pour MacOS
    out/
    ── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ── ...
    <unk> ─ out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Apprendre les bases

Cette section vous guide à travers les bases du fonctionnement d'Electron sous le capot. Il vise à renforcer les connaissances sur Electron et l'application créée plus tôt dans la section Démarrage rapide.

### Architecture de l'application

Electron se compose de trois piliers principaux:

* **Chromium** pour l'affichage du contenu web.
* **Node.js** pour travailler avec le système de fichiers local et le système d'exploitation.
* **APIs personnalisés** pour travailler avec des fonctions natives d'OS souvent nécessaires.

Développer une application avec Electron est comme construire une application Node.js avec une interface web ou construire des pages web avec une intégration transparente de Node.js.

#### Processus Principal et de Rendu

Comme il a été mentionné précédemment, Electron a deux types de processus : Main et Renderer.

* Le processus principal **crée** pages web en créant des instances `BrowserWindow`. Chaque instance `BrowserWindow` exécute la page web dans son processus de rendu. Lorsqu'une instance `BrowserWindow` est détruite, le processus de rendu correspondant est également terminé.
* Le processus principal **gère** toutes les pages web et leurs processus de rendu correspondants.

----

* Le processus de rendu **gère** seulement la page web correspondante. Un plantage dans un processus de rendu n'affecte pas les autres processus de rendu.
* Le processus de rendu **communique** avec le processus principal via IPC pour effectuer des opérations GUI dans une page Web. L'appel direct d'API natives liées à l'interface graphique à partir du processus Renderer est limité en raison de problèmes de sécurité et de fuites potentielles de ressources.

----

La communication entre processus est possible via les modules Inter-Process Communication (IPC) : [`ipcMain`](../api/ipc-main.md) et [`ipcRenderer`](../api/ipc-renderer.md).

#### APIs

##### Electron API

Les APIs Electron sont assignés en fonction du type de processus, ce qui signifie que certains modules peuvent être utilisés depuis le processus Main ou Renderer, et d'autres depuis les deux. La documentation de l'API d'Electron indique à quel processus chaque module peut être utilisé.

Par exemple, pour accéder à l'API Electron dans les deux processus, nécessite son module inclus :

```js
const electron = require('electron')
```

Pour créer une fenêtre, appelez la classe `BrowserWindow` , qui n'est disponible que dans le processus principal :

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Pour appeler le processus principal à partir du moteur de rendu, utilisez le module IPC :

```js
Dans le processus principal
const { ipcMain } = exiger ('electron')

ipcMain.handle ('perform-action', (événement, ... args) => {
  // ... faire des actions au nom du Renderer
})
```

```js
// Dans le processus de rendu
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> REMARQUE : Parce que les processus Renderer peuvent exécuter du code non fiable (en particulier à partir de tiers) il est important de valider soigneusement les requêtes qui arrivent au processus principal.

##### Node.js API

> REMARQUE : Pour accéder à l’API Node.js à partir du processus Renderer, vous devez définir la préférence `nodeIntegration` à `true` et la préférence `contextIsolation` à `false`.  Veuillez noter que l'accès à l'API Node.js dans n'importe quel moteur de rendu qui charge du contenu distant n'est pas recommandé pour [des raisons de sécurité](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content).

Electron expose un accès complet à l'API Node.js et à ses modules dans les processus Main et Renderer. Par exemple, vous pouvez lire tous les fichiers du répertoire racine :

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Pour utiliser un module Node.js, vous devez d'abord l'installer comme dépendance:

```sh
npm install --save aws-sdk
```

Ensuite, dans votre application Electron, demandez le module :

```js
const S3 = require('aws-sdk/clients/s3')
```

[node-download]: https://nodejs.org/en/download/
