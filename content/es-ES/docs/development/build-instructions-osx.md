# Instrucciones para compilación (macOS)

Siga las pautas a continuación para construir Electron en macOS.

## Pre-requisitos

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (externo)

Si está utilizando el Python descargado por Homebrew, también debe instalar los siguientes módulos de Python:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

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

El comando de inicialización descargará el conjunto de archivos necesarios y creará archivos de proyecto. Tenga en cuenta que estamos usando [ninja](https://ninja-build.org/) para construir Electron por lo que no se genera ningún proyecto de Xcode.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## Compilando

Compilar ambos destinos `lanzamiento` y `Depuración`:

```sh
$ ./script/build.py
```

También puede compilar solo un destino de `Depuración`:

```sh
$ ./script/build.py -c D
```

Después que la compilación esté lista, puede encontrar `Electron.app` como `out/D`.

## Soporta 32bit

Electron solo se puede construir para un objetivo de 64 bits en macOS y no hay un plan para admitir macOS de 32 bits en el futuro.

## Limpieza

Para limpiar los archivos de compilación:

```sh
$ npm run clean
```

Para limpiar solo los directorios `fuera` y `dist`:

```sh
$ npm run clean-build
```

**Nota:** Ambos comandos limpios requieren un `arranque` de nuevo después de ser compilados.

## Verificación

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)