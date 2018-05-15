# Estructura del directorio de código fuente

El código fuente de Electron está separado en unas pocas partes, la mayoría siguiendo a Chromium en las convenciones de separación.

Necesitará familiarizarse con la [arquitectura multiprocesos de Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) para entender el código fuente mejor.

## Estructura del código fuente

```diff
Electron
├── atom/ - C++ source code.
|   ├── app/ - System entry code.
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   main process things. Esto habla con el procesador para administrar páginas web.
|   |   ├── ui/ - Implementation of UI stuff for different platforms.
|   |   |   ├── cocoa/ - Cocoa specific source code.
|   |   |   ├── win/ - Windows GUI specific source code.
|   |   |   └── x/ - X11 specific source code.
|   |   ├── api/ - The implementation of the main process APIs.
|   |   ├── net/ - Network related code.
|   |   ├── mac/ - Mac specific Objective-C source code.
|   |   └── resources/ - Icons, platform-dependent files, etc.
|   ├── renderer/ - Code that runs in renderer process.
|   |   └── api/ - The implementation of renderer process APIs.
|   └── common/ - Code that used by both the main and renderer processes,
|       including some utility functions and code to integrate node's message
|       loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|           Electron's built-in modules.
├── brightray/ - Thin shim over libcc that makes it easier to use.
├── chromium_src/ - Source code copied from Chromium. Vea abajo.
Default_app ├── / - página de predeterminada para mostrar cuando el Electron se inicia sin |   proporciona una aplicación.
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── spec/ - Automatic tests.
├── electron.gyp - normas de construcción del Electron.
└── common.gypi - Compiler specific settings and building rules for other
    components like `node` and `breakpad`.
```

## `/chromium_src`

Los archivos en `/chromium_src` tienden a ser piezas de Chromium que no son partes de la capa de contenido. Por ejemplo, para implementar Pepper API, necesitamos un poco de cableado similar a lo que hace el Chrome oficial. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. Estos podrían ser fácilmente parches en libcc, pero en el momento cuando estas fueron escritas, el objetivo de libcc fue el mantener parches muy mínimos y los cambios de chromium_src_ tienden a ser grandes. Además, tenga en cuenta que estos parches nunca pueden ser subidos de nivel a diferencia de otros parches libcc que mantenemos ahora.

## Estructura de otros directorios

* **Código** - Los códigos usados con propósitos de desarrollo como compilar, empacar, probar, etc.
* **Herramientas** - Códigos de ayuda usados por archivos gto, a diferencia de `comandos`, los comandos puestos aquí nunca deben ser invocados por los usuarios directamente.
* **proveedor** - Código de fuente de las dependencias de terceros, nosotros no usamos `third_party` como un nombre debido a que se confundiría con el mismo directorio en el arbol de código de Chromium.
* **Nodos de módulo** - Nodos de módulo de terceros usados para compilar.
* **afuera** - temporalmente afuera del directorio de `ninja`.
* **dist** - Directorio temporal creado por el comando `script/create-dist.py` cuando se crea una distribución.
* **binarios externos** - Binarios descargados de entornos de trabajos de terceros los cuales no soportan la compilación con `gyp`.

## Mantener los submódulos de Git actualizados

El repositorio Electronico tiene unas dependencias vendored, encontradas en el directorio[/vendor](https://github.com/electron/electron/tree/master/vendor). Ocasionalmente podrás ver un mensaje como este cuando esté ejecutándose `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

Para actualizar estas dependencias independientes, ejecute el siguiente comando:

```sh
git submodule update --init --recursive
```

Si te descubre ejecutando este comando frecuentemente, puedes crea un alias para él en tu archivo `~/.gitconfig`:

```sh
[alias]
    su = submodule update --init --recursive
```