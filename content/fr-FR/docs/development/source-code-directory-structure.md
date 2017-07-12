# Structure du répertoire du Code Source

Le code source d'Electron est séparé en plusieurs parties, principalement suivant les conventions de séparation de Chromium.

Vous devrez peut-être vous familiariser avec l'[architecture multi-processus de Chromium](http://dev.chromium.org/developers/design-documents/multi-process-architecture) pour mieux comprendre le code source.

## Structure du Code Source

    Electron
    ├── atom/ - Code Source C++.
    |   ├── app/ - Code d'entrée du système.
    |   ├── browser/ - L'interface incluant la fenêtre principale, l'UI, et toutes les
    |   |   principales opérations. Cela permet au moteur de rendu de gérer les pages Web.
    |   |   ├── ui/ - Implementation de l'UI pour différentes plateformes.
    |   |   |   ├── cocoa/ - Code Source spécifique à Cocoa.
    |   |   |   ├── win/ - Code source spécifique pour le GUI Windows.
    |   |   |   └── x/ - Code Source spécifique à X11.
    |   |   ├── api/ - L'implementation des principales API de processus.
    |   |   ├── net/ - Network related code.
    |   |   ├── mac/ - Code Source Objective-C spécifique à MacOS.
    |   |   └── resources/ - Icônes, fichiers dépendant de la plateforme, etc.
    |   ├── renderer/ - Code qui s'exécute dans le processus de rendu.
    |   |   └── api/ - L'implementation des API de processus de rendu.
    |   └── common/ - Code utilisé par le processus principal et le processus de rendu,
    |       comprenant certains fonctions utilitaires et le code pour intégrer la boucle de
    |       message de Node dans la boucle de message de Chromium.
    |       └── api/ - L'implementation d'API communes, et les fondations
    |           des modules intégrés d'Electron.
    ├── chromium_src/ - Code Source copié depuis Chromium.
    ├── default_app/ - La page par default a montrer quand Electron a démarré sans
    |   fournir une application.
    ├── docs/ - Documentations.
    ├── lib/ - Code Source JavaScript.
    |   ├── browser/ - Javascript main process initialization code.
    |   |   └── api/ - Javascript API implementation.
    |   ├── common/ - JavaScript used by both the main and renderer processes
    |   |   └── api/ - Javascript API implementation.
    |   └── renderer/ - Javascript renderer process initialization code.
    |       └── api/ - Javascript API implementation.
    ├── spec/ - Automatic tests.
    ├── electron.gyp - Building rules of Electron.
    └── common.gypi - Compiler specific settings and building rules for other
        components like `node` and `breakpad`.
    

## Structure of Other Directories

* **script** - Scripts used for development purpose like building, packaging, testing, etc.
* **tools** - Helper scripts used by gyp files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - Third party node modules used for building.
* **out** - Temporary output directory of `ninja`.
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gyp`.

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/brightray (new commits)
    modified:   vendor/node (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

    [alias]
        su = submodule update --init --recursive