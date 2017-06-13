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

Les builds officielles d'Electron sont compilés avec [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), qui ne contient pas le SDK 10.10 par défaut. To obtain it, first download and mount the [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Then, assuming that the Xcode 6.4 DMG has been mounted at `/Volumes/Xcode` and that your Xcode 8.2.1 install is at `/Applications/Xcode.app`, run:

```bash
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

You will also need to enable Xcode to build against the 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Save the file

## Getting the Code

```bash
$ git clone https://github.com/electron/electron
```

## Bootstrapping

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Notice that we're using [ninja](https://ninja-build.org/) to build Electron so there is no Xcode project generated.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

## Compilation

Build both `Release` and `Debug` targets:

```bash
$ ./script/build.py
```

You can also only build the `Debug` target:

```bash
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## 32bit Support

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