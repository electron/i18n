# Déboguer le processus principal dans le nœud-inspecteur

[`node-inspector`](https://github.com/node-inspector/node-inspector) fournit une interface utilisateur graphique DevTools familier qui peut être utilisé en Chrome pour déboguer les processus principaux de l’électron, cependant, parce que `node-inspector` s’appuie sur quelques modules natifs de nœud qu’ils doivent être reconstruites pour cibler la version d’électron vous souhaitez déboguer. Vous pouvez reconstruire les dépendances de `node-inspector` vous-même, ou laissez les[`electron-inspector`](https://github.com/enlight/electron-inspector) à le faire pour vous, ces deux approches sont couvertes dans ce document.

**Note** : au moment de la rédaction la dernière version de `node-inspector` (0.12.8) ne peuvent pas être reconstruite pour cible électronique 1.3.0 ou plus tard sans patcher une de ses dépendances. Si vous utilisez `electron-inspector`, qu'il s’occupera de cela pour vous.

## Utilisation `electron-inspector` pour le débogage

### 1. installer le tools</a> node-gyp requis</h3> 

### 2. Installez [`electron-rebuild`](https://github.com/electron/electron-rebuild), si vous ne l’avez pas déjà fait.

```shell
NGP installer électron-reconstruction--save-dev
```

### 3. Installez [`electron-inspector`](https://github.com/enlight/electron-inspector)

```shell
NGP installer électron-inspecteur--save-dev
```

### 4. Lancez l’électron

Lancer électron avec le `--commutateur debug` :

```shell
électrons--debug = 5858 votre / app
```

Sinon, pour mettre en pause l’exécution sur la première ligne de JavaScript :

```shell
électrons--debug-brk = 5858 votre / app
```

### 5. Démarrez électron-inspecteur

Sur Mac OS / Linux :

```shell
node_modules/.bin/Electron-Inspector
```

Sur Windows :

```shell
node_modules\\.bin\\electron-Inspector
```

`electron-inspector` devrez reconstruire les dépendances de `node-inspector` dans la première manche, et une fois que vous changez votre version électronique. Le processus de reconstruction peut exiger une connexion internet pour télécharger les bibliothèques et en-têtes de nœud et peut prendre quelques minutes.

### 6. charger l’interface utilisateur du débogueur

Ouvrez http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 dans le navigateur de Chrome. Vous devrez peut-être cliquer sur pause si commençant par `--debug-brk` forcer la mise à jour de l’interface utilisateur.

## Utilisation `node-inspector` pour le débogage

### 1. installer le tools</a> node-gyp requis</h3> 

### 2. Installez [`node-inspector`](https://github.com/node-inspector/node-inspector)

```bash
NGP $ installer nœud-inspecteur
```

### 3. installer [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)

```bash
NGP $ installer nœud-pre-gyp
```

### 4. recompiler les modules de `v8` `node-inspector` pour l’électron

**Note:** mettre à jour l’argument cible à votre numéro de version électronique

```bash
$ node_modules/.bin/node-pre-gyp--target = 1.2.5--DUREE = électrons--secours-wanna-build--répertoire node_modules/v8-debug /--dist-url = https://atom.io/download/atom-shell réinstaller node_modules/.bin/node-pre-gyp $--cible = 1.2.5--DUREE = électrons--secours-wanna-build--répertoire node_modules/v8-profiler /--dist-url = https://atom.io/download/atom-shell réinstaller
```

Voir aussi [How pour installer modules](using-native-node-modules.md#how-to-install-native-modules) native.

### 5. activer le mode debug pour les électrons

Vous pouvez soit démarrer comme des électrons avec un indicateur de débogage :

```bash
électron $--debug = 5858 votre / app
```

Sinon, pour mettre en pause votre script sur la première ligne :

```bash
électron $--debug-brk = 5858 votre / app
```

### 6. Démarrez le serveur de [`node-inspector`](https://github.com/node-inspector/node-inspector) à l’aide d’électrons

```bash
$ ELECTRON_RUN_AS_NODE = true path/to/electron.exe node_modules/node-inspector/bin/inspector.js
```

### 7. charger l’interface utilisateur du débogueur

Ouvrez http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 dans le navigateur de Chrome. Vous devrez peut-être cliquer sur pause si commençant par `--debug-brk` Voir la gamme d’entrée.