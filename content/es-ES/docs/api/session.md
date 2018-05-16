# session

> Administra las sesiones del navegador, cookies, cache, configuración del proxy, etc.

Process: [Main](../glossary.md#main-process)

El módulo `session` puede ser usado para crear nuevos objetos `session`.

También puede acceder el `session` de las páginas existentes utilizando la propiedad `session` de [`WebContents`](web-contents.md), o desde el módulo `session`.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Métodos

El módulo `sesión` tiene los siguientes métodos:

### `session.fromPartition(partition[, options])`

* `partition` String
* `opciones` Objecto (opcional) 
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

Process: [Main](../glossary.md#main-process)

Puede crear un objeto `Session` en el módulo `session`:

```javascript
const {session} = require('electron')
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
const {session} = require('electron')
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

* `callback` Function 
  * `size` Integer - Tamaño en bytes del caché usado.

La retrollamada es invocada con el tamaño actual de caché usado en la sesión.

#### `ses.clearCache(callback)`

* `Llamada` Funcion - Llamada cuando la operación está completada.

Borra la memoria caché del HTTP de la sesión.

#### `ses.clearStorageData([options, callback])`

* `options` Object (opcional) 
  * `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (opcional) - Invocada cuando la operación ha finalizado.

Borra los datos de almacenamiento web.

#### `ses.flushStorageData()`

Escribe cualquier dato DOMStorage que no lo haya sido en disco.

#### `ses.setProxy(config, callback)`

* `configuración` Objecto 
  * `pacScript` Cadena - El URL asociado con el archivo PAC.
  * `proxyRules` Cadena - Reglas indicando cual proxy utilizar.
  * `proxyBypassRules` Cadena - Reglas indicando cuál URL deben eludir la configuración del proxy.
* `callback` Function - Invocada cuando la operación ha finalizado.

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
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

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
  
  Une cualquier URL que es literal a una IP que cae en un rango determinado. El rango de IP es especificado usando la notación CIDR.
  
  Ejemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Unir direcciones locales. El significado de `<local>` es el que el host determine que coincida entre: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function 
  * `proxy` Cadena

Resuelve la información del proxy para una `url`. La `llamada` será hecha con `callback(proxy)` cuando se realice la solicitud.

#### `ses.setDownloadPath(path)`

* `ruta` Cadena - la ubicación de descarga.

Configura el directorio de descargas. Por defecto, el directorio de descargas será `Descargas` en la carpeta respectiva de la aplicación.

#### `ses.enableNetworkEmulation(options)`

* `opciones` Object 
  * `fuera de linea` Booleano (opcional) - cuando la red emulada es interrumpida. por defecto es falso.
  * `Latencia` Doble (opcional) - RTT en ms. Por defecto es 0 lo cual deshabilitará la regulación de la latencia.
  * `downloadThroughput` Doble (opcional) - Velocidad de descarga en Bps. Por defecto es 0 que deshabilitará la regulación de descarga.
  * `uploadThroughput` Doble (opcional) - Velocidad de subida en Bps. por defecto es 0 lo cual deshabilitará la regulación de subida.

Emula la red con la configuración dada por la `sesión`.

```javascript
Para emular la conexión GPRS con rendimiento de 50kbps y latencia de 500ms.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Para emular la caída de la red.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Deshabilita cualquier emulación de red activa durante la `sesión`. Reinicia a la configuración de red original.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `request` Object 
    * `hostname` String
    * `certificate` [certificate](structures/certificate.md)
    * `verificationResult` String - Resultado de la verificación de chromium.
    * `errorCode` Integer - Código de error.
  * `callback` Function 
    * `verificationResult` Integer - Valor que puede ser uno de los códigos de error certificado de [aquí](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Además de los códigos de error certificado, los siguientes códigos especiales pueden ser usados. 
      * `` - Indica éxito y deshabilita la verificación Certificate Transparency.
      * `-2` - Indica falla.
      * `-3` - Usa el resultado de verificación de chromium.

Establece el certificado de verificar proc de la `sesión`, el `proc` será cancelada con `proc(request, callback)` cuando sea solicitado una verificación del certificado del servidor. Llamando `callback(0)` se acepta el certificado, llamando `callback(-2)` se rechaza.

Llamando `setCertificateVerifyProc(null)` se reveritrá la verificación de certificado por defecto.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const {hostname} = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `manejador` Function | null 
  * `contenido web` [contenido web](web-contents.md) - contenido web solicitando el permiso.
  * `permiso` cadena - Enumeración de 'medios', 'geolocalización', 'notificaciones', 'midiSysex', 'bloque de puntero', 'Pantalla completa', 'Apertura externa'.
  * `callback` Function 
    * `permiso concedido` Booleano - Permiso o denegado de permiso.
  * `details` Object - Some properties are only available on certain permission types. 
    * `externalURL` String - The url of the `openExternal` request.

Configurar el controlador que será usado para responder las peticiones de permisos para la `sesión`. Llamando `callback(true)` se permitirá el permiso y `callback(false)` se rechazará. Para limpiar el manejador, llamar a `setPermissionRequestHandler(null)`.

```javascript
const {session} = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.clearHostResolverCache([callback])`

* `callback` Function (opcional) - Invocada cuando la operación ha finalizado.

Borra la caché de resolución de host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Configura dinámicamente cada vez que se envíen credenciales para HTTP NTLM o negociaciones de autenticación.

```javascript
const {session} = require('electron')
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
* `callback` Function 
  * `resultado` Buffer - datos Blob.

#### `ses.createInterruptedDownload(options)`

* `opciones` Object 
  * `ruta` Cadena - ruta de acceso absoluta de la descarga.
  * `Cadeba URL` Cadena[] - Cadena de URL completa para la descarga.
  * `mimeType` Cadena (opcional)
  * `offset` Entero - rango de inicio para la descarga.
  * `longitud` Entero - longitud total de la descarga.
  * `última modificación` Cadena - Último valor del encabezado modificado.
  * `eTag` Cadena - Valor Etag del encabezado.
  * `Tiempo de inicio` Doble (opcional) - Tiempo en que se inició la descarga en números de segundo desde epoch de UNIX.

Permite `cancelar` o `interrumpir` descargas de una `Sesión` previa. La API generará un [elemento de descarga](download-item.md) que puede ser accesado con el evento [se descargará](#event-will-download). El [Elemento de descarga](download-item.md) no tendrá ningún `contenido web` asociado con el y el estado inicial será `interrumpido`. La descarga empezará solo cuando la `reanudación` de la API sea llamada en el [elemento descargado](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function (opcional) - Invocada cuando la operación ha finalizado.

Limpia caché de autenticación HTTP de la sesión.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Sesión`:

#### `ses.cookies`

Un objeto de [Cookies](cookies.md) para esta esión.

#### `ses.webRequest`

Un objeto [petición web](web-request.md) para esta sesión.

#### `ses.protocol`

Un objeto de [protocolo](protocol.md) para esta sesión.

```javascript
const {app, session} = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, function (error) {
    if (error) console.error('Failed to register protocol')
  })
})
```