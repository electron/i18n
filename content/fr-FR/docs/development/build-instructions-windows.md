# Instructions de Build (Windows)

Suivez les indications ci-dessous pour compiler Electron sur Windows.

## Prérequis

* Windows 10 / Server 2012 R2 ou supérieur
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7.10 or higher](http://www.python.org/download/releases/2.7/) 
  * Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in order to run the build process.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files. 
  * Different versions of the SDK can be installed side by side. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
  * The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

Si vous ne disposez pas d’une installation Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) propose des versions de Windows qui vous permets de compiler Electron.

La compilation d'Electron se fait entièrement avec des scripts en ligne de commande et ne peut se faire avec Visual Studio. Vous pouvez développer Electron avec n’importe quel éditeur, mais le support de la compilation avec Visual Studio viendra dans le futur.

**Remarque :** Même si Visual Studio n’est pas utilisé pour la compilation, il est toujours **nécessaire** car nous avons besoin du build toolchains qu'il fournit.

## Compilation

Voir les [Instructions de compilation : GN](build-instructions-gn.md)

## Compilation 32bit

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Les autres étapes pour la compilation sont exactement les mêmes.

## Projet Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Résolution de problème

### xxxx commande introuvable

Si vous avez rencontré une erreur comme `commande xxxx introuvable`, vous pouvez essayez la console de `ligne de commande VS2015` pour exécuter les scripts de compilation.

### Fatal internal compiler error: C1001

Assurez-vous d'avoir la dernière mise à jour de Visual Studio installé.

### LNK1181: cannot open input file 'kernel32.lib'

Essayez de réinstaller Node.js 32bit.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

La création du répertoire suivant [devrait corriger le problème](https://stackoverflow.com/a/25095327/102704) :

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Cette erreur peut se produire si vous utilisez Git Bash pour la compilation, vous devez utiliser PowerShell ou l'invite de commande de VS2015 à la place.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.