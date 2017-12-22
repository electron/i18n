# proceso

> Extensiones al objeto en proceso.

Procesos: [principal](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El objeto en `proceso` de Electron está comprendido entre [Node.js `proceso` objecto](https://nodejs.org/api/process.html). Este agrega los siguientes eventos, propiedades y métodos:

## Eventos

### Evento: "cargado"

Emitido cuando Electron ha cargado su script de inicialización y está empezando a carga la página web o el script principal.

Puede ser utilizado por el script de precarga para agregar los símbolos globales eliminados del nodo de nuevo a el alcance cuando la integración de nodos está desactivada:

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

### `aplicación.proceso.pordefecto`

Un `Booleano`. Cuando la aplicación empieza siendo pasada como un parámetro a la aplicación por defecto, esta propiedad es `verdad` en el proceso principal, de otra manera está `indefinidad`.

### `procesos.mas`

Un `Booleano`. Para el edificio de la Mac App Store, esta propiedad es `verdad`, para otros edificios está `indefinidad`.

### `proceso.noAsar`

Un `Booleano` que controla el apoyo ASAR dentro de tu aplicación. Ajustando este a `verdad` se deshabilitará el apoyo por parte de archivos `asar` en modulos integrados del nodo.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`.  
Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### `process.resourcesPath`

A `String` representing the path to the resources directory.

### `process.throwDeprecation`

A `Boolean` that controls whether or not deprecation warnings will be thrown as exceptions. Setting this to `true` will throw errors for deprecations. This property is used instead of the `--throw-deprecation` command line flag.

### `process.traceDeprecation`

A `Boolean` that controls whether or not deprecations printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for deprecations. This property is instead of the `--trace-deprecation` command line flag.

### `process.traceProcessWarnings`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process) or `"renderer"`.

### `process.versions.chrome`

A `String` representing Chrome's version string.

### `process.versions.electron`

A `String` representing Electron's version string.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Methods

The `process` object has the following methods:

### `process.crash()`

Causes the main thread of the current process crash.

### `process.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Returns [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

Returns `Object`:

* `workingSetSize` Integer - The amount of memory currently pinned to actual physical RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes.

### `process.getSystemMemoryInfo()`

Returns `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer - The total amount of swap memory in Kilobytes available to the system. *Windows* *Linux*
* `swapFree` Integer - The free amount of swap memory in Kilobytes available to the system. *Windows* *Linux*

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.