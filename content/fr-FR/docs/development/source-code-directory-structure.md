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
| | | ─ remote/ - Logique qui gère l'usage du module remote dans
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
|   |   └── resources/ - Icons, platform-dependent files, etc.
|   ├── renderer/ - Code that runs in renderer process.
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

* **.circleci** - Fichier de configuration pour CI avec CircleCI.
* **.github** - Les fichiers de configuration spécifiques à GitHub, y compris les modèles de problèmes et CODEOWNERS.
* **dist** - Dossier temporaire créé par `script/create-dist.py` lors de la création d'une distribution.
* **external_binaries** - Des binaires téléchargés de frameworks tiers qui ne supportent pas la construction avec `gn`.
* **node_modules** - Modules de Node tiers utilisés pour les builds.
* **npm** - Logique pour l'installation d'Electron via npm.
* **out** - Dossier de sortie temporaire de `ninja`.
* **script** - Scripts utilisés à des fins de développement comme le build, le packaging, les tests, etc.

```diff
script/ - L'ensemble de tous les scripts que Electron exécute pour une variété de fonctions.
── codesign/ - Codesign Fakes pour les applications Electron ; utilisé pour les tests.
── lib/ - Divers scripts python.
<unk> ─ release/ - Scripts exécutés pendant le processus de publication d'Electron.
    ── notes/ - Génère des notes de publication pour les nouvelles versions d'Electron.
    <unk> ─ ─ uploaders/ - Envoie divers fichiers liés à la version pendant la sortie.
```

* **typings** - Types TypeScript pour le code interne d'Electron.
* **vendor** - Code source de certaines dépendances tierces.
