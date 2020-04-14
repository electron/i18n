# 进程

> 处理对象的扩展

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron's `process` 对象继承 [Node.js `process` object](https://nodejs.org/api/process.html)。 它新增了以下事件、属性和方法

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:
- `crash()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
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
- `沙盒化`
- `type`
- `version`
- `versions`
- `mas`
- `windowsStore`

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

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

`Boolean` 类型，用于控制弃用警告是否被打印到`stderr`。 将其设置为`true`将会禁用弃用警告。 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.enablePromiseAPIs`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr` when formerly callback-based APIs converted to Promises are invoked using callbacks. 将其设置为`true`将会禁用弃用警告。

### `process.resourcesPath`

` String ` 类型， 表示资源目录的路径。

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

`Boolean`类型，用于控制是否将弃用警告当做例外。 设置它为 `true` 时会抛出错误。 使用此属性代替 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

` Boolean `类型，用于控制打印到 ` stderr ` 的弃用中是否包含其堆栈跟踪。 将此设置为 ` true ` 将会打印对弃用的堆栈跟踪。 此属性代替 `--trace-deprecation` 命令行标志。

### `process.traceProcessWarnings`
一个 ` Boolean `, 用于控制是否将进程的警告打印到包含堆栈跟踪的 ` stderr `中 。 将此设置为 `true` 将打印对进程警告的堆栈跟踪（包括弃用）。 此属性代替 `--trace-warnings` 命令行标志。

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process), `"renderer"`, or `"worker"` (i.e. web worker).

### `process.versions.chrome`

` string `，一个表示 Chrome 版本的字符串。

### `process.versions.electron`

` string `，一个表示 Electron 版本的字符串。

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

导致当前进程崩溃的主线程。

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

返回 [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

返回 [`IOCounters`](structures/io-counters.md)

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

Returns an object with V8 heap statistics. 备注：所有数据值以KB为单位

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

示例

| 平台      | 版本                  |
| ------- | ------------------- |
| macOS   | `10.13.6`           |
| Windows | `10.0.17763`        |
| Linux   | `4.15.0-45-generic` |

**Note:** It returns the actual operating system version instead of kernel version on macOS unlike `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

导致当前进程挂起的主线程。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

将文件描述符的软限制设置为 ` maxDescriptors ` 或 OS 硬限制, 其中以当前进程较低的值为准。
