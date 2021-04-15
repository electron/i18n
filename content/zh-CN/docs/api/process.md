# 进程

> 处理对象的扩展

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron's `process` 对象继承 [Node.js `process` object](https://nodejs.org/api/process.html)。 它新增了以下事件、属性和方法

## 沙 箱

在沙盒化的渲染进程中， `process` 对象只包含了API的一个子集:

- `崩溃（）`
- `挂（）`
- `获取创建时间（）`
- `获取海普统计学（）`
- `获取链接记忆信息（）`
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

## Properties

### `process.defaultApp` _Readonly_

一 `Boolean`。 When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Readonly_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Readonly_

一 `Boolean`。 For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

`Boolean` 类型，用于控制弃用警告是否被打印到`stderr`。 将其设置为`true`将会禁用弃用警告。 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.resourcesPath` _Readonly_

` String ` 类型， 表示资源目录的路径。

### `process.sandboxed` _Readonly_

一 `Boolean`。 When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

`Boolean`类型，用于控制是否将弃用警告当做例外。 设置它为 `true` 时会抛出错误。 使用此属性代替 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

` Boolean `类型，用于控制打印到 ` stderr ` 的弃用中是否包含其堆栈跟踪。 将此设置为 ` true ` 将会打印对弃用的堆栈跟踪。 此属性代替 `--trace-deprecation` 命令行标志。

### `process.traceProcessWarnings`

一个 ` Boolean `, 用于控制是否将进程的警告打印到包含堆栈跟踪的 ` stderr `中 。 将此设置为 `true` 将打印对进程警告的堆栈跟踪（包括弃用）。 此属性代替 `--trace-warnings` 命令行标志。

### `process.type` _Readonly_

A `String` representing the current process's type, can be:

* `browser` - The main process
* `renderer` - A renderer process
* `worker` - In a web worker

### `process.versions.chrome` _Readonly_

` string `，一个表示 Chrome 版本的字符串。

### `process.versions.electron` _Readonly_

` string `，一个表示 Electron 版本的字符串。

### `process.windowsStore` _Readonly_

一 `Boolean`。 If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

导致当前进程崩溃的主线程。

### `process.getCreationTime()`

返回 `Number | null` -从纪元开始的毫秒数，如果信息不可用则返回`null`

Indicates the creation time of the application. 时间表示为自时代以来的毫秒数。 如果无法获得进程创建时间，则返回为空。

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

返回包含 V8 堆统计的对象。 备注：所有数据值以KB为单位

### `process.getBlinkMemoryInfo()`

返回 ` Object `:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

返回带有Blink内存信息的对象。 可以用于调试渲染/DOM相关内存问题。 请注意，所有值都以KB为单位

### `process.getProcessMemoryInfo()`

返回 `Promise<ProcessMemoryInfo>` - Promise成功返回 [PrecessMemoryInfo](structures/process-memory-info.md)

返回一个对象，提供当前进程的内存使用统计。 请注意，所有统计值都以KB为单位 这个api应该在应用程序准备就绪后被调用。

Chromium 没有为macOS提供 `residentSet` 值。 因为macOS对最近未使用过的页面进行内存压缩。 As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer _Windows_ _Linux_ - 系统交换内存容量（单位：千字节）。
* `swapFree` Integer _Windows_ _Linux_ - 系统可用交换内存大小（单位：千字节）。

Returns an object giving memory usage statistics about the entire system. 请注意，所有统计值都以KB为单位

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

示例:

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

采取V8堆快照，并保存到 `filePath`。

### `process.hang()`

导致当前进程挂起的主线程。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

将文件描述符的软限制设置为 ` maxDescriptors ` 或 OS 硬限制, 其中以当前进程较低的值为准。
