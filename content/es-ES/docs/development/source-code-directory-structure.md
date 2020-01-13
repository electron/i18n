# Estructura del directorio de código fuente

El código fuente de Electron está separado en unas pocas partes, la mayoría siguiendo a Chromium en las convenciones de separación.

Necesitará familiarizarse con la [arquitectura multiprocesos de Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) para entender mejor el código fuente.

## Estructura del código fuente

```diff
Electron
├── build/ - Build configuration files needed to build with GN.
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron's documentation.
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - Images used in documentation.
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript source code.
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   ├── remote/ - Logic that handes use of the remote module in
|   |   |             the main process.
|   |   └── web-view/ - Logic that handles the use of webviews in the
|   |                   renderer process.
|   ├── sandboxed_renderer/ - Logic that handles creation of sandboxed renderer
|   |   |                     processes.
|   |   └── api/ - API implementation for sandboxed renderer processes.
|   └── worker/ - Logic that handles proper functionality of Node.js
|                 environments in Web Workers.
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Patches applied to Google's fork of OpenSSL, BoringSSL.
|   ├── chromium/ - Patches applied to Chromium.
|   ├── node/ - Patches applied on top of Node.js.
|   └── v8/ - Patches applied on top of Google's V8 engine.
├── shell/ - C++ source code.
|   ├── app/ - Código de entrada al sistema.
|   ├── browser/ - El frontend incluyendo la ventana principal, la interfaz de usuario y todo lo relacionado al
|   |   |          proceso main. Esto habla con el renderizador para manejar páginas web.
|   |   ├── ui/ - Implementación de la cosas de  interfaz de usuario para las diferentes plataformas.
|   |   |   ├── cocoa/ - Código fuente específico de Cocoa.
|   |   |   ├── win/ - Código fuente específico de Windows GUI.
|   |   |   └── x/ - Código fuente especifico de X11.
|   |   ├── api/ - La implementación de las APIs del proceso principal.
|   |   ├── net/ - Código relacionado con la red.
|   |   ├── mac/ - Código fuente especifico Mac  Objective-C.
|   |   └── resources/ - Iconos, archivos dependiente de la plataforma, etc.
|   ├── renderer/ - Código que corre en el proceso renderizador.
|   |   └── api/ - La implementación de las APIs del proceso renderizador.
|   └── common/ - Código que se usa por ambos procesos, main y el renderer, incluye algunos funciones útiles
|       |         y código para integrar el bucle de mensaje de node dentro de bucle de mensaje de Chromium.
|       └── api/ - La implementación de las APIs comunes y las bases de los módulos integrados de Electron.
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Reglas de construcción de Electron.
```

## Estructura de otros directorios

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - Directorio temporal creado por el comando `script/create-dist.py` cuando se crea una distribución.
* **external_binaries** - Binarios descargados de terceros los cuales no soportan la construcción con `gn`.
* **Nodos de módulo** - Nodos de módulo de terceros usados para compilar.
* **npm** - Logic for installation of Electron via npm.
* **afuera** - temporalmente afuera del directorio de `ninja`.
* **Código** - Los códigos usados con propósitos de desarrollo como compilar, empacar, probar, etc.

```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```

* **herramientas** - Helper scripts used by GN files. 
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

## Mantener los submódulos de Git actualizados

El repositorio Electronico tiene unas dependencias vendored, encontradas en el directorio[/vendor](https://github.com/electron/electron/tree/master/vendor). Ocasionalmente podrás ver un mensaje como este cuando esté ejecutándose `git status`:

```sh
$ git status

  modified:   vendor/depot_tools (new commits)
  modified:   vendor/boto (new commits)
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