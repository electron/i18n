# Distribution de l'Application

## Vue d'ensemble

Pour distribuer votre application avec Electron, vous devez l’empaqueter et la rebaptiser. Pour ce faire, vous pouvez utiliser des outils spécialisés ou une approche manuelle.

## Avec des Outils

Vous pouvez utiliser les outils suivants pour distribuer votre application :

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Ces outils se chargeront des différentes opérations nécessaires à l'obtention d'une application Electron distribuable telles que l'empaquetage, le renommage de l'exécutable et l'initialisation des icones.

Vous pouvez consulter un exemple d'empaquetage d'une application à l'aide de `electron-forge<` dans notre [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Répartition manuelle

### Avec des binaires précompilés

Pour distribuer votre application manuellement, vous devez télécharger les binaires préconstruits ['Électronique binaires](https://github.com/electron/electron/releases). Ensuite, le dossier qui contient votre application devrait être nommé `app` et placé dans le répertoire de ressources d'Electron, comme illustré dans les exemples suivants.

> *NOTE :* 'emplacement des binaires préconstruits d’Electron est indiqué avec `electron/` dans les exemples ci-dessous.

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

Ensuite, exécutez `Electron.app` sur macOS, `electron` sur Linux, ou `electron.exe` sur Windows, et Electron va commencer comme votre application. Le `electron` répertoire sera alors votre distribution à livrer aux utilisateurs.

### Avec une archive de code source d’application

Au lieu d’expédier votre application en copiant tous ses fichiers source, vous pouvez emballer votre application dans une archive [asar][] pour améliorer les performances de lecture de fichiers sur des plateformes comme Windows, si vous n’utilisez pas déjà un bundler comme comme Parcel ou Webpack.

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

Vous pouvez trouver plus de détails sur la façon d’utiliser `asar` dans le [`electron/asar` référentiel][asar].

### Rebranding avec binaires téléchargés

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

### Rebranding en reconstruisant Electron à partir de la source

Il est aussi possible de renommer Electron par le nom du produit et le compiler depuis le code source. Pour faire cela, vous devez définir les arguments de compilation correspondant au nom du produit (`electron_product_name = "LeNomDeVotreProduit"`) dans le fichier `args.gn` et recompiler.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
