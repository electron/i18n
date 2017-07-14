# Débogguer le processus principal dans node-inspector

[`node-inspector`](https://github.com/node-inspector/node-inspector) fournit un GUI DevTools familier qui peut être utilisé dans Chrome pour débogguer le processus principal d'Electron, cependant, puisque `node-inspector` s'appuie sur quelques modules natifs Node il doivent être rebuild pour cibler la version d'Electron que vous souhaitez débogguer. Vous pouvez reconstruire les dépendances de `node-inspector` vous-même, ou laisser [`electron-inspector`](https://github.com/enlight/electron-inspector) le faire pour vous, ces deux approches sont couvertes dans ce document.

**Remarque :** Au moment de l’écriture, la dernière version de `node-inspector` (0.12.8) ne peut pas être reconstruite pour cibler Electron 1.3.0 (ou +) sans patcher une de ses dépendances. Si vous utilisez `electron-inspector`, il s’occupera de cela pour vous.

## Utiliser `electron-inspector` pour le déboggage

### 1. Installez [node-gyp required tools](https://github.com/nodejs/node-gyp#installation)

### 2. Installez [`Electron-rebuild`](https://github.com/electron/electron-rebuild), si vous ne l’avez pas déjà fait.

```shell
npm install electron-rebuild --save-dev
```

### 3. installez [`electron-inspector`](https://github.com/enlight/electron-inspector)

```shell
npm install electron-inspector --save-dev
```

### 4. Démarrez Electron

Lancer Electron avec le paramètre `--debug` :

```shell
electron --debug=5858 votre/app
```

sinon, pour mettre en pause l’exécution sur la première ligne de JavaScript :

```shell
electron --debug-brk=5858 votre/app
```

### 5. Démarrer electron-inspector

Sur macOS / Linux :

```shell
node_modules/.bin/electron-inspector
```

Sur Windows :

```shell
node_modules\\.bin\\electron-inspector
```

`electron-inspector` devra reconstruire les dépendances de `node-inspector` à la première exécution, et à chaque fois que vous changerez votre version d'Electron. Le processus de rebuild peut exiger une connexion internet pour télécharger les bibliothèques et headers de Node et peut prendre quelques minutes.

### 6. Charger l’interface utilisateur du déboggueur

Ouvrez http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 dans Chrome. Vous devrez peut-être cliquer sur pause si ça commence par `--debug-brk` pour forcer la mise à jour de l’interface utilisateur.

## Utiliser `node-inspector` pour le déboggage

### 1. Installez [node-gyp required tools](https://github.com/nodejs/node-gyp#installation)

### 2. Installez [`node-inspector`](https://github.com/node-inspector/node-inspector)

```bash
$ npm install node-inspector
```

### 3. Installez [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)

```bash
$ npm install node-pre-gyp
```

### 4. Recompilez les modules de `node-inspector` `v8` pour Electron

**Remarque :** Mettre à jour l’argument target à votre numéro de version Electron

```bash
$ node_modules/.bin/node-pre-gyp --target=1.2.5 --runtime=electron --fallback-to-build --directory node_modules/v8-debug/ --dist-url=https://atom.io/download/atom-shell reinstall
$ node_modules/.bin/node-pre-gyp --target=1.2.5 --runtime=electron --fallback-to-build --directory node_modules/v8-profiler/ --dist-url=https://atom.io/download/atom-shell reinstall
```

Voir aussi [Comment faire pour installer les modules natifs](using-native-node-modules.md#how-to-install-native-modules).

### 5. Activer le mode debug pour Electron

Vous pouvez soit démarrer Electron avec un indicateur de déboggage :

```bash
$ electron --debug=5858 votre/app
```

sinon, pour mettre en pause votre script sur la première ligne :

```bash
$ electron --debug-brk=5858 votre/app
```

### 6. Démarrez le serveur de [`node-inspector`](https://github.com/node-inspector/node-inspector) avec Electron

```bash
$ ELECTRON_RUN_AS_NODE=true path/to/electron.exe node_modules/node-inspector/bin/inspector.js
```

### 7. Charger le déboggueur de l'interface utilisateur

Ouvrez http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 dans Chrome. Vous devrez peut-être cliquer sur pause si ça commence par `--debug-brk` pour voir la ligne d’entrée.