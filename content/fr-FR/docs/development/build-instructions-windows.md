# Instructions de Build (Windows)

Suivez les indications ci-dessous pour compiler Electron sur Windows.

## Prérequis

* Windows 7 / Server 2008 R2 ou supérieur
* Visual Studio 2017 - [Téléchargez VS 2017 Community Edition gratuitement](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Outils de débogage pour Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) si vous envisagez créer une distribution complète, `symstore.exe` est utilisé pour la création d’un magasin de symboles de fichiers `.pdb`.

Si vous ne disposez pas d’une installation Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) propose des versions de Windows qui vous permets de compiler Electron.

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

Compiler une version Release et une version Debug :

```powershell
$ python script\build.py
```

Vous pouvez également compiler seulement une version Debug :

```powershell
$ python script\build.py -c D
```

Après la compilation terminée, vous pouvez trouver `electron.exe` dans le dossier `out\D` (version Debug) ou dans le dossier `out\R` (version Release).

## Compilation 32bit

Pour compiler une version 32bit, vous devez passer `--target_arch=ia32` lors de l'exécution du script bootstrap :

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Les autres étapes pour la compilation sont exactement les mêmes.

## Projet Visual Studio

Pour générer un projet Visual Studio, vous pouvez passer le paramètre `--msvs` :

```powershell
$ python script\bootstrap.py --msvs
```

## Nettoyage

Pour nettoyer les fichiers de build :

```powershell
$ npm run clean
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```sh
$ npm run clean-build
```

**Remarque :** Les deux commandes de nettoyage requière l’exécution de `bootstrap`.

## Tests

Voir [Build System Overview : Tests](build-system-overview.md#tests)

## Résolution de problème

### xxxx commande introuvable

Si vous avez rencontré une erreur comme `commande xxxx introuvable`, vous pouvez essayez la console de `ligne de commande VS2015` pour exécuter les scripts de compilation.

### Fatal internal compiler error: C1001

Assurez-vous d'avoir la dernière mise à jour de Visual Studio installé.

### Assertion failed: ((handle))->activecnt >= 0

Si vous compiler via Cygwin, vous pouvez voir `bootstrap.py` échouer avec l'erreur suivante :

```sh
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
```

Ceci est causé par un bug lors de l’utilisation de Cygwin Python et Node Win32 ensemble. La solution est d’utiliser Python Win32 pour exécuter le script bootstrap (en supposant que vous avez installé Python dans `C:\Python27`) :

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Essayez de réinstaller Node.js 32bit.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Cette erreur peut se produire si vous utilisez Git Bash pour la compilation, vous devez utiliser PowerShell ou l'invite de commande de VS2015 à la place.