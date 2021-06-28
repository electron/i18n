# Build Instructions

Suivez les instructions ci-dessous pour compiler **Electron**, afin de créer une version compilée personnalisée d'Electron. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Platform prerequisites

Vérifiez les prérequis de build pour votre plateforme avant de continuer

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Construire des outils

[outils de build d’Electron](https://github.com/electron/build-tools) une grande partie de la configuration pour compiler Electron à partir de sources avec différentes configurations et construire des cibles. Si vous souhaitez configurer l’environnement manuellement, les instructions sont énumérées ci-dessous.

## GN prerequisites

Vous devrez installer [`depot_tools`][depot-tools], l'ensemble d'outils utilisé pour récupérer Chromium et ses dépendances.

De plus, sous Windows, vous devrez définir la variable d'environnement `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Pour ce faire, ouvrez `Panneau de configuration` → `Système et
Sécurité` → `Système` → `Paramètres système avancés` et ajouter une variable système `DEPOT_TOOLS_WIN_TOOLCHAIN` avec la valeur `0`.  Cela indique au `depot_tools` d’utiliser votre version locale de Visual Studio (par défaut, `depot_tools` essaiera de télécharger une version interne de Google uniquement accessible à ses utilisateurs).

### Mise en place du cache git

Si vous prévoyez de vérifier Electron plus d’une fois (par exemple, pour avoir plusieurs répertoires parallèles vérifiés à différentes branches), en utilisant le cache git va accélérer les appels ultérieurs vers `gclient`. Pour ce faire, définissez une variable `GIT_CACHE_PATH` 'environnement :

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# This will use about 16G.
```

## Obtenir le code

```sh
$ mkdir electron && cd electron
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

> Au lieu de `https://github.com/electron/electron`, vous pouvez utiliser votre propre fork ici (quelque chose comme `https://github.com/<username>/electron`).

### A note on pulling/pushing

If you intend to `git pull` or `git push` from the official `electron` repository in the future, you now need to update the respective folder's origin URLs.

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git checkout master
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` works by checking a file called `DEPS` inside the `src/electron` folder for dependencies (like Chromium or Node.js). Running `gclient sync -f` ensures that all dependencies required to build Electron match that file.

So, in order to pull, you'd run the following commands:

```sh
$ cd src/electron
$ git pull
$ gclient sync -f
```

## Compilation

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

Ou sous Windows (sans l'argument optionnel) :

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

This will generate a build directory `out/Testing` under `src/` with the testing build configuration. You can replace `Testing` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Testing` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Testing --list`.

**For generating Testing build config of Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**To build, run `ninja` with the `electron` target:** Nota Bene: This will also take a while and probably heat up your lap.

Pour la configuration de test :

```sh
$ ninja -C out/Testing electron
```

For the release configuration:

```sh
$ ninja -C out/Release electron
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

The built executable will be under `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Testing/electron.exe
# or, on Linux
$ ./out/Testing/electron
```

### Livraison

Sous Linux, supprimez d'abord les informations de débogage et de symbole :

```sh
electron/script/strip-binaries.py -d out/Release
```

To package the electron build as a distributable zip file:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium.

| Host        | Target        | Notice               |
| ----------- | ------------- | -------------------- |
| Windows x64 | Windows arm64 | Experimental         |
| Windows x64 | Windows x86   | Automatically tested |
| Linux x64   | Linux x86     | Automatically tested |

Si vous testez d'autres combinaisons et trouvez qu'elles fonctionnent, veuillez mettre à jour ce document :)

See the GN reference for allowable values of [`target_os`][target_os values] and [`target_cpu`][target_cpu values].

#### Windows on Arm (experimental)

To cross-compile for Windows on Arm, [follow Chromium's guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) to get the necessary dependencies, SDK and libraries, then build with `ELECTRON_BUILDING_WOA=1` in your environment before running `gclient sync`.

```bat
set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Ou (si vous utilisez PowerShell) :

```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Next, run `gn gen` as above with `target_cpu="arm64"`.

## Tests

Pour exécuter les tests, vous devez d’abord construire les modules de test par rapport à la même version de nœud.js qui a été construit dans le cadre du processus de construction. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Testing third_party/electron_node:headers
```

Vous pouvez maintenant [exécuter les tests](testing.md#unit-tests).

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

```sh
$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
```

## Partage du cache git entre plusieurs machines

It is possible to share the gclient git cache with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. The locks created by git-cache script will try to prevent this, but it may not work perfectly in a network.

On Windows, SMBv2 has a directory cache that will cause problems with the git cache script, so it is necessary to disable it by setting the registry key

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

à 0. Plus d'informations : https://stackoverflow.com/a/9935126

Cela peut être défini rapidement dans powershell (exécuté en tant qu'administrateur) :

```powershell
New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## Résolution de problème

### synchronisation gclient se plaint de rebase

If `gclient sync` is interrupted the git tree may be left in a bad state, leading to a cryptic message when running `gclient sync` in the future:

```plaintext
2> Conflict while rebasing this branch.
2> Fix the conflict and run gclient again.
2> See man git-rebase for details.
```

If there are no git conflicts or rebases in `src/electron`, you may need to abort a `git am` in `src`:

```sh
$ cd ../
$ git am --abort
$ cd electron
$ gclient sync -f
```

### On me demande de saisir mes nom d'utilisateur et mot de passe pour chromium-internal.googlesource.com

Si vous voyez une invite pour `nom d'utilisateur pour 'https://chrome-internal.googlesource. om':` lorsque vous exécutez `gclient sync` sous Windows, c'est probablement parce que la variable d'environnement `DEPOT_TOOLS_WIN_TOOLCHAIN` n'est pas définie à 0. Ouvrez `Control Panel` → `System and Security` → `System` → `Advanced system settings` et ajoutez une variable système `DEPOT_TOOLS_WIN_TOOLCHAIN` avec comme valeur `0`.  Cela indique au `depot_tools` d’utiliser votre version locale de Visual Studio (par défaut, `depot_tools` essaiera de télécharger une version interne de Google uniquement accessible à ses utilisateurs).

[application-distribution]: ../tutorial/application-distribution.md

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
