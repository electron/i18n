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

## Renommer avec les binaires téléchargés

Après avoir empaqueté votre application dans Electron, vous voudrez renommer votre application avant de la distribuer aux utilisateurs.

### Windows

Vous pouvez renommer `electron.exe` en n'importe quel nom qui vous plaît, et modifier son icône et d'autres informations avec des outils tels que [rcedit](https://github.com/atom/rcedit).

### macOS

Vous pouvez renommer `Electron.app` en n'importe quel nom qui vous plaît, et vous devrez aussi renommer les champs `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` dans les fichiers suivants :

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Vous pouvez aussi renommer l'application d'aide pour éviter d'afficher `Electron Helper` dans le moniteur d'activité, mais assurez vous d'avoir renommé le nom du fichier exécutable de l'application d'aide.

La structure d'une application renommée serait comme :

```text
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
```

### Linux

Vous pouvez renommer l'exécutable `electron` par ce que vous voulez.

## Outils d’empaquetage

Au lieu d'empaqueter votre application manuellement, vous pouvez également choisir d'utiliser des outils d'empaquetage pour faire le boulot automatiquement :

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Renommer en recompilant Electron à partir du code source

Il est également possible de renommer Electron en changeant le nom de produit et en le compilant depuis le code source. Pour ce faire, vous devrez modifier le fichier `atom.gyp` et avoir une recompilation propre.

### Créer un fork personnalisé d'Electron

Créer un fork personnalisé d'Electron n'est certainement quelque chose que vous devez faire pour compiler votre application, même pour les applications au "Niveau de Production". Utiliser un outil tel que `electron-packager` ou `electron-builder` va vous permettre de "Rebaptiser" Electron sans avoir à faire ces étapes.

Vous aurez besoin de forker Electron quand vous avez du code C++ à intégrer directement dans Electron, qui ne peux pas être upstreamed ou qui a été rejeté de la version officiel. En tant que mainteneurs d'Electron, nous sommes beaucoup à vouloir voir votre travail fonctionner, alors essayez du mieux que vous pouvez pour voir vos modifications dans la version officiel d'Electron. Cela sera plus simple pour vous et nous apprécierons votre aide.

#### Création d’une version Custom avec surf-build

1. Installer [Surf](https://github.com/surf-build/surf), par l’intermédiaire de npm : `npm install -g surf-build@latest`

2. Créez un nouveau bucket S3 et créez la structure de répertoire vide suivante :
    
    ```sh
    - atom-shell/
      - symbols/
      - dist/
    ```

3. Définir les Variables d’environnement suivantes :

* `ELECTRON_GITHUB_TOKEN` - un jeton qui peut créer des releases sur GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - l’endroit où vous allez envoyer les en-têtes node.js comme symboles
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - définir à `true` sinon il ne fonctionnera pas
* `GITHUB_TOKEN` - mettre la même chose que `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - définir `C:\Temp` sur Windows pour empêcher les problèmes de chemin d’accès trop long
* `TARGET_ARCH` - définir en `ia32` ou `x64`

1. Dans `script/upload.py`, vous *devez* définir `ELECTRON_REPO` à votre fork (`MYORG/electron`), surtout si vous êtes un contributeur d'Electron approprié.

2. `surf-build -r https://github.com/MYORG/electron -s VOTRE_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Attendre très, très longtemps que la compilation finisse.