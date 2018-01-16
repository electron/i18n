# Opciones de linea de commandos de Chrome soportadas

> Opciones de la linea de comandos soportados por Electron.

Puedes usar [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) para añadirlas en el código principal de tu app antes de que el evento [ready](app.md#event-ready) del modulo [app](app.md) es emitido:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Tu código aquí
})
```

## --ignore-connections-limit=`domains`

Ignore el limite de conexión para la lista de `domains` separados por `,`.

## --disable-http-cache

Desactiva la cache de disco para las peticiones HTTP.

## --disable-http2

Desactiva los protocolos HTTP/2 y SPDY/3.

## --inspect=`port` and --inspect-brk=`port`

Parámetros de depuración, vea la guía [Debugging the Main Process](../tutorial/debugging-main-process.md) para mas detalles.

## --remote-debugging-port=`port`

Habilita depuración remota sobre HTTP en el `port` especificado.

## --disk-cache-size=`size`

Fuerza el espacio máximo de disco a utilizar por la caché de disco, en bytes.

## --js-flags=`flags`

Especifica las opciones a pasar al motor de NodeJS. Tienen que ser pasadas cuando Electron arranca si quieres habilitar los `flags` en el proceso principal.

```bash
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Vea la [documentación de Node](https://nodejs.org/api/cli.html) o ejecute `node --help` en su terminal para obtener una lista de las opciones disponibles. Adicionalmente, ejecute `node --v8-options` para ver una lista de opciones que específicamente refieren al motor JavaScript de Node V8.

## --proxy-server=`address:port`

Usa un servidor proxy especifico, el cual sobrescribe la configuración del sistema. Esta opción solo afecta peticiones con protocolo HTTP, incluyendo peticiones HTTPS y WebSocket. También cabe destacar que no todos los servidores proxy aceptan peticiones HTTPS y WebSocket.

## --proxy-bypass-list=`hosts`

Indica Electron a pasar de los servidores proxy en la lista de hosts separados por punto y comas. Esta opción solo tiene efecto si es utilizada en conjunción con `--proxy-server`.

Por ejemplo:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Utilizará el servidor proxy para todos los host excepto para las direcciones locales (`localhost`, `127.0.0.1` etc.), subdominios `google.com`, hosts que contienen el sufijo `foo.com` y cualquiera en `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Usa el programa PAC en la `url` especificada.

## --no-proxy-server

No usar el servidor proxy y siempre hacer conexiones directas. Sobrescribe cualquier otra opción de servidor proxy que haya sido pasada.

## --host-rules=`rules`

Lista de `rules` separadas por coma que controlan como los nombres de host son mapeados.

Por ejemplo:

* `MAP * 127.0.0.1` Fuerza todos los nombres de host a ser mapeados a 127.0.0.1
* `MAP *.google.com proxy` Fuerza todos los subdominios google.com a ser resueltos como "proxy".
* `MAP test.com [::1]:77` Fuerza "test.com" a resolver en circuito cerrado IPv6. También forzará el port del socket resultante a ser 77.
* `MAP * baz, EXCLUDE www.google.com` Mapeara todo a "baz", excepto para "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

Por ejemplo:

    --auth-server-whitelist='*example.com, *foobar.com, *baz'
    

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

## --ignore-certificate-errors

Ignores certificate related errors.

## --ppapi-flash-path=`path`

Sets the `path` of the pepper flash plugin.

## --ppapi-flash-version=`version`

Sets the `version` of the pepper flash plugin.

## --log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

## --disable-renderer-backgrounding

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

## --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not just the module. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.