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

## --lang

Establecer una configuración regional personalizada.

## --inspect=`port` and --inspect-brk=`port`

Parámetros de depuración, vea la guía [Debugeando el proceso principal](../tutorial/debugging-main-process.md) para más detalles.

## --remote-debugging-port=`port`

Habilita depuración remota sobre HTTP en el `port` especificado.

## --disk-cache-size=`size`

Fuerza el espacio máximo de disco a utilizar por la caché de disco, en bytes.

## --js-flags=`flags`

Especifica las opciones a pasar al motor de NodeJS. Tienen que ser pasadas cuando Electron arranca si quieres habilitar los `flags` en el proceso principal.

```sh
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

Estos mapeados aplican al host punto final en una petición de red (la conexión TCP y el host se solventan en una conexión directa, `CONNECT` en una conexión HTTP proxy, y el host punto fila en una conexión proxy `SOCKS`).

## --host-resolver-rules=`rules`

Como `--host-rules` pero estas `rules` solamente aplican a el host resolutor.

## --auth-server-whitelist=`url`

Una lista de servidores separadas por comas por los que la autentificación integrada esta habilitada.

Por ejemplo:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

entonces cualquier `url` acabando con `example.com`, `foobar.com`, `baz` será considerada por la autentificación integrada. Sin el prefijo `*` la url tiene que corresponder exactamente.

## --auth-negotiate-delegate-whitelist=`url`

Una lista de servidores separada por comas por los que la delegación de credenciales de usuarios es requerida. Sin el prefijo `*` la url tiene que corresponder exactamente.

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

Esta opción es global a todos los procesos de render, si solamente quieres deshabilitar el ajuste en una ventana, puedes usar el truco de pasar [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Escribe registros de Chromium en la consola.

Esta opción no puede ser usada en `app.commandLine.appendSwitch` ya que es procesada antes que la app del usuario es cargada, pero puedes establecer la variable de entorno `ELECTRON_ENABLE_LOGGING` para lograr el mismo efecto.

## --v=`log_level`

Da el nivel máximo predeterminado de V-logging activo; 0 es el predeterminado. Normalmente los valores positivos se utilizan para el nivel V-logging.

Esta opción solo funciona cuando `--enable-logging` es también pasada.

## --vmodule=`pattern`

Permite que el nivel máximo por module de V-logging sobrepase el valor dado por `--v`. Por ejemplo `my_module=2,foo*=3` cambiaría el nivel de logging para todo el código fuente en los archivos `my_module.*` y `foo*.*`.

Cualquier patrón conteniendo una barra o contrabarra sera verificada con todo la ruta y no solo el modulo. Por ejemplo `*/foo/bar/*=2` cambiaría le nivel de logging para todo el código fuente en los ficheros contenidos en `foo/bar` directorio.

Esta opción solo funciona cuando `--enable-logging` es también pasada.