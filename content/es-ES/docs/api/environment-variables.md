# Variables de entorno

> Configuración y comportamiento de la aplicación de control sin cambiar el código.

Ciertos comportamientos de Electron están controlados por variables de entorno debido a que son inicializadas antes que las flags de la línea de comandos y que el código de la applicación.

Ejemplo de shell POSIX:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Ejemplo de la consola de Windows:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Variables de producción

Las siguientes variables de entorno están diseñadas principalmente para usarse en los módulos de ejecución en las aplicaciones preconfiguradas de Electron.

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Ejemplo:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Las opciones no respaldadas son:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` están explícitamente deshabilitadas en las aplicaciones empaquetadas.

### `GOOGLE_API_KEY`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'TU_CLAVE_AQUI'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). Por defecto, una clave API de Google recién generada podría no funcionar al hacer solicitudes geocoding. Para habilitar las solicitudes de geocodificación., visite [esta página](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Deshabilita el soporte ASAR. Esta variable solo es compatible en procesos secundarios bifurcados y procesos secundarios creados que establecen `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Inicia el proceso como un proceso normal de Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

No se adjunta a la sesión de la consola actual.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

No utilizar la barra de menú global en Linux.

### `ELECTRON_TRASH` *Linux*

Establecer la implementación trash en Linux. Por defecto es `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Variables de desarrollo

Las siguientes variables de entorno están principalmente diseñadas para propósitos de desarrollo y depuración.

### `ELECTRON_ENABLE_LOGGING`

Imprime el registro interno de Chrome a la consola.

### `ELECTRON_LOG_ASAR_READS`

Cuando Electron lee desde un archivo ASAR, registra la lectura offset y la ruta del archivo al sistema `tmpdir`. El archivo resultante puede ser proporcionado al módulo ASAr para optimizar la organización de los archivos.

### `ELECTRON_ENABLE_STACK_DUMPING`

Imprime el rastro de la pila a la consola cuando Electron falla.

Esta variable de entorno no funcionará si se inicia el `crashReporter`.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Muestra el cuadro de dialogo del fallo de Windows cuando falla Electron.

Esta variable de entorno no funcionará si se inicia el `crashReporter`.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Uso:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```