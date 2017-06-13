# Instructions de Build (macOS)

Suivez les indications ci-dessous pour compiler Electron sur macOS.

## Prérequis

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](http://nodejs.org) (externe)

Si vous utilisez Python téléchargé par Homebrew, vous devez également installer les modules Python suivants :

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## SDK macOS

Si vous développez simplement sur Electron et ne prévoyez pas de redistribuer votre build d'Electron custom, vous pouvez ignorer cette section.

Pour que certaines fonctionnalités (par exemple pinch-zoom) fonctionnent correctement, vous devez cibler le SDK macOS 10.10.

Les builds officielles d'Electron sont compilés avec [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), qui ne contient pas le SDK 10.10 par défaut. Pour l’obtenir, commencez par télécharger et monter le DMG [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg).

Puis, en supposant que le DMG Xcode 6.4 a été monté dans `/Volumes/Xcode` et que votre installation Xcode 8.2.1 est dans `/Applications/Xcode.app`, exécutez :

```bash
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

Vous devrez aussi activer Xcode pour compiler avec le SDK 10.10 :

- Ouvrir `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Mettre la valeur `MinimumSDKVersion` à `10.10`
- Sauvegarder le fichier

## Obtenir le code

```bash
$ git clone https://github.com/electron/electron
```

## Amorçage

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Nous utilisons [ninja](https://ninja-build.org/) pour compiler Electron, donc il n'y a aucun projet Xcode généré.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

## Compilation

Compiler une version `Release` et une version `Debug` :

```bash
$ ./script/build.py
```

You can also only build the `Debug` target:

```bash
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## Support 32 bit

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Cleaning

To clean the build files:

```bash
$ npm run clean
```

To clean only `out` and `dist` directories:

```bash
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Tests

Voir [Build System Overview : Tests](build-system-overview.md#tests)