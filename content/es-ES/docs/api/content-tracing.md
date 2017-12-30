# contentTracing

> Recopile datos de rastreo del módulo de contenido de Chromium para encontrar cuellos de botella de rendimiento y operaciones lentas.

Proceso: [Principal](../glossary.md#main-process)

Este módulo no incluye una interfaz web, por lo que debe abrir `chrome://tracing/` en un navegador Chrome y cargar el archivo generado para ver el resultado.

**Nota:** No debe usar este módulo hasta que se emita el evento `ready` del módulo de la aplicación.

```javascript
const {app, contentTracing} = require('electron')

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

* `callback` Función 
  * `categories` Cadena[]

Obtener un conjunto de grupos de categorías. Los grupos de categorías pueden cambiar a medida que se alcanzan nuevas rutas de código.

Una vez que todos los procesos secundarios han confirmado la solicitud de `getCategories` se solicita el `callback` con una matriz de grupos de categorías.

### `contentTracing.startRecording(options, callback)`

* `opciones` Objecto 
  * `categoryFilter` Cadena
  * `traceOptions` Cadena
* `callback` Función

Iniciar la grabación en todos los procesos.

La grabación se inicia de manera inmediata de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud de habilitación de grabación. Se llamará al `callback` una vez que todos los procesos secundarios hayan confirmado la solicitud `startRecording`.

`categoryFilter` es un filtro para controlar qué grupos de categorías se deben rastrear. A filter can have an optional `-` prefix to exclude category groups that contain a matching category. Having both included and excluded category patterns in the same list is not supported.

Ejemplos:

* `test_MyTest*`,
* `test_MyTest*,test_OtherStuff`,
* `"-excluded_category1,-excluded_category2`

`traceOptions` controls what kind of tracing is enabled, it is a comma-delimited list. Possible options are:

* `record-until-full`
* `record-continuously`
* `trace-to-console`
* `enable-sampling`
* `enable-systrace`

The first 3 options are trace recording modes and hence mutually exclusive. If more than one trace recording modes appear in the `traceOptions` string, the last one takes precedence. If none of the trace recording modes are specified, recording mode is `record-until-full`.

The trace option will first be reset to the default option (`record_mode` set to `record-until-full`, `enable_sampling` and `enable_systrace` set to `false`) before options parsed from `traceOptions` are applied on it.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Función 
  * `resultFilePath` String

Stop recording on all processes.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This helps to minimize the runtime overhead of tracing since sending trace data over IPC can be an expensive operation. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### `contentTracing.startMonitoring(options, callback)`

* `options` Object 
  * `categoryFilter` Cadena
  * `traceOptions` Cadena
* `callback` Función

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### `contentTracing.stopMonitoring(callback)`

* `callback` Función

Stop monitoring on all processes.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Función 
  * `resultFilePath` String

Get the current monitoring traced data.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Función 
  * `value` Number
  * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.