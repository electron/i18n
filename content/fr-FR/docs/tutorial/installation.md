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

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or just wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.