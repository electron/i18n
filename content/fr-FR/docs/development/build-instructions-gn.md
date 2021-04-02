# Créer des instructions

Suivez les lignes directrices ci-dessous pour la construction d’Electron.

## Conditions préalables à la plate-forme

Vérifiez les conditions préalables de construction de votre plate-forme avant de procéder

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Construire des outils

[outils de build d’Electron](https://github.com/electron/build-tools) une grande partie de la configuration pour compiler Electron à partir de sources avec différentes configurations et construire des cibles. Si vous souhaitez configurer l’environnement manuellement, les instructions sont énumérées ci-dessous.

## Conditions préalables gn

Vous aurez besoin d’installer [`depot_tools`][depot-tools], l' utilisé pour aller chercher chrome et ses dépendances.

En outre, sur Windows, vous devrez définir la variable environnement `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Pour ce faire, ouvrez le système `Control Panel` → `et
sécurité` → `System` → `Advanced system settings` et ajoutez une variable système `DEPOT_TOOLS_WIN_TOOLCHAIN` valeur `0`.  Cela indique `depot_tools` d’utiliser votre version installée localement de Visual Studio (par défaut, `depot_tools` tentera de télécharger une version interne à Google à qui seuls les Googlers ont accès).

### Mise en place du cache git

Si vous prévoyez de vérifier Electron plus d’une fois (par exemple, pour avoir plusieurs répertoires parallèles vérifiés à différentes branches), en utilisant le cache git va accélérer les appels ultérieurs vers `gclient`. Pour ce faire, définissez une variable `GIT_CACHE_PATH` 'environnement :

```sh
$ export GIT_CACHE_PATH= »${HOME}/.git_cache »
$ mkdir -p "${GIT_CACHE_PATH}"
# Cela va utiliser environ 16G.
```

## Obtenir le code

```sh
$ mkdir électron && cd électron
$ gclient config - nom « src / électron » - non ingéraire https://github.com/electron/electron
$ synchronisation gclient - with_branch_heads - with_tags
# Cela prendra un certain temps, aller prendre un café.
```

> Au lieu `https://github.com/electron/electron`, vous pouvez utiliser votre propre fourchette ici (quelque chose comme `https://github.com/<username>/electron`).

### Une note sur tirer/pousser

Si vous avez l’intention de `git pull` ou `git push` à partir du référentiel officiel de `electron` à l’avenir, vous devez maintenant mettre à jour les URL d’origine du dossier respectif.

```sh
$ cd src / électron
$ git à distance supprimer l’origine
$ git à distance ajouter l’origine https://github.com/electron/electron
$ git checkout master
$ git branche - set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` fonctionne en vérifiant un fichier appelé `DEPS` à l’intérieur du dossier `src/electron` pour les dépendances (comme le chrome ou le nœud.js). Exécution `gclient sync -f` s’assure que toutes les dépendances pour construire Electron correspondre à ce fichier.

Ainsi, afin de tirer, vous exécuteriez les commandes suivantes :

```sh
$ cd src / électron
$ git tirer
$ synchronisation gclient -f
```

## Compilation

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH='pwd'/buildtools
$ gn gen out/Testing --args="import(\"/electron/build/args/testing.gn\ ») $GN_EXTRA_ARGS»
```

Ou sur Windows (sans l’argument optionnel):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH =%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\ ») »
```

Cela générera un répertoire de build `out/Testing` sous `src/` avec configuration de construction de test. Vous pouvez remplacer `Testing` par un autre nom, mais il devrait être un sous-directeur de `out`. En outre, vous ne devriez pas avoir à exécuter `gn gen` à nouveau, si vous voulez modifier les arguments de construction , vous pouvez exécuter `gn args out/Testing` pour faire monter un éditeur.

Pour voir la liste des options de configuration de build disponibles, exécutez `gn args
out/Testing --list`.

**Pour générer des tests construire config de Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\ ») $GN_EXTRA_ARGS»
```

**Pour générer release (aka « non-composant » ou « statique ») construire config de Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\ ») $GN_EXTRA_ARGS»
```

**Construire, courir `ninja` avec la cible `electron` :** Nota Bene: Cela prendra aussi un certain temps et probablement chauffer vos genoux.

Pour la configuration de test :

```sh
$ ninja -C out/Testing electron
```

Pour la configuration de sortie :

```sh
$ ninja -C out/Release electron
```

Cela permettra de construire tout ce qui était auparavant « libchromiumcontent » (c’est-à-dire le répertoire `content/` de `chromium` et ses dépendances, incl. WebKit et V8), donc il faudra un certain temps.

L’exécutable construit sera sous `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Content/MacOS/Electron
# ou, sur Windows
$ ./out/Testing/electron.exe
# ou, sur Linux
$ ./out/Testing/electron
```

### Livraison

Sur linux, d’abord dépouiller le débogage et les informations de symbole:

```sh
électron/script/strip-binaries.py -d out/Release
```

Pour emballer la construction d’électrons comme un fichier zip distribuable :

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Compilation croisée

Pour compiler pour une plate-forme qui n’est pas la même que celle sur qui vous vous construisez, définir les arguments `target_cpu` et `target_os` GN. Par exemple, pour compiler une cible x86 à partir d’un hôte x64, spécifiez `target_cpu = "x86"` dans `gn args`.

```sh
$ gn gen out /Testing-x86 --args='... target_cpu = « x86"'
```

Toutes les combinaisons de source et de CPU/OS cible ne sont pas prises en charge par chrome.

| Hôte        | Cible          | Notice                |
| ----------- | -------------- | --------------------- |
| Windows x64 | Bras windows64 | Experimental          |
| Windows x64 | Windows x86    | Testé automatiquement |
| Linux x64   | Linux x86      | Testé automatiquement |

Si vous testez d’autres combinaisons et les trouvez au travail, veuillez mettre à jour ce document :)

Consultez la référence GN pour les valeurs d' [`target_os`][target_os values] et [`target_cpu`][target_cpu values].

#### Windows on Arm (expérimental)

Pour compiler pour Windows on Arm, [suivez les](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) de guide de Chrome pour obtenir les dépendances nécessaires, SDK et bibliothèques, puis construire avec des `ELECTRON_BUILDING_WOA=1` dans votre environnement avant d’exécuter `gclient sync`.

```bat
définir ELECTRON_BUILDING_WOA=1
synchronisation gclient -f --with_branch_heads --with_tags
```

Ou (si vous utilisez PowerShell):

```powershell
$env:ELECTRON_BUILDING_WOA=1
synchronisation gclient -f --with_branch_heads --with_tags
```

Ensuite, courez `gn gen` ci-dessus avec `target_cpu="arm64"`.

## Tests

Pour exécuter les tests, vous devez d’abord construire les modules de test par rapport à la même version de nœud.js qui a été construit dans le cadre du processus de construction. Pour générer des en-têtes de construction pour les modules à compiler contre, exécutez les sous `src/` répertoire.

```sh
$ ninja -C out/Testing third_party/electron_node:en-têtes
```

Vous pouvez maintenant [exécuter les tests](testing.md#unit-tests).

Si vous débogagez quelque chose, il peut être utile de passer quelques drapeaux supplémentaires pour binaire Electron :

```sh
$ npm exécuter test - \
  --enable-logging -g 'BrowserWindow module'
```

## Partage du cache git entre plusieurs machines

Il est possible de partager le cache gclient git avec d’autres machines en l’exportant comme une part SMB sur Linux, mais un seul processus / machine peut être en utilisant le cache à un moment . Les verrous créés par le script git-cache vont essayer d’empêcher cela, mais il peut ne fonctionne pas parfaitement dans un réseau.

Sur Windows, SMBv2 dispose d’un cache d’annuaire qui causera des problèmes avec le script de cache git , il est donc nécessaire de le désactiver en réglant la clé du registre

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

à 0. Plus d’informations: https://stackoverflow.com/a/9935126

Cela peut être réglé rapidement en powershell (couru en tant qu’administrateur) :

```powershell
New-ItemProperty -Path « HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters » -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## Résolution de problème

### synchronisation gclient se plaint de rebase

Si `gclient sync` est interrompu, l’arbre git peut être laissé dans un mauvais état, ce qui conduit à un message cryptique lors de l’exécution `gclient sync` l’avenir:

```plaintext
2> conflict tout en rebasant cette branche.
2> résoudre le conflit et exécuter gclient nouveau.
2> l’homme git-rebase pour plus de détails.
```

S’il n’y a pas de conflits git ou de rebases `src/electron`, vous devrez peut-être avorter une `git am` dans `src`:

```sh
$ cd .. /
$ git am - abort
$ cd électron
$ synchronisation gclient -f
```

### On me demande un nom d’utilisateur / mot de passe pour chromium-internal.googlesource.com

Si vous voyez une invite pour les `Username for 'https://chrome-internal.googlesource.com':` lors de l’exécution `gclient sync` sur Windows, c’est probablement parce que la variable d’environnement `DEPOT_TOOLS_WIN_TOOLCHAIN` n’est pas définie à 0. Ouvrez `Control Panel` → `System and Security` → `System` → `Advanced system settings` et ajoutez une variable système avec `DEPOT_TOOLS_WIN_TOOLCHAIN` valeur `0`.  Cela indique `depot_tools` d’utiliser votre version installée localement de Visual Studio (par défaut, `depot_tools` tentera de télécharger une version interne à Google à qui seuls les Googlers ont accès).

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
