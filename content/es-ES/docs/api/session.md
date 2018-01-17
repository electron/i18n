# session

> Administra las sesiones del navegador, cookies, cache, configuración del proxy, etc.

Proceso: [Principal](../glossary.md#main-process)

El módulo `sesion` puede ser usado para crear un nuevo objeto `sesion`.

También puede accesar la `sesión` de las páginas existentes usando la propiedad `sesión` de [`WebContents`](web-contents.md), o desde el módulo `sesión`.

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

* `Paritición` Cadena
* `options` Object 
  * `cache` Booleano - En el caso de activar la memoria cache.

Regresa `Sesión` - Una reunión de la cadena `partición`. Cuando hay una `Sesión` existente con la misma `partición`, se devolverá; de otra manera, una nueva instancia `Sesión` será creada con `opciones`.

Si la `partition` comienza con `persistir:`, la página usará una sesión persistente disponible a todas las páginas en la aplicación con la misma `partición`. si no hay un prefijo `persistir:`, la página usará una sesión en memoria. Si la `partición` está vacía entonces la sesión de la aplicación será usada por defecto.

Al crear una `Sesión` con `opciones`, tiene que asegurar la `Sesión` con la `partición` nunca ha sido usada antes. No hay manera de cambiar las `opciones` de un objeto `Sesión` existente.

## Propiedades

El módulo `sesión` tiene las siguientes propiedades:

### `session.defaultSession`

Un objeto `Sesión`, el objeto de sesión de la aplicación por defecto.

## Clase: Sesión

> Obtener y configurar las propiedades de una sesión.

Proceso: [Principal](../glossary.md#main-process)

Puede crear un objeto `Sesión` en el módulo `sesión`:

```javascript
const {session} = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Eventos de Instancia

Los siguientes eventos están disponibles en instancias de `Sesión`:

#### Evento: "Se-descargará"

* `evento` Evento
* `item` [DownloadItem](download-item.md)
* `Contenidosweb` [Contenidosweb](web-contents.md)

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

* `llamada de vuelta` Función 
  * `tamaño` Entero - Tamaño de memoria caché usada en bites.

Llamar es invocado con el tamaño actual en memoria caché de la sesión.

#### `ses.clearCache(callback)`

* `Llamada` Función - llamada cuando se realiza la operación

Borra la memoria caché del HTTP de la sesión.

#### `ses.clearStorageData([options, callback])`

* `options` Objecto (opcional) 
  * `origen` Cadena - (opcional) Debe seguir la representación de `window.location.origin` `scheme://host:port`.
  * `storages` String[] - (optional) The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` Cadena[] - (opcional) El tipo de acciones que borrar, puede contener: `temporary`, `persistent`, `syncable`.
* `Llamada` Función (opcional) - Llamada cuando se ha realizado la operación.

Borra los datos de almacenamiento web.

#### `ses.flushStorageData()`

Escribe cualquier dato DOMStorage que no lo haya sido en disco.

#### `ses.setProxy(config, callback)`

* `configuración` Objecto 
  * `pacScript` Cadena - El URL asociado con el archivo PAC.
  * `proxyRules` Cadena - Reglas indicando cual proxy utilizar.
  * `proxyBypassRules` Cadena - Reglas indicando cuál URL deben eludir la configuración del proxy.
* `Llamada` Funcion - Llamada cuando la operación está completada.

Configurar proxy.

Cuando `pacScript` y `proxyRules` están junto, la opción `proxyRules` es ignorada y le configuración `pacScript` es aplicada.

Las `proxyRules` tienen las siguientes reglas abajo:

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
    

Por ejemplo:

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

El `proxyBypassRules` es una lista separada por comas de las reglasa que se describen a continuación:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
  
  Une todos los nombres que coinciden con el patrón HOSTNAME_PATTERN.
  
  Examples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Une sufijos de dominios particulares.
    
    Ejemplos: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  Une URLs que son literales de dirección IP.
  
  Ejemplos: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGHT_IN_BITS`
  
  Une cualquier URL que es literal a una IP que cae en un rango determinado. El rango de IP es especificado usando la notación CIDR.
  
  Examples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Unir direcciones locales. El significado de `<local>` es el que el host determine que coincida entre: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `llamada de vuelta` Función 
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

#### `ses.setDownloadPath(path)`

* `path` String - The download location

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object 
  * `offline` Boolean (optional) - Whether to emulate network outage. Defaults to false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emulates network with the given configuration for the `session`.

```javascript
// To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Función 
  * `request` Object 
    * `hostname` String
    * `certificate` [certificate](structures/certificate.md)
    * `error` String - Verification result from chromium.
  * `llamada de vuelta` Función 
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used. 
      * `` - Indicates success and disables Certificate Transperancy verification.
      * `-2` - Indicates failure.
      * `-3` - Uses the verification result from chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

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

* `handler` Función 
  * `webContents` [WebContents](web-contents.md) - WebContents requesting the permission.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `llamada de vuelta` Función 
    * `permissionGranted` Boolean - Allow or deny the permission

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it.

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

* `Llamada` Función (opcional) - Llamada cuando se ha realizado la operación.

Clears the host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-seperated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

```javascript
const {session} = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### `ses.getUserAgent()`

Returns `String` - The user agent for this session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `llamada de vuelta` Función 
  * `result` Buffer - Blob data.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `options` Object 
  * `path` String - Absolute path of the download.
  * `urlChain` String[] - Complete URL chain for the download.
  * `mimeType` String (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` String - Last-Modified header value.
  * `eTag` String - ETag header value.
  * `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function (optional) - Called when operation is done

Clears the session’s HTTP authentication cache.

### Propiedades de Instancia

The following properties are available on instances of `Session`:

#### `ses.cookies`

A [Cookies](cookies.md) object for this session.

#### `ses.webRequest`

A [WebRequest](web-request.md) object for this session.

#### `ses.protocol`

A [Protocol](protocol.md) object for this session.

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