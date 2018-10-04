# Hiérarchie du Code Source

Le code source d'Electron est séparé en plusieurs parties, principalement suivant les conventions de séparation de Chromium.

Vous devrez peut-être vous familiariser avec l'[architecture multi-processus de Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) pour mieux comprendre le code source.

## Structure du Code Source

```diff
Electron
├── atom/ - Code Source C++.
|   ├── app/ - Code d'entrée du système.
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   |          main process things. This talks to the renderer to manage web
|   |   |          pages.
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
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── brightray/ - Shim mince au-dessus de la libcc qui facilite son utilisation.
├── chromium_src/ - Code Source copié depuis Chromium. Voir plus bas.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - Documentations.
├── lib/ - Code Source JavaScript.
|   ├── browser/ - Code d'initialisation du processus principal JavaScript.
|   |   └── api/ - Implementation de l'API JavaScript.
|   ├── common/ - Code JavaScript utilisé par les processus principal et le moteur de rendu
|   |   └── api/ - Implementation de l'API JavaScript.
|   └── renderer/ - Code d'initialisation du moteur de rendu JavaScript.
|       └── api/ - Implementation de l'API Javascript.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - Tests automatiques.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

Les fichiers dans `/chromium_src` ont tendance à être des morceaux de Chromium qui ne font pas partie de la couche de contenu. Par exemple, pour implémenter l'API Pepper, nous avons besoin d'un câblage similaire à ce que fait Chrome. Nous aurions pu construire les sources pertinentes au sein de [libcc](../glossary.md#libchromiumcontent) mais le plus souvent nous n'avons pas besoin de toutes les fonctionnalités (certaines sont propriétaires, d'autres serve à l'analyse) alors nous avons juste pris des parties du code. Ces derniers auraient pu facilement être des correctifs dans libcc, mais au moment où ils ont été écrits, le but de libcc était de maintenir des correctifs très minimes et les changements de chromium_src ont tendance à être gros. Notez également que ces correctifs ne peuvent jamais être en amont contrairement aux autres correctifs libcc que nous maintenons actuellement.

## Structure d'autres Dossiers

* **script** - Scripts utilisés à des fins de développement comme le build, le packaging, les tests, etc.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Code Source des dependances tierces, nous n'utilisons pas `third_party` comme nom parce qu'on le confondrait avec le même dossier dans le Code Source de Chromium.
* **node_modules** - Modules de Node tiers utilisés pour les builds.
* **out** - Dossier de sortie temporaire de `ninja`.
* **dist** - Dossier temporaire créé par `script/create-dist.py` lors de la création d'une distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

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