# Créer une archive

To mitigate [issues](https://github.com/joyent/node/issues/6960) around long path names on Windows, slightly speed up `require` and conceal your source code from cursory inspection, you can choose to package your app into an [asar](https://github.com/electron/asar) archive with little changes to your source code.

## Génerer une archive `asar`

Une archive [asar](https://github.com/electron/asar) est un simple format d'archive comme tar, qui concatène les fichiers en un seul fichier. Electron peut lire les fichiers arbitrairement sans avoir a décompresser l'archive.

Étapes pour empaqueter votre application dans une archive `asar` :

### 1. Installez l'utilitaire asar

```bash
$ npm install -g asar
```

### Empaquetez avec `asar pack`

```bash
$ asar pack votre-application app.asar
```

## Lire une archive `asar`

Il y a deux méthodes dans les APIs d'Electron : Node APIs fournies par Node.js et Web APIs fournies par Chromium. Les deux APIs prennent en charge la lecture de fichier provenant d'archives `asar`.

### Node API

Avec les patchs spéciaux d'Electron, `fs.readFile` et `require` traite les archives `asar` comme des répertoires virtuels et les fichiers qu’il contiennent, comme des fichiers normaux dans le système de fichiers.

Par exemple, supposons que nous ayons une archive `exemple.asar` dans `/chemin/vers` :

```bash
$ asar list /chemin/vers/exemple.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Lire un fichier dans l’archive `asar` :

```javascript
const fs = require('fs')
fs.readFileSync('/chemin/vers/exemple.asar/fichier.txt')
```

Lister tous les fichiers à la racine de l’archive :

```javascript
const fs = require('fs')
fs.readdirSync('/chemin/vers/exemple.asar')
```

Utiliser un module de l’archive :

```javascript
require('/chemin/vers/exemple.asar/dir/module.js')
```

Vous pouvez également afficher une page web se trouvant dans une archive `asar` avec `BrowserWindow` :

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('file:///chemin/vers/exemple.asar/static/index.html')
```

### Web API

Dans une page web, les fichiers dans une archive peuvent être requis avec le protocole `file:`. Comme dans Node API, les archives `asar` sont considérés comme des répertoires.

Par exemple, pour obtenir un fichier avec `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///chemin/vers/exemple.asar/fichier.txt', (data) => {
  console.log(data)
})
</script>
```

### Traiter une archive `asar` comme un fichier normal

For some cases like verifying the `asar` archive's checksum, we need to read the content of an `asar` archive as a file. Pour cela, vous pouvez utiliser le module `original-fs` intégré qui fournit l'API original `fs` sans le support `asar`:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/chemin/vers/exemple.asar')
```

Vous pouvez également définir `process.noAsar` à `true` pour désactiver le support de `asar` dans le module `fs`:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/chemin/vers/exemple.asar')
```

## Limites de Node API

Même si nous avons durement essayé de faire que les archives `asar` dans Node API fonctionnent comme des répertoires autant que possible, il existe encore des restrictions en raison de la nature bas niveau de Node API.

### Les archives sont en lecture seule

Les archives ne peuvent pas être modifiées, donc toutes les API Node qui peuvent modifier les fichiers ne fonctionneront pas avec les archives `asar`.

### Working Directory Can Not Be Set to Directories in Archive

Bien que les archives `asar` sont traités comme des répertoires, il n'y a réellement aucun répertoire dans le système de fichiers, donc vous ne pourrez jamais définir l'espace de travail dans les archives `asar`. Les passer en tant qu'option de `cwd` de certains APIs occasionnera aussi des erreurs.

### Extra Unpacking on Some APIs

La plupart des APIs `fs` peuvent lire un fichier ou obtenir les informations d'un fichier depuis les archives `asar` sans les dépaqueter, mais pour certaines APIs qui dépendent du passage du chemin d'accès réel aux appels système sous-jacents, Electron va dépaqueter le fichier requis dans un fichier temporaire et passer le chemin d'accès du fichier temporaire aux API pour les faire fonctionner. Cela ajoute un traitement supplémentaire pour ces APIs.

Les APIs qui requièrent un dépaquetage supplémentaire sont :

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - utilisé par `require` sur des modules natifs

### Fausses informations Stat de `fs.stat`

Les objets `Stats` retournés par `fs.stat` et ses amis sur les fichiers dans les archives `asar` sont générés par déduction, parce que ces fichiers n'existent pas dans le système de fichiers. Donc vous ne devriez pas faire confiance aux objets `Stats` sauf pour obtenir la taille du fichier et vérifier le type de fichier.

### Exécuter des binaires dans une archive `asar`

Il existe des APIs Node qui peuvent exécuter des binaires tels que `child_process.exec`, `child_process.spawn` et`child_process.execFile`, mais seulement `execFile` est supporté pour exécuter des binaires dans une archive `asar`.

C'est parce que `exec` et `spawn` acceptent `command` au lieu de `file` en entrée, et les `command` sont exécutées sous shell. Il n'y a pas de moyen fiable de déterminer si une commande utilise un fichier dans une archive asar, et même si nous le faisons, nous ne pouvons pas être sûrs de pouvoir remplacer les chemins d'accès dans la commande sans effets secondaires.

## Ajouter des fichiers non empaquetés dans une archive `asar`

Comme indiqué ci-dessus, certains APIs Node vont dépaqueter le fichier du système de fichiers lors de l'appel, mis à part les problèmes de performance, cela pourrait également conduire à de fausses alertes de scanners antivirus.

Pour contourner ce problème, vous pouvez dépaqueter certains fichiers en créant des archives en utilisant l'option `--unpack`, un exemple d'exclusion des librairies partagées des modules natifs est :

```bash
$ asar pack app app.asar --unpack *.node
```

Après l'exécution de la commande, en dehors de `app.asar`, il y a également un dossier `app.asar.unpacked` généré contenant les fichiers dépaquetés, vous devez le copier avec `app.asar` en l'envoyant aux utilisateurs.