# process

> Extensiones para el objeto process.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El objeto `process` de Electron es heredado del [objeto `process` de Node.js](https://nodejs.org/api/process.html). Este agrega los siguientes eventos, propiedades y métodos:

## Sandbox

En el procesor renderer en sandbox el objeto `process` sólo contiene un subconjunto de las APIs:

- `crash()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getBlinkMemoryInfo()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `getCPUUsage()`
- `getIOCounters()`
- `argv`
- `execPath`
- `env`
- `pid`
- `arch`
- `platform`
- `sandboxed`
- `tipo`
- `version`
- `versions`
- `mas`
- `windowsStore`

## Eventos

### Evento: 'loaded'

Emitido cuando Electron ha cargado su script de inicialización interno y está empezando a carga la página web o el script principal.

Puede ser utilizado por el script de precarga para agregar los símbolos globales eliminados de Node de nuevo al scope global cuando la integración de Node está desactivada:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Propiedades

### `process.defaultApp` _Readonly_

Un `Boolean`. Cuando se inicia la App al ser pasada como parámetro a la App por defecto, esta propiedad se `true` en el proceso principal, de lo contrario se `undefined`.

### `process.isMainFrame` _Readonly_

Un `Boolean`, `true` cuando el contexto actual del renderer es "main" renderer frame. Si quieres el ID del frame actual deberías usar `webFrame.routingId`.

### `process.mas` _Readonly_

Un `Boolean`. Para compilaciones de Mac App Store, esta propiedad es `true`, para otras compilaciones es `undefined`.

### `proceso.noAsar`

Un `Boolean` que controla el soporte ASAR dentro de tu aplicación. Establecer esto a `true` desactivará el soporte para archivos `asar` en los módulos integrados de Node.

### `process.noDeprecation`

Un `Boolean` que controla si las advertencias de desaprobación se imprimen o no a `stderr`. Establecer esto en `true` silenciará las advertencias de obsolescencia. Esta propiedad es usada en lugar de la linea de comando `--no-degradación`.

### `process.resourcesPath` _Readonly_

Una `cadena` que representa la ruta de acceso al directorio de recursos.

### `process.sandboxed` _Readonly_

Un `Boolean`. Cuando el proceso del representador está en un espacio aislado, esta propiedad se `true` , de lo contrario, se `undefined`.

### `proceso.desechoDegradación`

Un `Booleano` que controla si las advertencias de degradación son consideradas como excepción. Ajustando este como `verdad` se producirán errores por degradación. Esta propiedad es usada en vez de la linea de comando `--throw-deprecation`.

### `proceso.ubicarDegradación`

Un `Booleano` que controla si las degradaciones son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `true` se enviarán ubicaciones de pila por degradaciones. Esta propiedad es en vez de la linea de comando `--trace-deprecation`.

### `proceso.ubicarAdvertenciasdeProcesos`

Un `Booleano` que controla si las advertencias de procesos son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `verdad` se enviarán ubicaciones de pila para advertencias de procesos (incluyendo degradaciones). Esta propiedad es en vez de la línea de comando `--trace-warnings`.

### `process.type` _Readonly_

Un `String` que representa el tipo de proceso actual, puede ser:

* `browser` - El main process
* `renderer` - Un renderer process
* `worker` - En un web worker

### `process.versions.chrome` _Readonly_

Una `cadena` representando la versión de cadena de Chrome.

### `process.versions.electron` _Readonly_

Una `cadena` representando la versión de cadena de Electron.

### `process.windowsStore` _Readonly_

Un `Boolean`. Si la APP se está ejecutando como una app de la tienda Windows (Appx), esta propiedad se `true`, para lo contrario, se `undefined`.

## Métodos

El objeto `proceso` tiene los siguientes métodos:

### `proceso.crash()`

Hace que el hilo principal del proceso actual se detenga.

### `process.getCreationTime()`

Devuelve `Number | null` - El numero de mili-segundos desde la época o `null` si la información no esta disponible

Indica el tiempo de creación de la aplicación. El tiempo es representado como número de milisegundos desde la época. Devuelve null si no es capaz de obtener el tiempo de creación del proceso.

### `process.getCPUUsage()`

Devuelve [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

Devuelve [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Devuelve `Objecto`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Devuelve un objeto con estadísticas de la pila V8. Toma en cuenta que todas las estadísticas son reportadas en Kilobytes.

### `Process. getBlinkMemoryInfo ()`

Devuelve `Objecto`:

* `allocated` Integer - Tamaño de todos los objetos asignados en Kilobytes.
* `marked` Integer - Tamaño de todos los objetos marcados en Kilobytes.
* `total` Integer - Espacio total asignado en Kilobytes.

Devuelve un objeto con información de memoria parpadeó. Puede ser útil para depurar la renderización/problemas de memoria relacionados con DOM. Ten en cuenta que todos los valores se notifican en kilobytes.

### `process.getProcessMemoryInfo()`

Devuelve `Promise<ProcessMemoryInfo>` - Resuelve con un [ProcessMemoryInfo](structures/process-memory-info.md)

Devuelve un objeto que proporciona estadísticas de uso de memoria acerca del proceso actual. Nota que todas las estadísticas se notifican en kilobytes. Esta API debe llamarse una vez que la App esté lista.

Chromium no provee el valor `residentSet` para macOS. Esto es porque macOS realiza compresión en memoria que no han sido utilizadas recientemente. Como resultado, el valor del tamaño del conjunto de residentes no es lo que uno esperaría. Memoria `private` es más representativo del uso real de la memoria de precompresión del proceso en macOS.

### `process.getSystemMemoryInfo()`

Devuelve `Objecto`:

* `total` Entero - La cantidad total de memoria física en kilobytes de la que dispone el sistema.
* `libre` entero - La cantidad de memoria que no está siendo usada por aplicaciones o caché de disco.
* `swapTotal` Integer _Windows_ _Linux_ - La cantidad total de memoria de swap en Kilobytes disponible para el sistema.
* `swapFree` Integer _Windows_ _Linux_ - La cantidad libre de memoria de swap en Kilobytes disponible para el sistema.

Devuelve un objeto que proporciona estadísticas de uso de memoria acerca del sistema completo. Nota que todas las estadísticas se notifican en kilobytes.

### `process.getSystemVersion()`

Devuelve `String` - La versión de sistema operativo del host.

Ejemplo:

```js
const version = process.getSystemVersion()
console.log(version)
// En macOS -> '10.13.6'
// En Windows -> '10.0.17763'
// En Linux -> '4.15.0-45-generic'
```

**Note:** Devuelve la versión actual del sistema en lugar de la versión del kernel en macOS deferente a `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Ruta al archivo de salida.

Devuelve `Boolean` - Indica si la instantánea ha sido creada correctamente.

Toma una instantánea de la pila V8 y la guarda en `filePath`.

### `process.hang()`

Hace que el hilo principal del proceso actual se caiga.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Entero

Ajusta el limite suave del descriptor del documento a `maxDescriptors` o el límite duro OS, cual sea menor para el proceso actual.
