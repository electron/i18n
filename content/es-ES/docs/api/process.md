# process

> Extensiones para el objeto process.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El objeto `process` de Electron es heredado del [objeto `process` de Node.js](https://nodejs.org/api/process.html). Este agrega los siguientes eventos, propiedades y métodos:

## Sandbox

En el procesor renderer en sandbox el objeto `process` sólo contiene un subconjunto de las APIs:

* `crash()`
* `hang()`
* `getCreationTime()`
* `getHeapStatistics()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getCPUUsage()`
* `getIOCounters()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `sandboxed`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`

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

### `process.defaultApp`

Un `Boolean`. Cuando la aplicación empieza siendo pasada como un parámetro a la aplicación por defecto, esta propiedad es `true` en el proceso principal, en el caso contrario es `undefined`.

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

Un `Booleano`. Para el edificio de la Mac App Store, esta propiedad es `verdad`, para otros edificios está `indefinidad`.

### `proceso.noAsar`

Un `Booleano` que controla el apoyo ASAR dentro de tu aplicación. Ajustando este a `verdad` se deshabilitará el apoyo por parte de archivos `asar` en modulos integrados del nodo.

### `process.noDeprecation`

Un `Boolean` que controla si las advertencias de desaprobación se imprimen o no a `stderr`. Establecer esto en `true` silenciará las advertencias de obsolescencia. Esta propiedad es usada en lugar de la linea de comando `--no-degradación`.

### `process.enablePromiseAPIs`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr` when formerly callback-based APIs converted to Promises are invoked using callbacks. Setting this to `true` will enable deprecation warnings.

### `process.resourcesPath`

Una `cadena` que representa la ruta de acceso al directorio de recursos.

### `process.sandboxed`

Un `Boolean`. Cuando el proceso de renderer se ejecuta en modo sandbox esta propiedad es `true`, de lo contrario es `undefined`.

### `proceso.desechoDegradación`

Un `Booleano` que controla si las advertencias de degradación son consideradas como excepción. Ajustando este como `verdad` se producirán errores por degradación. Esta propiedad es usada en vez de la linea de comando `--throw-deprecation`.

### `proceso.ubicarDegradación`

Un `Booleano` que controla si las degradaciones son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `true` se enviarán ubicaciones de pila por degradaciones. Esta propiedad es en vez de la linea de comando `--trace-deprecation`.

### `proceso.ubicarAdvertenciasdeProcesos`

Un `Booleano` que controla si las advertencias de procesos son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `verdad` se enviarán ubicaciones de pila para advertencias de procesos (incluyendo degradaciones). Esta propiedad es en vez de la línea de comando `--trace-warnings`.

### `proceso.tipo`

A `String` representing the current process's type, can be `"browser"` (i.e. main process), `"renderer"`, or `"worker"` (i.e. web worker).

### `proceso.vesiones.chrome`

Una `cadena` representando la versión de cadena de Chrome.

### `proceso.versiones.electron`

Una `cadena` representando la versión de cadena de Electron.

### `proceso.tiendaWindows`

Un `Booleano`. si la aplicación está siendo ejecutada como una aplicación de la tienda Windows (appx), esta propiedad es `verdad`, de otra manera es `indefinida`.

## Métodos

El objeto `proceso` tiene los siguientes métodos:

### `proceso.crash()`

Hace que el hilo principal del proceso actual se detenga.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Devuelve [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Devuelve [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Devuelve `Objeto`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Note that all statistics are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Devuelve `Objeto`:

* `residentSet` Integer *Linux* and *Windows* - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. Esto es porque macOS realiza compresión en memoria de páginas que no han sido utilizadas recientemente. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

Devuelve `Objeto`:

* `total` Entero - La cantidad total de memoria física en kilobytes de la que dispone el sistema.
* `libre` entero - La cantidad de memoria que no está siendo usada por aplicaciones o caché de disco.
* `swapTotal` Integer *Windows* *Linux* - La cantidad total de memoria de swap en Kilobytes disponible para el sistema.
* `swapFree` Integer *Windows* *Linux* - La cantidad libre de memoria de swap en Kilobytes disponible para el sistema.

Devuelve un objeto que contiene las estadísticas de la memoria usada por el sistema completo. Note que todas las estadísticas están reportadas en kilobytes.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Ruta al archivo de salida.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Hace que el hilo principal del proceso actual se caiga.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Entero

Ajusta el limite suave del descriptor del documento a `maxDescriptors` o el límite duro OS, cual sea menor para el proceso actual.