# Installation

Pour installer des binaires Electron précompilés, utilisez [`npm`](https://docs.npmjs.com). La méthode préférée est d'installer Electron en tant que dépendance de développement dans votre application :

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

Si vous devez utiliser un proxy HTTP, vous devez définir la variable `ELECTRON_GET_USE_PROXY` à n'importe quelle valeur plus des variables d'environnement supplémentaires en fonction de la version de Node de votre système hôte:

* [Noeud 10 et plus](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Avant le nœud 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Mirroirs et Caches personnalisés
Lors de l'installation, le module `electron` appellera à [`@electron/get`](https://github.com/electron/get) pour télécharger les binaires précompilés de Electron pour votre plate-forme. Cela se fera en se connectant à la page GitHub des release (`https://github.com/electron/electron/releases/tag/v$VERSION`, ou `$VERSION` est la version exacte d'Electron).

Si vous êtes dans l'incapacité d'accéder à github ou si vous avez besoin de fournir un binaire personnalisé, vous pouvez aussi le faire en mettant à disposition un miroir ou un répertoire de cache existant.

#### Miroir
Vous pouvez utiliser des variables d’environnement pour substituer l’URL de base, le chemin d’accès où chercher les binaires d'Electron, et le nom du fichier binaire. L'URL utilisée par `@electron/get` est composée comme suit:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Par exemple, pour utiliser le miroir CDN de la Chine :

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

Par défaut, `ELECTRON_CUSTOM_DIR` est défini à `v$VERSION`. Pour changer le format, utilisez le marqueur `{{ version }}`. Par exemple, `version-{{ version }}` résout à `version-5.0.`, `{{ version }}` se résout à `5.0.`, et `v{{ version }}` est équivalent à la valeur par défaut. Comme exemple plus concret, utiliser le miroir chinois non-CDN :

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

La configuration ci-dessus sera téléchargée à partir d'URL telles que `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

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
