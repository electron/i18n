# Sesión

> Administra las sesiones del navegador, cookies, cache, configuración del proxy, etc.

Process: [Main](../glossary.md#main-process)

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
* `opciones` Object (opcional) 
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

#### Event: 'preconnect'

Devuelve:

* `event` Event
* `preconnectUrl` String - The URL being requested for preconnection by the renderer.
* `allowCredentials` Boolean - True if the renderer is requesting that the connection include credentials (see the [spec](https://w3c.github.io/resource-hints/#preconnect) for more details.)

Emitted when a render process requests preconnection to a URL, generally due to a [resource hint](https://w3c.github.io/resource-hints/).

#### Evento: 'spellcheck-dictionary-initialized'

Devuelve:

* `event` Evento
* `languageCode` String - El código de idioma del archivo de diccionario

Emitido cuando un archivo de diccionario de hunspell se ha inicializado con éxito. Este se produce después de que el archivo se haya descargado.

#### Evento: 'spellcheck-dictionary-download-begin'

Devuelve:

* `evento` Evento
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

Emitido cuando falla la descarga de un diccionario hunspell. Para detalles del fallo usted debería recoger un netlog e inspeccionar la solicitud de descarga.

### Métodos de Instancia

Los siguientes métodos están disponibles para instancias de `Sesión`:

#### `ses.getCacheSize()`

Devuelve `Promise<Integer>` - El tamaño de cache de la sesión actual, en bytes.

#### `ses.clearCache()`

Devuelve `Promise<void>` - Se resuelve cuando la operación de limpieza de cache es completada.

Borra la memoria caché del HTTP de la sesión.

#### `ses.clearStorageData([options])`

* `opciones` Objecto (opcional) 
  * `origin` String (opcional) - Debe seguir la representación de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (opcional) - Los tipos de almacenamientos para limpiar, puede contener: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (opcional) - El tipo de cuotas a limpiar, puede contener: `temporary`, `persistent`, `syncable`.

Devuelve `Promise<void>` - Se resuelve cuando los datos del almacenamiento ha sido borrado.

#### `ses.flushStorageData()`

Escribe cualquier dato DOMStorage que no lo haya sido en disco.

#### `ses.setProxy(config)`

* `configuración` Object 
  * `pacScript` String (opcional) - La URL asociada con el archivo PAC.
  * `proxyRules` String (opcional) - Reglas indicando cuales proxies usar.
  * `proxyBypassRules` String (opcional) - Reglas indicando que URLs deberían ser omitidas por la configuración del proxy.

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
  
  Une cualquier URL que es literal a una IP que cae en un rango determinado. El rango de IP es especificado usando la notación CIDR.
  
  Ejemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Unir direcciones locales. El significado de `<local>` es el que el host determine que coincida entre: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Devuelve `Promise<String>` - Se resuelve con la información del proxy para `url`.

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
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.preconnect(options)`

* `opciones` Object 
  * `url` String - URL para preconexión. Solo el origen es relevante para abrir el socket.
  * `numSockets` Number (opcional) - número de sockets para preconectar. Debe ser entre 1 y 6. Por defecto es 1.

Preconecta el número dado de sockets a un origen.

#### `ses.disableNetworkEmulation()`

Deshabilita cualquier emulación de red activa durante la `sesión`. Reinicia a la configuración de red original.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null 
  * `request` Object 
    * `hostname` String
    * `certificate` [certificate](structures/certificate.md)
    * `verificationResult` String - Resultado de la verificación de chromium.
    * `errorCode` Integer - Código de error.
  * `callback` Function 
    * `verificationResult` Integer - Valor que puede ser uno de los códigos de error certificado de [aquí](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Además de los códigos de error certificado, los siguientes códigos especiales pueden ser usados. 
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

* `manejador` Function | null 
  * `contenido web` [contenido web](web-contents.md) - contenido web solicitando el permiso. Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permiso` cadena - Enumeración de 'medios', 'geolocalización', 'notificaciones', 'midiSysex', 'bloque de puntero', 'Pantalla completa', 'Apertura externa'.
  * `callback` Function 
    * `permiso concedido` Booleano - Permiso o denegado de permiso.
  * `details` Object - Algunas propiedades solamente están disponibles en ciertos tipos de permisos. 
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

* `manejador` Function<boolean> | null 
  * `webContents` [WebContents](web-contents.md) -WebContens comprobando el permiso. Por favor, tenga en cuenta que si la solicitud viene de un subframe debe utilizar `requestUrl` para comprobar el origen de la solicitud.
  * `permission` String - Enumeración de 'media'.
  * `requestingOrigin` String - La URL de origen para la comprobación de permisos
  * `details` Object - Algunas propiedades solamente están disponibles en ciertos tipos de permisos. 
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

#### `ses.getBlobData(identifier)`

* `identificador` Cadena - UUID válido.

Devuelve `Promise<Buffer>` - Se resuelve con datos blob.

#### `ses.downloadURL(url)`

* `url` String

Inicia una descargar del recurso en `url`. La API generará un [DownloadItem](download-item.md) que puede ser accedido con el evento [will-download](#event-will-download).

**Note:** Esto no realiza ninguna comprobación de seguridad relacionada con la pagina de origen a diferencia de [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `opciones` Object 
  * `ruta` Cadena - ruta de acceso absoluta de la descarga.
  * `Cadeba URL` Cadena[] - Cadena de URL completa para la descarga.
  * `mimeType` Cadena (opcional)
  * `offset` Entero - rango de inicio para la descarga.
  * `longitud` Entero - longitud total de la descarga.
  * `lastModified` String (opcional) - Último valor del encabezado modificado.
  * `eTag` String (opcional) - Valor ETag del encabezado.
  * `Tiempo de inicio` Doble (opcional) - Tiempo en que se inició la descarga en números de segundo desde epoch de UNIX.

Permite `cancelar` o `interrumpir` descargas de una `Sesión` previa. La API generará un [elemento de descarga](download-item.md) que puede ser accesado con el evento [se descargará](#event-will-download). El [Elemento de descarga](download-item.md) no tendrá ningún `contenido web` asociado con el y el estado inicial será `interrumpido`. La descarga empezará solo cuando la `reanudación` de la API sea llamada en el [elemento descargado](download-item.md).

#### `ses.clearAuthCache(options)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Devuelve `Promise<void>` - resuelve cuando se ha borrado el caché de autenticación HTTP de la sesión.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - Un array de ruta absoluta para precargar scripts

Agrega scripts que se ejecutarán en TODOS los contenidos web que están asociados con esta sesión justo antes de que se ejecuten los scripts de `preload` normales.

#### `ses.getPreloads()`

Devuelve un array de rutas `String[]` para precargar guiones que han sido registrado.

#### `ses.setSpellCheckerLanguages(idiomas)`

* `languages` String[] - Un array de códigos de idiomas para habilitar corrector ortográfico.

El corrector ortográfico integrado no detecta automáticamente en que idioma un usuario esta escribiendo. Para que el corrector ortográfico compruebe correctamente sus palabras, usted debe llamar a esta API con un array de códigos de idiomas. Usted puede obtener la lista de los códigos de idiomas soportados con la propiedad `ses.availableSpellCheckerLanguages`.

**Note:** En macOS el corrector ortográfico del sistema operativo es usado y detectara automáticamente tu idioma. Esta API is un no-op en macOS.

#### `ses.getSpellCheckerLanguages()`

Devuelve `String[]` - Un array de códigos de idiomas para los que el corrector ortográfico esta habilitado. Si esta lista está vacía, el corrector ortográfico volverá a usar `en-US`. Por defecto al iniciar si esta lista de opción es una lista vacía Electron tratará de llenar esta opción con el locale actual del sistema operativo. Este configuración es persistente entre reinicios.

**Note:** En macOS el corrector ortográfico del sistema operativo es usado y tiene su propia lista de idiomas. Esta API es una no-op en macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - Una URL base para Electron desde donde descargar los diccionarios hunspell.

Por defecto Electron descargará diccionarios hunspell desde la CDN de Chromium. Si usted quiere sobrescribir este comportamiento puede usar esta API para apuntar el descargador de diccionarios a su propia versión alojada de diccionarios hunspell. Nosotros publicamos un archivo `hunspell_dictionaries.zip` con cada versión el cual contiene los archivos que necesitas para alojar aquí, el servidor de archivos debe ser **case insensitive**, debe cargar cada archivo dos veces, una como tiene este archivo ZIP y otra con el nombre del archivo todo con minúsculas.

If the files present in `hunspell_dictionaries.zip` are available at `https://example.com/dictionaries/language-code.bdic` then you should call this api with `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`. Por favor, tenga en cuenta la barra final. La URL a los diccionarios esta formada como `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files. This API is a no-op on macOS.

#### `ses.addWordToSpellCheckerDictionary(palabra)`

* `word` String - La palabra que desea agregar al diccionario

Devuelve `Boolean` - Si la palabra fue correctamente escrita al diccionario personalizado.

**Note:** On macOS and Windows 10 this word will be written to the OS custom dictionary as well

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Sesión`:

#### `ses.availableSpellCheckerLanguages` *Readonly*

Un array `String[]` que consiste en todos los idiomas conocidos disponibles para el corrector ortográfico. Providing a language code to the `setSpellCheckerLanaguages` API that isn't in this array will result in an error.

#### `ses.cookies` *Readonly*

Un objeto [`Cookies`](cookies.md) para esta sesión.

#### `ses.webRequest` *Readonly*

Un objeto [`WebRequest`](web-request.md) para esta sesión.

#### `ses.protocol` *Readonly*

Un objeto [`Protocol`](protocol.md) para esta sesión.

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

#### `ses.netLog` *Readonly*

Un objeto [`NetLog`](net-log.md) para esta sesión.

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