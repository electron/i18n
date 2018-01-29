## Class: WebRequest

> Interceptar y modificar el contenido de una solicitud en varias etapas de su ciclo de vida.

Proceso: [Principal](../glossary.md#main-process)

Instances of the `WebRequest` class are accessed by using the `webRequest` property of a `Session`.

The methods of `WebRequest` accept an optional `filter` and a `listener`. The `listener` will be called with `listener(details)` when the API's event has happened. El objeto `details` describe la solicitud. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

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

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `response` Object 
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. Esto puede ocurrir después de que se realiza una conexión TCP al servidor, pero antes de que se envíe cualquier información http.

* `details` Object 
  * `id` Íntegro
  * `url` String
  * `method` Cuerda
  * `resourceType` String
  * `timestamp` Double
  * `requestHeaders` Object
* `llamada de vuelta` Función 
  * `response` Object 
    * `cancel` Boolean (optional)
    * `requestHeaders` Object (optional) - When provided, request will be made with these headers.

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Object 
  * `id` Cadena
  * `url` String
  * `method` Cuerda
  * `resourceType` String
  * `timestamp` Double
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
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `timestamp` Double
    * `headers de respuesta` objeto
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `Estatus de código` entero
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. Para las solicitudes HTTP, esto significa que la línea de estado y los encabezados de respuesta están disponibles.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función 
  * `details` Object 
    * `id` Cadena
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `timestamp` Double
    * `redirectURL` String
    * `Estatus de código` entero
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `headers de respuesta` objeto

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `timestamp` Double
    * `headers de respuesta` objeto
    * `fromCache` Boolean
    * `Estatus de código` entero
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filtrar` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` Cuerda
    * `resourceType` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.