# Créer une archive

Pour atténuer les [problèmes](https://github.com/joyent/node/issues/6960) autour des noms de chemins longs sous Windows, en accélérant légèrement `require` et en dissimulant votre code source de l'inspection superficielle, vous pouvez empaqueter votre application dans une archive [asar](https://github.com/electron/asar) avec peu de modifications à votre code source.

La plupart des utilisateurs obtiendrons cette fonctionnalité sans devoir s'en occuper, car elle est supporté directement par [`electron-packager`](https://github.com/electron/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), et [`electron-builder`](https://github.com/electron-userland/electron-builder). Si vous n'utilisez aucun de ces outils, continuez à lire.

## Créer une archive `asar`

Une archive [asar](https://github.com/electron/asar) est un simple format d'archive comme tar, qui concatène les fichiers en un seul fichier. Electron peut lire les fichiers arbitrairement sans avoir a décompresser l'archive.

Étapes pour empaqueter votre application dans une archive `asar` :

### 1. Installez l'utilitaire asar

```sh
$ npm install -g asar
```

### 2. Package with `asar pack`

```sh
$ asar pack votre-application app.asar
```

## Lire une archive `asar`

In Electron there are two sets of APIs: Node APIs provided by Node.js and Web APIs provided by Chromium. Both APIs support reading files from `asar` archives.

### Node API

Avec les patchs spéciaux d'Electron, `fs.readFile` et `require` traite les archives `asar` comme des répertoires virtuels et les fichiers qu’il contiennent, comme des fichiers normaux dans le système de fichiers.

Par exemple, supposons que nous ayons une archive `exemple.asar` dans `/chemin/vers` :

```sh
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
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

In a web page, files in an archive can be requested with the `file:` protocol. Like the Node API, `asar` archives are treated as directories.

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

Dans certains cas comme la vérification checksum d'une archive `asar`, nous devons lire le contenu d'une archive `asar` sous forme de fichier. Pour cela, vous pouvez utiliser le module `original-fs` intégré qui fournit l'API `fs` sans le support de `asar` :

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/chemin/vers/exemple.asar')
```

Vous pouvez également définir `process.noAsar` à `true` pour désactiver le support de `asar` dans le module `fs` :

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/chemin/vers/exemple.asar')
```

## Limites de Node API

Même si nous avons durement essayé de faire que les archives `asar` dans Node API fonctionnent comme des répertoires autant que possible, il existe encore des restrictions en raison de la nature bas niveau de Node API.

### Les archives sont en lecture seule

Les archives ne peuvent pas être modifiées, donc toutes les APIs Node qui peuvent modifier les fichiers ne fonctionneront pas avec les archives `asar`.

### Le dossier de travail ne peux pas être définie comme dossier dans une archive

Bien que les archives `asar` sont traités comme des répertoires, il n'y a réellement aucun répertoire dans le système de fichiers, donc vous ne pourrez jamais définir l'espace de travail dans les archives `asar`. Les passer en tant qu'option de `cwd` de certaines APIs occasionnera aussi des erreurs.

### Dépaquetage supplémentaire sur certaines APIs

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

Il existe des APIs Node qui peuvent exécuter des binaires tels que `child_process.exec`, `child_process.spawn` et `child_process.execFile`, mais seul `execFile` est supporté pour exécuter des binaires dans une archive `asar`.

C'est parce que `exec` et `spawn` acceptent `command` au lieu de `file` en entrée, et les `command` sont exécutées sous shell. Il n'y a pas de moyen fiable de déterminer si une commande utilise un fichier dans une archive asar, et même si nous le faisons, nous ne pouvons pas être sûrs de pouvoir remplacer les chemins d'accès dans la commande sans effets secondaires.

## Ajouter des fichiers non empaquetés dans une archive `asar`

As stated above, some Node APIs will unpack the file to the filesystem when called. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

As a workaround, you can leave various files unpacked using the `--unpack` option. In the following example, shared libraries of native Node.js modules will not be packed:

```sh
$ asar pack app app.asar --unpack *.node
```

Après avoir exécuter la commande, vous remarquerez qu'un dossier nommé `app.asar.unpacked` a été créé avec le fichier `app.asar`. Il contient les fichiers non-empaquetés et devrait être distribué avec l'archive `app.asar`.

