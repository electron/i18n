# Distribution de l’application

Pour distribuer votre application avec électronique, vous devez télécharger binaries</a> prebuilt de l’électron. Ensuite, le dossier qui contient votre application devrait être nommé `app` et placé dans le répertoire de ressources de l’électron, comme illustré dans les exemples suivants. Notez que l’emplacement des binaires précompilés de l’électron est indiquée par `electron/` dans les exemples ci-dessous.</p> 

Sur macOS :

```text
electron/Electron.app/Contents/Resources/app/ ├── package.json ├── main.js └── index.html
```

Sur Windows et Linux :

```text
électron/ressources/app ├── package.json ├── main.js └── index.html
```

Puis exécutez `Electron.app` (ou `electron` sous Linux, `electron.exe` sous Windows), et électron va commencer dans votre application. Le répertoire `electron` sera alors votre distribution pour fournir aux utilisateurs finaux.

## Empaqueter votre application dans un fichier

En dehors de votre application d’expédition en copiant tous les fichiers source, vous pouvez également empaqueter votre application dans une archive de [asar](https://github.com/electron/asar) pour éviter d’exposer le code source de votre application aux utilisateurs.

Pour utiliser une archive `asar` pour remplacer le dossier `app`, vous devez renommer l’archive à `app.asar` et placez-la sous le répertoire de ressources de l’électron comme ci-dessous, et électrons tentera à lire les archives et commencer à partir de celui-ci.

Sur macOS :

```text
electron/Electron.app/Contents/Resources/ └── app.asar
```

Sur Windows et Linux :

```text
électron/ressources/└── app.asar
```

On trouvera plus de détails dans [Application packaging](application-packaging.md).

## Rebranding avec binaires téléchargés

Après groupement votre application en électronique, vous voudrez rebaptiser électronique avant de le distribuer aux utilisateurs.

### Windows

Vous pouvez renommer `electron.exe` à n’importe quel nom que vous aimez et modifier son icône et autres informations avec des outils comme [rcedit](https://github.com/atom/rcedit).

### macOS

Vous pouvez renommer `Electron.app` à n’importe quel nom que vous voulez, et vous devrez également renommer les champs `CFBundleDisplayName`, `CFBundleIdentifier` et `CFBundleName` dans les fichiers suivants :

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Vous pouvez également renommer l’application d’assistance pour éviter de montrer `Electron Helper` dans le moniteur d’activité, mais assurez-vous que vous avez renommé le nom du fichier exécutable de l’application d’assistance.

La structure d’une application de renommé serait comme :

    MyApp.app/Contents ├── Info.plist ├── MacOS / │ └── MyApp └── cadres / ├── MyApp Helper EH.app |   ├── Info.plist |   └── MacOS / |       └── MyApp Helper hein ├── MyApp Helper NP.app |   ├── Info.plist |   └── MacOS / |       └── MyApp Helper NP └── MyApp Helper.app ├── Info.plist └── MacOS / └── MyApp Helper
    

### Linux

Vous pouvez renommer l’exécutable `electron` au nom de que votre choix.

## Outils d’empaquetage

En dehors de l’emballage de votre app manuellement, vous pouvez également choisir d’utiliser des outils d’empaquetage de tierce partie pour faire le travail pour vous :

* [électron-builder](https://github.com/electron-userland/electron-builder)
* [électron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding en reconstruisant l’électron de la Source

Il est également possible de rebaptiser électron en changeant le nom du produit et en construisant de source. Pour ce faire, vous devrez modifier le fichier `atom.gyp` et avoir une propre régénération.

### grunt-construire-atom-shell

Vérifier manuellement le code de l’électron et la reconstruction pourraient être compliqués, donc une tâche Grunt a été créée qui gérera cela automatiquement :[grunt-build-atom-shell](https://github.com/paulcbetts/grunt-build-atom-shell).

Cette tâche se chargera automatiquement en modifiant le fichier `.gyp`, bâtiment de la source, puis reconstruire des modules de nœud natifs de votre application pour correspondre au nouveau nom du fichier exécutable.

### Créer une fourchette électronique personnalisée

Créant une fourche personnalisée d’électron n’est certainement pas quelque chose que vous devez faire pour construire votre application, même pour les applications de « Niveau de Production ». À l’aide d’un outil tel que `electron-packager` ou `electron-builder` vous permettra d’électrons « Rebaptiser » sans avoir à faire ces étapes.

Vous avez besoin à la table des électrons quand vous avez un code C++ personnalisé que vous avez raccordé directement dans les électrons, qui ne peut pas être upstreamed, ou qui a été rejeté de la version officielle. Mainteneurs d’électron, nous sommes très beaucoup souhaiterait faire votre scénario de travailler, alors essayez aussi dur que vous pouvez pour entrer vos modifications dans la version officielle d’électron, il sera beaucoup plus facile sur vous, et nous apprécions votre aide.

#### Création d’une version Custom avec surf-build

  1. Installer [Surf](https://github.com/surf-build/surf), par l’intermédiaire du Musée :`npm installer surf-build@latest` -g

  2. Créez un nouveau seau de S3 et créez la structure de répertoire vide suivante :
    
        -atom-shell / - symboles / - dist /
        

  3. Définir les Variables d’environnement suivantes :

* `ELECTRON_GITHUB_TOKEN` - un jeton qui peut créer des communiqués sur GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - l’endroit où vous allez télécharger en-têtes node.js ainsi que des symboles
* `ELECTRON_RELEASE` - la valeur `true` et l’upload partie s’exécutera, congé non définie et `surf-build` vont juste faire des contrôles de type CI, adaptés à exécuter pour chaque demande de tirer.
* `CI` - la valeur `true` ou sinon il échouera
* `GITHUB_TOKEN` - mettre à la même chose que `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - la valeur `C:\Temp` sur Windows pour empêcher les problèmes de chemin d’accès trop long
* `TARGET_ARCH` - la valeur `ia32` ou `x64` 

  1. Dans `script/upload.py`, vous *must* la valeur `ELECTRON_REPO` à la fourche (`MYORG/electron`), surtout si vous êtes un contributeur à électron approprié.

  2. `Surf-construction - r https://github.com/MYORG/electron -s YOUR_COMMIT - n « surf-plate-forme-ARCH »`

  3. Attendre très, très longtemps pour la build terminer.