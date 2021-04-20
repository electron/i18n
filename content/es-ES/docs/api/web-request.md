## Clase: WebRequest

> Interceptar y modificar el contenido de una solicitud en varias etapas de su ciclo de vida.

Proceso: [Main](../glossary.md#main-process)

Instancias de la clase `WebRequest` son accesibles usando la propiedad `webRequest` de una `Session`.

Los métodos de `WebRequest` aceptan un `filter` opcional y un `listener`. El `listener` será cancelado con `listener(details)` cuando el evento de API haya pasado. El objeto `details` describe la solicitud.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

El objeto `filter` tiene una propiedad `urls` que es un arreglo de patrones URL que serán usados para filtrar las solicitudes que no coincidan con los patrones de URL. Si el `filtro` es omitido todas las solicitudes serán atendidas.

Para ciertos eventos el `listener` es pasado con una `callback`, Que debe ser llamada con un objeto `response` cuando el `listener` haya hecho su trabajo.

Un ejemplo de añadir encabezados `User-Agent` a las solicitudes:

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

### Métodos de Instancia

Lo siguientes métodos están disponibles en instancias de `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Función
    * `response` Object
      * `cancelar` Booleano (opcional)
      * `Redireccionar URL` Cadena (opcional) - La solicitud original está prevenida de ser enviada o completada y en vez de eso es redireccionada a una URL dada.

El `oyente` Será cancelado con `listener(details)` cuando la redirección del servidor esté por ocurrir.

Los `buttons` es un arreglo de objetos `Button`.

The `callback` has to be called with an `response` object.

Algunos ejemplos de `urls` válidas:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
'*://*/*'
'*://example.com/*'
'*://example.com/foo/*'
'http://*.foo:1234/'
'file://foo:1234/bar'
'http://foo:*/'
'*://www.foo.com/'
```

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `requestHeaders` Record<string, string>
  * `callback` Función
    * `beforeSendResponse` Object
      * `cancelar` Booleano (opcional)
      * `requestHeaders` Record<string, string | string[]> (opcional) -Cuando es proveído, la solicitud será hecha con esas cabeceras.

El `oyente` se llamará con `listener(details, callback)` Antes de enviar la solicitud HTTP, una vez que los encabezados de las solicitudes estén disponibles. Esto puede ocurrir después de que se realiza una conexión TCP al servidor, pero antes de que se envíe cualquier información http.

El `callback` ha de ser llamado con un objeto `response`.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `requestHeaders` Record<string, string>

El`oyente` Será llamado con `listener(details)` justo antes que una solicitud vaya a ser enviada al servidor, modificaciones de previas respuestas `onBeforeSendHeaders` son visibles en el momento que este oyente esté en funcionamiento.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `linea de estatus` Cadena
    * `Estatus de código` entero
    * `requestHeaders` Record<string, string>
    * `responseHeaders` Record<string, string[]> (opcional)
  * `callback` Función
    * `headersReceivedResponse` Object
      * `cancelar` Booleano (opcional)
      * `responseHeaders` Record<string, string | string[]> (opcional) - Cuando es proveído, el servidor se asume que ha respondido con estas cabeceras.
      * `Linea de estatus` Cadena (opcional) - Se proveerá al reemplazar el `encabezado de respuesta` para cambiar el estatus del encabezado, de otra manera el estatus original del encabezado de respuesta será usado.

El `oyente` será cancelado con `listener(details, callback)` cuando la respuesta HTTP de los encabezados de de una solicitud hayan sido recibidos.

El `callback` ha de ser llamado con un objeto `response`.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `responseHeaders` Record<string, string[]> (opcional)
    * `Desde Cache` Booleano - Indica cuando al respuesta fue obtenida desde la memoria caché.
    * `Estatus de código` entero
    * `linea de estatus` Cadena

El `oyente` será cancelado con `listener(details)` cuando se reciba el primer byte del cuerpo de la respuesta. Para las solicitudes HTTP, esto significa que la línea de estado y los encabezados de respuesta están disponibles.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `redirectURL` String
    * `Estatus de código` entero
    * `linea de estatus` Cadena
    * `ip` Cadena (opcional) - La dirección IP del servidor al cual fue enviada en realidad la solicitud.
    * `Desde cache` Booleano
    * `responseHeaders` Record<string, string[]> (opcional)

El `oyente` Será cancelado con `listener(details)` cuando la redirección del servidor esté por ocurrir.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `responseHeaders` Record<string, string[]> (opcional)
    * `Desde cache` Booleano
    * `Estatus de código` entero
    * `linea de estatus` Cadena
    * `error` String

El `listener` será llamado con `listener(details)` cuando una petición es completada.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function | null
  * `details` Object
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Entero (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` String
    * `referrer` Cadena
    * `fecha y hora` Doble
    * `Desde cache` Booleano
    * `error` Cadena - la descripción del error.

El `oyente` será cancelado con `listener(details)` cuando ocurra un error.
