# processado

> Extensões para objeto process.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

O objeto `process` do Electron estende do [objeto `process` do Node.js](https://nodejs.org/api/process.html). Ele adiciona os seguintes eventos, propriedades e métodos:

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

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
* `uptime()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `plataforma`
* `sandboxed`
* `contextIsolated`
* `tipo`
* `versão`
* `versions`
* `mas`
* `windowsStore`
* `contextId`

## Eventos

### Evento: 'loaded'

Emitido quando o Electron já carregou seu script de inicialização interno e começa a carregar a página da web ou o script principal.

## Propriedades

### `process.defaultApp` _Readonly_

Um `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Readonly_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Readonly_

Um `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### `process.resourcesPath` _Readonly_

Uma `String` que representa o caminho para o diretório de recursos.

### `process.sandboxed` _Readonly_

Um `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.contextIsolated` _Readonly_

A `Boolean` that indicates whether the current renderer context has `contextIsolation` enabled. It is `undefined` in the main process.

### `process.throwDeprecation`

A `Boolean` that controls whether or not deprecation warnings will be thrown as exceptions. Setting this to `true` will throw errors for deprecations. This property is used instead of the `--throw-deprecation` command line flag.

### `process.traceDeprecation`

A `Boolean` that controls whether or not deprecations printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for deprecations. This property is instead of the `--trace-deprecation` command line flag.

### `process.traceProcessWarnings`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type` _Readonly_

A `String` representing the current process's type, can be:

* `browser` - The main process
* `renderer` - A renderer process
* `worker` - In a web worker

### `process.versions.chrome` _Readonly_

A `String` representing Chrome's version string.

### `process.versions.electron` _Readonly_

A `String` representing Electron's version string.

### `process.windowsStore` _Readonly_

Um `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

### `process.contextId` _Readonly_

A `String` (optional) representing a globally unique ID of the current JavaScript context. Each frame has its own JavaScript context. When contextIsolation is enabled, the isolated world also has a separate JavaScript context. This property is only available in the renderer process.

## Métodos

O objeto `process` tem os seguintes métodos:

### `process.crash()`

Causes the main thread of the current process crash.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. O tempo é representado como número de milissegundos desde a época. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Retorna [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

Retorna [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Retorna `Object`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Note-se que todas as estatísticas são relatadas em Kilobytes.

### `process.getBlinkMemoryInfo()`

Retorna `Object`:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

Retorna `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

Exemplo:

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

**Note:** It returns the actual operating system version instead of kernel version on macOS unlike `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Tira um instantâneo de pilha V8 e salva-o para `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.
