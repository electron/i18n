# Installation

To install prebuilt Electron binaries, use [`npm`][npm]. La méthode préférée est d'installer Electron en tant que dépendance de développement dans votre application :

```sh
npm install electron --save-dev
```

Voir la [documentation du versionnage][versioning] pour plus d'informations sur la façon de gérer différentes versions d'Electron dans vos applications.

## Running Electron ad-hoc

If you're in a pinch and would prefer to not use `npm install` in your local project, you can also run Electron ad-hoc using the [`npx`][npx] command runner bundled with `npm`:

```sh
npx electron .
```

La commande ci-dessus exécutera le répertoire de travail actuel avec Electron. Note that any dependencies in your app will not be installed.

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

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 et plus][proxy-env-10]
* [Avant Node 10][proxy-env]

## Mirroirs et Caches personnalisés

Lors de l’installation, le module `electron` appellera [`@electron/get`][electron-get] pour télécharger les binaires précompilés d’Electron pour votre plate-forme. Cela se fera en se connectant à la page GitHub des release (`https://github.com/electron/electron/releases/tag/v$VERSION`, ou `$VERSION` est la version exacte d'Electron).

Si vous êtes dans l'incapacité d'accéder à github ou si vous avez besoin de fournir un binaire personnalisé, vous pouvez aussi le faire en mettant à disposition un miroir ou un répertoire de cache existant.

#### Miroir

Vous pouvez utiliser des variables d’environnement pour substituer l’URL de base, le chemin d’accès où chercher les binaires d'Electron, et le nom du fichier binaire. The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

Par défaut, `ELECTRON_CUSTOM_DIR` est défini sur `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

La configuration ci-dessus sera téléchargée à partir d'URL telles que `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Cache

Egalement vous pouvez, surcharger le cache local. `@electron/get` mettra en cache le téléchargement des binaires dans un répertoire local afin d'économiser de la bande passante. Vous pouvez utiliser ce répertoire de cache pour fournir des binaires personnalisés d'Electron ou pour éviter d'utiliser le réseau.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Sur les environnements qui utilisent des versions plus anciennes d’électron, vous pourriez trouver le cache aussi dans `~/.electron`.

Vous pouvez également substituer l’emplacement du cache local en fournissant une variable d’environnement `electron_config_cache`.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

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

Sous le capot, l'API JavaScript d'Electron est rattachée à un binaire contenant son implémentation. Ce binaire est indispensable au fonctionnement de toute application Electron, il est donc téléchargé par défaut dans l’étape du `postinstall` chaque fois que vous installez `electron` à partir du dépôt npm.

Toutefois, si vous souhaitez installer les dépendances de votre projet sans avoir besoin d’utiliser les fonctionnalité d'Electron, vous pouvez définir la variable d’environnement `ELECTRON_SKIP_BINARY_DOWNLOAD` pour empêcher le téléchargement du fichier binaire. Ce peut être utile, par exemple dans les environnements d’intégration continue lors de l’exécution de tests unitaires qui simulent le module `electron` .

```sh npm2yarn
format@@0 ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Résolution de problème

Lorsque vous exécutez `npm install electron`, certains utilisateurs rencontrent parfois des erreurs d'installation.

Dans la plupart des cas, ces erreurs sont le résultat d'un problème de réseau et non un soucis avec le packet npm `electron`. Les erreurs comme `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` et `ETIMEDOUT` sont toutes des indications d'un problème de réseau. La meilleure solution est d'essayer en changeant de réseau ou juste d'attendre un peu et de réessayer l'installation.

Vous pouvez également essayer de télécharger Electron directement depuis [electron/electron/releases][releases] si l'installation via `npm` ne marche pas.

Si l'installation échoue avec une erreur `EACCESS`, vous devez peut-être [réparer les droits npm][npm-permissions].

Si l'erreur ci-dessus persiste, le paramètre [unsafe-perm][unsafe-perm] devrait être définit à true :

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
[npx]: https://docs.npmjs.com/cli/v7/commands/npx
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
