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

Obtener un conjunto de grupos de categorías. Los grupos de categorías pueden cambiar a medida que se alcanzan nuevas rutas de código.

Una vez que todos los procesos secundarios han confirmado la solicitud de `getCategories` se solicita el `callback` con una matriz de grupos de categorías.

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Función

Iniciar la grabación en todos los procesos.

La grabación se inicia de manera inmediata de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud de habilitación de grabación. Se llamará al `callback` una vez que todos los procesos secundarios hayan confirmado la solicitud `startRecording`.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` Cadena
* `callback` Function 
  * `resultFilePath` Cadena

Dejar de grabar en todos los procesos.

Los procesos secundarios normalmente almacenan en caché los datos de rastreo y solo raramente limpian y envían datos de rastreo al proceso principal. Esto ayuda a minimizar la sobrecarga de tiempo de ejecución del rastreo ya que el envío de datos de rastreo a través de IPC puede ser una operación costosa. Por lo tanto, para finalizar el rastreo, debemos pedir asincrónicamente a todos los procesos secundarios que eliminen cualquier dato de rastreo pendiente.

Una vez que todos los procesos secundarios hayan confirmado la solicitud `stopRecording`, se llamará a `callback` con un archivo que contiene los datos rastreados.

Los datos de rastreo se escribirán en `resultFilePath` si no está vacío o en un archivo temporal. La ruta real del archivo se pasará a `callback` si no es `null`.

### `contentTracing.startMonitoring(options, callback)`

* `opciones` Object 
  * `categoryFilter` Cadena
  * `traceOptions` Cadena
* `callback` Función

Comience a monitorear en todos los procesos.

El monitoreo se inicia de inmediatamente de forma local y asincrónica en los procesos secundarios tan pronto como reciben la solicitud `startMonitoring`.

Una vez que todos los procesos secundarios hayan confirmado la solicitud `startMonitoring` se llamará al `callback`.

### `contentTracing.stopMonitoring(callback)`

* `callback` Función

Detener monitoreo en todos los procesos.

Una vez que todos los procesos secundarios han confirmado la solicitud `stopMonitoring`, se llama al `callback`.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` Cadena
* `callback` Function 
  * `resultFilePath` Cadena

Obtenga los datos de monitoreo actualizados.

Los procesos secundarios normalmente almacenan en caché los datos de rastreo y solo raramente limpian y envían datos de rastreo al proceso principal. Esto se debe a que puede ser una operación costosa enviar los datos de rastreo a través de IPC y nos gustaría evitar el seguimiento del tiempo de ejecución innecesario. Por lo tanto, para finalizar el rastreo, debemos pedir asincrónicamente a todos los procesos secundarios que eliminen cualquier dato de rastreo pendiente.

Una vez que todos los procesos secundarios hayan confirmado la solicitud `captureMonitoringSnapshot`, se llamará al `callback` con un archivo que contiene los datos rastreados.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Número
  * `percentage` Número

Obtenga el máximo uso en los procesos de búfer de rastreo como un porcentaje del estado completo. Cuando se determina el valor de TraceBufferUsage, el `callback` es llamado.