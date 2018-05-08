# Instrukcje Budowania (macOS)

Follow the guidelines below for building Electron on macOS.

## Wymagania

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (external)

Jeśli używasz Python pobranego przez Homebrew, musisz również zainstalować następujące moduły Pythona:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

For certain features (e.g. pinch-zoom) to work properly, you must target the macOS 10.10 SDK.

Official Electron builds are built with [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), which does not contain the 10.10 SDK by default. To obtain it, first download and mount the [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Then, assuming that the Xcode 6.4 DMG has been mounted at `/Volumes/Xcode` and that your Xcode 8.2.1 install is at `/Applications/Xcode.app`, run:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

You will also need to enable Xcode to build against the 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Zapisz plik

## Dostawanie kodu

```sh
$ git clone https://github.com/electron/electron
```

## Bootstrapping

Skrypt bootstrap pobierze wszystkie konieczne zależności budowy i stworzy pliki projektu budowy. Notice that we're using [ninja](https://ninja-build.org/) to build Electron so there is no Xcode project generated.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## Kompilowanie

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## Wsparcie 32bitowe

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Czyszczenie

Aby wyczyścić pliki kompilacji:

```sh
$ npm działa bez problemu
```

Aby oczyścić tylko `z` i `dist`katalogów:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Testy

Zobacz [przegląd budowy systemu: Testy](build-system-overview.md#tests)