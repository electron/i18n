# Utiliser des Modules Natifs de Node

Les modules natifs de Node sont pris en charge par Electron, mais étant donné qu'Electron est susceptible d’utiliser une version différente de V8 du binaire Node installée sur votre système. Vous devez spécifier manuellement l’emplacement des en-têtes d'Electron, lors de la compilation de modules natifs.

## Comment installer des modules natifs

Il y a trois façons d'installer des modules natifs :

### À l’aide de `npm`

En définissant quelques variables d’environnement, vous pouvez utiliser `npm` pour installer des modules directement.

Un exemple d’installation de toutes les dépendances pour Electron:

```bash
# Version d'Electron.
export npm_config_target=1.2.3
# L'architecture d'Electron, peut être ia32 ou x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Télécharge les headers pour Electron.
export npm_config_disturl=https://atom.io/download/electron
# Indique à node-pre-gyp que l'on compile pour Electron.
export npm_config_runtime=electron
# Indique à node-pre-gyp de compiler les modules depuis leur code source.
export npm_config_build_from_source=true
# Installe toutes les dépendances, et met en cache à ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Installation et compilation de modules pour Electron

Vous pouvez également choisir d'installer des modules comme les autres projets Node, et puis compiler les modules pour Electron avec le paquet [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Ce module peut obtenir la version d'Electron et gérer les étapes manuelles de téléchargements des ent-têtes et compiler les modules natifs pour votre application.

Un exemple d'installation de `electron-rebuild` et du rebuild des modules avec:

```bash
npm install --save-dev electron-rebuild

# À chaque fois que vous exécutez "npm install", exécutez ça:
./node_modules/.bin/electron-rebuild

# Sur Windows si vous rencontrez des problèmes, essayez:
.\node_modules\.bin\electron-rebuild.cmd
```

### Compilation manuel pour Electron

Si vous êtes un développeur développant un module natif et que vous voulez le tester avec Electron, vous pouvez recompiler le module pour Electron manuellement. Vous pouvez utiliser `node-gyp` directement pour build pour Electron:

```bash
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

Le `HOME=~/.electron-gyp` indique où trouver les en-têtes pour le développement. `--target=1.2.3` est la version d'Electron. Le `--dist-url=...` indique où télécharger les en-têtes. Le paramètre `--arch=x64` dit que le module est prévu pour un système 64bits.

## Résolution de problème

If you installed a native module and found it was not working, you need to check following things:

* The architecture of module has to match Electron's architecture (ia32 or x64).
* After you upgraded Electron, you usually need to rebuild the modules.
* When in doubt, run `electron-rebuild` first.

## Modules that rely on `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to easily publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.