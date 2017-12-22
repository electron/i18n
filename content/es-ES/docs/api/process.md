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

### `proceso.noDepreación`

Un `Booleano` que controla si las advertencias de degradación son enviadas a `stderr`.  
Ajustar este como `verdad` silenciará advertencias de degradación. Esta propiedad es usada en lugar de la linea de comando `--no-degradación`.

### `proceso.Rutaderecursos`

Una `cadena` que representa la ruta de acceso al directorio de recursos.

### `proceso.desechoDegradación`

Un `Booleano` que controla si las advertencias de degradación son consideradas como excepción. Ajustando este como `verdad` se producirán errores por degradación. Esta propiedad es usada en vez de la linea de comando `--throw-deprecation`.

### `proceso.ubicarDegradación`

Un `Booleano` que controla si las degradaciones son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `true` se enviarán ubicaciones de pila por degradaciones. Esta propiedad es en vez de la linea de comando `--trace-deprecation`.

### `proceso.ubicarAdvertenciasdeProcesos`

Un `Booleano` que controla si las advertencias de procesos son enviadas a `stderr` incluyen su proceso de ubicación. Ajustando este como `verdad` se enviarán ubicaciones de pila para advertencias de procesos (incluyendo degradaciones). Esta propiedad es en vez de la linea de comando `--trace-warnings`.

### `proceso.tipo`

Una `Cadena` que representa el tipo de proceso, puede ser `"buscador"` (es decir, proceso principal) o `"renderer"`.

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

### `process.getCPUUsage()`

Devuelve [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Devuelve [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

Devuelve `Object`:

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