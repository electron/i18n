# Instrucciones para compilación (macOS)

Siga las pautas a continuación para construir Electron en macOS.

## Pre-requisitos

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (external)

Si está utilizando el Python descargado por Homebrew, también debe instalar los siguientes módulos de Python:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Si simplemente estás desarrollando Electron y no planeas redistribuir tu compilación personalizada de Electron, puede omitir esta sección.

Para que ciertas funciones (por ejemplo, pellizcar-zoom) funcionen correctamente, debe orientar el macOS 10.10 SDK.

Official Electron builds are built with [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), which does not contain the 10.10 SDK by default. To obtain it, first download and mount the [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Then, assuming that the Xcode 6.4 DMG has been mounted at `/Volumes/Xcode` and that your Xcode 8.2.1 install is at `/Applications/Xcode.app`, run:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

También necesitarás habilitar Xcode para compilar contra el SDK 10.10:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Guarda el archivo

## Obteniendo Código

```sh
$ git clone https://github.com/electron/electron
```

## Inicialización

El script bootstrap descargará todas las dependencias es necesario compilar y crear la estructura de archivos de proyecto. Tenga en cuenta que estamos usando [ninja](https://ninja-build.org/) para construir Electron por lo que no se genera ningún proyecto de Xcode.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

## Edificio

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## Soporta 32bit

Electron solo se puede construir para un objetivo de 64 bits en macOS y no hay un plan para admitir macOS de 32 bits en el futuro.

## Limpieza

Para limpiar los archivos de compilación:

```sh
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Pruebas

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)