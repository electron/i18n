## Clase: WebRequest

> Interceptar y modificar el contenido de una solicitud en varias etapas de su ciclo de vida.

Process: [Main](../glossary.md#main-process)

Instancias de la clase `WebRequest` son accesibles usando la propiedad `webRequest` de una `Session`.

Los métodos de `WebRequest` aceptan un `filter` opcional y un `listener`. El `listener` será cancelado con `listener(details)` cuando el evento de API haya pasado. El objeto `details` describe la solicitud.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ cancel: false, requestHeaders: details.requestHeaders })
})
```

### Métodos de Instancia

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Objecto (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` Cadena
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `respuesta` Object 
      * `cancelar` Booleano (opcional)
      * `Redireccionar URL` Cadena (opcional) - La solicitud original está prevenida de ser enviada o completada y en vez de eso es redireccionada a una URL dada.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Función

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

* `details` Objeto 
  * `id` Íntegro
  * `url` Cadena
  * `method` String
  * `webContentsId` Integer (optional)
  * `resourceType` String
  * `fecha y hora` Doble
  * `Encabezado de solicitud` Objecto
* `callback` Function 
  * `respuesta` Object 
    * `cancelar` Booleano (opcional)
    * `Encabezados de solicitud` Objecto (opcional) - Cuando se provean, las solicitudes serán hechas con este encabezado.

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `oyente` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `Encabezado de solicitud` Objecto

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `listener` Función

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Object 
  * `id` Íntegro
  * `url` String
  * `method` String
  * `webContentsId` Integer (optional)
  * `resourceType` String
  * `fecha y hora` Doble
  * `linea de estatus` Cadena
  * `Estatus de código` entero
  * `headers de respuesta` objeto
* `callback` Function 
  * `respuesta` Object 
    * `cancelar` Booleano
    * `Encabezados de respuesta` Objecto (opcional) - Cuando se provean, el servidor se asume que será respondido con estos encabezados.
    * `Linea de estatus` Cadena (opcional) - Se proveerá al reemplazar el `encabezado de respuesta` para cambiar el estatus del encabezado, de otra manera el estatus original del encabezado de respuesta será usado.

The `callback` has to be called with an `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filtrar` Object (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `oyente` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `headers de respuesta` objeto
    * `Desde Cache` Booleano - Indica cuando al respuesta fue obtenida desde la memoria caché.
    * `Estatus de código` entero
    * `linea de estatus` Cadena

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filtrar` Object (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `oyente` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `redirectURL` String
    * `Estatus de código` entero
    * `ip` Cadena (opcional) - La dirección IP del servidor al cual fue enviada en realidad la solicitud.
    * `Desde cache` Booleano
    * `headers de respuesta` objeto

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `oyente` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `headers de respuesta` objeto
    * `Desde cache` Booleano
    * `Estatus de código` entero
    * `linea de estatus` Cadena

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array de patrones de URL que será utilizado para filtrar las consultas que no cumplen los patrones de URL.
* `oyente` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` Cadena
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `Desde cache` Booleano
    * `error` Cadena - la descripción del error.

The `listener` will be called with `listener(details)` when an error occurs.