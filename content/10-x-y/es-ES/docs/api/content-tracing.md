# class="VfPpkd-ksKsZd-XxIAqe">

> Recopila datos de seguimiento de Chromium para encontrar cuellos de botella y operaciones lentas.

Proceso: [Main](../glossary.md#main-process)

Este módulo no incluye una interfaz web. To view recorded traces, use [trace viewer][], available at `chrome://tracing` in Chrome.

**Nota:** No debe usar este módulo hasta que se emita el evento `ready` del módulo de la aplicación.

```javascript
const { app, contentTracing } = require('electron')

app.whenReady().then(() => {
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

Obtenga un conjunto de grupos de categorías. La categoría de grupos puede cambiar a medida que se alcanza nuevas rutas de código. Ver también [lista de categorías de seguimiento integradas](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

> **NOTE:** Electron adds a non-default tracing category called `"electron"`. This category can be used to capture Electron-specific tracing events.

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Devuelve `Promise<void>` - resuelto una vez que todos los procesos hijos han confirmado la solicitud `startRecording`.

Iniciar la grabación en todos los procesos.

La grabación se inicia de manera inmediata de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud de habilitación de grabación.

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (opcional)

Devuelve `Promise<String>` - resuleve con una ruta al archivo que contiene los datos rastreados una vez que los procesos hijos han reconocido la solicitud `stopRecording`

Dejar de grabar en todos los procesos.

Los procesos secundarios normalmente almacenan en caché los datos de rastreo y solo raramente limpian y envían datos de rastreo al proceso principal. Esto ayuda a minimizar la sobrecarga de tiempo de ejecución del rastreo ya que el envío de datos de rastreo a través de IPC puede ser una operación costosa. So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Los datos de rastreo se escribirán dentro de `resultFilePath`. Si `resultFilePath` está vacío o no es proporcionado, los datos de rastreo serán escrito en un archivo temporal, y la ruta será retornada en el promise.

### `contentTracing.getTraceBufferUsage()`

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo el `value` y `percentage` de máximo uso de trace buffer

* `value` Número
* `percentage` Número

Obtener el uso máximo a través de procesos de trace buffer como un porcentaje del estado completo.

[trace viewer]: https://github.com/catapult-project/catapult/blob/master/tracing
