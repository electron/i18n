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

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Readonly_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Readonly_

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `proceso.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

Un `Boolean` que controla si las advertencias de desaprobación se imprimen o no a `stderr`. Establecer esto en `true` silenciará las advertencias de obsolescencia. Esta propiedad es usada en lugar de la linea de comando `--no-degradación`.

### `process.resourcesPath` _Readonly_

Una `cadena` que representa la ruta de acceso al directorio de recursos.

### `process.sandboxed` _Readonly_

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `proceso.desechoDegradación`

Un `Booleano` que controla si las advertencias de degradación son consideradas como excepción. Ajustando este como `verdad` se producirán errores por degradación. Esta propiedad es usada en vez de la linea de comando `--throw-deprecation`.

### `proceso.ubicarDegradación`

Un `Booleano` que controla si las degradaciones son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `true` se enviarán ubicaciones de pila por degradaciones. Esta propiedad es en vez de la linea de comando `--trace-deprecation`.

### `proceso.ubicarAdvertenciasdeProcesos`
Un `Booleano` que controla si las advertencias de procesos son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `verdad` se enviarán ubicaciones de pila para advertencias de procesos (incluyendo degradaciones). Esta propiedad es en vez de la línea de comando `--trace-warnings`.

### `process.type` _Readonly_

A `String` representing the current process's type, can be:

* `browser` - The main process
* `renderer` - A renderer process
* `worker` - In a web worker

### `process.versions.chrome` _Readonly_

Una `cadena` representando la versión de cadena de Chrome.

### `process.versions.electron` _Readonly_

Una `cadena` representando la versión de cadena de Electron.

### `process.windowsStore` _Readonly_

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Métodos

El objeto `proceso` tiene los siguientes métodos:

### `proceso.crash()`

Hace que el hilo principal del proceso actual se detenga.

### `process.getCreationTime()`

Devuelve `Number | null` - El numero de mili-segundos desde la época o `null` si la información no esta disponible

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

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

Returns an object with V8 heap statistics. Toma en cuenta que todas las estadísticas son reportadas en Kilobytes.

### `process.getBlinkMemoryInfo()`

Devuelve `Objecto`:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Devuelve `Promise<ProcessMemoryInfo>` - Resuelve con un [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium no provee el valor `residentSet` para macOS. Esto es porque macOS realiza compresión en memoria que no han sido utilizadas recientemente. Como resultado, el valor del tamaño del conjunto de residentes no es lo que uno esperaría. Memoria `private` es más representativo del uso real de la memoria de precompresión del proceso en macOS.

### `process.getSystemMemoryInfo()`

Devuelve `Objecto`:

* `total` Entero - La cantidad total de memoria física en kilobytes de la que dispone el sistema.
* `libre` entero - La cantidad de memoria que no está siendo usada por aplicaciones o caché de disco.
* `swapTotal` Integer _Windows_ _Linux_ - La cantidad total de memoria de swap en Kilobytes disponible para el sistema.
* `swapFree` Integer _Windows_ _Linux_ - La cantidad libre de memoria de swap en Kilobytes disponible para el sistema.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

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
