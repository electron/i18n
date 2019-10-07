# Estructura del directorio de código fuente

El código fuente de Electron está separado en unas pocas partes, la mayoría siguiendo a Chromium en las convenciones de separación.

Necesitará familiarizarse con la [arquitectura multiprocesos de Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) para entender mejor el código fuente.

## Estructura del código fuente

```diff
Electron
├── atom/ - Código fuente C++.
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
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── chromium_src/ - Source code copied from Chromium. Vea abajo.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - Documentaciones.
├── lib/ - Código fuente JavaScript.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Implementación API Javascript.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - Pruebas automáticas.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

Los archivos en `/chromium_src` tienden a ser piezas de Chromium que no son partes de la capa de contenido. Por ejemplo, para implementar Pepper API, necesitamos un poco de cableado similar a lo que hace el Chrome oficial. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. Estos podrían ser fácilmente parches en libcc, pero en el momento cuando estas fueron escritas, el objetivo de libcc fue el mantener parches muy mínimos y los cambios de chromium_src_ tienden a ser grandes. Además, tenga en cuenta que estos parches nunca pueden ser subidos de nivel a diferencia de otros parches libcc que mantenemos ahora.

## Estructura de otros directorios

* **Código** - Los códigos usados con propósitos de desarrollo como compilar, empacar, probar, etc.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **proveedor** - Código de fuente de las dependencias de terceros, nosotros no usamos `third_party` como un nombre debido a que se confundiría con el mismo directorio en el arbol de código de Chromium.
* **Nodos de módulo** - Nodos de módulo de terceros usados para compilar.
* **afuera** - temporalmente afuera del directorio de `ninja`.
* **dist** - Directorio temporal creado por el comando `script/create-dist.py` cuando se crea una distribución.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

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