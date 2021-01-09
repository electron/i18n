# Cambios de línea de comandos soportados

> Opciones de la linea de comandos soportados por Electron.

Puedes usar [app.commandLine.appendSwitch][append-switch] para añadirlas en el código principal de tu app antes de que el evento [ready][ready] del modulo [app][app] es emitido:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## --ignore-connections-limit=`domains`

Ignore el limite de conexión para la lista de `domains` separados por `,`.

## --disable-http-cache

Desactiva la cache de disco para las peticiones HTTP.

## --disable-http2

Desactiva los protocolos HTTP/2 y SPDY/3.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

## --lang

Establecer una configuración regional personalizada.

## --inspect=`port` and --inspect-brk=`port`

Parámetros de depuración, vea la guía [Debugging the Main Process][debugging-main-process] para mas detalles.

## --remote-debugging-port=`port`

Habilita depuración remota sobre HTTP en el `port` especificado.

## --disk-cache-size=`size`

Fuerza el espacio máximo de disco a utilizar por la caché de disco, en bytes.

## --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Adicionalmente, ejecute `node --v8-options` para ver una lista de opciones que se refieren específicamente al motor Node.js's V8 JavaScript.

## --proxy-server=`address:port`

Usa un servidor proxy especifico, el cual sobrescribe la configuración del sistema. Esta opción solo afecta peticiones con protocolo HTTP, incluyendo peticiones HTTPS y WebSocket. También cabe destacar que no todos los servidores proxy aceptan peticiones HTTPS y WebSocket. La URL del proxy no soporta la autenticacón usuario y clave [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Por ejemplo:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Utilizará el servidor proxy para todos los host excepto para las direcciones locales (`localhost`, `127.0.0.1` etc.), subdominios `google.com`, hosts que contienen el sufijo `foo.com` y cualquiera en `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Usa el programa PAC en la `url` especificada.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

Lista de `rules` separadas por coma que controlan como los nombres de host son mapeados.

Por ejemplo:

* `MAP * 127.0.0.1` Fuerza todos los nombres de host a ser mapeados a 127.0.0.1
* `MAP *.google.com proxy` Fuerza todos los subdominios google.com a ser resueltos como "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Mapeara todo a "baz", excepto para "www.google.com".

Estos mapeados aplican al host punto final en una petición de red (la conexión TCP y el host se solventan en una conexión directa, `CONNECT` en una conexión HTTP proxy, y el host punto fila en una conexión proxy `SOCKS`).

## --host-resolver-rules=`rules`

Como `--host-rules` pero estas `rules` solamente aplican a el host resolutor.

## --auth-server-whitelist=`url`

Una lista de servidores separadas por comas por los que la autentificación integrada esta habilitada.

Por ejemplo:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

entonces cualquier `url` acabando con `example.com`, `foobar.com`, `baz` será considerada por la autentificación integrada. Sin el prefijo `*` la URL ha de coincidir exactamente.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Sin el prefijo `*` la URL ha de coincidir exactamente.

## --ignore-certificate-errors

Ignora los errores relacionados con el certificado.

## --ppapi-flash-path=`path`

Establece la ruta `path` del plugin pepper flash.

## --ppapi-flash-version=`version`

Establece la `versión` del plugin pepper flash.

## --log-net-log=`path`

Habilita el registro de los eventos de red para ser salvados y escritos en la ruta `path`.

## --disable-renderer-backgrounding

Previene Chromium disminuir la prioridad de los procesos render de páginas invisibles.

Esta opción es global a todos los procesos de render, si solamente quieres deshabilitar el ajuste en una ventana, puedes usar el truco de pasar [playing silent audio][play-silent-audio].

## --enable-logging

Escribe registros de Chromium en la consola.

Esta opción no puede ser usada en `app.commandLine.appendSwitch` ya que es procesada antes que la app del usuario es cargada, pero puedes establecer la variable de entorno `ELECTRON_ENABLE_LOGGING` para lograr el mismo efecto.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Esta opción solo funciona cuando `--enable-logging` es también pasada.

## --vmodule=`pattern`

Permite que el nivel máximo por module de V-logging sobrepase el valor dado por `--v`. Por ejemplo. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Cualquier patrón que contenga una barra hacia adelante o una barra hacia atras será probado contra el nombre de la ruta completa y no solo contra el módulo. Por ejemplo. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

Esta opción solo funciona cuando `--enable-logging` es también pasada.

## --enable-api-filtering-logging

Habilita el caller stack logging para las siguientes APIs (eventos filtrados):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

[app]: app.md
[append-switch]: app.md#appcommandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
