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
* `getBlinkMemoryInfo()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getSystemVersion()`
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

### `process.defaultApp` *Readonly*

Un `Boolean`. Cuando la aplicación empieza siendo pasada como un parámetro a la aplicación por defecto, esta propiedad es `true` en el proceso principal, en el caso contrario es `undefined`.

### `process.isMainFrame` *Readonly*

Un `Boolean`, `true` cuando el contexto actual del render es el frame "main" renderer. Si usted quiere el ID del frame actual debería usar `webFrame.routingId`.

### `process.mas` *Readonly*

Un `Booleano`. Para el edificio de la Mac App Store, esta propiedad es `verdad`, para otros edificios está `indefinidad`.

### `proceso.noAsar`

Un `Booleano` que controla el apoyo ASAR dentro de tu aplicación. Ajustando este a `verdad` se deshabilitará el apoyo por parte de archivos `asar` en modulos integrados del nodo.

### `process.noDeprecation`

Un `Boolean` que controla si las advertencias de desaprobación se imprimen o no a `stderr`. Establecer esto en `true` silenciará las advertencias de obsolescencia. Esta propiedad es usada en lugar de la linea de comando `--no-degradación`.

### `process.enablePromiseAPIs`

Un `Boolean` que controla si las advertencias de deprecación son mostrados en `stderr` o no cuando las APIs anteriores basadas en callback convertidas a Promises son invocadas usando callbacks. Configurando esto en `true` se habilitaran las advertencias de deprecación.

### `process.resourcesPath` *Readonly*

Una `cadena` que representa la ruta de acceso al directorio de recursos.

### `process.sandboxed` *Readonly*

Un `Boolean`. Cuando el proceso de renderer se ejecuta en modo sandbox esta propiedad es `true`, de lo contrario es `undefined`.

### `proceso.desechoDegradación`

Un `Booleano` que controla si las advertencias de degradación son consideradas como excepción. Ajustando este como `verdad` se producirán errores por degradación. Esta propiedad es usada en vez de la linea de comando `--throw-deprecation`.

### `proceso.ubicarDegradación`

Un `Booleano` que controla si las degradaciones son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `true` se enviarán ubicaciones de pila por degradaciones. Esta propiedad es en vez de la linea de comando `--trace-deprecation`.

### `proceso.ubicarAdvertenciasdeProcesos`

Un `Booleano` que controla si las advertencias de procesos son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `verdad` se enviarán ubicaciones de pila para advertencias de procesos (incluyendo degradaciones). Esta propiedad es en vez de la línea de comando `--trace-warnings`.

### `process.type` *Readonly*

Un `String` representando el tipo actual del proceso, puede ser `"browser"` (ejemplo main processl), `"renderer"`, o `"worker"` (ejemplo web worker).

### `process.versions.chrome` *Readonly*

Una `cadena` representando la versión de cadena de Chrome.

### `process.versions.electron` *Readonly*

Una `cadena` representando la versión de cadena de Electron.

### `process.windowsStore` *Readonly*

Un `Booleano`. si la aplicación está siendo ejecutada como una aplicación de la tienda Windows (appx), esta propiedad es `verdad`, de otra manera es `indefinida`.

## Métodos

El objeto `proceso` tiene los siguientes métodos:

### `proceso.crash()`

Hace que el hilo principal del proceso actual se detenga.

### `process.getCreationTime()`

Devuelve `Number | null` - El numero de mili-segundos desde la época o `null` si la información no esta disponible

Indica el tiempo de creación de la aplicación. El tiempo es representado como números de mili-segundos desde la época. Retorna nulo si no es capaz de obtener el tiempo de creación del proceso.

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

Devuelve un objeto con estadísticas de pila V8. Tenga en cuenta que todas las estadísticas se reportan en Kilobytes.

### `process.getBlinkMemoryInfo()`

Devuelve `Objeto`:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Devuelve `Promise<ProcessMemoryInfo>` - Resuelve con un [ProcessMemoryInfo](structures/process-memory-info.md)

Devuelve un objeto conteniendo las estadísticas de uso de la memoria del proceso actual. Tenga en cuenta que todas las estadísticas son reportadas en Kilobytes. Esta Api debería ser llamada después que la aplicación este lista.

Chromium no provee el valor `residentSet` para macOS. Esto es porque macOS realiza compresión en memoria que no han sido utilizadas recientemente. Como resultado, el valor del tamaño del conjunto de residentes no es lo que uno esperaría. Memoria `private` es más representativo del uso real de la memoria de precompresión del proceso en macOS.

### `process.getSystemMemoryInfo()`

Devuelve `Objeto`:

* `total` Entero - La cantidad total de memoria física en kilobytes de la que dispone el sistema.
* `libre` entero - La cantidad de memoria que no está siendo usada por aplicaciones o caché de disco.
* `swapTotal` Integer *Windows* *Linux* - La cantidad total de memoria de swap en Kilobytes disponible para el sistema.
* `swapFree` Integer *Windows* *Linux* - La cantidad libre de memoria de swap en Kilobytes disponible para el sistema.

Devuelve un objeto que contiene las estadísticas de la memoria usada por el sistema completo. Note que todas las estadísticas están reportadas en kilobytes.

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

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Entero

Ajusta el limite suave del descriptor del documento a `maxDescriptors` o el límite duro OS, cual sea menor para el proceso actual.