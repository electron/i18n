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

Electron incluye soporte para un subconjunto de [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) de Node. La mayoría son soportadas con la excepción de aquellos que entran en conflicto con el uso de BoringSSL de Chromium.

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

`NODE_OPTIONS` están explícitamente deshabilitadas en las aplicaciones empaquetadas, excepto para lo siguiente:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

Usted puede proveer una clave de API para hacer solicitudes al servicio web de geocodificación de Google. Para hacer esto, coloque el siguiente código en el archivo del proceso principal, antes de abrir cualquier ventana de navegador que hará solicitudes de geocodificación:

```javascript
process.env.GOOGLE_API_KEY = 'TU_CLAVE_AQUI'
```

Para instrucciones sobre cómo adquirir una clave de Google API, visite [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). Por defecto, una clave API de Google recién generada podría no funcionar al hacer solicitudes geocoding. Para habilitar las solicitudes de geocodificación., visite [esta página](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Inicia el proceso como un proceso normal de Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

No se adjunta a la sesión de la consola actual.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

No utilizar la barra de menú global en Linux.

### `ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. Default is `gio`.

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

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Imprime el rastro de la pila a la consola cuando Electron falla.

Esta variable de entorno no funcionará si se inicia el `crashReporter`.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Muestra el cuadro de dialogo del fallo de Windows cuando falla Electron.

Esta variable de entorno no funcionará si se inicia el `crashReporter`.

### `ELECTRON_OVERRIDE_DIST_PATH`

Cuando corre desde el paquete `electron`, esta variable dice al comando `electron` para usar la instancia especificada del constructor de Electron en lugar de uno descargado por `npm install`. Uso:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```
