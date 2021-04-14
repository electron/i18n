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

Las opciones no soportadas son:

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

El soporte de geolocalización en Electron requiere el uso del servicio web de Google Cloud Platform. Para habilitar esta función, adquiera una [Google API key](https://developers.google.com/maps/documentation/geolocation/get-api-key) y coloque el siguiente código en su archivo de proceso principal, antes de abrir cualquier ventana de buscador que vaya a realizar solicitudes de geolocalización:

```javascript
process.env.GOOGLE_API_KEY = 'TU_CLAVE_AQUI'
```

Por defecto, una clave API de Google recientemente generada podría no tener permitido hacer solicitudes de geolocalización. Para habilitar el servicio web de geolocalización para su proyecto, habilítelo a través de la [API library](https://console.cloud.google.com/apis/library).

Nota. Deberás agregar una [cuenta de facturación](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) al proyecto asociado a la clave de API para que funcione el servicio Web de geolocalización.

### `ELECTRON_NO_ASAR`

Inhabilita el soporte de ASAR. Esta variable solo se admite en procesos hijo bifurcados y en los procesos hijo engendrados que establecen `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Inicia el proceso como un proceso normal de Node.js.

En este modo, podrás ser capaz de pasar [opciones cli](https://nodejs.org/api/cli.html) a Node.js como lo harías cuando corres el ejecutable normal de Node.js, con la excepción de las siguientes banderas:

* "--openssl-config"
* "--use-bundled-ca"
* "--use-openssl-ca",
* "--force-fips"
* "--enable-fips"

Estas banderas están inhabilitadas debido al hecho de que Electron usa BoringSSL en lugar de OpenSSL cuando construye el módulo `crypto` node. js, por lo que no funcionará como se diseñó.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

No se adjunta a la sesión de la consola actual.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

No utilizar la barra de menú global en Linux.

### `ELECTRON_TRASH` _Linux_

Configura la implementación de la papelera en Linux. El valor predeterminado es `gio`.

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

Cuando las lecturas de electrones de un archivo ASAR, registra el desplazamiento de lectura y la ruta del archivo para la `tmpdir`del sistema. El archivo resultante se puede proporcionar al módulo de ASAR para optimizar la ordenación del archivo.

### `ELECTRON_ENABLE_STACK_DUMPING`

Imprime el rastro de la pila a la consola cuando Electron falla.

Esta variable de entorno no funcionará si se inicia el `crashReporter`.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Muestra el cuadro de dialogo del fallo de Windows cuando falla Electron.

Esta variable de entorno no funcionará si se inicia el `crashReporter`.

### `ELECTRON_OVERRIDE_DIST_PATH`

Cuando corre desde el paquete `electron`, esta variable dice al comando `electron` para usar la instancia especificada del constructor de Electron en lugar de uno descargado por `npm install`. Uso:

```sh
exportar ELECTRON_OVERRIDE_DIST_PATH =/Users/username/projects/electron/out/Testing
```

## Establecido por Electron

Electron define algunas variables en su entorno en el momento de ejecución.

### `ORIGINAL_XDG_CURRENT_DESKTOP`

Esta variable es establecida con al valor de `XDG_CURRENT_DESKTOP` con el que originalmente tu aplicación fue lanzada.  A veces, Electron modifica el valor de `XDG_CURRENT_DESKTOP` para afectar otra lógica dentro de Chromium, así que si quieres acceder al valor original _original_ en su lugar deberías buscar esta variable de entorno.
