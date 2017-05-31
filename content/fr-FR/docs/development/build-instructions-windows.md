# Construire des Instructions (Windows)

Suivez les indications ci-dessous pour la construction d’électrons sous Windows.

## Conditions préalables

* Windows 7 / Server 2008 R2 ou supérieur
* Visual Studio 2015 mise à jour 3 - [download VS 2015 Community Edition pour free](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](http://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging outils pour Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) si vous envisagez de créer une distribution complète puisque `symstore.exe` est utilisé pour la création d’un magasin de symboles à partir des fichiers `.pdb`.

Si vous ne disposez pas d’une installation de Windows,[dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) a timebombed les versions de Windows qui vous permet de construire des électrons.

Construction des électrons se fait entièrement avec des scripts de ligne de commande et ne peut se faire avec Visual Studio. Vous pouvez développer des électrons avec n’importe quel éditeur, mais aide au renforcement avec Visual Studio viendra dans le futur.

**Note:** même si Visual Studio n’est pas utilisé pour la construction, il est encore **required**, parce que nous devons le construire toolchains qu'il fournit.

## Obtenir le Code

```powershell
$ git clone https://github.com/electron/electron.git
```

## Amorçage

Le script bootstrap téléchargera toutes les dépendances nécessaires et créer les fichiers de projet. Avis que nous utilisons `ninja` pour construire des électrons donc il n’y a aucun projet Visual Studio généré.

```powershell
$ cd électron $ python script\bootstrap.py - v
```

## Bâtiment

Construire les deux Release et Debug cibles :

```powershell
$ python script\build.py
```

Vous pouvez également que construire la cible de débogage :

```powershell
$ python script\build.py - c D
```

Après le bâtiment est terminé, vous pouvez trouver `electron.exe` sous `out\D` (cible de débogage) ou sous `out\R` (communiqué de cible).

## 32 bit Build

Pour générer la cible de 32 bits, vous devez passer `--target_arch = ia32` lorsque vous exécutez le script bootstrap :

```powershell
$ python script\bootstrap.py - v--target_arch = ia32
```

Les autres étapes de la construction sont exactement les mêmes.

## Projet de Visual Studio

Pour générer un projet Visual Studio, vous pouvez passer la `--paramètre msvs` :

```powershell
$ python script\bootstrap.py--SVSM
```

## Nettoyage

Pour nettoyer les fichiers de build :

```powershell
NGP $ courir propre
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```bash
NGP $ exécuter nettoyer-génération
```

**Note:** que les deux commandes propres demander l’exécution de `bootstrap` encore une fois devant le bâtiment.

## Tests

Voir la présentation du système [Build : Tests](build-system-overview.md#tests)

## Dépannage

### Xxxx de commande introuvable

Si vous avez rencontré une erreur comme xxxx `Command pas found`, vous essayez d’utiliser la console de commande Prompt</code> `VS2015 pour exécuter les scripts de compilation.</p>

<h3>Erreur du compilateur interne fatale : C1001</h3>

<p>Assurez-vous de qu'avoir la dernière mise à jour de Visual Studio installé.</p>

<h3>Échoué de l’assertion : ((handle))-> activecnt > = 0</h3>

<p>Si la construction sous Cygwin, vous pouvez voir <code>bootstrap.py` a échoué avec l’erreur suivante :

    Échoué de l’assertion : ((handle))->activecnt > = 0, fichier src\win\pipe.c, ligne 1430 Traceback (plus récent appeler dernière) : fichier « script/bootstrap.py », ligne 87, dans <module> sys.exit(main()) le fichier « script/bootstrap.py », ligne 22, dans update_node_modules('.') principale
      Fichier « script/bootstrap.py », line 56, dans update_node_modules exécuter ([NGP, 'install']) File « / home/zcbenz/codes/raven/script/lib/util.py », ligne 118, dans exécuter relance e sous-processus. CalledProcessError : Commande « [« npm.cmd », « install »] » a renvoyé état de sortie différent de zéro 3
    

Ceci est causé par un bug lors de l’utilisation de Cygwin Python et Win32 nœud ensemble. La solution est d’utiliser Python Win32 pour exécuter le script bootstrap (en supposant que vous avez installé Python sous `C:\Python27`) :

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181 : impossible d’ouvrir le fichier d’entrée « kernel32.lib »

Essayez de réinstaller 32bits Node.js.

### Erreur : ENOENT, stat « C:\Users\USERNAME\AppData\Roaming\npm »

Il suffit de faire cette [should répertoire Difficulté le problem](http://stackoverflow.com/a/25095327/102704) :

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### nœud-gyp n’est pas reconnu comme une commande interne ou externe

Cette erreur peut se produire si vous utilisez Git Bash pour la construction, vous devez utiliser PowerShell ou invite de commande de VS2015 à la place.