## Class: WebRequest

> Interceptar y modificar el contenido de una solicitud en varias etapas de su ciclo de vida.

Proceso: [Principal](../glossary.md#main-process)

Instancias de la clase `Solicitud Web` son accesadas usando la propiedad `Solicitud web` de una `Sesion`.

Los métodos de `solicitud de web` aceptan un `filtro` opcional y un `oyente`. El `oyente` será cancelado con `oyente(detalles)` cuando el evento de API haya pasado. El objeto `details` describe la solicitud. Pasar `nulo` como `oyente` hará que se desasocie del evento.

El objeto `filtro` tiene una propiedad `urls` que es un arreglo de patrones URL que serán usados para filtrar las solicitudes que no coincidan con los patrones de URL. Si el `filtro` es omitido todas las solicitudes serán atendidas.

Para ciertos eventos el `oyente` es pasado con una `retrollamada`, Que debe ser llamada con un objeto `respuesta` cuando el `oyente` haya hecho su trabajo.

Un ejemplo de añadir encabezados `User-Agent` para solicitudes:

```javascript
const {session} = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({cancel: false, requestHeaders: details.requestHeaders})
})
```

### Métodos de Instancia

Lo siguientes métodos están disponibles en instancias de `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `oyente` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `fecha y hora` Doble
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `respuesta` Object 
      * `cancelar` Booleano (opcional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `listener` Función

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. Esto puede ocurrir después de que se realiza una conexión TCP al servidor, pero antes de que se envíe cualquier información http.

* `details` Object 
  * `id` Íntegro
  * `url` String
  * `method` Cuerda
  * `resourceType` String
  * `fecha y hora` Doble
  * `requestHeaders` Object
* `llamada de vuelta` Función 
  * `respuesta` Object 
    * `cancelar` Booleano (opcional)
    * `requestHeaders` Object (optional) - When provided, request will be made with these headers.

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `oyente` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `fecha y hora` Doble
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `listener` Función

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Object 
  * `id` Cadena
  * `url` String
  * `method` Cuerda
  * `resourceType` String
  * `fecha y hora` Doble
  * `statusLine` String
  * `Estatus de código` entero
  * `headers de respuesta` objeto
* `llamada de vuelta` Función 
  * `respuesta` Object 
    * `cancel` Boolean
    * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
    * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

The `callback` has to be called with an `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `oyente` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `fecha y hora` Doble
    * `headers de respuesta` objeto
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `Estatus de código` entero
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. Para las solicitudes HTTP, esto significa que la línea de estado y los encabezados de respuesta están disponibles.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `oyente` Función 
  * `details` Object 
    * `id` Cadena
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `fecha y hora` Doble
    * `redirectURL` String
    * `Estatus de código` entero
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `headers de respuesta` objeto

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `oyente` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `fecha y hora` Doble
    * `headers de respuesta` objeto
    * `fromCache` Boolean
    * `Estatus de código` entero
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filtrar` Object 
  * `urls` Cadena[] - Arreglo de patrones de URL que serán usado para filtrar las solicitudes que no coincidan con estos patrones URL.
* `oyente` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `fecha y hora` Doble
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.