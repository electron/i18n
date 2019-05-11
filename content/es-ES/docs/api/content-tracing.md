# contentTracing

> Recopile datos de rastreo del módulo de contenido de Chromium para encontrar cuellos de botella de rendimiento y operaciones lentas.

Process: [Main](../glossary.md#main-process)

Este módulo no incluye una interfaz web, por lo que debe abrir `chrome://tracing/` en un navegador Chrome y cargar el archivo generado para ver el resultado.

**Nota:** No debe usar este módulo hasta que se emita el evento `ready` del módulo de la aplicación.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
      })
    }, 5000)
  })
})
```

## Métodos

El módulo `contentTracing` tiene los siguientes métodos:

### `contentTracing.getCategories(callback)`

* `callback` Function 
  * `categories` Cadena[]

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Próximamente desaprobado](promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Función

Iniciar la grabación en todos los procesos.

La grabación se inicia de manera inmediata de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud de habilitación de grabación. Se llamará al `callback` una vez que todos los procesos secundarios hayan confirmado la solicitud `startRecording`.

**[Próximamente desaprobado](promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Iniciar la grabación en todos los procesos.

La grabación se inicia de manera inmediata de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud de habilitación de grabación.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` Cadena
* `callback` Function 
  * `resultFilePath` Cadena

Dejar de grabar en todos los procesos.

Los procesos secundarios normalmente almacenan en caché los datos de rastreo y solo raramente limpian y envían datos de rastreo al proceso principal. Esto ayuda a minimizar la sobrecarga de tiempo de ejecución del rastreo ya que el envío de datos de rastreo a través de IPC puede ser una operación costosa. Por lo tanto, para finalizar el rastreo, debemos pedir asincrónicamente a todos los procesos secundarios que eliminen cualquier dato de rastreo pendiente.

Una vez que todos los procesos secundarios hayan confirmado la solicitud `stopRecording`, se llamará a `callback` con un archivo que contiene los datos rastreados.

Los datos de rastreo se escribirán en `resultFilePath` si no está vacío o en un archivo temporal. La ruta real del archivo se pasará a `callback` si no es `null`.

**[Próximamente desaprobado](promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` Cadena

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Dejar de grabar en todos los procesos.

Los procesos secundarios normalmente almacenan en caché los datos de rastreo y solo raramente limpian y envían datos de rastreo al proceso principal. Esto ayuda a minimizar la sobrecarga de tiempo de ejecución del rastreo ya que el envío de datos de rastreo a través de IPC puede ser una operación costosa. Por lo tanto, para finalizar el rastreo, debemos pedir asincrónicamente a todos los procesos secundarios que eliminen cualquier dato de rastreo pendiente.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Número
  * `percentage` Número

Obtenga el máximo uso en los procesos de búfer de rastreo como un porcentaje del estado completo. Cuando se determina el valor de TraceBufferUsage, el `callback` es llamado.