# Instrucciones para compilación (macOS)

Siga las pautas a continuación para construir Electron en macOS.

## Pre-requisitos

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (externo)

Si está utilizando el Python descargado por Homebrew, también debe instalar los siguientes módulos de Python:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Si simplemente estás desarrollando Electron y no planeas redistribuir tu compilación personalizada de Electron, puede omitir esta sección.

Para que ciertas funciones (por ejemplo, pellizcar-zoom) funcionen correctamente, debe orientar el macOS 10.10 SDK.

Compilados oficiales de electron son compilados con [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), el cual no contiene el 10.10 SDK por defecto. Para obtenerlo, primero descarga y monta el [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Luego, asumiendo que el Xcode 6.4 DMG ha sido monstando en `/Volumes/Xcode` y que tu Xcode 8.2.1 instalado está en `/Applications/Xcode.app`, ejecuta:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

También necesitarás habilitar Xcode para compilar contra el SDK 10.10:

- Abrir `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Configurar el `MinimumSDKVersion` a `10.10`
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

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
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

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Limpieza

Para limpiar los archivos construidos:

```sh
$ npm run clean
```

Para limpiar solo los directorios `fuera` y `dist`:

```sh
$ npm run clean-build
```

**Nota:** Ambos comandos de limpieza requieren que se ejecute `bootstrap` antes de construir de nuevo.

## Verificación

Vea [Build System Overview: Tests](build-system-overview.md#tests)