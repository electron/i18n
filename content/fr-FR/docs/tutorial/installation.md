# Installation

Pour installer les binaires précompilés d'Electron, utilisez [`npm`](https://docs.npmjs.com). Il est préférable d'installer Electron comme une dépendance de développement dans votre application :

```sh
npm install electron --save-dev
```

Voir la [documentation du versionnage](./electron-versioning.md) pour plus d'informations sur la façon de gérer différentes versions d'Electron dans vos applications.

## Installation global

Vous pouvez également installer la commande `electron` globalement dans votre `$PATH` :

```sh
npm install electron -g
```

## Personnalisation

Si vous souhaitez modifier l'architecture qui est téléchargée (par exemple, `ia32` sur une machine `x64`), vous pouvez utiliser le paramètre `--arch` avec npm install ou définir la variable d'environnement `npm_config_arch` :

```shell
npm install --arch=ia32 electron
```

En plus de modifier l'architecture, vous pouvez également spécifier la platforme (par exemple, `win32`, `linux`, etc.) en utilisant le paramètre `--platform` :

```shell
npm install --platform=win32 electron
```

## Les proxys

Si vous avez besoin d’utiliser un proxy HTTP, vous pouvez définir [ces variables d’environnement](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Mirroirs et Caches personnalisés

Lors de l’installation, le module `electron` appellera [`electron-download`](https://github.com/electron-userland/electron-download) pour télécharger les binaires précompilés d’Electron pour votre plate-forme. Cela se fera en se connectant à la page GitHub des release (`https://github.com/electron/electron/releases/tag/v$VERSION`, ou `$VERSION` est la version exacte d'Electron).

Si vous êtes dans l'incapacité d'accéder à github ou si vous avez besoin de fournir un binaire personnalisé, vous pouvez aussi le faire en mettant à disposition un miroir ou un répertoire de cache existant.

#### Miroir

Vous pouvez utiliser des variables d’environnement pour substituer l’URL de base, le chemin d’accès où chercher les binaires d'Electron, et le nom du fichier binaire. L’url utilisée par `electron-download` se compose de la manière suivante :

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Par exemple, pour utiliser le miroir en Chine:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

Egalement vous pouvez, surcharger le cache local. `electron-download` mettra en cache le téléchargement des binaires dans un répertoire local afin d'économiser de la bande passante. Vous pouvez utiliser ce répertoire de cache pour fournir des binaires personnalisés d'Electron ou pour éviter d'utiliser le réseau.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Sur les environnements qui utilisent des versions plus anciennes d’électron, vous pourriez trouver le cache aussi dans `~/.electron`.

Vous pouvez également substituer l’emplacement du cache local en fournissant une variable d’environnement `ELECTRON_CACHE`.

Le cache contient l’archive zip de la version officielle, ainsi qu'un checksum stocké dans un fichier texte. Un cache typique ressemble à :

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Résolution de problème

Lorsque vous exécutez `npm install electron`, certains utilisateurs rencontrent parfois des erreurs d'installation.

Dans la plupart des cas, ces erreurs sont le résultat d'un problème de réseau et non un soucis avec le packet npm `electron`. Les erreurs comme `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` et `ETIMEDOUT` sont toutes des indications d'un problème de réseau. La meilleure solution est d'essayer en changeant de réseau ou juste d'attendre un peu et de réessayer l'installation.

Vous pouvez également essayer de télécharger Electron directement depuis [electron/electron/releases](https://github.com/electron/electron/releases) si l'installation via `npm` ne marche pas.

Si l'installation échoue avec une erreur `EACCESS`, vous devez peut-être [réparer les droits npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Si l'erreur ci-dessus persiste, le paramètre [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) devrait être définit à true :

```sh
sudo npm install electron --unsafe-perm=true
```

Sur des réseaux plus lents, il est plus souhaitable d'utiliser le paramètre `--verbose` pour afficher la progression du téléchargement :

```sh
npm install --verbose electron
```

Si vous devez forcer le re-téléchargement de l'asset et du fichier SHASUM, mettez la variable d'environnement `force_no_cache` à `true`.