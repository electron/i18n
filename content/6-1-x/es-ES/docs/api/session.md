# Sesión

> Administra las sesiones del navegador, cookies, cache, configuración del proxy, etc.

Proceso: [principal](../glossary.md#main-process)</0>

El módulo `session` puede ser usado para crear nuevos objetos `session`.

También puede acceder el `session` de las páginas existentes utilizando la propiedad `session` de [`WebContents`](web-contents.md), o desde el módulo `session`.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Métodos

El módulo `sesión` tiene los siguientes métodos:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (opcional)
  * `cache` Boolean - En el caso de activar la memoria cache.

Regresa `Session` - Una instancia de session de la cadena `partition`. Cuando hay una `Session` existente con la misma `partition`, se devolverá la misma; de otra manera, una nueva instancia `Session` será creada con `options`.

Si la `partition` comienza con `persist:`, la página usará una sesión persistente disponible a todas las páginas en la aplicación con la misma `partition`. si no hay un prefijo `persist:`, la página usará una sesión en memoria. Si la `partition` está vacía entonces la sesión de la aplicación será usada por defecto.

Al crear una `Session` con `options`, tiene que asegurar que la `Session` con la `partition` nunca ha sido usada antes. No hay manera de cambiar las `options` de un objeto `Session` existente.

## Propiedades

El módulo `session` tiene las siguientes propiedades:

### `session.defaultSession`

Un objeto `Session`, es el objeto de session de la aplicación por defecto.

## Class: Session

> Obtener y configurar las propiedades de una sesión.

Proceso: [principal](../glossary.md#main-process)</0>

Puede crear un objeto `Session` en el módulo `session`:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Eventos de Instancia

Los siguientes eventos están disponibles en instancias de `Session`:

#### Evento: 'will-download'

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Emitido cuando Electron está por descargar un `elemento` en `Contenido web`.

Llamando `event.preventDefault()` Se cancelará la descarga y el `elemento` no estará disponible para el siguiente tick del proceso.

```javascript
const { session } = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Métodos de Instancia

Los siguientes métodos están disponibles para instancias de `Sesión`:

#### `ses.getCacheSize(callback)`

* `callback` Función
  * `size` Integer - Tamaño en bytes del caché usado.
  * `error` Integer - El código de erro correspondiente al fallo.

La retrollamada es invocada con el tamaño actual de caché usado en la sesión.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.getCacheSize()`

Devuelve `Promise<Integer>` - El tamaño de cache de la sesión actual, en bytes.

#### `ses.clearCache(callback)`

* `Llamada` Funcion - Llamada cuando la operación está completada.
  * `error` Integer - El código de erro correspondiente al fallo.

Borra la memoria caché del HTTP de la sesión.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.clearCache()`

Devuelve `Promise<void>` - Se resuelve cuando la operación de limpieza de cache es completada.

Borra la memoria caché del HTTP de la sesión.

#### `ses.clearStorageData([options,] callback)`

* `options` Object (opcional)
  * `origin` String (opcional) - Debe seguir la representación de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (opcional) - Los tipos de almacenamientos para limpiar, puede contener: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (opcional) - El tipo de cuotas a limpiar, puede contener: `temporary`, `persistent`, `syncable`.
* `callback` Function (opcional) - Invocada cuando la operación ha finalizado.

Borra los datos de almacenamiento para la sesión actual.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.clearStorageData([options])`

* `options` Object (opcional)
  * `origin` String (opcional) - Debe seguir la representación de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (opcional) - Los tipos de almacenajes a limpiar, puede contener: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (opcional) - El tipo de cuotas a limpiar, puede contener: `temporary`, `persistent`, `syncable`.

Devuelve `Promise<void>` - Se resuelve cuando los datos del almacenamiento ha sido borrado.

#### `ses.flushStorageData()`

Escribe cualquier dato DOMStorage que no lo haya sido en disco.

#### `ses.setProxy(config, callback)`

* `config` Object
  * `pacScript` Cadena - El URL asociado con el archivo PAC.
  * `proxyRules` Cadena - Reglas indicando cual proxy utilizar.
  * `proxyBypassRules` Cadena - Reglas indicando cuál URL deben eludir la configuración del proxy.
* `Llamada` Funcion - Llamada cuando la operación está completada.

Configurar proxy.

Cuando `pacScript` y `proxyRules` están junto, la opción `proxyRules` es ignorada y le configuración `pacScript` es aplicada.

Las `proxyRules` tienen las siguientes reglas abajo:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Por ejemplo:

* `http=foopy:80;ftp=foopy2` - Usa proxy HTTP `foopy:80` para URL `http://`, HTTP proxy `foopy2:80` para URL `ftp://`.
* `foopy:80` - Usa Proxy HTTP `foopy:80` para todas las URLs.
* `foopy:80,bar,direct://` - Usa proxy HTTP `foopy:80` para todas las URLs, no sobre `bar` si`foopy:80` no está disponible, y después de eso no usar ningún proxy.
* `socks4://foopy` - Usa SOCKS v4 proxy `foopy:1080` para todas las URLs.
* `http=foopy,socks5://bar.com` - Usa HTTP proxy `foopy` para las URLs http, y falla para el proxy SOCKS5 `bar.com` si `foopy` no está disponible.
* `http=foopy,direct://` - Usa el proxy HTTP `foopy` para URLs http, y no usa el proxy si `foopy` no está disponible.
* `http=foopy;socks=foopy2` - Usa el proxy HTTP `foopy` para URLs HTTP, y usa `socks4://foopy2` para el resto de URLs.

El `proxyBypassRules` es una lista separada por comas de las reglasa que se describen a continuación:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   Une todos los nombres que coinciden con el patrón HOSTNAME_PATTERN.

   Ejemplos: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

 * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Une sufijos de dominios particulares.

   Ejemplos: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Une URLs que son literales de dirección IP.

   Ejemplos: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Ejemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` Cadena - El URL asociado con el archivo PAC.
  * `proxyRules` Cadena - Reglas indicando cual proxy utilizar.
  * `proxyBypassRules` Cadena - Reglas indicando cuál URL deben eludir la configuración del proxy.

Devuelve `Promise<void>` - Se resuelve cuando el proceso de configuración del proxy está completo.

Configurar proxy.

Cuando `pacScript` y `proxyRules` están junto, la opción `proxyRules` es ignorada y le configuración `pacScript` es aplicada.

Las `proxyRules` tienen las siguientes reglas abajo:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Por ejemplo:

* `http=foopy:80;ftp=foopy2` - Usa proxy HTTP `foopy:80` para URL `http://`, HTTP proxy `foopy2:80` para URL `ftp://`.
* `foopy:80` - Usa Proxy HTTP `foopy:80` para todas las URLs.
* `foopy:80,bar,direct://` - Usa proxy HTTP `foopy:80` para todas las URLs, no sobre `bar` si`foopy:80` no está disponible, y después de eso no usar ningún proxy.
* `socks4://foopy` - Usa SOCKS v4 proxy `foopy:1080` para todas las URLs.
* `http=foopy,socks5://bar.com` - Usa HTTP proxy `foopy` para las URLs http, y falla para el proxy SOCKS5 `bar.com` si `foopy` no está disponible.
* `http=foopy,direct://` - Usa el proxy HTTP `foopy` para URLs http, y no usa el proxy si `foopy` no está disponible.
* `http=foopy;socks=foopy2` - Usa el proxy HTTP `foopy` para URLs HTTP, y usa `socks4://foopy2` para el resto de URLs.

El `proxyBypassRules` es una lista separada por comas de las reglasa que se describen a continuación:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   Une todos los nombres que coinciden con el patrón HOSTNAME_PATTERN.

   Ejemplos: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

 * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Une sufijos de dominios particulares.

   Ejemplos: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Une URLs que son literales de dirección IP.

   Ejemplos: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Ejemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Función
  * `proxy` Cadena

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.resolveProxy(url)`

* `url` URL

Devuelve `Promise<string>` - Se resuelve con la información del proxy para `url`.

#### `ses.setDownloadPath(path)`

* `ruta` Cadena - la ubicación de descarga.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. Por defecto es false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emula la red con la configuración dada por la `sesión`.

```javascript
Para emular la conexión GPRS con rendimiento de 50kbps y latencia de 500ms.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Para emular la caída de la red.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function
  * `request` Object
    * `hostname` String
    * `certificate` [certificate](structures/certificate.md)
    * `verificationResult` String - Resultado de la verificación de chromium.
    * `errorCode` Integer - Código de error.
  * `callback` Función
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Indica éxito y deshabilita la verificación Certificate Transparency.
      * `-2` - Indica falla.
      * `-3` - Usa el resultado de verificación de chromium.

Establece el certificado de verificar proc de la `sesión`, el `proc` será cancelada con `proc(request, callback)` cuando sea solicitado una verificación del certificado del servidor. Llamando `callback(0)` se acepta el certificado, llamando `callback(-2)` se rechaza.

Llamando `setCertificateVerifyProc(null)` se reveritrá la verificación de certificado por defecto.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `contenido web` [contenido web](web-contents.md) - contenido web solicitando el permiso.  Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permiso` cadena - Enumeración de 'medios', 'geolocalización', 'notificaciones', 'midiSysex', 'bloque de puntero', 'Pantalla completa', 'Apertura externa'.
  * `callback` Función
    * `permiso concedido` Booleano - Permiso o denegado de permiso.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String(Opcional) - La ruta de la solicitud `openExternal`.
    * `mediaTypes` String[] (Opcional) - Los tipos de medios que pueden ser solicitados para el acceso, los elementos pueden ser `video` o `audio`
    * `requestingUrl` String - La ultima URL que el frame solicitante cargo
    * `isMainFrame` Boolean - Si el marco que realiza la solicitud es el marco principal

Configurar el controlador que será usado para responder las peticiones de permisos para la `sesión`. Llamando `callback(true)` se permitirá el permiso y `callback(false)` se rechazará. Para limpiar el manejador, llamar a `setPermissionRequestHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function<Boolean> | null
  * `webContents` [WebContents](web-contents.md) -WebContens comprobando el permiso.  Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permission` String - Enumeración de 'media'.
  * `requestingOrigin` String - La URL de origen para la comprobación de permisos
  * `details` Object - Some properties are only available on certain permission types.
    * `securityOrigin` String - El origen de seguridad de la comprobación `media`.
    * `mediaType` String - El tipo de acceso a los medios que se solicita, puede ser `video`, `audio` o `unknown`
    * `requestingUrl` String - La ultima URL que el frame solicitante cargo
    * `isMainFrame` Boolean - Si el marco que realiza la solicitud es el marco principal

Establece el manejador que puede ser usado para responder a las comprobaciones para `session`. Retornando `true` permitirá el permiso y `false` lo rechará. Para borrar el manejador, llame `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return false // denied
  }

  return true
})
```

#### `ses.clearHostResolverCache(callback)`

* `callback` Function (opcional) - Invocada cuando la operación ha finalizado.

Borra la caché de resolución de host.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.clearHostResolverCache()`

Devuelve `Promise<void>` - Se resuelve cuando la operación es completada.

Borra la caché de resolución de host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `dominio` Cadena - Una lista separada por coma de servidores para los cuales la autenticación integrada está habilitada.

Configura dinámicamente cada vez que se envíen credenciales para HTTP NTLM o negociaciones de autenticación.

```javascript
const { session } = require('electron')
// considera cualquier url que termine con `example.com`, `foobar.com`, `baz`
// para autenticación integrada.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// considera todas las Urls para autenticación integrada.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` cadena
* `lenguajes aceptados` Cadena (opcional)

Reemplaza el `userAgent` y los `lenguajes aceptados` para esta sesión.

Los `lenguajes aceptados` deben estar ordenados en una lista separada por coma de códigos de lenguaje, por ejemplo `"en-US,fr,de,ko,zh-CN,ja"`.

Esto no afecta el `contenido web` existente, y cada `contenido web` puede usar `webContents.setUserAgent` para sobreescribir el agente de sesión de usuario.

#### `ses.getUserAgent()`

Devuelve `Cadena` - El agente usuario para esta sesión.

#### `ses.getBlobData(identifier, callback)`

* `identificador` Cadena - UUID válido.
* `callback` Función
  * `resultado` Buffer - datos Blob.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.getBlobData(identifier)`

* `identificador` Cadena - UUID válido.

Devuelve `Promise<Buffer>` - Se resuelve con datos blob.

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `ruta` Cadena - ruta de acceso absoluta de la descarga.
  * `Cadeba URL` Cadena[] - Cadena de URL completa para la descarga.
  * `mimeType` Cadena (opcional)
  * `offset` Entero - rango de inicio para la descarga.
  * `longitud` Entero - longitud total de la descarga.
  * `última modificación` Cadena - Último valor del encabezado modificado.
  * `eTag` Cadena - Valor Etag del encabezado.
  * `Tiempo de inicio` Doble (opcional) - Tiempo en que se inició la descarga en números de segundo desde epoch de UNIX.

Permite `cancelar` o `interrumpir` descargas de una `Sesión` previa. La API generará un [elemento de descarga](download-item.md) que puede ser accesado con el evento [se descargará](#event-will-download). El [Elemento de descarga](download-item.md) no tendrá ningún `contenido web` asociado con el y el estado inicial será `interrumpido`. La descarga empezará solo cuando la `reanudación` de la API sea llamada en el [elemento descargado](download-item.md).

#### `ses.clearAuthCache(options, callback)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `Llamada` Funcion - Llamada cuando la operación está completada.

Limpia caché de autenticación HTTP de la sesión.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `ses.clearAuthCache(options)` _(deprecated)_

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Devuelve `Promise<void>` - resuelve cuando se ha borrado el caché de autenticación HTTP de la sesión.

#### `ses.clearAuthCache()`

Devuelve `Promise<void>` - resuelve cuando se ha borrado el caché de autenticación HTTP de la sesión.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - Un array de ruta absoluta para precargar scripts

Agrega scripts que se ejecutarán en TODOS los contenidos web que están asociados con esta sesión justo antes de que se ejecuten los scripts de `preload` normales.

#### `ses.getPreloads()`

Devuelve un array de rutas `String[]` para precargar guiones que han sido registrado.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Sesión`:

#### `ses.cookies`

Un objeto de [Cookies](cookies.md) para esta esión.

#### `ses.webRequest`

Un objeto [petición web](web-request.md) para esta sesión.

#### `ses.protocol`

Un objeto de [protocolo](protocol.md) para esta sesión.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, function (error) {
    if (error) console.error('Failed to register protocol')
  })
})
```

#### `ses.netLog`

Un objeto [NetLog](net-log.md) para esta sesión.

```javascript
const { app, session } = require('electron')

app.on('ready', async function () {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // Después de algunos eventos de red
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
