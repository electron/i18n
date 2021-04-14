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
- `获取系统转换（）`
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

### `process.defaultApp` _·里德利·_

一 `Boolean`。 When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _·里德利·_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _·里德利·_

一 `Boolean`。 For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

`Boolean` 类型，用于控制弃用警告是否被打印到`stderr`。 将其设置为`true`将会禁用弃用警告。 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.resourcesPath` _·里德利·_

` String ` 类型， 表示资源目录的路径。

### `process.sandboxed` _·里德利·_

一 `Boolean`。 When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

`Boolean`类型，用于控制是否将弃用警告当做例外。 设置它为 `true` 时会抛出错误。 使用此属性代替 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

` Boolean `类型，用于控制打印到 ` stderr ` 的弃用中是否包含其堆栈跟踪。 将此设置为 ` true ` 将会打印对弃用的堆栈跟踪。 此属性代替 `--trace-deprecation` 命令行标志。

### `process.traceProcessWarnings`

一个 ` Boolean `, 用于控制是否将进程的警告打印到包含堆栈跟踪的 ` stderr `中 。 将此设置为 `true` 将打印对进程警告的堆栈跟踪（包括弃用）。 此属性代替 `--trace-warnings` 命令行标志。

### `process.type` _·里德利·_

A `String` representing the current process's type, can be:

* `browser` - 主要过程
* `renderer` - 渲染器过程
* `worker` - 在网络工作者中

### `process.versions.chrome` _·里德利·_

` string `，一个表示 Chrome 版本的字符串。

### `process.versions.electron` _·里德利·_

` string `，一个表示 Electron 版本的字符串。

### `process.windowsStore` _·里德利·_

一 `Boolean`。 If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

导致当前进程崩溃的主线程。

### `过程。获取创建时间（）`

返回 `Number | null` -从纪元开始的毫秒数，如果信息不可用则返回`null`

Indicates the creation time of the application. 时间表示为自时代以来的毫秒数。 It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

返回 [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

返回 [`IOCounters`](structures/io-counters.md)

### `过程。获取集权统计学（）`

返回 ` Object `:

* `totalHeapSize` 整数
* `totalHeapSizeExecutable` 整数
* `totalPhysicalSize` 整数
* `totalAvailableSize` 整数
* `usedHeapSize` 整数
* `heapSizeLimit` 整数
* `mallocedMemory` 整数
* `peakMallocedMemory` 整数
* `doesZapGarbage` ·布尔

Returns an object with V8 heap statistics. 备注：所有数据值以KB为单位

### `过程。获取链接记忆信息（）`

返回 ` Object `:

* `allocated` 整数 - 千字节中所有分配对象的大小。
* `marked` 整数 - 千字节中所有标记对象的大小。
* `total` 整数 - 千字节分配的空间总数。

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer _Windows_ _Linux_ - 系统交换内存容量（单位：千字节）。
* `swapFree` Integer _Windows_ _Linux_ - 系统可用交换内存大小（单位：千字节）。

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `过程。获取系统转换（）`

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

* `filePath` 字符串 - 输出文件的路径。

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

采取V8堆快照，并保存到 `filePath`。

### `process.hang()`

导致当前进程挂起的主线程。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

将文件描述符的软限制设置为 ` maxDescriptors ` 或 OS 硬限制, 其中以当前进程较低的值为准。
