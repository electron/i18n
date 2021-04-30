# Estructura de directorios del código fuente

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
|   |   ├── remote/ - Logic that handles use of the remote module in
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
|   ├── app/ - System entry code.
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   |          main process things. This talks to the renderer to manage web
|   |   |          pages.
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
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Building rules of Electron.
```

## Estructura de otros directorios

* **.circleci** - Archivo de configuración para CI con CircleCI.
* **.github** - Archivos de configuración específicos de GitHub, incluyendo plantillas de problemas y CODEOWNERS.
* **dist** - Directorio temporal creado por el comando `script/create-dist.py` cuando se crea una distribución.
* **external_binaries** - Binarios descargados de terceros los cuales no soportan la construcción con `gn`.
* **Nodos de módulo** - Nodos de módulo de terceros usados para compilar.
* **npm** - Lógica para la instalación de Electron via npm.
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

* **typings** - Tipos de TypeScript para el código interno de Electron.
* **vendor** - Código fuente para algunas dependencias de terceros.
