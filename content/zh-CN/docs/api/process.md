# 进程

> 处理对象的扩展

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

Electron's `process` 对象继承 [Node.js `process` object](https://nodejs.org/api/process.html)。 它新增了以下事件、属性和方法

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

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
* `沙盒化`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`

## 事件

### 事件: 'loaded'

当Electron加载了它的内部初始化脚本并且是正要开始加载网页或主脚本时触发。

当node集成被关闭时，预加载脚本可以使用它将删除的 Node global symbols 添加回全局范围：

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## 属性

### `process.defaultApp`

`Boolean`类型， 当作为参数传递给默认应用程序启动应用时，该属性在主进程中为` true `，否则为` undefined `。

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### `process.enablePromiseAPIs`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr` when formerly callback-based APIs converted to Promises are invoked using callbacks. Setting this to `true` will enable deprecation warnings.

### `process.resourcesPath`

A `String` representing the path to the resources directory.

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

A `Boolean` that controls whether or not deprecation warnings will be thrown as exceptions. Setting this to `true` will throw errors for deprecations. This property is used instead of the `--throw-deprecation` command line flag.

### `process.traceDeprecation`

A `Boolean` that controls whether or not deprecations printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for deprecations. This property is instead of the `--trace-deprecation` command line flag.

### `process.traceProcessWarnings`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process), `"renderer"`, or `"worker"` (i.e. web worker).

### `process.versions.chrome`

A `String` representing Chrome's version string.

### `process.versions.electron`

A `String` representing Electron's version string.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## 方法

The `process` object has the following methods:

### `process.crash()`

Causes the main thread of the current process crash.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Returns [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

返回 ` Object `:

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

返回 ` Object `:

* `residentSet`Integer*Linux*和*Windows* - 当前置顶的以 KB 为单位的物理内存数量。
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer *Windows* *Linux* - 系统交换内存容量（单位：千字节）。
* `swapFree` Integer *Windows* *Linux* - 系统可用交换内存大小（单位：千字节）。

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.