# Installation

> Conseils pour installer Electron

Pour installer les binaires précompilés d'Electron, utilisez [`npm`](https://docs.npmjs.com/). Il est préférable d'installer Electron comme une dépendance de développement dans votre application :

```sh
npm install electron --save-dev --save-exact
```

Le paramètre `--save-exact` est recommandé tant qu'Electron ne suit pas le versionnage sémantique. Voir la [documentation du versionnage](https://electron.atom.io/docs/tutorial/electron-versioning/) pour plus d'informations sur la façon de gérer les versions d'Electron dans vos applications.

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

## Résolution de problème

Lorsque vous exécutez `npm install electron`, certains utilisateurs rencontrent parfois des erreurs d'installation.

Dans la plupart des cas, ces erreurs sont le résultat d'un problème de réseau et non un soucis avec le packet npm `electron`. Les erreurs comme `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` et `ETIMEDOUT` sont toutes des indications d'un problème de réseau. La meilleure solution est d'essayer de changer de réseau ou juste d'attendre un peu et de réessayer l'installation.

Vous pouvez également essayer de télécharger Electron directement depuis [electron/electron/releases](https://github.com/electron/electron/releases) si l'installation via `npm` ne marche pas.

Si l'installation échoue avec une erreur `EACCESS`, vous devriez [réparer vos permissions npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Si l'erreur ci-dessus persiste, le paramètre [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) devrait être définit à true :

```sh
sudo npm install electron --unsafe-perm=true
```

Sur des réseaux plus lents, il est plus souhaitable d'utiliser le paramètre `--verbose` pour afficher la progression du téléchargement :

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.