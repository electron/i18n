# Sesión

> Administra las sesiones del navegador, cookies, cache, configuración del proxy, etc.

Proceso: [Main](../glossary.md#main-process)

El módulo `session` puede ser usado para crear nuevos objetos `session`.

También puede acceder el `session` de las páginas existentes utilizando la propiedad `session` de [`WebContents`](web-contents.md), o desde el módulo `session`.

```javascript
const { BrowserWindow } = require (' Electron ')

const Win = New BrowserWindow ({ width: 800, height: 600 })
Win. loadURL (' http://github.com ')

const SES = Win. webContents. Session
Console. log (SES. getUserAgent ())
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
* `extension` [extensión](structures/extension.md)

Se emite una vez que se carga una extensión. Esto ocurre siempre que una extensión se agrega al conjunto de extensiones "habilitado". Esto incluye:

- Extensiones que se cargan desde `Session.loadExtension`.
- Extensiones que se recargan:
  * de un accidente.
  * Si la extensión lo solicitó ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Evento: 'extension-unloaded'

Devuelve:

* `event` Event
* `extension` [extensión](structures/extension.md)

Se emite después de que se descarga una extensión. Esto ocurre cuando se llama a `Session.removeExtension` .

#### Evento: 'extension-ready'

Devuelve:

* `event` Event
* `extension` [extensión](structures/extension.md)

Se emite una vez que se carga una extensión y se inicializa todo el estado del navegador necesario para admitir el inicio de la página de fondo de la extensión.

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

Se emite cuando se ha iniciado con éxito un archivo de diccionario Hunspell. Este se produce una vez que se ha descargado el archivo.

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

Se emite cuando falla una descarga de archivos de diccionario Hunspell.  Para obtener más detalles sobre la falla, debes recopilar un Netlog e inspeccionar la solicitud de descarga .

#### Evento: 'select-serial-port' _Experimental_

Devuelve:

* `event` Event
* `portList` [SerialPort []](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Función
  * `portId` cadena

Se emite cuando se debe seleccionar un puerto serie cuando se realiza una llamada a `navigator.serial.requestPort` . `callback` debe llamarse con `portId` a ser seleccionada, pasar una cadena vacía a `callback` cancelará la solicitud.  Además, la autorización en `navigator.serial` se puede administrar mediante el uso de [SES. setPermissionCheckHandler (handler)](#sessetpermissioncheckhandlerhandler) con el permiso `serial` .

Dado que se trata de una característica experimental, está inhabilitada por defecto.  Para habilitar esta característica, tendrá que usar el modificador de la línea de comando `--enable-features=ElectronSerialChooser` .  Adicionalmente porque se trata de una característica experimental de cromo que necesitarás configurar `enableBlinkFeatures: 'Serial'` en la propiedad `webPreferences` al abrir una ventana BrowserWindow.

```javascript
const { app, BrowserWindow } = require (' Electron ')

Let Win = null
app. commandLine. appendSwitch (' Enable-Features ', ' ElectronSerialChooser ')

app. whenReady (). then (() => {
  Win = New BrowserWindow ({
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  })
  Win. webContents. session. on (' Select-Serial-Port ', (Event, portList, callback) => {
    Event. preventDefault ()
    const selectedPort = portList. Find ((Device) => {
      Return Device. vendorId = = = 0x2341 && Device. productId = = = 0x0043
    })
    if (! selectedPort) {
      callback (' ')
    } else {
      callback (result1. portId)
    }
  })
})
```

#### Evento: 'serial-port-added' _Experimental_

Devuelve:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Se emite después de que se haya llamado a `navigator.serial.requestPort` y `select-serial-port` ha disparado si hay disponible un nuevo puerto serie.  Por ejemplo, este evento se disparará cuando se conecte un nuevo dispositivo USB.

#### Evento: 'serial-port-removed' _Experimental_

Devuelve:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Se emite después de que se haya llamado a `navigator.serial.requestPort` y `select-serial-port` ha disparado si se eliminó un puerto serie.  Por ejemplo, este evento se disparará cuando se desconecte un dispositivo USB.

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
  * `storages` String[] (opcional) - Los tipos de almacenamientos para limpiar, puede contener: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. Si no se especifica , borre todos los tipos de almacenamiento.
  * `quotas` String[] (opcional) - El tipo de cuotas a limpiar, puede contener: `temporary`, `persistent`, `syncable`. Si no se especifica, borra todas las cuotas.

Devuelve `Promise<void>` - Se resuelve cuando los datos del almacenamiento ha sido borrado.

#### `ses.flushStorageData()`

Escribe cualquier dato DOMStorage que no lo haya sido en disco.

#### `ses.setProxy(config)`

* Objeto `config`
  * `mode` String (opcional)-el modo proxy. Debe ser una de `direct`, `auto_detect`, `pac_script`, `fixed_servers` o `system`. Si está no especificado, se determinará automáticamente en base a otras opciones de especificadas.
    * `direct` en modo directo todas las conexiones se crean directamente, sin ningún proxy involucrado.
    * `auto_detect` en el modo auto_detect la configuración del proxy viene determinada por un script PAC que se puede descargar en http://wpad/wpad.dat.
    * `pac_script` en el modo pac_script la configuración del proxy se determina mediante un script PAC que se recuperar desde la URL especificada en el `pacScript`. Este es el modo predeterminado si se especifica `pacScript` .
    * `fixed_servers` en el modo fixed_servers la configuración del proxy se especifica en `proxyRules`. Este es el modo predeterminado si se especifica `proxyRules` .
    * `system` en el modo de sistema, la configuración del proxy se toma del sistema operativo. Ten en cuenta que el modo de sistema es diferente de configurar ninguna configuración de proxy. En este último caso, el electrón recurre a los parámetros del sistema solo si no hay opciones de la línea de comando que influyan en la configuración del proxy.
  * `pacScript` String (opcional) - La URL asociada con el archivo PAC.
  * `proxyRules` String (opcional) - Reglas indicando cuales proxies usar.
  * `proxyBypassRules` String (opcional) - Reglas indicando que URLs deberían ser omitidas por la configuración del proxy.

Devuelve `Promise<void>` - Se resuelve cuando el proceso de configuración del proxy está completo.

Configurar proxy.

Cuando `mode` no está especificado, `pacScript` y `proxyRules` se proporcionan juntos, se ignora la opción de `proxyRules`y se aplica la configuración de la `pacScript` .

Es posible que necesites `ses.closeAllConnections` para cerrar actualmente en las conexiones de vuelo para evitar que Sockets agrupados que usan el proxy anterior se reutilicen con solicitudes futuras.

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

   Ejemplos: ". google.com", ". com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Une URLs que son literales de dirección IP.

   Ejemplos: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Hacer coincidir cualquier URL que sea a un literal de IP que se encuentra entre el rango dado. El rango de IP se especifica utilizando la notación CIDR.

   Ejemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Coinciden con las direcciones locales. El significado de `<local>` es si el host de encuentra uno de los: "127.0.0.1", ":: 1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Devuelve `Promise<String>` - Se resuelve con la información del proxy para `url`.

#### `SES. forceReloadProxyConfig ()`

Devuelve `Promise<void>` -se resuelve cuando se restablece el estado interno completo del servicio de proxy y se vuelve a aplicar la configuración de proxy más reciente si ya está disponible. El script PAC será recuperado de `pacScript` nuevamente si se `pac_script`el modo proxy.

#### `ses.setDownloadPath(path)`

* `ruta` Cadena - la ubicación de descarga.

Establece descargar directorio de ahorro. Por defecto, el directorio de descarga será el `Downloads` en la carpeta respectiva de la App.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (opcional)-ya sea para emular la interrupción de la red. Por defecto es false.
  * `latency` Double (opcional)-RTT en MS. Los valores predeterminados son 0, que deshabilitará limitación de latencia.
  * `downloadThroughput` Double (opcional)-tasa de descarga en bps. Los valores predeterminados son 0 que deshabilitará la limitación de descargas.
  * `uploadThroughput` Double (opcional): tasa de carga en bps. Los valores predeterminados son 0 lo que deshabilitará la limitación de carga.

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
  * `url` String-URL para la preconexión. Solo el origen es relevante para abrir el socket.
  * Número de `numSockets` (opcional)-número de sockets a la preconexión. Debe estar entre 1 y 6. Por defecto es 1.

Preconecta el número dado de sockets a un origen.

#### `SES. closeAllConnections ()`

Devuelve `Promise<void>` -se resuelve cuando todas las conexiones están cerradas.

**Nota:** que terminará/fallará todas las solicitudes que estén actualmente en vuelo.

#### `ses.disableNetworkEmulation()`

Inhabilita cualquier emulación de red ya activa para el `session`. Restablece para la configuración de la red original.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` function | Null
  * Objeto `request`
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [certificado](structures/certificate.md)
    * `verificationResult` String - Resultado de la verificación de chromium.
    * `errorCode` Integer - Código de error.
  * `callback` Función
    * `verificationResult` valor entero puede ser uno de los códigos de error de certificado desde [aquí](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Aparte de los códigos de error de certificado, se pueden usar los siguientes códigos especiales.
      * `0` - Indica éxito y deshabilita la verificación Certificate Transparency.
      * `-2` - Indica falla.
      * `-3` - Usa el resultado de verificación de chromium.

Establece el certificado de verificar proc de la `sesión`, el `proc` será cancelada con `proc(request, callback)` cuando sea solicitado una verificación del certificado del servidor. Llamando `callback(0)` se acepta el certificado, llamando `callback(-2)` se rechaza.

Llamando `setCertificateVerifyProc(null)` se reveritrá la verificación de certificado por defecto.

```javascript
const { BrowserWindow } = require (' Electron ')
const Win = New BrowserWindow ()

Win. webContents. session. setCertificateVerifyProc ((request, callback) => {
  const { hostname } = request
  if (hostname = = = ' github.com ') {
    callback (0)
  } else {
    callback (-2)
  }
})
```

> **Nota:** el resultado de este procedimiento se almacena en la memoria caché del servicio de red.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` function | Null
  * `contenido web` [contenido web](web-contents.md) - contenido web solicitando el permiso.  Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permission` String-el tipo de permiso solicitado.
    * `clipboard-read` -solicitar acceso para leer desde el portapapeles.
    * `media` -solicitar acceso a dispositivos multimedia como cámara, micrófono y altavoces.
    * `display-capture` - Solicita acceso para capturar la pantalla.
    * `mediaKeySystem` -solicitar acceso al contenido protegido por DRM.
    * `geolocation` -solicitar acceso a la ubicación actual del usuario.
    * `notifications` -solicitar la creación de la notificación y la capacidad de mostrarlos en la bandeja del sistema del usuario.
    * `midi` -solicitar acceso MIDI en la API de `webmidi` .
    * `midiSysex` -solicitar el uso de mensajes exclusivos del sistema en la API de `webmidi` .
    * `pointerLock` -request para interpretar directamente los movimientos del ratón como un método de entrada. Pulse [aquí](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) para saber más.
    * `fullscreen` -request para que la App entre en el modo de pantalla completa.
    * `openExternal` -solicitud para abrir enlaces en aplicaciones externas.
  * `callback` Función
    * `permiso concedido` Booleano - Permiso o denegado de permiso.
  * `details` Object: algunas propiedades solo están disponibles en determinados tipos de permiso.
    * `externalURL` String (opcional) - La url de la petición `openExternal`.
    * `mediaTypes` String[] (opcional) - Los tipos de medios que son solicitados para acceso, los elementos pueden ser `video` o `audio`
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

* `handler` function \<Boolean> | null
  * `webContents` [WebContents](web-contents.md) -WebContens comprobando el permiso.  Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permission` cadena-tipo de verificación de permiso.  Los valores válidos son `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`o `serial`.
  * `requestingOrigin` String - La URL de origen para la comprobación de permisos
  * `details` Object: algunas propiedades solo están disponibles en determinados tipos de permiso.
    * `securityOrigin` String-el origen de seguridad de la comprobación de `media` .
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

#### `SES. isPersistent ()`

Devuelve `Boolean` - Si la sesión es persistente o no. La predeterminada`webContents` sesión de una `BrowserWindow` es persistente. Cuando creas una de sesión desde una partición, la sesión con el prefijo de `persist:` será persistente, mientras que otras serán temporarias.

#### `ses.getUserAgent()`

Devuelve `Cadena` - El agente usuario para esta sesión.

#### `SES. setSSLConfig (config)`

* Objeto `config`
  * `minVersion` String (opcional)-puede ser `tls1`, `tls1.1`, `tls1.2` o `tls1.3`. La versión mínima de SSL para permitir la conexión a servidores remotos. El valor predeterminado es `tls1`.
  * `maxVersion` cadena (opcional)-puede ser `tls1.2` o `tls1.3`. La versión máxima de SSL para permitir cuando se conecta a servidores remotos. El valor predeterminado es `tls1.3`.
  * `disabledCipherSuites` Integer [] (opcional)-lista de conjuntos de cifrado que debe impedirse explícitamente que se usen además de los inhabilitados mediante la política integrada de la red. Formatos literales admitidos: 0xAABB, donde AA es `cipher_suite[0]` y BB se `cipher_suite[1]`, tal como se define en RFC 2246, sección 7.4.1.2. Las suites de cifrado no reconocidas pero parsable en este formulario no devolverán un error. Ex: para inhabilitar TLS_RSA_WITH_RC4_128_MD5, especifica 0x0004, mientras que para inhabilitar TLS_ECDH_ECDSA_WITH_RC4_128_SHA, especifica 0xC002. Ten en cuenta que los cifrados TLSv 1.3 no se pueden inhabilitar utilizando este mecanismo.

Establece la configuración SSL para la sesión. Todas las solicitudes de red subsiguientes usarán la nueva configuración. Las conexiones de red existentes (como WebSocket Connections) no se terminarán, pero los sockets antiguos en la agrupación no se reutilizarán para las conexiones nuevas.

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

#### `SES. setSpellCheckerEnabled (Enable)`

* `enable` Boolean

Establece si se habilitará el corrector ortográfico Builtin.

#### `SES. isSpellCheckerEnabled ()`

Devuelve `Boolean` -si el corrector ortográfico incorporado está habilitado.

#### `ses.setSpellCheckerLanguages(idiomas)`

* `languages` String[] - Un array de códigos de idiomas para habilitar corrector ortográfico.

El corrector ortográfico integrado no detecta automáticamente en que idioma un usuario esta escribiendo.  Para que el corrector ortográfico compruebe correctamente sus palabras, usted debe llamar a esta API con un array de códigos de idiomas.  Usted puede obtener la lista de los códigos de idiomas soportados con la propiedad `ses.availableSpellCheckerLanguages`.

**Nota:** en macOS se usa el corrector ortográfico del sistema operativo y detectará tu idioma de manera automática.  Esta API no es una operación en macOS.

#### `ses.getSpellCheckerLanguages()`

Devuelve `String[]` - Un array de códigos de idiomas para los que el corrector ortográfico esta habilitado.  Si esta lista está vacía, el corrector ortográfico volverá a usar `en-US`.  Por defecto al iniciar si esta lista de opción es una lista vacía Electron tratará de llenar esta opción con el locale actual del sistema operativo.  Este configuración es persistente entre reinicios.

**Nota:** en macOS se usa el corrector ortográfico del sistema operativo y tiene su propia lista de idiomas.  Esta API no es una operación en macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - Una URL base para Electron desde donde descargar los diccionarios hunspell.

Por defecto Electron descargará diccionarios hunspell desde la CDN de Chromium.  Si usted quiere sobrescribir este comportamiento puede usar esta API para apuntar el descargador de diccionarios a su propia versión alojada de diccionarios hunspell.  Nosotros publicamos un archivo `hunspell_dictionaries.zip` con cada versión el cual contiene los archivos que necesitas para alojar aquí, el servidor de archivos debe ser **case insensitive**, debe cargar cada archivo dos veces, una como tiene este archivo ZIP y otra con el nombre del archivo todo con minúsculas.

Si los archivos presentes en `hunspell_dictionaries.zip` están disponible en `https://example.com/dictionaries/language-code.bdic` entonces entonces debería llamar esta api con `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Por favor, tenga en cuenta la barra final.  La URL a los diccionarios esta formada como `${url}${filename}`.

**Nota:** en macOS se usa el corrector ortográfico del sistema operativo y, por lo tanto, no descartamos ningún archivo de diccionario.  Esta API no es una operación en macOS.

#### `SES. listWordsInSpellCheckerDictionary ()`

Devuelve `Promise<String[]>` - Un array de todas las palabras en el diccionario personalizado de la aplicación. Se resuelve cuando se carga el Diccionario completo desde el disco.

#### `ses.addWordToSpellCheckerDictionary(palabra)`

* `word` String - La palabra que desea agregar al diccionario

Devuelve `Boolean` - Si la palabra fue correctamente escrita al diccionario personalizado. Esta API no funcionará en sesiones no persistentes (en-memoría).

**Note:** En macOS y Windows 10 esta palabra será escrita al diccionario personalizado del sistema operativo también

#### `SES. removeWordFromSpellCheckerDictionary (Word)`

* `word` String-la palabra que deseas eliminar del Diccionario

Devuelve `Boolean` - Si la palabra fue eliminada con éxito del diccionario personalizado. Esta API no funcionará en sesiones no persistentes (en-memoría).

**Nota:** en macOS y Windows 10, esta palabra se eliminará del diccionario personalizado del sistema operativo también

#### `ses.loadExtension(path[, options])`

* `path` String-path a un directorio que contiene una extensión de Chrome desempaquetada
* `options` Object (opcional)
  * `allowFileAccess` Boolean - Si permitir que la extensión lea los archivos locales sobre el protocolo `file://` e inyecte scripts contenido dentro de las páginas `file://`. Esto es necesario por ejemplo para cargar las extensiones devtools en las URLs `file://`. Por defecto es false.

Devuelve `Promise<Extension>` - se resuelve cuando la extensión está cargada.

Este método generará una excepción si no se puede cargar la extensión. Si hay advertencias al instalar la extensión (p. ej., si la extensión solicita una API que Electron no admite), se registrará en la consola de .

Ten en cuenta que Electron no es compatible con toda la gama de APIs de extensiones de Chrome. Vea el [APIs de extensiones soportadas](extensions.md#supported-extensions-apis) para más detalles sobre que es soportado.

Ten en cuenta que en las versiones anteriores de Electron, las extensiones que se cargaban ser recordadas para futuras ejecuciones de la aplicación. Esto ya no es el caso: `loadExtension` se debe llamar en cada inicio de tu App si quieres que se cargue la extensión de .

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess es necesario para cargar la extensión  devtools en las URLs  file://.
    { allowFileAccess: true }
  )
  // Tenga en cuenta que para usar la extensión  React DevTools, necesitaras
  // descargar y descomprimir una copia de la extensión.
})
```

Esta API no admite la carga de extensiones (. CRX) cargadas.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

**Nota:** cargar extensiones en las sesiones en memoria (no persistentes) no es compatible y lanzará un error.

#### `SES. removeExtension (extensionId)`

* `extensionId` string-ID de la extensión para eliminar

Descarga una extensión.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `SES. getExtension (extensionId)`

* `extensionId` string-ID de la extensión para consultar

Devuelve `Extension` | `null` - La extensión cargada con el ID dado.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `SES. getAllExtensions ()`

Devuelve `Extension[]` - Una lista de todas las extensiones cargadas.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Sesión`:

#### `ses.availableSpellCheckerLanguages` _Readonly_

Un array `String[]` que consiste en todos los idiomas conocidos disponibles para el corrector ortográfico.  Proporcionar un código de de idioma a la API de `setSpellCheckerLanguages` que no está en esta matriz provocará un error.

#### `SES. spellCheckerEnabled`

Una `Boolean` que indica si el corrector ortográfico incorporado está habilitado.

#### `ses.cookies` _Readonly_

Un objeto [`Cookies`](cookies.md) para esta sesión.

#### `ses.serviceWorkers` _Readonly_

Una [`ServiceWorkers`objeto](service-workers.md) para esta sesión.

#### `ses.webRequest` _Readonly_

Un objeto [`WebRequest`](web-request.md) para esta sesión.

#### `ses.protocol` _Readonly_

Un objeto [`Protocol`](protocol.md) para esta sesión.

```javascript
const { app, session } = require (' Electron ')
const path = require (' path ')

app. whenReady (). then (() => {
  const Protocol = Session. fromPartition (' some-Partition '). Protocol
  if (! Protocol. registerFileProtocol (' Atom ', (request, callback) => {
    const URL = request. URL. substr (7)
    devolución de llamada ({Path: path. Normalize ('${__dirname}/${url}')})
  })) {
    Console. error (' no se pudo registrar el protocolo ')
  }
})
```

#### `ses.netLog` _Readonly_

Un objeto [`NetLog`](net-log.md) para esta sesión.

```javascript
const { app, session } = require (' Electron ')

app. whenReady (). then (Async () => {
  const netLog = Session. fromPartition (' some-Partition '). netLog
  netLog. startLogging ('/Path/to/net-log ')
  //después de algunos eventos de red
  const path = Await netLog. stopLogging ()
  Console. log (' net-logs escrito en ', Path)
})
```
