# session

> Administra las sesiones del navegador, cookies, cache, configuración del proxy, etc.

Proceso: [Main](../glossary.md#main-process)

El módulo `session` puede ser usado para crear nuevos objetos `session`.

También puede acceder el `session` de las páginas existentes utilizando la propiedad `session` de [`WebContents`](web-contents.md), o desde el módulo `session`.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Métodos

El módulo `session` tiene los siguientes métodos:

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

Proceso: [Main](../glossary.md#main-process)

Puede crear un objeto `Session` en el módulo `session`:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Eventos de Instancia

Los siguientes eventos están disponibles en instancias de `Session`:

#### Evento: 'will-download'

Devuelve:

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

#### Evento: 'extension-loaded'

Devuelve:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded. This occurs whenever an extension is added to the "enabled" set of extensions. Esto incluye:

* Extensions being loaded from `Session.loadExtension`.
* Extensions being reloaded:
  * from a crash.
  * if the extension requested it ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Evento: 'extension-unloaded'

Devuelve:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. This occurs when `Session.removeExtension` is called.

#### Evento: 'extension-ready'

Devuelve:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded and all necessary browser state is initialized to support the start of the extension's background page.

#### Evento: 'preconnect'

Devuelve:

* `event` Event
* `preconnectUrl` String - La URL que esta siendo solicitada para preconexión por el renderer.
* `allowCredentials` Boolean - True si el renderer está solicitando que la conexión incluya las credenciales (vea el [especificación](https://w3c.github.io/resource-hints/#preconnect) para más detalles.)

Emitido cuando un render process solicita preconexión a una URL, generalmente debido a [resource hint](https://w3c.github.io/resource-hints/).

#### Evento: 'spellcheck-dictionary-initialized'

Devuelve:

* `event` Event
* `languageCode` String - El código de idioma del archivo de diccionario

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

#### Evento: 'spellcheck-dictionary-download-begin'

Devuelve:

* `event` Event
* `languageCode` String - El código de idioma del archivo de diccionario

Emitido cuando un archivo de diccionario hunspell se comienza a descargar

#### Evento: 'spellcheck-dictionary-download-success'

Devuelve:

* `event` Event
* `languageCode` String - El código de idioma del archivo de diccionario

Emitido cuando un archivo de diccionario hunspell se ha descargado correctamente

#### Evento: 'spellcheck-dictionary-download-failure'

Devuelve:

* `event` Event
* `languageCode` String - El código de idioma del archivo de diccionario

Emitted when a hunspell dictionary file download fails.  For details on the failure you should collect a netlog and inspect the download request.

#### Evento: 'select-serial-port' _Experimental_

Devuelve:

* `event` Event
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Función
  * `portId` String

Emitted when a serial port needs to be selected when a call to `navigator.serial.requestPort` is made. `callback` should be called with `portId` to be selected, passing an empty string to `callback` will cancel the request.  Additionally, permissioning on `navigator.serial` can be managed by using [ses.setPermissionCheckHandler(handler)](#sessetpermissioncheckhandlerhandler) with the `serial` permission.

Because this is an experimental feature it is disabled by default.  To enable this feature, you will need to use the `--enable-features=ElectronSerialChooser` command line switch.  Additionally because this is an experimental Chromium feature you will need to set `enableBlinkFeatures: 'Serial'` on the `webPreferences` property when opening a BrowserWindow.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-features', 'ElectronSerialChooser')

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  })
  win.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === '9025' && device.productId === '67'
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(selectedPort.portId)
    }
  })
})
```

#### Evento: 'serial-port-added' _Experimental_

Devuelve:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a new serial port becomes available.  For example, this event will fire when a new USB device is plugged in.

#### Evento: 'serial-port-removed' _Experimental_

Devuelve:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a serial port has been removed.  For example, this event will fire when a USB device is unplugged.

### Métodos de Instancia

Los siguientes métodos están disponibles para instancias de `Sesión`:

#### `ses.getCacheSize()`

Devuelve `Promise<Integer>` - El tamaño de cache de la sesión actual, en bytes.

#### `ses.clearCache()`

Devuelve `Promise<void>` - Se resuelve cuando la operación de limpieza de cache es completada.

Borra la memoria caché del HTTP de la sesión.

#### `ses.clearStorageData([options])`

* `options` Object (opcional)
  * `origin` String (opcional) - Debe seguir la representación de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (opcional) - Los tipos de almacenamientos para limpiar, puede contener: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. If not specified, clear all storage types.
  * `quotas` String[] (opcional) - El tipo de cuotas a limpiar, puede contener: `temporary`, `persistent`, `syncable`. If not specified, clear all quotas.

Devuelve `Promise<void>` - Se resuelve cuando los datos del almacenamiento ha sido borrado.

#### `ses.flushStorageData()`

Escribe cualquier dato DOMStorage que no lo haya sido en disco.

#### `ses.setProxy(config)`

* Objeto `config`
  * `mode` String (optional) - The proxy mode. Should be one of `direct`, `auto_detect`, `pac_script`, `fixed_servers` or `system`. If it's unspecified, it will be automatically determined based on other specified options.
    * `direct` In direct mode all connections are created directly, without any proxy involved.
    * `auto_detect` In auto_detect mode the proxy configuration is determined by a PAC script that can be downloaded at http://wpad/wpad.dat.
    * `pac_script` In pac_script mode the proxy configuration is determined by a PAC script that is retrieved from the URL specified in the `pacScript`. This is the default mode if `pacScript` is specified.
    * `fixed_servers` In fixed_servers mode the proxy configuration is specified in `proxyRules`. This is the default mode if `proxyRules` is specified.
    * `system` In system mode the proxy configuration is taken from the operating system. Note that the system mode is different from setting no proxy configuration. In the latter case, Electron falls back to the system settings only if no command-line options influence the proxy configuration.
  * `pacScript` String (opcional) - La URL asociada con el archivo PAC.
  * `proxyRules` String (opcional) - Reglas indicando cuales proxies usar.
  * `proxyBypassRules` String (opcional) - Reglas indicando que URLs deberían ser omitidas por la configuración del proxy.

Devuelve `Promise<void>` - Se resuelve cuando el proceso de configuración del proxy está completo.

Configurar proxy.

When `mode` is unspecified, `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

You may need `ses.closeAllConnections` to close currently in flight connections to prevent pooled sockets using previous proxy from being reused by future requests.

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

   Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Une URLs que son literales de dirección IP.

   Ejemplos: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Ejemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Devuelve `Promise<String>` - Se resuelve con la información del proxy para `url`.

#### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when the all internal states of proxy service is reset and the latest proxy configuration is reapplied if it's already available. The pac script will be fetched from `pacScript` again if the proxy mode is `pac_script`.

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

#### `ses.preconnect(options)`

* `options` Object
  * `url` String - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` Number (optional) - number of sockets to preconnect. Must be between 1 and 6. Por defecto es 1.

Preconecta el número dado de sockets a un origen.

#### `ses.closeAllConnections()`

Returns `Promise<void>` - Resolves when all connections are closed.

**Note:** It will terminate / fail all requests currently in flight.

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * Objeto `request`
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [certificate](structures/certificate.md)
    * `verificationResult` String - Resultado de la verificación de chromium.
    * `errorCode` Integer - Código de error.
  * `callback` Función
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Indica éxito y deshabilita la verificación Certificate Transparency.
      * `-2` - Indica falla.
      * `-3` - Usa el resultado de verificación de chromium.

Establece el certificado de verificar proc de la `sesión`, el `proc` será cancelada con `proc(request, callback)` cuando sea solicitado una verificación del certificado del servidor. Llamando `callback(0)` se acepta el certificado, llamando `callback(-2)` se rechaza.

Llamando `setCertificateVerifyProc(null)` se reveritrá la verificación de certificado por defecto.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

> **NOTE:** The result of this procedure is cached by the network service.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `contenido web` [contenido web](web-contents.md) - contenido web solicitando el permiso.  Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permission` String - The type of requested permission.
    * `clipboard-read` - Request access to read from the clipboard.
    * `media` -  Request access to media devices such as camera, microphone and speakers.
    * `display-capture` - Solicita acceso para capturar la pantalla.
    * `mediaKeySystem` - Request access to DRM protected content.
    * `geolocation` - Request access to user's current location.
    * `notifications` - Request notification creation and the ability to display them in the user's system tray.
    * `midi` - Request MIDI access in the `webmidi` API.
    * `midiSysex` - Request the use of system exclusive messages in the `webmidi` API.
    * `pointerLock` - Request to directly interpret mouse movements as an input method. Pulse [aquí](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) para saber más.
    * `fullscreen` - Request for the app to enter fullscreen mode.
    * `openExternal` - Request to open links in external applications.
    * `unknown` - Una solicitud de premiso no reconocida
  * `callback` Función
    * `permiso concedido` Booleano - Permiso o denegado de permiso.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (opcional) - La url de la petición `openExternal`.
    * `mediaTypes` String[] (opcional) - Los tipos de medios que son solicitados para acceso, los elementos pueden ser `video` o `audio`
    * `requestingUrl` String - La ultima URL que el frame solicitante cargo
    * `isMainFrame` Boolean - Si el marco que realiza la solicitud es el marco principal

Configurar el controlador que será usado para responder las peticiones de permisos para la `sesión`. Llamando `callback(true)` se permitirá el permiso y `callback(false)` se rechazará. Para limpiar el manejador, llamar a `setPermissionRequestHandler(null)`.  Por favor, tenga en cuenta que debe implementar también `setPermissionCheckHandler` para obtener el manejo completo de los permisos. La mayoría de las APIs web hacen una verificación de permiso y luego hacen una solicitud de permiso si la verificación es denegada.

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

* `handler` Función\<Boolean> | null
  * `webContents` ([WebContents](web-contents.md) | null) - WebContents verificando el permiso.  Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.  Los subframes de origen cruzado que hacen chequeos de permisos pasarán un contenido web `null` a este manejador.  Debería usar `embeddingOrigin` y `requestingOrigin` para determinar que origen se encuentra en el marco propietario y en el marco solicitante respectivamente.
  * `permission` String - Type of permission check.  Valid values are `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, or `serial`.
  * `requestingOrigin` String - La URL de origen para la comprobación de permisos
  * `details` Object - Some properties are only available on certain permission types.
    * `embeddingOrigin` String (opcional) - El origen del marco que incrusta el marco que hizo la verificación de permisos.  Sólo se establece cross-origin submarcos haciendo comprobaciones de permisos.
    * `securityOrigin` String (opcional) - El origen de seguridad de la comprobación `media`.
    * `mediaType` String (opcional) - El tipo de acceso a los medios que se solicita puede ser `video`, `audio` o `unknown`
    * `requestingUrl` String (opcional) - La última URL que representa el marco cargado.  Esto no es proveído para cross-origin submarcos haciendo comprobaciones de permiso.
    * `isMainFrame` Boolean - Si el marco que realiza la solicitud es el marco principal

Establece el manejador que puede ser usado para responder a las comprobaciones para `session`. Retornando `true` permitirá el permiso y `false` lo rechará.  Por favor, tenga en cuenta que debe implementar también `setPermissionRequestHandler` para obtener el manejo completo de los permisos. La mayoría de las APIs web hacen una verificación de permiso y luego hacen una solicitud de permiso si la verificación es denegada. Para borrar el manejador, llame `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
const url = require('url')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'some-host' && permission === 'notifications') {
    return true // concedido
  }

  return false // denegado
})
```

#### `ses.clearHostResolverCache()`

Devuelve `Promise<void>` - Se resuelve cuando la operación es completada.

Borra la caché de resolución de host.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `dominio` Cadena - Una lista separada por coma de servidores para los cuales la autenticación integrada está habilitada.

Configura dinámicamente cada vez que se envíen credenciales para HTTP NTLM o negociaciones de autenticación.

```javascript
const { session } = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` cadena
* `lenguajes aceptados` Cadena (opcional)

Reemplaza el `userAgent` y los `lenguajes aceptados` para esta sesión.

Los `lenguajes aceptados` deben estar ordenados en una lista separada por coma de códigos de lenguaje, por ejemplo `"en-US,fr,de,ko,zh-CN,ja"`.

Esto no afecta el `contenido web` existente, y cada `contenido web` puede usar `webContents.setUserAgent` para sobreescribir el agente de sesión de usuario.

#### `ses.isPersistent()`

Devuelve `Boolean` - Si la sesión es persistente o no. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.

#### `ses.getUserAgent()`

Devuelve `Cadena` - El agente usuario para esta sesión.

#### `ses.setSSLConfig(config)`

* Objeto `config`
  * `minVersion` String (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. Por defecto a `tls1`.
  * `maxVersion` String (opcional) - Puede ser `tls1.2` o `tls1.3`. The maximum SSL version to allow when connecting to remote servers. Por defecto es `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.

#### `ses.getBlobData(identifier)`

* `identificador` Cadena - UUID válido.

Devuelve `Promise<Buffer>` - Se resuelve con datos blob.

#### `ses.downloadURL(url)`

* `url` String

Inicia una descargar del recurso en `url`. La API generará un [DownloadItem](download-item.md) que puede ser accedido con el evento [will-download](#event-will-download).

**Note:** Esto no realiza ninguna comprobación de seguridad relacionada con la pagina de origen a diferencia de [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `ruta` Cadena - ruta de acceso absoluta de la descarga.
  * `Cadeba URL` Cadena[] - Cadena de URL completa para la descarga.
  * `mimeType` Cadena (opcional)
  * `offset` Entero - rango de inicio para la descarga.
  * `longitud` Entero - longitud total de la descarga.
  * `lastModified` String (opcional) - Último valor del encabezado modificado.
  * `eTag` String (opcional) - Valor ETag del encabezado.
  * `Tiempo de inicio` Doble (opcional) - Tiempo en que se inició la descarga en números de segundo desde epoch de UNIX.

Permite `cancelar` o `interrumpir` descargas de una `Sesión` previa. La API generará un [elemento de descarga](download-item.md) que puede ser accesado con el evento [se descargará](#event-will-download). El [Elemento de descarga](download-item.md) no tendrá ningún `contenido web` asociado con el y el estado inicial será `interrumpido`. La descarga empezará solo cuando la `reanudación` de la API sea llamada en el [elemento descargado](download-item.md).

#### `ses.clearAuthCache()`

Devuelve `Promise<void>` - resuelve cuando se ha borrado el caché de autenticación HTTP de la sesión.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - Un array de ruta absoluta para precargar scripts

Agrega scripts que se ejecutarán en TODOS los contenidos web que están asociados con esta sesión justo antes de que se ejecuten los scripts de `preload` normales.

#### `ses.getPreloads()`

Devuelve un array de rutas `String[]` para precargar guiones que han sido registrado.

#### `ses.setSpellCheckerEnabled(enable)`

* `enable` Boolean

Sets whether to enable the builtin spell checker.

#### `ses.isSpellCheckerEnabled()`

Returns `Boolean` - Whether the builtin spell checker is enabled.

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - Un array de códigos de idiomas para habilitar corrector ortográfico.

El corrector ortográfico integrado no detecta automáticamente en que idioma un usuario esta escribiendo.  Para que el corrector ortográfico compruebe correctamente sus palabras, usted debe llamar a esta API con un array de códigos de idiomas.  Usted puede obtener la lista de los códigos de idiomas soportados con la propiedad `ses.availableSpellCheckerLanguages`.

**Note:** On macOS the OS spellchecker is used and will detect your language automatically.  This API is a no-op on macOS.

#### `ses.getSpellCheckerLanguages()`

Devuelve `String[]` - Un array de códigos de idiomas para los que el corrector ortográfico esta habilitado.  Si esta lista está vacía, el corrector ortográfico volverá a usar `en-US`.  Por defecto al iniciar si esta lista de opción es una lista vacía Electron tratará de llenar esta opción con el locale actual del sistema operativo.  Este configuración es persistente entre reinicios.

**Note:** On macOS the OS spellchecker is used and has its own list of languages.  This API is a no-op on macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - Una URL base para Electron desde donde descargar los diccionarios hunspell.

Por defecto Electron descargará diccionarios hunspell desde la CDN de Chromium.  Si usted quiere sobrescribir este comportamiento puede usar esta API para apuntar el descargador de diccionarios a su propia versión alojada de diccionarios hunspell.  Nosotros publicamos un archivo `hunspell_dictionaries.zip` con cada versión el cual contiene los archivos que necesitas para alojar aquí, el servidor de archivos debe ser **case insensitive**, debe cargar cada archivo dos veces, una como tiene este archivo ZIP y otra con el nombre del archivo todo con minúsculas.

Si los archivos presentes en `hunspell_dictionaries.zip` están disponible en `https://example.com/dictionaries/language-code.bdic` entonces entonces debería llamar esta api con `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Por favor, tenga en cuenta la barra final.  La URL a los diccionarios esta formada como `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files.  This API is a no-op on macOS.

#### `ses.listWordsInSpellCheckerDictionary()`

Devuelve `Promise<String[]>` - Un array de todas las palabras en el diccionario personalizado de la aplicación. Resolves when the full dictionary is loaded from disk.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - La palabra que desea agregar al diccionario

Devuelve `Boolean` - Si la palabra fue correctamente escrita al diccionario personalizado. Esta API no funcionará en sesiones no persistentes (en-memoría).

**Note:** En macOS y Windows 10 esta palabra será escrita al diccionario personalizado del sistema operativo también

#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` String - The word you want to remove from the dictionary

Devuelve `Boolean` - Si la palabra fue eliminada con éxito del diccionario personalizado. Esta API no funcionará en sesiones no persistentes (en-memoría).

**Note:** On macOS and Windows 10 this word will be removed from the OS custom dictionary as well

#### `ses.loadExtension(path[, options])`

* `path` String - Path to a directory containing an unpacked Chrome extension
* `options` Object (opcional)
  * `allowFileAccess` Boolean - Si permitir que la extensión lea los archivos locales sobre el protocolo `file://` e inyecte scripts contenido dentro de las páginas `file://`. Esto es necesario por ejemplo para cargar las extensiones devtools en las URLs `file://`. Por defecto es false.

Devuelve `Promise<Extension>` - se resuelve cuando la extensión está cargada.

This method will raise an exception if the extension could not be loaded. If there are warnings when installing the extension (e.g. if the extension requests an API that Electron does not support) then they will be logged to the console.

Note that Electron does not support the full range of Chrome extensions APIs. Vea el [APIs de extensiones soportadas](extensions.md#supported-extensions-apis) para más detalles sobre que es soportado.

Note that in previous versions of Electron, extensions that were loaded would be remembered for future runs of the application. This is no longer the case: `loadExtension` must be called on every boot of your app if you want the extension to be loaded.

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess is required to load the devtools extension on file:// URLs.
    { allowFileAccess: true }
  )
  // Note that in order to use the React DevTools extension, you'll need to
  // download and unzip a copy of the extension.
})
```

This API does not support loading packed (.crx) extensions.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

**Note:** Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.

#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID of extension to remove

Unloads an extension.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `ses.getExtension(extensionId)`

* `extensionId` String - ID of extension to query

Devuelve `Extension` | `null` - La extensión cargada con el ID dado.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `ses.getAllExtensions()`

Devuelve `Extension[]` - Una lista de todas las extensiones cargadas.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `ses.getStoragePath()`

A `String | null` indicating the absolute file system path where data for this session is persisted on disk.  For in memory sessions this returns `null`.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Sesión`:

#### `ses.availableSpellCheckerLanguages` _Readonly_

Un array `String[]` que consiste en todos los idiomas conocidos disponibles para el corrector ortográfico.  Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.

#### `ses.spellCheckerEnabled`

A `Boolean` indicating whether builtin spell checker is enabled.

#### `ses.storagePath` _Readonly_

A `String | null` indicating the absolute file system path where data for this session is persisted on disk.  For in memory sessions this returns `null`.

#### `ses.cookies` _Readonly_

Un objeto [`Cookies`](cookies.md) para esta sesión.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

Un objeto [`WebRequest`](web-request.md) para esta sesión.

#### `ses.protocol` _Readonly_

Un objeto [`Protocol`](protocol.md) para esta sesión.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })) {
    console.error('Failed to register protocol')
  }
})
```

#### `ses.netLog` _Readonly_

Un objeto [`NetLog`](net-log.md) para esta sesión.

```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
