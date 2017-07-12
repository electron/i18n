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
    |   |   └── resources/ - Icons, platform-dependent files, etc.
    |   ├── renderer/ - Code that runs in renderer process.
    |   |   └── api/ - The implementation of renderer process APIs.
    |   └── common/ - Code that used by both the main and renderer processes,
    |       including some utility functions and code to integrate node's message
    |       loop into Chromium's message loop.
    |       └── api/ - The implementation of common APIs, and foundations of
    |           Electron's built-in modules.
    ├── chromium_src/ - Source code that copied from Chromium.
    ├── default_app/ - The default page to show when Electron is started without
    |   providing an app.
    ├── docs/ - Documentations.
    ├── lib/ - JavaScript source code.
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