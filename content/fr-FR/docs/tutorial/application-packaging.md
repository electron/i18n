# Application Packaging

Pour atténuer les [issues](https://github.com/joyent/node/issues/6960) autour de long chemin sous Windows, les noms légèrement accélérer `require` et dissimuler votre code source depuis inspection superficielle, vous pouvez choisir empaqueter votre application dans une archive [asar](https://github.com/electron/asar) avec peu de modifications à votre code source.

## Génération `asar` Archive

Une archive de [asar](https://github.com/electron/asar) est un simple format ressemblant à du goudron qui concatène des fichiers dans un seul fichier. Électron peut lire les fichiers arbitraires d’elle sans déballage de l’ensemble du dossier.

Étapes pour empaqueter votre application dans une archive de `asar` :

### 1. Installez l’asar utilitaire

```bash
NGP $ installer asar -g
```

### 2. paquet avec `asar pack`

```bash
$ asar pack your-app app.asar
```

## À l’aide des Archives de `asar`

En électrons, il y a deux ensembles d’API : noeud API fournies par Node.js et Web API fournies par chrome. Les deux API prennent en charge la lecture des fichiers d’archives de `asar`.

### Nœud API

Avec les patchs spéciaux en électron, noeud API comme `fs.readFile` et `require` traiter `asar` archives comme répertoires virtuels et les fichiers qu’il contient comme des fichiers normaux dans le système de fichiers.

Par exemple, supposons que nous ayons des Archives de `example.asar` sous `/chemin/to` :

```bash
$ asar liste /path/to/example.asar /app.js /file.txt /dir/module.js /static/index.html /static/main.css /static/jquery.min.js
```

Lire un fichier dans l’archive `asar` :

```javascript
const fs = require('fs') fs.readFileSync('/path/to/example.asar/file.txt')
```

Lister tous les fichiers sous la racine de l’archive :

```javascript
const fs = require('fs') fs.readdirSync('/path/to/example.asar')
```

Utiliser un module de l’archive :

```javascript
require('/path/to/example.ASAR/dir/module.js')
```

Vous pouvez également afficher une page web dans une archive de `asar` avec `BrowserWindow` :

```javascript
const {BrowserWindow} = require('electron') laisser gagner = nouveau BrowserWindow({width: 800, height: 600}) win.loadURL('file:///path/to/example.asar/static/index.html')
```

### API Web

Dans une page web, les fichiers dans une archive peuvent être demandées avec le protocole `file:`. Comme l’API Node, `asar` archives sont considérés comme répertoires.

Par exemple, pour obtenir un fichier avec `$ .get` :

```html
<script> soit $ = require('./jquery.min.js') $.get ("file : / / / chemin/de/example.asar/file.txt ', (données) = > {console.log(data)})</script>
```

### Traiter une Archive `asar` comme un fichier Normal

Pour certains cas comme vérification de somme de contrôle de l’archive `asar`, nous avons besoin de lire le contenu d’une archive de `asar` sous forme de fichier. Pour cela, vous pouvez utiliser le module intégré`original-fs`, qui fournit les API de `fs` original sans le soutien de `asar` :

```javascript
const originalFs = require('original-fs') originalFs.readFileSync('/path/to/example.asar')
```

Vous pouvez également affecter `process.noAsar` `true` pour désactiver le support pour `asar` dans le module `fs` :

```javascript
const fs = require('fs') process.noAsar = true fs.readFileSync('/path/to/example.asar')
```

## Limites du noeud API

Même si nous avons essayé dur de faire `asar` des archives dans l’API de nœud fonctionnent comme les répertoires autant que possible, il existe encore des restrictions en raison de la nature de bas niveau de l’API de nœud.

### Archives sont en lecture seule

Les archives ne peuvent pas être modifiés, donc toutes les API de nœud qui peut modifier les fichiers ne fonctionnera pas avec les archives de `asar`.

### Répertoire de travail ne peut pas être réglée aux répertoires dans les Archives

Bien que les archives `asar` sont traités comme des répertoires, il n’y a aucun répertoire réel dans le système de fichiers, donc vous ne pouvez jamais définir le répertoire de travail vers des répertoires dans les archives de `asar`. En les passant sous le `cwd` option de certaines API occasionnera aussi des erreurs.

### Extra déballage sur certaines API

La plupart `fs` API peut lire un fichier ou obtenir des informations d’un fichier de `asar` archives sans déballage, mais pour certaines API qui dépendent en passant le chemin d’accès réel aux appels de système sous-jacent, électron va extraire les fichiers nécessaires dans un fichier temporaire et passez le chemin du fichier temporaire à l’API pour les faire fructifier. Cela ajoute un peu de traitement supplémentaire pour ces API.

API qui requiert un déballage supplémentaire sont :

* `child_process.execFile`
* `child_process.execFileSync`
* `FS.Open`
* `fs.openSync`
* `process.dlopen` - utilisé par `require` sur les modules natifs

### Fausses renseignements Stat de `fs.stat`

L’objet `Stats` retourné par `fs.stat` et ses amis sur les fichiers dans les archives de `asar` est généré en devinant, parce que ces fichiers n’existent pas sur le système de fichiers. Donc vous ne devriez pas faire confiance l’objet `Stats` sauf pour obtenir la taille du fichier et vérifier le type de fichier.

### L’exécution de fichiers binaires à l’intérieur de l’Archive `asar`

Il y a des API de nœud qui peut exécuter des binaires tels que `child_process.exec`, `child_process.spawn` et `child_process.execFile`, mais seulement `execFile` est pris en charge pour exécuter des binaires à l’intérieur de l’archive `asar`.

C’est parce que `exec` et `spawn` acceptent `command` au lieu de `file` comme entrée, et `command`s sont exécutés en vertu de la coquille. Il n’y a aucun moyen fiable pour déterminer si une commande utilise un fichier dans l’archive de l’asar, et même si nous le faisons, nous ne pouvons pas être sûrs que nous pouvons remplacer le chemin d’accès à la commande sans effets secondaires.

## Ajout de fichiers décompressés dans l’Archive `asar`

Comme indiqué plus haut, certaines Qu'api nœud va décompresser le fichier au système de fichiers lors de l’appel, mis à part les problèmes de performances, il pourrait également conduire à fausses alertes de scanners de virus.

Pour contourner ce problème, vous pouvez décompresser certains fichiers création d’archives en utilisant le`--unpack` option, en est un exemple de l’exclusion des bibliothèques partagées de modules natifs :

```bash
$ asar pack app app.asar--unpack *.node
```

Après l’exécution de la commande, en dehors de la `app.asar`, il y a aussi une `app.asar.unpacked` dossier généré qui contient les fichiers décompressés, vous devez le copier avec `app.asar` lorsqu’il envois aux utilisateurs.