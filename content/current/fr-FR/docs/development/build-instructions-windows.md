# Instructions de compilation (Windows)

Suivez les indications ci-dessous pour compiler Electron sur Windows.

## Prérequis

* Windows 10 / Server 2012 R2 ou supérieur
* Visual Studio 2017 15.7.2 ou plus - [télécharger VS 2019 Community Edition gratuitement](https://www.visualstudio.com/vs/)
  * Voir [la documentation de construction de Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) pour plus de détails sur les composants de Visual Studio.
  * Si votre Visual Studio est installé dans un autre répertoire que celui par défaut, vous aurez besoin de définir quelques variables d'environnement pour pointer les chaînes de compilation vers votre chemin d'installation.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, remplaçant `2019` et `Communauté` par vos versions installées et remplaçant `DRIVE:` par le lecteur sur lequel Visual Studio est allumé. Souvent, ce sera `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. Souvent, ce sera `C:`.
* [Python 2.7.10 ou supérieur](http://www.python.org/download/releases/2.7/)
  * Contrairement aux instructions de configuration `depot_tools` liées ci-dessous, vous aurez besoin de pour utiliser Python installé localement avec au moins la version 2. . 10 (avec support pour TLS 1.2). Pour ce faire, assurez-vous que dans **PATH**, votre Python installé localement arrive avant le dossier `depot_tools`. Actuellement, `depot_tools` est toujours livré avec Python 2.7.6, ce qui fera échouer la commande `gclient` (voir https://crbug.com/868864).
  * [Les extensions Python pour Windows (pywin32) ](https://pypi.org/project/pywin32/#files) sont également nécessaires pour exécuter le processus de compilation.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Différentes versions du SDK peuvent être installées côte à côte. Pour installer le SDK, ouvrez Visual Studio Installer, sélectionnez `Change` → `Composants individuels`, faites défiler vers le bas et sélectionnez le SDK Windows approprié à installer. Une autre option serait de regarder la [Windows SDK et l'archive émulateur](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) et de télécharger la version autonome du SDK respectivement.
  * Les outils de débogage SDK doivent également être installés. Si le SDK Windows 10 a été installé via l'installateur Visual Studio, alors ils peuvent être installés en allant à: `Panneau de configuration` → `Programmes` → `Programmes et fonctionnalités` → Sélectionnez le "Kit de développement du logiciel Windows" → `Changement` → `Changement` → Vérifiez "Outils de débogage pour Windows" → `Changement`. Ou, vous pouvez télécharger l'installateur SDK autonome et l'utiliser pour installer les outils de débogage.

Si vous ne disposez pas d’une installation Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) propose des versions de Windows qui vous permets de compiler Electron.

La compilation d'Electron se fait entièrement avec des scripts en ligne de commande et ne peut se faire avec Visual Studio. Vous pouvez développer Electron avec n’importe quel éditeur, mais le support de la compilation avec Visual Studio viendra dans le futur.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## Compilation

Voir les [Instructions de compilation : GN](build-instructions-gn.md)

## Compilation 32bit

Pour construire pour la cible 32 bits, vous devez passer `target_cpu = "x86"` en tant qu'arg. GN. Vous pouvez construire la cible 32 bits à côté de la cible 64 bits en utilisant un répertoire de sortie différent pour GN, par exemple `out/Release-x86`, avec des arguments différents.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Les autres étapes pour la compilation sont exactement les mêmes.

## Projet Visual Studio

Pour générer un projet Visual Studio, vous pouvez passer le paramètre `--ide=vs2017` à `gn gen`:

```powershell
$ gn gen out/Testing --ide=vs2017
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

### ne peut pas créer le répertoire à '...': nom de fichier trop long

node.js a quelques [noms de chemin extrêmement longs](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), et par défaut git sur windows ne gère pas correctement les chemins longs (même si Windows les supporte). Cela devrait être réparé :

```sh
$ git config --system core.longpaths true
```

### erreur: utilisation de l'identifiant non déclaré 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### Erreur d'importation : Aucun module nommé win32file

Assurez-vous d'avoir installé `pywin32` avec `pip install pywin32`.

### Construire des scripts pendent jusqu'à ce que le bouton soit appuyé

Ce bug est une « fonctionnalité » de l'invite de commande de Windows. Cela se produit lorsque vous cliquez dans la fenêtre d'invite avec l'option `Édition rapide` et est destiné à permettre la sélection et la copie du texte de sortie facilement. Puisque chaque clic accidentel met en pause le processus de construction, vous pouvez désactiver cette fonctionnalité dans les propriétés de l'invite de commande.
