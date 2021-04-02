## Clase: ServiceWorkers

> Consultar y recibir eventos de una sesión de los trabajadores del servicio activo.

Proceso: [Main](../glossary.md#main-process)

Se obtiene acceso a las instancias de la clase `ServiceWorkers` utilizando `serviceWorkers` propiedad de una `Session`.

Por ejemplo:

```javascript
const { session } = require (' Electron ')

//obtener todos los trabajadores del servicio.
Console. log (Session. defaultSession. serviceWorkers. Getallejecuten ())

//administrar registros y obtener información del trabajador del servicio
sesión. defaultSession. serviceWorkers. on (' Console-Message ', (Event, messageDetails) => {
  Console. log (
    ' Got Service Worker Message ',
    messageDetails,
    ' from ',
    Session. defaultSession. serviceWorkers. getFromVersionID (messageDetails. versionId)
  )
})
```

### Eventos de Instancia

Los siguientes eventos están disponibles en instancias de `ServiceWorkers`:

#### Evento: 'console-message'

Devuelve:

* `event` Event
* `messageDetails` objeto-información acerca del mensaje de la consola
  * `message` String-el mensaje de la consola real
  * `versionId` Number-el ID de versión del Service Worker que envió el mensaje de registro
  * `source` String-el tipo de fuente para este mensaje.  Puede ser `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker`, `violation`, `intervention`, `recommendation` o `other`.
  * `level` Number-el nivel de registro, de 0 a 3. Con el fin de que coincida con `verbose`, `info`, `warning` y `error`.
  * `sourceUrl` String-la URL a la que vino el mensaje
  * Número de `lineNumber` -el número de línea del origen que activó este mensaje de consola

Se emite cuando un Service Worker registra algo en la consola.

### Métodos de Instancia

Los siguientes métodos están disponibles en instancias de `ServiceWorkers`:

#### `serviceWorkers. Getallejecuten ()`

Devuelve `Record<Number, ServiceWorkerInfo>` -A [ServiceWorkerInfo](structures/service-worker-info.md) objeto donde las claves son el ID de la versión de trabajador del servicio y los valores son la información acerca de ese trabajador del servicio.

#### `serviceWorkers. getFromVersionID (versionId)`

* `versionId` número

Devuelve [`ServiceWorkerInfo`](structures/service-worker-info.md) -información acerca de este Service Worker

Si el Service Worker no existe o no está ejecutando este método, lanzará una excepción.
