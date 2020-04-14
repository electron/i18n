# Distribution de l'Application

To distribute your app with Electron, you need to package and rebrand it. The easiest way to do this is to use one of the following third party packaging tools:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Ces outils prendront soins de toutes les étapes qu'il y aura besoin pour avec une application Electron distribuable, de compiler, renommer, mettre l'icône et optionnellement de créer un installateur.

## Répartition manuelle
You can also choose to manually get your app ready for distribution. The steps needed to do this are outlined below.

Pour distribuer votre application avec Electron, vous devez télécharger les [binaires précompilés](https://github.com/electron/electron/releases) d'Electron. Ensuite, le dossier qui contient votre application devrait être nommé `app` et placé dans le répertoire de ressources d'Electron, comme illustré dans les exemples suivants. Notez que l’emplacement des binaires précompilés d'Electron est indiquée par `electron/` dans les exemples ci-dessous.

Sur macOS :

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Sur Windows et Linux :

```plaintext
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

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

Sur Windows et Linux :

```plaintext
electron/resources/
└── app.asar
```

Plus de détails se trouvent dans [Empaqueter une application](application-packaging.md).

## Renommer avec les binaires téléchargés

Après avoir empaqueté votre application dans Electron, vous voudrez renommer votre application avant de la distribuer aux utilisateurs.

### Windows

Vous pouvez renommer `electron.exe` en n'importe quel nom qui vous plaît, et modifier son icône et d'autres informations avec des outils tels que [rcedit](https://github.com/electron/rcedit).

### macOS

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

### Linux

Vous pouvez renommer l'exécutable `electron` par ce que vous voulez.

## Renommer en recompilant Electron à partir du code source

Il est aussi possible de renommer Electron par le nom du produit et le compiler depuis le code source. Pour faire cela, vous devez définir les arguments de compilation correspondant au nom du produit (`electron_product_name = "LeNomDeVotreProduit"`) dans le fichier `args.gn` et recompiler.

### Créer un fork personnalisé d'Electron

Créer un fork personnalisé d'Electron n'est certainement pas quelque chose que vous devriez faire pour compiler votre application, même pour les applications en "production". Utiliser un outil tel que `electron-packager` ou `electron-builder` va vous permettre de "Rebaptiser" Electron sans avoir à faire ces étapes.

Vous aurez besoin de forker Electron quand vous avez du code C++ à intégrer directement dans Electron, qui ne peux pas être upstreamed ou qui a été rejeté de la version officiel. En tant que mainteneurs d'Electron, nous sommes beaucoup à vouloir voir votre travail fonctionner, alors essayez du mieux que vous pouvez pour voir vos modifications dans la version officiel d'Electron. Cela sera plus simple pour vous et nous apprécierons votre aide.

#### Création d’une version Custom avec surf-build

1. Installer [Surf](https://github.com/surf-build/surf), par l’intermédiaire de npm : `npm install -g surf-build@latest`

2. Créez un nouveau bucket S3 et créez la structure de répertoire vide suivante :

    ```sh
    - electron/
      - symbols/
      - dist/
    ```

3. Définir les Variables d’environnement suivantes :

  * `ELECTRON_GITHUB_TOKEN` - un jeton qui peut créer des releases sur GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - chemin où vous uploaderez les entêtes de Node.js ainsi que les symboles
  * `ELECTRON_RELEASE` - Définit à `true` et l’upload s’exécutera, sinon `surf-build` va juste faire des contrôles de type CI, adaptés à être exécuté lors de chaque pull request.
  * `CI` - définir à `true` sinon il ne fonctionnera pas
  * `GITHUB_TOKEN` - mettre la même chose que `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - définir `C:\Temp` sur Windows pour empêcher les problèmes de chemin d’accès trop long
  * `TARGET_ARCH` - définir en `ia32` ou `x64`

4. Dans `script/upload.py`, vous _devez_ définir `ELECTRON_REPO` à votre fork (`MYORG/electron`), surtout si vous êtes un contributeur d'Electron approprié.

5. `surf-build -r https://github.com/MYORG/electron -s VOTRE_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Attendre très, très longtemps que la compilation finisse.
