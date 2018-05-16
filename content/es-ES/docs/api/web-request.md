## Class: WebRequest

> Interceptar y modificar el contenido de una solicitud en varias etapas de su ciclo de vida.

Process: [Main](../glossary.md#main-process)

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

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `oyente` Function 
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

El `oyente` será llamado con `listener(details, callback)` cuando una solicitud está a punto de ocurrir.

`uploadData` es un arreglo de objetos `uploadData`.

La `retrollamada` tiene que ser llamada con un objeto `respuesta`.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función

El `oyente` se llamará con `listener(details, callback)` Antes de enviar la solicitud HTTP, una vez que los encabezados de las solicitudes estén disponibles. Esto puede ocurrir después de que se realiza una conexión TCP al servidor, pero antes de que se envíe cualquier información http.

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

La `retrollamada` tiene que ser llamada con un objeto `respuesta`.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `oyente` Function 
  * `details` Object 
    * `id` Íntegro
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `fecha y hora` Doble
    * `Encabezado de solicitud` Objecto

El`oyente` Será llamado con `listener(details)` justo antes que una solicitud vaya a ser enviada al servidor, modificaciones de previas respuestas `onBeforeSendHeaders` son visibles en el momento que este oyente esté en funcionamiento.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Función

El `oyente` será cancelado con `listener(details, callback)` cuando la respuesta HTTP de los encabezados de de una solicitud hayan sido recibidos.

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

La `retrollamada` tiene que ser llamada con un objeto `respuesta`.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filtrar` Object (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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

El `oyente` será cancelado con `listener(details)` cuando se reciba el primer byte del cuerpo de la respuesta. Para las solicitudes HTTP, esto significa que la línea de estado y los encabezados de respuesta están disponibles.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filtrar` Object (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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

El `oyente` Será cancelado con `listener(details)` cuando la redirección del servidor esté por ocurrir.

#### `webRequest.onCompleted([filter, ]listener)`

* `filtrar` Objecto (opcional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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

El `oyente` será cancelado con `listener(details)` cuando ocurra un error.