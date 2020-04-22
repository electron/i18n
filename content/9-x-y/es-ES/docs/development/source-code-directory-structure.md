# Estructura de directorios del código fuente

El código fuente de Electron está separado en unas pocas partes, la mayoría siguiendo a Chromium en las convenciones de separación.

Necesitará familiarizarse con la [arquitectura multiprocesos de Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) para entender mejor el código fuente.

## Estructura del código fuente

```diff
Electron
├── build/ - Archivos de configuración necesarios para compilar con GN.
├── buildflags/ - Determina el conjunto de características que pueden ser compiladas condicionalmente.
├── chromium_src/ - Código fuente copiado desde Chromium que no es parte de la capa de contenido.
├── default_app/ - Una aplicación predeterminada se ejecuta cuando se inicia Electron sin proveer 
| una aplicación de consumo.
├── docs/ - Documentación de Electron.
|   ├── api/ - Documentación para modulos y APIs externas.
|   ├── development/ - Documentación para ayudar en el desarrollo para y con Electron.
|   ├── fiddles/ - Un conjunto de fragmento de codigo que pueden ejecutarse en Electron Fiddle.
|   ├── images/ - Imágenes usadas en la documentación.
|   └── tutorial/ - Documentos tutoriales para diversos aspectos de Electron.
├── lib/ - Código fuente JavaScript/TypeScript.
|   ├── browser/ - Código de inicialización del proceso principal.
|   |   ├── api/ - API de implementación para los módulos del proceso principal.
|   |   └── remote/ - Código relacionado con el modulo remote como es usado en el proceso principal.
|   ├── common/ - Relacionado con la logica necesario por ambos procesos el main y el renderer.
|   |   └── api/ - Implementación de API para módulos que pueden  
|   |             ser usadas en ambos procesos main y renderer
|   ├── isolated_renderer/ - Maneja la creación de procesos renderer isolados cuando
|   |                        contextIsolation esta habilitado.
|   ├── renderer/ - Código de inicialización del proceso renderer.
|   |   ├── api/ - Implementación de la API para los módulos del proceso renderer.
|   |   ├── extension/ - Código relacionado con el uso de las Extenciones de Chrome
|   |   |                en el proceso renderer de Electron.
|   |   ├── remote/ - Lógica que maneja el uso del módulo remoto en el 
|   |   |             proceso principal.
|   |   └── web-view/ - Lógica que maneja el uso de los webviews en el 
|   |                   proceso renderer.
|   ├── sandboxed_renderer/ - Lógica que maneja la creación de procesos 
|   |   |                     renderer sandboxed.
|   |   └── api/ - Implementación para procesos renderer sandboxed.
|   └── worker/ - Lógica que maneja la correcta funcionalidad de Node.js
|                 en los entornos Web Workers.
├── patches/ - Parches aplicados encima de las dependencias core 
|   |          de Electron para manejar las diferencias ente nuestro casos de uso 
|   |          y la configuración por defecto.
|   ├── boringssl/ - Parches aplicados a los forks de Google OpenSSL, BoringSSL.
|   ├── chromium/ - Parches aplicados a Chromium.
|   ├── node/ - Parches aplicados encima de Node.js.
|   └── v8/ - Parches aplicados encima del motor V8 de Google.
├── shell/ - Código fuente C++.
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
├── spec/ - Componentes de la suite de pruebas de Electron se ejecutan en el proceso de renderizado.
├── spec-main/ - Componentes de la suite de pruebas de Electron se ejecutan en el proceso main.
└── BUILD.gn - Reglas de construcción de Electron.
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
script/ - El conjunto de todo los scripts que Electron ejecuta para una variedad de propósitos.
├── codesign/ - Falsifica la firma de código para aplicaciones Electron; usado para pruebas.
├── lib/ - Varios scripts de utilidad de python.
└── release/ - Scripts que se ejecutan durante el proceso de lanzamiento de Electron.
    ├── notes/ - Genera notas de lanzamiento para las nuevas versiones de Electron.
    └── uploaders/ - Sube varios archivos relacionados con la nueva versión durante el lanzamiento.
```
* **tools** - Helper scripts used by GN files.
  * Los Scripts puestos aquí nunca deberían ser invocados directamente por los usuarios, a diferencia de los de `script`.
* **typings** - Tipos de TypeScript para el código interno de Electron.
* **vendor** - Código fuente para algunas dependencias de terceros incluyendo `boto` y `requests`.

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
