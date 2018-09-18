# Instructions de Build (Windows)

Suivez les indications ci-dessous pour compiler Electron sur Windows.

## Prérequis

* Windows 10 / Server 2012 R2 ou supérieur
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Outils de débogage pour Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) si vous envisagez créer une distribution complète, `symstore.exe` est utilisé pour la création d’un magasin de symboles de fichiers `.pdb`.

Si vous ne disposez pas d’une installation Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) propose des versions de Windows qui vous permets de compiler Electron.

La compilation d'Electron se fait entièrement avec des scripts en ligne de commande et ne peut se faire avec Visual Studio. Vous pouvez développer Electron avec n’importe quel éditeur, mais le support de la compilation avec Visual Studio viendra dans le futur.

**Remarque :** Même si Visual Studio n’est pas utilisé pour la compilation, il est toujours **nécessaire** car nous avons besoin du build toolchains qu'il fournit.

## Compilation

See [Build Instructions: GN](build-instructions-gn.md)

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