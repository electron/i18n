# proseso

> Karugtong sa prosesong bagay.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang `prosesong` bagay ng Electron ay pinalawak mula sa [Node.js `proseso` bagay](https://nodejs.org/api/process.html). Ito ay nagdaragdag ng mga sumusunod na pangyayari, katangian, at mga pamamaraan:

## Pangyayari

### Pangyayari: 'puno'

Emitted when Electron has loaded its internal initialization script and is beginning to load the web page or the main script.

It can be used by the preload script to add removed Node global symbols back to the global scope when node integration is turned off:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Mga Katangian

### `proseso.defaultApp`

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `proseso.mas`

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `proseso.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `proseso.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### `proseso.pinagkukunanPath`

A `String` representing the path to the resources directory.

### `proseso.itaponDeprecation`

A `Boolean` that controls whether or not deprecation warnings will be thrown as exceptions. Setting this to `true` will throw errors for deprecations. This property is used instead of the `--throw-deprecation` command line flag.

### `proseso.bakasDeprecation`

A `Boolean` that controls whether or not deprecations printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for deprecations. This property is instead of the `--trace-deprecation` command line flag.

### `proseso.bakasProsesoBabala`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `proseso.uri`

A `String` representing the current process's type, can be `"browser"` (i.e. main process) or `"renderer"`.

### `proseso.bersyon.chrome`

A `String` representing Chrome's version string.

### `proseso.bersyon.electron`

A `String` representing Electron's version string.

### `proseso.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Mga Paraan

The `process` object has the following methods:

### `proseso.crash()`

Causes the main thread of the current process crash.

### `proseso.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Returns [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

Returns `Object`:

* `workingSetSize` Integer - The amount of memory currently pinned to actual physical RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer - Ang halaga ng memorya na hindi ibinahagi ng iba pang mga proseso, tulad ng tambakan ng JS o mga nilalaman ng HTML.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes.

### `process.getSystemMemoryInfo()`

Returns `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.