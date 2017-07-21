# Instructions de Build (Windows)

Suivez les indications ci-dessous pour compiler Electron sur Windows.

## Prérequis

* Windows 7 / Server 2008 R2 ou supérieur
* Visual Studio 2015 mise à jour 3 - [Télécharger VS 2015 Community Edition gratuitement](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](http://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools for Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

La compilation d'Electron se fait entièrement avec des scripts en ligne de commande et ne peut se faire avec Visual Studio. Vous pouvez développer Electron avec n’importe quel éditeur, mais le support de la compilation avec Visual Studio viendra dans le futur.

**Remarque :** Même si Visual Studio n’est pas utilisé pour la compilation, il est toujours **nécessaire** car nous avons besoin du build toolchains qu'il fournit.

## Obtenir le Code

```powershell
$ git clone https://github.com/electron/electron.git
```

## Amorçage

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Pour information, nous utilisons `ninja` pour compiler Electron, donc il n'y a aucun projet Visual Studio de généré.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Compilation

Compiler une cible Release et Debug :

```powershell
$ python script\build.py
```

Vous pouvez également compiler seulement une version Debug :

```powershell
$ python script\build.py -c D
```

After building is done, you can find `electron.exe` under `out\D` (debug target) or under `out\R` (release target).

## Compilation 32bit

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

The other building steps are exactly the same.

## Projet Visual Studio

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Nettoyage

Pour nettoyer les fichiers de build :

```powershell
$ npm run clean
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```bash
$ npm run clean-build
```

**Remarque :** Les deux commandes de nettoyage requière l’exécution de `bootstrap`.

## Tests

Voir [Build System Overview : Tests](build-system-overview.md#tests)

## Résolution de problème

### xxxx commande introuvable

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Assurez-vous d'avoir la dernière mise à jour de Visual Studio installé.

### Assertion failed: ((handle))->activecnt >= 0

If building under Cygwin, you may see `bootstrap.py` failed with following error:

    Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430
    
    Traceback (most recent call last):
      File "script/bootstrap.py", line 87, in <module>
        sys.exit(main())
      File "script/bootstrap.py", line 22, in main
        update_node_modules('.')
      File "script/bootstrap.py", line 56, in update_node_modules
        execute([NPM, 'install'])
      File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
        raise e
    subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
    

This is caused by a bug when using Cygwin Python and Win32 Node together. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Essayez de réinstaller Node.js 32bit.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Créer simplement ce répertoire [devrait corriger le problème](http://stackoverflow.com/a/25095327/102704) :

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Cette erreur peut se produire si vous utilisez Git Bash pour la compilation, vous devez utiliser PowerShell ou l'invite de commande de VS2015 à la place.