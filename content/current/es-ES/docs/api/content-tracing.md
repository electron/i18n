# contentTracing

> Collect tracing data from Chromium to find performance bottlenecks and slow operations.

Proceso: [principal](../glossary.md#main-process)</0>

This module does not include a web interface. To view recorded traces, use [trace viewer](https://github.com/catapult-project/catapult/blob/master/tracing), available at `chrome://tracing` in Chrome.

**Nota:** No debe usar este módulo hasta que se emita el evento `ready` del módulo de la aplicación.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  (async () => {
    await contentTracing.startRecording({
      include_categories: ['*']
    })
    console.log('Tracing started')
    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
  })()
})
```

## Métodos

El módulo `contentTracing` tiene los siguientes métodos:

### `contentTracing.getCategories()`

Devuelve `Promise<String[]>` - resuelve con un array de grupos de categorías una vez que todos los procesos hijos han confirmado la solicitud `getCategories`

Get a set of category groups. The category groups can change as new code paths are reached. See also the [list of built-in tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Devuelve `Promise<void>` - resuelto una vez que todos los procesos hijos han confirmado la solicitud `startRecording`.

Iniciar la grabación en todos los procesos.

La grabación se inicia de manera inmediata de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud de habilitación de grabación.

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Dejar de grabar en todos los procesos.

Los procesos secundarios normalmente almacenan en caché los datos de rastreo y solo raramente limpian y envían datos de rastreo al proceso principal. Esto ayuda a minimizar la sobrecarga de tiempo de ejecución del rastreo ya que el envío de datos de rastreo a través de IPC puede ser una operación costosa. So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo el `value` y `percentage` de máximo uso de trace buffer

* `value` Número
* `percentage` Número

Obtener el uso máximo a través de procesos de trace buffer como un porcentaje del estado completo.
