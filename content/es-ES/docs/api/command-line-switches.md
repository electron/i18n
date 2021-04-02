# Cambios de línea de comandos soportados

> Opciones de la linea de comandos soportados por Electron.

Puedes usar [app.commandLine.appendSwitch][append-switch] para añadirlas en el código principal de tu app antes de que el evento [ready][ready] del modulo [app][app] es emitido:

```javascript
const { app } = require (' Electron ')
app. commandLine. appendSwitch (' Remote-Debugging-Port ', ' 8315 ')
app. commandLine. appendSwitch (' host-rules ', ' MAP * 127.0.0.1 ')

app. whenReady (). then (() => {
  //Your Code here here
})
```

## Banderas de la CLI de Electron

### --auth-server-whitelist=`url`

Una lista de servidores separadas por comas por los que la autentificación integrada esta habilitada.

Por ejemplo:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

entonces cualquier `url` acabando con `example.com`, `foobar.com`, `baz` será considerada por la autentificación integrada. Sin el prefijo `*` la URL ha de coincidir exactamente.

### --auth-negotiate-delegate-whitelist=`url`

Una lista de servidores separados por comas para las cuales se necesita la delegación de credenciales de usuario. Sin el prefijo `*` la URL ha de coincidir exactamente.

### --Disable-NTLM-v2

Inhabilita NTLM v2 para plataformas POSIX, sin efecto en otro lugar.

### --disable-http-cache

Desactiva la cache de disco para las peticiones HTTP.

### --disable-http2

Desactiva los protocolos HTTP/2 y SPDY/3.

### --disable-renderer-backgrounding

Previene Chromium disminuir la prioridad de los procesos render de páginas invisibles.

Esta opción es global a todos los procesos de render, si solamente quieres deshabilitar el ajuste en una ventana, puedes usar el truco de pasar [playing silent audio][play-silent-audio].

### --disk-cache-size=`size`

Fuerza el espacio máximo de disco a utilizar por la caché de disco, en bytes.

### --enable-api-filtering-logging

Habilita el caller stack logging para las siguientes APIs (eventos filtrados):

- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Escribe registros de Chromium en la consola.

Esta opción no puede ser usada en `app.commandLine.appendSwitch` ya que es procesada antes que la app del usuario es cargada, pero puedes establecer la variable de entorno `ELECTRON_ENABLE_LOGGING` para lograr el mismo efecto.

### --host-rules=`rules`

Lista de `rules` separadas por coma que controlan como los nombres de host son mapeados.

Por ejemplo:

* `MAP * 127.0.0.1` Fuerza todos los nombres de host a ser mapeados a 127.0.0.1
* `MAP *.google.com proxy` Fuerza todos los subdominios google.com a ser resueltos como "proxy".
* `MAP test.com [::1]:77` obliga a "test.com" a resolver el loopback de IPv6. También obligará al puerto de la dirección de socket resultante a ser 77.
* `MAP * baz, EXCLUDE www.google.com` Mapeara todo a "baz", excepto para "www.google.com".

Estos mapeados aplican al host punto final en una petición de red (la conexión TCP y el host se solventan en una conexión directa, `CONNECT` en una conexión HTTP proxy, y el host punto fila en una conexión proxy `SOCKS`).

### --host-resolver-rules=`rules`

Como `--host-rules` pero estas `rules` solamente aplican a el host resolutor.

### --ignore-certificate-errors

Ignora los errores relacionados con el certificado.

### --ignore-connections-limit=`domains`

Ignore el limite de conexión para la lista de `domains` separados por `,`.

### --js-flags=`flags`

Especifica los indicadores que se pasan al motor node. js. Se tiene que pasar cuando se inicia electrón si quieres habilitar el `flags` en el proceso principal.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Consulta la documentación de [node. js][node-cli] o ejecuta `node --help` en tu terminal para obtener una lista de las banderas disponibles. Adicionalmente, ejecute `node --v8-options` para ver una lista de opciones que se refieren específicamente al motor Node.js's V8 JavaScript.

### --lang

Establecer una configuración regional personalizada.

### --log-net-log=`path`

Habilita el registro de los eventos de red para ser salvados y escritos en la ruta `path`.

### --no-proxy-server

No uses un servidor proxy y siempre realices conexiones directas. Reemplaza cualquier otro indicadores del servidor proxy que se pasen.

### --no-sandbox

Inhabilita el Sandbox de cromo, que ahora está habilitado de forma predeterminada. Solo se debe usar para las pruebas.

### --proxy-bypass-list=`hosts`

Indica a Electron que omita el servidor proxy para la lista de hosts separados por punto y coma. Esta marca tiene un efecto solo si se usa en tándem con `--proxy-server`.

Por ejemplo:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Utilizará el servidor proxy para todos los host excepto para las direcciones locales (`localhost`, `127.0.0.1` etc.), subdominios `google.com`, hosts que contienen el sufijo `foo.com` y cualquiera en `1.2.3.4:5678`.

### --proxy-pac-url=`url`

Usa el programa PAC en la `url` especificada.

### --proxy-server=`address:port`

Usa un servidor proxy especifico, el cual sobrescribe la configuración del sistema. Esta opción solo afecta peticiones con protocolo HTTP, incluyendo peticiones HTTPS y WebSocket. También cabe destacar que no todos los servidores proxy aceptan peticiones HTTPS y WebSocket. La URL del proxy no soporta la autenticacón usuario y clave [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

Habilita depuración remota sobre HTTP en el `port` especificado.

### --v=`log_level`

Brinda el nivel de V-Logging activo predeterminado máximo; 0 es el valor predeterminado. Normalmente valores positivos se usan para los niveles de V-Logging.

Esta opción solo funciona cuando `--enable-logging` es también pasada.

### --vmodule=`pattern`

Permite que el nivel máximo por module de V-logging sobrepase el valor dado por `--v`. Por ejemplo. `my_module=2,foo*=3` cambiaría el nivel de registro para todo el código en archivos de código fuente `my_module.*` y `foo*.*`.

Cualquier patrón que contenga una barra hacia adelante o una barra hacia atras será probado contra el nombre de la ruta completa y no solo contra el módulo. Por ejemplo. `*/foo/bar/*=2` cambiaría el nivel de registro de para todo el código en los archivos de origen en un directorio `foo/bar` .

Esta opción solo funciona cuando `--enable-logging` es también pasada.

### --force_high_performance_gpu

Forzar el uso de una GPU discreta cuando haya múltiples GPU disponibles.

### --force_low_power_gpu

Forzar el uso de GPU integrada cuando hay múltiples GPU disponibles.

## Banderas Node.js

Electron admite algunas de las banderas de la CLI de [][node-cli] admitidas por node. js.

**Nota:** pasar modificadores de la línea de comando no compatibles a Electron cuando no se ejecuta en `ELECTRON_RUN_AS_NODE` no tendrá ningún efecto.

### --Inspect-BRK [= [host:] Puerto]

Activa el inspector en el host: puerto y rompe en el inicio del script del usuario. Host predeterminado: el puerto es 127.0.0.1:9229.

Con alias para `--debug-brk=[host:]port`.

### --Inspect-Port = [host:] Puerto

Configura el `host:port` para que se use cuando el inspector esté activado. Útil cuando se activa el inspector enviando la señal SIGUSR1. El host predeterminado es `127.0.0.1`.

Con alias para `--debug-port=[host:]port`.

### --Inspect [= [host:] Port]

Activa el inspector en `host:port`. El valor predeterminado es `127.0.0.1:9229`.

La integración con el inspector V8 permite que las herramientas como Chrome DevTools y IDEs se depuren y se perfien las instancias de electrones. Las herramientas se adjuntan a las instancias de electrones mediante un puerto TCP y se comunican utilizando el protocolo [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/).

Consulta la [depurar la][debugging-main-process] guía del proceso principal para obtener más detalles.

Con alias para `--debug[=[host:]port`.

### --Inspect-Publish-UID = stderr, http

Especifica las formas de la exposición a la URL del socket web del inspector.

Por defecto, el inspector WebSocket URL está disponible en stderr y en el punto final/JSON/List en http://host: Port/JSON/List.

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
