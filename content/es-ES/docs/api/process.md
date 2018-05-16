# process

> Extensiones al objeto process.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### `proceso.Rutaderecursos`

Una `cadena` que representa la ruta de acceso al directorio de recursos.

### `proceso.desechoDegradación`

Un `Booleano` que controla si las advertencias de degradación son consideradas como excepción. Ajustando este como `verdad` se producirán errores por degradación. Esta propiedad es usada en vez de la linea de comando `--throw-deprecation`.

### `proceso.ubicarDegradación`

Un `Booleano` que controla si las degradaciones son enviadas a `stderr` incluyen su proceso de ubicación. Setting this to `true` will print stack traces for deprecations. Esta propiedad es en vez de la linea de comando `--trace-deprecation`.

### `proceso.ubicarAdvertenciasdeProcesos`

Un `Booleano` que controla si las advertencias de procesos son enviadas a `stderr` incluyen su proceso de ubicación. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

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

Devuelve `Objeto`:

* `workingSetSize` entero - La cantidad de memoria actualmente cubierta por la RAM física real.
* `peakWorkingSetSize` Entero - La cantidad máxima de memoria que ha sido cubierta por la RAM física real.
* `privateBytes` Entero - la cantidad de memoria no compartida por otros procesos, como JS heap o contenido HTML.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself.

Devuelve un objeto que contiene las estadísticas del uso de la memoria del proceso en curso. Note que todas las estadísticas son reportadas en Kilobytes.

### `process.getSystemMemoryInfo()`

Devuelve el `Objecto`:

* `total` Entero - La cantidad total de memoria física en kilobytes de la que dispone el sistema.
* `libre` entero - La cantidad de memoria que no está siendo usada por aplicaciones o caché de disco.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Devuelve un objeto que contiene las estadísticas de la memoria usada por el sistema completo. Note que todas las estadísticas están reportadas en kilobytes.

### `process.hang()`

Hace que el hilo principal del proceso actual se caiga.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Entero

Ajusta el limite suave del descriptor del documento a `maxDescriptors` o el límite duro OS, cual sea menor para el proceso actual.