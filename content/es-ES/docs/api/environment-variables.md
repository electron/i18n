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

### `GOOGLE_API_KEY`

Electron incluye una clave API codificada para hacer solicitudes al webservice de geocoding de Google. Debido a que esta clave API está incluida en cada versión de Electron, frecuente mente excede su cuota de uso. Para solucionar esto, se puede suministrar una clave propia API de Google en el entorno. Coloque el siguiente código en el archivo de tu proceso principal antes de abrir cualquier ventana del navegador que harán solicitudes de geocoding:

```javascript
process.env.GOOGLE_API_KEY = 'TU_CLAVE_AQUI'
```

Para obtener instrucciones sobre cómo adquirir una clave de API de Google, visita [esta página](https://www.chromium.org/developers/how-tos/api-keys).

Por defecto, una clave API de Google recién generada podría no funcionar al hacer solicitudes geocoding. Para habilitar las solicitudes de geocodificación., visite [esta página](https://console.developers.google.com/apis/api/geolocation/overview).

### `ELECTRON_NO_ASAR`

Deshabilita el soporte ASAR. Esta variable solo es compatible en procesos secundarios bifurcados y procesos secundarios creados que establecen `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Inicia el proceso como un proceso normal de Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

No se adjunta a la sesión de la consola actual.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

No utilizar la barra de menú global en Linux.

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