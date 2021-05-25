# Distribution de l'Application

## Vue d'ensemble

Pour distribuer votre application avec Electron, vous devez l’empaqueter et la rebaptiser. Pour ce faire, vous pouvez utiliser des outils spécialisés ou une approche manuelle.

## Avec des Outils

Vous pouvez utiliser les outils suivants pour distribuer votre application :

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Ces outils se chargeront des différentes opérations nécessaires à l'obtention d'une application Electron distribuable telles que l'empaquetage, le renommage de l'exécutable et l'initialisation des icones.

Vous pouvez consulter un exemple de la façon d’empaquetage d'une application avec `electron-forge` dans le guide [de démarrage rapide](quick-start.md#package-and-distribute-your-application).

## Répartition manuelle

### Avec des binaires précompilés

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Ensuite, le dossier qui contient votre application devrait être nommé `app` et placé dans le répertoire de ressources d'Electron, comme illustré dans les exemples suivants.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Sur macOS :*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Sur Windows et Linux :*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Exécutez ensuite `Electron.app` sous macOS, `electron` sous Linux ou `electron.exe` sous Windows, et Electron démarrera en tant qu'application. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar][] archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Pour utiliser une archive `asar` au lieu du dossier `app`, vous devez renommer l'archive en `app.asar` et la placer dans le dossier ressources d'Electron comme ci-dessous. Ainsi, Electron va essayer de lire l'archive et de se lancer à partir de celle-ci.

*Sur macOS :*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Sur Windows et Linux :*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository][asar].

### Rebranding with downloaded binaries

Après avoir empaqueté votre application dans Electron, vous voudrez renommer votre application avant de la distribuer aux utilisateurs.

#### macOS

Vous pouvez renommer `Electron.app` en n'importe quel nom qui vous plaît, et vous devrez aussi renommer les champs `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` dans les fichiers suivants :

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Vous pouvez aussi renommer l'application d'aide pour éviter d'afficher `Electron Helper` dans le moniteur d'activité, mais assurez vous d'avoir renommé le nom du fichier exécutable de l'application d'aide.

La structure d'une application renommée serait comme :

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

Vous pouvez renommer `electron.exe` en n'importe quel nom qui vous plaît, et modifier son icône et d'autres informations avec des outils tels que [rcedit](https://github.com/electron/rcedit).

#### Linux

Vous pouvez renommer l'exécutable `electron` par ce que vous voulez.

### Rebranding by rebuilding Electron from source

Il est aussi possible de renommer Electron par le nom du produit et le compiler depuis le code source. Pour faire cela, vous devez définir les arguments de compilation correspondant au nom du produit (`electron_product_name = "LeNomDeVotreProduit"`) dans le fichier `args.gn` et recompiler.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
