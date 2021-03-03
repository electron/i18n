# process

> Extensions to process object.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron's `process` object is extended from the
[Node.js `process` object](https://nodejs.org/api/process.html).
It adds the following events, properties, and methods:

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

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
- `type`
- `version`
- `versions`
- `mas`
- `windowsStore`

## Events

### Event: 'loaded'

Emitted when Electron has loaded its internal initialization script and is
beginning to load the web page or the main script.

It can be used by the preload script to add removed Node global symbols back to
the global scope when node integration is turned off:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Properties

### `process.defaultApp` _Readonly_

A `Boolean`. When app is started by being passed as parameter to the default app, this
property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Readonly_

A `Boolean`, `true` when the current renderer context is the "main" renderer
frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Readonly_

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is
`undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true`
will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`.
Setting this to `true` will silence deprecation warnings. This property is used
instead of the `--no-deprecation` command line flag.

### `process.resourcesPath` _Readonly_

A `String` representing the path to the resources directory.

### `process.sandboxed` _Readonly_

A `Boolean`. When the renderer process is sandboxed, this property is `true`,
otherwise it is `undefined`.

### `process.throwDeprecation`

A `Boolean` that controls whether or not deprecation warnings will be thrown as
exceptions. Setting this to `true` will throw errors for deprecations. This
property is used instead of the `--throw-deprecation` command line flag.

### `process.traceDeprecation`

A `Boolean` that controls whether or not deprecations printed to `stderr` include
 their stack trace. Setting this to `true` will print stack traces for deprecations.
 This property is instead of the `--trace-deprecation` command line flag.

### `process.traceProcessWarnings`

A `Boolean` that controls whether or not process warnings printed to `stderr` include
 their stack trace. Setting this to `true` will print stack traces for process warnings
 (including deprecations). This property is instead of the `--trace-warnings` command
 line flag.

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

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`,
for otherwise it is `undefined`.

## Methods

The `process` object has the following methods:

### `process.crash()`

Causes the main thread of the current process crash.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application.
The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

Returns [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Returns `Object`:

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

### `process.getBlinkMemoryInfo()`

Returns `Object`:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

Returns an object with Blink memory information.
It can be useful for debugging rendering / DOM related memory issues.
Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note
that all statistics are reported in Kilobytes.
This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS
performs in-memory compression of pages that haven't been recently used. As a
result the resident set size value is not what one would expect. `private` memory
is more representative of the actual pre-compression memory usage of the process
on macOS.

### `process.getSystemMemoryInfo()`

Returns `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the
  system.
* `free` Integer - The total amount of memory not being used by applications or disk
  cache.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the
  system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the
  system.

Returns an object giving memory usage statistics about the entire system. Note
that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

Example:

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

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard
limit, whichever is lower for the current process.
