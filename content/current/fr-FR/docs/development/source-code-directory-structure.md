# Hiérarchie du Code Source

Le code source d'Electron est séparé en plusieurs parties, principalement suivant les conventions de séparation de Chromium.

Vous devrez peut-être vous familiariser avec l'[architecture multi-processus de Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) pour mieux comprendre le code source.

## Structure du Code Source

```diff
Electron
── build/ - Construire les fichiers de configuration nécessaires pour construire avec GN.
── buildflags/ - Détermine l'ensemble des fonctionnalités qui peuvent être construites de manière conditionnelle.
── chromium_src/ - Code source copié à partir de Chromium qui ne fait pas partie de la couche de contenu.
── default_app/ - Une application par défaut exécutée lorsque Electron est démarré sans
| fournissant une application consommateur.
── docs/ - Documentation d'Electron.
| ── api/ - Documentation pour les modules et les API externes d'Electron.
| ── development/ - Documentation pour aider au développement pour et avec Electron.
| ── violondes/ - Un ensemble de snippets de code que l'on peut exécuter dans Electron Fiddle.
| ── images/ - Images utilisées dans la documentation.
| <unk> ─ tutorial/ - Documents de tutoriel pour divers aspects d'Electron.
├── lib/ - JavaScript/TypeScript source code.
| ── browser/ - Code d'initialisation du processus principal.
| | | ─ api/ - Implémentation d'API pour les modules de processus principaux.
| | <unk> ─ remote/ - Code relatif au module distant tel qu'il est
| | utilisé dans le processus principal.
| ── common/ - Relating to logic needed by both main and renderer process.
| | <unk> ─ api/ - Implémentation de l'API pour les modules qui peuvent être utilisés dans
| | | à la fois les processus principaux et les processus de rendu
| ── isoated_render/ - Permet la création de processus de rendu isolés lorsque
| | | contextIsolation est activée.
| ── render/ - Code d'initialisation du processus de rendu.
| | | ─ api/ - Implémentation d'API pour les modules de processus de rendu.
| | | ── extension/ - Code relatif à l'utilisation des extensions Chrome
| | | dans le processus de rendu d'Electron.
| | | ─ remote/ - Logique qui met à la disposition du module distant dans
| | | | le processus principal.
| | <unk> ─ web-view/ - Logique qui gère l'utilisation des webviews dans le processus
| | renderer.
| ── sandboxed_render/ - Logique qui gère la création du moteur de rendu en bac à sable
| | | processus.
| | <unk> ─ api/ - Implémentation de l'API pour les processus de rendu bac à sable.
| <unk> ─ worker/ - Logique qui gère les bonnes fonctionnalités de Node.js
| environnements dans les Web Workers.
── patches/ - Des correctifs appliqués au dessus des dépendances principales d'Electron
| | | afin de gérer les différences entre nos cas d'utilisation et
| | fonctionnalité par défaut.
| ── boringssl/ - Patchs appliqués au fork Google d'OpenSSL, BoringSSL.
| ── chromium/ - Patchs appliqués à Chromium.
| ── node/ - Patches appliqués au-dessus de Node.js.
| <unk> ─ v8/ - Patches appliqués au dessus du moteur V8 de Google.
── shell/ - Code source C++.
|   ├── app/ - Code d'entrée du système.
|   ├── browser/ - Le frontend incluent la fenêtre principale, l'UI et toutes les 
|   |   |          choses du processus principal. Ceci parle au moteur de rendu pour gérer le web
| | pages.
|   |   ├── ui/ - Implementation de l'UI pour différentes plateformes.
|   |   |   ├── cocoa/ - Code Source spécifique à Cocoa.
|   |   |   ├── win/ - Code source spécifique pour le GUI Windows.
|   |   |   └── x/ - Code Source spécifique à X11.
|   |   ├── api/ - L'implementation des principales API de processus.
|   |   ├── net/ - Code lié au réseau.
|   |   ├── mac/ - Code Source Objective-C spécifique à MacOS.
|   |   └── resources/ - Icônes, fichiers dépendant de la plateforme, etc.
|   ├── renderer/ - Code qui s'exécute dans le moteur de rendu.
|   |   └── api/ - L'implementation des API de processus de rendu.
| <unk> ─ common/ - Code qui est utilisé à la fois par les processus principaux et les processus de rendu,
| | y compris quelques fonctions utilitaires et du code pour intégrer les nœuds
| | boucle message dans la boucle de message de Chromium.
| <unk> ─ api/ - Implémentation d'API communes, et fondations de
| Modules intégrés d'Electron.
── spec/ - Les composants de la suite de tests d'Electron exécutés dans le processus de rendu.
── spec-main/ - Les composants de la suite de tests d'Electron s'exécutent dans le processus principal.
<unk> ─ BUILD.gn - Règles de construction d'Electron.
```

## Structure d'autres Dossiers

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.
* **node_modules** - Third party node modules used for building.
* **npm** - Logic for installation of Electron via npm.
* **out** - Temporary output directory of `ninja`.
* **script** - Scripts used for development purpose like building, packaging, testing, etc.
```diff
script/ - L'ensemble de tous les scripts que Electron exécute pour une variété de fonctions.
── codesign/ - Codesign Fakes pour les applications Electron ; utilisé pour les tests.
── lib/ - Divers scripts python.
<unk> ─ release/ - Scripts exécutés pendant le processus de publication d'Electron.
    ── notes/ - Génère des notes de publication pour les nouvelles versions d'Electron.
    <unk> ─ ─ uploaders/ - Envoie divers fichiers liés à la version pendant la sortie.
```
* **tools** - Helper scripts used by GN files.
  * Les scripts mis ici ne devraient jamais être invoqués par les utilisateurs directement, contrairement à ceux de `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

## Garder les sous-modules Git à jour

Le repository d'Electron a quelques dépendances tierces, se trouvant dans le dossier [/vendor](https://github.com/electron/electron/tree/master/vendor). Parfois, vous pourriez voir un message comme celui ci lors de l'exécution de `git status`:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

Pour mettre à jour ces dependances tierces, exécutez cette commande:

```sh
git submodule update --init --recursive
```

Si vous utilisez souvent cette commande, vous pouvez créer un alias dans votre fichier `~/.gitconfig`:

```sh
[alias]
    su = submodule update --init --recursive
```
