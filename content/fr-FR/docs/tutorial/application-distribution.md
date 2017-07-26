# Distribution de l'Application

Pour distribuer votre application avec Electron, vous devez télécharger les [binaires précompilés](https://github.com/electron/electron/releases) d'Electron. Ensuite, le dossier qui contient votre application devrait être nommé `app` et placé dans le répertoire de ressources d'Electron, comme illustré dans les exemples suivants. Notez que l’emplacement des binaires précompilés d'Electron est indiquée par `electron/` dans les exemples ci-dessous.

Sur macOS :

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Sur Windows et Linux :

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Puis exécutez `Electron.app` (ou `electron` sous Linux, `electron.exe` sous Windows), et Electron va exécuter votre application. Le répertoire `electron` sera alors votre distribution à fournir aux utilisateurs finaux.

## Empaqueter votre application dans un fichier

Au lieu de distribuer votre application en copiant tous les fichiers source, vous pouvez aussi empaqueter votre application dans une archive [asar](https://github.com/electron/asar) pour éviter l'exposition de votre code source aux utilisateurs.

Pour utiliser une archive `asar` au lieu du dossier `app`, vous devez renommer l'archive en `app.asar` et la placer dans le dossier ressources d'Electron comme ci-dessous. Ainsi, Electron va essayer de lire l'archive et de se lancer à partir de celle-ci.

Sur macOS :

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Sur Windows et Linux :

```text
electron/resources/
└── app.asar
```

Plus de détails se trouvent dans [Empaqueter une application](application-packaging.md).

## Rebranding with Downloaded Binaries

After bundling your app into Electron, you will want to rebrand Electron before distributing it to users.

### Windows

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

The structure of a renamed app would be like:

    MyApp.app/Contents
    ├── Info.plist
    ├── MacOS/
    │   └── MyApp
    └── Frameworks/
        ├── MyApp Helper EH.app
        |   ├── Info.plist
        |   └── MacOS/
        |       └── MyApp Helper EH
        ├── MyApp Helper NP.app
        |   ├── Info.plist
        |   └── MacOS/
        |       └── MyApp Helper NP
        └── MyApp Helper.app
            ├── Info.plist
            └── MacOS/
                └── MyApp Helper
     
    Context | Request Context
    

### Linux

Vous pouvez renommer l'exécutable `electron` par ce que vous voulez.

## Outils d’empaquetage

Au lieu d'empaqueter votre application manuellement, vous pouvez également choisir d'utiliser des outils d'empaquetage pour faire le boulot automatiquement :

* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding by Rebuilding Electron from Source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to modify the `atom.gyp` file and have a clean rebuild.

### grunt-build-atom-shell

Manually checking out Electron's code and rebuilding could be complicated, so a Grunt task has been created that will handle this automatically: [grunt-build-atom-shell](https://github.com/paulcbetts/grunt-build-atom-shell).

This task will automatically handle editing the `.gyp` file, building from source, then rebuilding your app's native Node modules to match the new executable name.

### Creating a Custom Electron Fork

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-builder` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Création d’une version Custom avec surf-build

1. Installer [Surf](https://github.com/surf-build/surf), par l’intermédiaire de npm : `npm install -g surf-build@latest`

2. Créez un nouveau bucket S3 et créez la structure de répertoire vide suivante :
    
        - atom-shell/
          - symbols/
          - dist/
        

3. Définir les Variables d’environnement suivantes :

* `ELECTRON_GITHUB_TOKEN` - un jeton qui peut créer des releases sur GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - l’endroit où vous allez envoyer les en-têtes node.js comme symboles
* `ELECTRON_RELEASE` - Définit à `true` et l’upload s’exécutera, sinon `surf-build` va juste faire des contrôles de type CI, adaptés à exécuter pour chaque pull request.
* `CI` - définir à `true` sinon il ne fonctionnera pas
* `GITHUB_TOKEN` - mettre la même chose que `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - définir `C:\Temp` sur Windows pour empêcher les problèmes de chemin d’accès trop long
* `TARGET_ARCH` - définir en `ia32` ou `x64` 

1. Dans `script/upload.py`, vous *devez* définir `ELECTRON_REPO` à votre fork (`MYORG/electron`), surtout si vous êtes un contributeur d'Electron approprié.

2. `surf-build -r https://github.com/MYORG/electron -s VOTRE_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Attendre très, très longtemps que la compilation finisse.