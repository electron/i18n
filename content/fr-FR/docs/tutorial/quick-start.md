# Démarrage Rapide

Electron vous permet de créer des applications desktop avec du JavaScript fournissant un runtime avec des API riches natives (système d'exploitation). Vous pourriez le voir comme une variante d'un Node.js directement exécutable sur le bureau au lieu des serveurs Web.

Cela ne signifie pas qu'Electron est une liaison JavaScript à l'interface utilisateur graphique (GUI). Au lieu de cela, Electron utilise des pages Web comme GUI, donc vous pouvez aussi le voir comme un navigateur Chromium minimal, contrôlé par JavaScript.

### Processus principal

En électronique, le processus qui exécute le script de `main` de `package.json` s’appelle**the process** principal. Le script qui s’exécute dans le processus principal peut afficher une interface graphique de création de pages web.

### Processus du moteur de rendu

Puisque les électrons utilise chrome pour l’affichage des pages web, architecture multiprocessu de chrome est également utilisé. Chaque page web en électrons s’exécute dans son propre processus, qui s’appelle **the rendu process**.

Normale de navigateurs, des pages web habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder à des ressources natives. Utilisateurs de l’électron, cependant, ont le pouvoir d’utiliser Node.js APIs dans les pages web, ce qui permet des interactions de niveau système d’exploitation plus faibles.

### Différences entre les processus principaux et de moteur de rendu

Le processus principal crée des pages web en créant des instances de `BrowserWindow`. Chaque instance de`BrowserWindow` s’exécute la page web dans son propre processus de rendu. Lorsqu’une instance de`BrowserWindow` est détruite, le processus de rendu correspondante est également arrêté.

Le processus principal gère toutes les pages web et leurs processus de rendu correspondante. Chaque processus de rendu est isolé et seulement se soucie de la page web en cours d’exécution dedans.

Dans les pages web, appel GUI natif associés Qu'api n’est pas autorisé parce que la gestion des ressources natives de GUI dans les pages web est très dangereux et il est facile aux ressources de la fuite. Si vous souhaitez effectuer des opérations de GUI dans une page web, le processus de rendu de la page web doit communiquer avec le processus principal de demander que le processus principal effectuer ces opérations.

En électronique, nous avons plusieurs façons de communiquer entre les processus principaux et les processus de rendu. Comme les modules [`ipcRenderer`](../api/ipc-renderer.md) et[`ipcMain`](../api/ipc-main.md) pour envoyer des messages et le module[remote](../api/remote.md) pour la communication de style RPC. Il y a également une entrée de la FAQ sur [how pour partager des données entre web pages](../faq.md#how-to-share-data-between-web-pages).

## Écrire votre première application électronique

Généralement, une application électronique est structurée comme suit :

```text
votre-app / ├── package.json ├── main.js └── index.html
```

Le format de `package.json` est exactement la même que celle des modules du nœud, et le script spécifié par le champ `main` est le script de démarrage de votre application, qui se déroulera le processus principal. Un exemple de votre `package.json` pourrait ressembler à ceci :

```json
{« nom » : « your app », « version » : « 0.1.0 », « principale » : « main.js »}
```

**Note** : si le champ `main` ne figure pas dans `package.json`, électron tente de charger une `index.js`.

Le `main.js` devrait créer des fenêtres et gérer les événements système, un exemple typique étant :

```javascript
const {app, BrowserWindow} = chemin const require('electron') = require('path') const url = require('url') / / conserver une référence mondiale de l’objet window, si vous n’avez pas, la fenêtre se / / se ferme automatiquement lorsque l’objet JavaScript est le garbage collecté.
laisser gagner la fonction createWindow () {/ / Create la fenêtre du navigateur.
  gagner = nouveau BrowserWindow({width: 800, height: 600}) / / et charger le fichier index.html de l’app.
  win.loadURL (url.format ({chemin d’accès : path.join (__dirname, 'index.html'), protocole : ' file :', barres obliques : vrai})) / / ouvrir le DevTools.
  win.webContents.openDevTools() / / émise lorsque la fenêtre est fermée.
  Win.on ("fermés", () => {/ / l’objet window de déréférencement, habituellement vous stockeriez windows / / dans un tableau, si votre application prend en charge windows multi, c’est le temps / / lorsque vous devez supprimer l’élément correspondant.
    victoire = null})} / / cette méthode sera appelée lorsque l’électron est terminé / / initialisation et est prêt à créer des fenêtres du navigateur.
Certaines API utilisable uniquement après que cet événement se produit.
App.on ("ready", createWindow) / / je quitte lorsque toutes les fenêtres sont fermées.
App.on (' fenêtre-tout-fermée ', () => {/ / sur Mac OS, il est courant pour les applications et leur barre de menu / / de rester actif jusqu'à ce que l’utilisateur quitte explicitement avec Cmd + Q si (process.platform ! == « darwin ») {app.quit()}}) app.on ('activer', () = > {/ / sur Mac OS, il est fréquent de re-créer une fenêtre de l’application lorsque le / / dock icône est cliqué, et il n’y a pas d’autres fenêtres ouvertes.
  Si (gagner === null) {createWindow()}}) / / dans ce fichier, vous pouvez inclure le reste du processus principal spécifique de votre app / code /. Vous pouvez aussi mettre dans des fichiers séparés et leur demander ici.
```

Enfin, le `index.html` est la page web à afficher :

```html
< ! DOCTYPE html><html> <head> <meta charset="UTF-8"> <title>Hello monde !</title> </head> <body> <h1>Hello monde !</h1> nous utilisons nœud <script>document.write (process.versions.node)</script>, </script> <script>document.write (process.versions.chrome) Chrome et </script> <script>document.write (process.versions.electron) électrons.
  </body></html>
```

## Exécutez votre application

Une fois que vous avez créé votre première `main.js`, `index.html` et `package.json` fichiers, vous voudrez probablement essayer d’exécuter votre application localement afin de le tester et assurez-vous qu’il fonctionne comme prévu.

### `électron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) est un module de `npm` qui contient des versions précompilées des électrons.

Si vous avez installé il dans le monde avec `npm`, puis vous devrez seulement exécuter ce qui suit dans le répertoire source de votre application :

```bash
électron.
```

Si vous avez installé localement, puis exécutez :

#### macOS / Linux

```bash
$./node_modules/.bin/electron.
```

#### Windows

```bash
$.\node_modules\.bin\electron.
```

### Électron manuellement téléchargé binaire

Si vous avez téléchargé électron manuellement, vous pouvez également utiliser le binaire inclus pour exécuter votre application directement.

#### macOS

```bash
$./Electron.app/Contents/MacOS/Electron votre-app /
```

#### Linux

```bash
$ ./electron/electron votre-app /
```

#### Windows

```bash
votre $.\electron\electron.exe-app\
```

`Electron.app` ici fait partie des documents de mainlevée de l’électron, vous pouvez le télécharger depuis [here](https://github.com/electron/electron/releases).

### Exécuter en tant qu’une distribution

Après vous êtes fait écrire votre application, vous pouvez créer une répartition en suivant le guide de Distribution</a> de Application et en exécutant ensuite l’app emballé.</p> 

### Essayez cet exemple

Cloner et exécuter le code dans ce tutoriel en utilisant le référentiel [`electron/électron-rapide-start`](https://github.com/electron/electron-quick-start).

**Note** : courir ceci nécessite des [Git](https://git-scm.com) et [Node.js](https://nodejs.org/en/download/) (dont [npm](https://npmjs.org)) sur votre système.

```bash
# Cloner le référentiel $ git clone https://github.com/electron/electron-quick-start # aller dans le référentiel $ cd # électron-quick-start Install dépendances $ npm installer # lancez l’app $ NGP start
```

Pour plus d’applications exemple, voir la[list de boilerplates](https://electron.atom.io/community/#boilerplates), créé par la communauté électronique génial.