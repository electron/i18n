# Instrucciones para compilación (macOS)

Siga las pautas a continuación para crear electrones en macOS.

## Requisitos previos

- macOS > = 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) > = 8.2.1
- [node.js](http://nodejs.org) (externo)

Si está utilizando el Python descargar Homebrew, también necesitará instalar los siguientes módulos de Python:

- [PyObjC](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Si usted simplemente está desarrollando Electron y no planea redistribuir su generación Electron personalizada, puede saltarse esta sección.

Para que ciertas funciones (por ejemplo, pinch-zoom) para que funcione correctamente, debe apuntar el macOS 10.10 SDK.

Estructuras Electron oficiales se construyen con [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), que no contiene el 10.10 SDK por defecto. Para obtenerlo, primero descargue y Monte la[Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Entonces, suponiendo que el Xcode 6.4 DMG se ha montado en volúmenes/`/Xcode` y la instalación de Xcode 8.2.1 es en `/Applications/Xcode.app`, ejecutar:

```bash
CP - r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

También necesitará habilitar Xcode compilar contra el SDK 10.10:

- `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist` abierto
- Establezca el `MinimumSDKVersion` en `10.10`
- Guarde el archivo

## Obtener el código de

```bash
$ git clone https://github.com/electron/electron
```

## De arranque

El script bootstrap descargará todas las dependencias es necesario compilar y crear la estructura de archivos de proyecto. Aviso que estamos usando [ninja](https://ninja-build.org/) para compilar Electron así que no hay ningún proyecto de Xcode generado.

```bash
$ cd Electronico $./script/bootstrap.py - v
```

## Edificio

Compilar objetivos de `Release` y `Debug`:

```bash
$./script/build.py
```

También sólo puede crear el objetivo de `Debug`:

```bash
$./script/build.py - c D
```

Después de edificio, usted puede encontrar `Electron.app` bajo `out/D`.

## Soporte de 32 bits

Electrón sólo puede compilar para un objetivo de 64 bits en macOS y hay previsto macOS de 32 bits en el futuro.

## Limpieza

Para limpiar los archivos de la compilación:

```bash
$ MNP correr limpio
```

Limpiar sólo los directorios `out` y `dist`:

```bash
$ MNP ejecutar limpieza y construcción
```

**Note:** que ambos comandos limpiamos requieren corriente `bootstrap` antes de edificio.

## Pruebas de

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)