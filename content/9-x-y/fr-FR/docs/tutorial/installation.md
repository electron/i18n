# Installation

To install prebuilt Electron binaries, use [`npm`][npm]. La méthode préférée est d'installer Electron en tant que dépendance de développement dans votre application :

```sh
npm install electron --save-dev
```

Voir la [documentation du versionnage][versioning] pour plus d'informations sur la façon de gérer différentes versions d'Electron dans vos applications.

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

Si vous devez utiliser un proxy HTTP, vous devez définir la variable `ELECTRON_GET_USE_PROXY` à n'importe quelle valeur plus des variables d'environnement supplémentaires en fonction de la version de Node de votre système hôte:

* [Noeud 10 et plus][proxy-env-10]
* [Avant le nœud 10][proxy-env]

## Mirroirs et Caches personnalisés
During installation, the `electron` module will call out to [`@electron/get`][electron-get] to download prebuilt binaries of Electron for your platform. Cela se fera en se connectant à la page GitHub des release (`https://github.com/electron/electron/releases/tag/v$VERSION`, ou `$VERSION` est la version exacte d'Electron).

Si vous êtes dans l'incapacité d'accéder à github ou si vous avez besoin de fournir un binaire personnalisé, vous pouvez aussi le faire en mettant à disposition un miroir ou un répertoire de cache existant.

#### Miroir
Vous pouvez utiliser des variables d’environnement pour substituer l’URL de base, le chemin d’accès où chercher les binaires d'Electron, et le nom du fichier binaire. The url used by `@electron/get` is composed as follows:

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Par exemple, pour utiliser le miroir en Chine:

```plaintext
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

#### Cache
Egalement vous pouvez, surcharger le cache local. `@electron/get` mettra en cache les binaires téléchargés dans un répertoire local pour ne pas mettre votre réseau en évidence. Vous pouvez utiliser ce répertoire de cache pour fournir des binaires personnalisés d'Electron ou pour éviter d'utiliser le réseau.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Sur les environnements qui utilisent des versions plus anciennes d’électron, vous pourriez trouver le cache aussi dans `~/.electron`.

Vous pouvez également remplacer l'emplacement local du cache en fournissant une variable d'environnement `electron_config_cache` .

Le cache contient le fichier zip officiel de la version ainsi qu'une somme de contrôle, stockée comme un fichier texte. Une cache typique peut ressembler à ceci :

```sh
── httpsgithub.comelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
Ω<unk> ── electron-v1.7.9-darwin-x64.zip
── httpsgithub.comelectronreleasesdownloadv1.7.9SHASUMS256.txt
文<unk> ─ SHASUMS256.txt
─ httpsgithub.comelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64. ip
Ω<unk> ─ electron-v1.8.1-darwin-x64.zip
── httpsgithub.comelectronreleasesdownloadv1.8.1SHASUMS256.txt
Ω<unk> ─ SHASUMS256.txt
── httpsgithub. omelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
Ω<unk> ── electron-v1.8.2-beta.1-darwin-x64.zip
── httpsgithub. omelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
文<unk> ── SHASUMS256.txt
── httpsgithub.comelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
Ω<unk> ─ electron-v1.8.2-beta.2-darwin-x64.zip
─ httpsgithub.comelectronreleasesdownloadv1.8.2-beta. SHASUMS256.txt
Ω<unk> ─ SHASUMS256.txt
Ω─ httpsgithub.comelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64. ip
Ω<unk> ─ electron-v1.8.2-beta.3-darwin-x64.zip
<unk> ─ httpsgithub.comelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    <unk> ─ SHASUMS256.txt
```

## Désactiver le téléchargement des binaires
Lorsque vous installer le packet `electron`, npm va automatiquement télécharger le fichier binaire associé.

Ceci peut poser problème avec l'utilisation d'une CI par exemple, où on voudrait éviter de télécharger les binaires à chaque fois que la CI lance un build.

Pour empêcher le binaire d'être téléchargé lorsque vous installez toutes les dépendances npm, vous pouvez définir la variable d'environnement `ELECTRON_SKIP_BINARY_DOWNLOAD`. Ex. :
```sh
format@@0 ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Résolution de problème

Lorsque vous exécutez `npm install electron`, certains utilisateurs rencontrent parfois des erreurs d'installation.

Dans la plupart des cas, ces erreurs sont le résultat d'un problème de réseau et non un soucis avec le packet npm `electron`. Les erreurs comme `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` et `ETIMEDOUT` sont toutes des indications d'un problème de réseau. La meilleure solution est d'essayer en changeant de réseau ou juste d'attendre un peu et de réessayer l'installation.

You can also attempt to download Electron directly from [electron/electron/releases][releases] if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions][npm-permissions].

If the above error persists, the [unsafe-perm][unsafe-perm] flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

Sur des réseaux plus lents, il est plus souhaitable d'utiliser le paramètre `--verbose` pour afficher la progression du téléchargement :

```sh
npm install --verbose electron
```

Si vous devez forcer le re-téléchargement de l'asset et du fichier SHASUM, mettez la variable d'environnement `force_no_cache` à `true`.

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
