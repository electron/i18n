# 进程

> 处理对象的扩展

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron's `process` 对象继承 [Node.js `process` object](https://nodejs.org/api/process.html)。 它新增了以下事件、属性和方法

## Sandbox

在沙盒化的渲染进程中， `process` 对象只包含了API的一个子集:

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
* `platform`
* `沙盒化`
* `contextIsolated`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`
* `contextId`

## 事件

### 事件: 'loaded'

当Electron加载了它的内部初始化脚本并且是正要开始加载网页或主脚本时触发。

## Properties

### `process.defaultApp` _只读_

一个 `Boolean`。 当应用程序启动时被作为参数传递给默认应用，这个属性在主进程中是`true`，否则是`undefined`。

### `process.isMainFrame` _只读_

`Boolean`，若当前渲染器上下文是 渲染器"主"框架时为`true`。 如果你想得到当前框架的ID，你应该使用 `webFrame.routingId`。

### `process.mas` _只读_

一个 `Boolean`。 为Mac App Store 构建，该属性是 `true`，为其他构建则为`undefined`。

### `process.noAsar`

`Boolean` 控制您应用程序内的 ASAR 支持。 设置为 `true`将会禁用Node内置模块中对 `asar` 的支持。

### `process.noDeprecation`

`Boolean` 类型，用于控制弃用警告是否被打印到`stderr`。 将其设置为`true`将会禁用弃用警告。 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.resourcesPath` _只读_

` String ` 类型， 表示资源目录的路径。

### `process.sandboxed` _只读_

一个 `Boolean`。 当渲染器进程被沙盒化时，该属性是 `true`，否则是 `undefined`。

### `process.contextIsolated` _只读_

一个`Boolean`类型的值指明当前渲染上下文是否启用了`contextIsolation`。 这在主进程中是`undefined`的。

### `process.throwDeprecation`

`Boolean`类型，用于控制是否将弃用警告当做例外。 设置它为 `true` 时会抛出错误。 使用此属性代替 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

` Boolean `类型，用于控制打印到 ` stderr ` 的弃用中是否包含其堆栈跟踪。 将此设置为 ` true ` 将会打印对弃用的堆栈跟踪。 此属性代替 `--trace-deprecation` 命令行标志。

### `process.traceProcessWarnings`

一个 ` Boolean `, 用于控制是否将进程的警告打印到包含堆栈跟踪的 ` stderr `中 。 将此设置为 `true` 将打印对进程警告的堆栈跟踪（包括弃用）。 此属性代替 `--trace-warnings` 命令行标志。

### `process.type` _只读_

`String` 代表当前进程的类型，可以是：

* `browser` - The main process
* `renderer` - A renderer process
* `worker` - In a web worker

### `process.versions.chrome` _只读_

` string `，一个表示 Chrome 版本的字符串。

### `process.versions.electron` _只读_

` string `，一个表示 Electron 版本的字符串。

### `process.windowsStore` _只读_

一个 `Boolean`。 如果应用以 Windows 商店应用(appx) 运行，该属性为`true`，否则为 `undefined`。

### `process.contextId` _只读_

一个`字符串` (可选) 代表当前JavaScript 上下文中的全局唯一ID。 每个对话框都有自己的 JavaScript 上下文。 当上下文隔离被启用，被隔离的环境中也有单独的JavaScript上下文。 该属性仅在渲染进程中可用。

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

导致当前进程崩溃的主线程。

### `process.getCreationTime()`

返回 `Number | null` -从纪元开始的毫秒数，如果信息不可用则返回`null`

指示应用程序的创建时间。 新时代（1970-01-01 00:00:00 UTC）以来的毫秒数表示的时间。 如果无法获得进程创建时间，则返回为空。

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

Chromium 没有为macOS提供 `residentSet` 值。 因为macOS对最近未使用过的页面进行内存压缩。 结果是原始设置大小的值不是我们所期望的。 `私有` 内存更能代表在 macOS 上进程的实际预压缩内存的使用情况。

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer _Windows_ _Linux_ - 系统交换内存容量（单位：千字节）。
* `swapFree` Integer _Windows_ _Linux_ - 系统可用交换内存大小（单位：千字节）。

返回一个对象，提供整个系统的内存使用统计。 请注意，所有统计值都以KB为单位

### `process.getSystemVersion()`

返回 ` String ` - 主机操作系统的版本。

示例:

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

**注意：** 它返回实际操作系统版本，而不是在 macOS 上的内核版本，不同于 `os.release()`。

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

返回 `Boolean` - 指明快捷方式是否被成功创建。

采取V8堆快照，并保存到 `filePath`。

### `process.hang()`

导致当前进程挂起的主线程。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

将文件描述符的软限制设置为 ` maxDescriptors ` 或 OS 硬限制, 其中以当前进程较低的值为准。
