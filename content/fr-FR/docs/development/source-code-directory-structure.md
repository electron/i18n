# Structure du répertoire du Code Source

Le code source d'Electron est séparé en plusieurs parties, principalement suivant les conventions de séparation de Chromium.

Vous devrez peut-être vous familiariser avec l'[architecture multi-processus de Chromium](http://dev.chromium.org/developers/design-documents/multi-process-architecture) pour mieux comprendre le code source.

## Structure du Code Source

```sh
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
|   |   ├── net/ - Code lié au réseau.
|   |   ├── mac/ - Code Source Objective-C spécifique à MacOS.
|   |   └── resources/ - Icônes, fichiers dépendant de la plateforme, etc.
|   ├── renderer/ - Code qui s'exécute dans le moteur de rendu.
|   |   └── api/ - L'implementation des API de processus de rendu.
|   └── common/ - Code utilisé par les processus principal et le moteur de rendu,
|       comprenant certains fonctions utilitaires et le code pour intégrer la boucle de
|       message de Node dans la boucle de message de Chromium.
|       └── api/ - L'implementation d'API communes, et les fondations
|           des modules intégrés d'Electron.
├── chromium_src/ - Source code copied from Chromium. See below.
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
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we just took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Structure of Other Directories

* **script** - Scripts utilisés à des fins de développement comme le build, le packaging, les tests, etc.
* **tools** - Scripts d'aide utilisés par les fichiers gyp, contrairement au `script`, les scripts mis ici ne devraient jamais être invoqué par les utilisateurs directement.
* **vendor** - Code Source des dependances tierces, nous n'utilisons pas `third_party` comme nom parce qu'on le confondrait avec le même dossier dans le Code Source de Chromium.
* **node_modules** - Modules de Node tiers utilisés pour les builds.
* **out** - Dossier de sortie temporaire de `ninja`.
* **dist** - Dossier temporaire créé par `script/create-dist.py` lors de la création d'une distribution.
* **external_binaries** - Les fichiers binaires téléchargés de frameworks tiers qui ne prennent pas en charge les builds avec `gyp`.

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

```sh
[alias]
    su = submodule update --init --recursive
```