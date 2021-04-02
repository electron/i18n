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

## Properties

### `process.defaultApp` _·里德利·_

一 `Boolean`。 当应用开始作为参数传递到默认应用时，此 属性在主要过程中 `true` ，否则 `undefined`。

### `process.isMainFrame` _·里德利·_

当当前渲染器上下文是框架 "主"渲染器时， `true` `Boolean`。 如果你想要当前帧的ID，你应该使用 `webFrame.routingId`。

### `process.mas` _·里德利·_

一 `Boolean`。 对于 Mac 应用商店构建，此属性 `true`，对于其他版本，它是 `undefined`。

### `process.noAsar`

控制应用程序内部的 ASAR 支持的 `Boolean` 。 将此设置为 `true` 将禁用 Node 内置模块中对 `asar` 存档的支持。

### `process.noDeprecation`

`Boolean` 类型，用于控制弃用警告是否被打印到`stderr`。 将其设置为`true`将会禁用弃用警告。 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.resourcesPath` _·里德利·_

` String ` 类型， 表示资源目录的路径。

### `process.sandboxed` _·里德利·_

一 `Boolean`。 当渲染器过程被沙盒，这个属性是 `true`， 否则它是 `undefined`。

### `process.throwDeprecation`

`Boolean`类型，用于控制是否将弃用警告当做例外。 设置它为 `true` 时会抛出错误。 使用此属性代替 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

` Boolean `类型，用于控制打印到 ` stderr ` 的弃用中是否包含其堆栈跟踪。 将此设置为 ` true ` 将会打印对弃用的堆栈跟踪。 此属性代替 `--trace-deprecation` 命令行标志。

### `process.traceProcessWarnings`

一个 ` Boolean `, 用于控制是否将进程的警告打印到包含堆栈跟踪的 ` stderr `中 。 将此设置为 `true` 将打印对进程警告的堆栈跟踪（包括弃用）。 此属性代替 `--trace-warnings` 命令行标志。

### `process.type` _·里德利·_

代表当前流程类型的 `String` 可以是：

* `browser` - 主要过程
* `renderer` - 渲染器过程
* `worker` - 在网络工作者中

### `process.versions.chrome` _·里德利·_

` string `，一个表示 Chrome 版本的字符串。

### `process.versions.electron` _·里德利·_

` string `，一个表示 Electron 版本的字符串。

### `process.windowsStore` _·里德利·_

一 `Boolean`。 如果应用程序是作为一个Windows商店应用程序（应用程序）运行，这个属性是 `true`， 否则它是 `undefined`。

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

导致当前进程崩溃的主线程。

### `过程。获取创建时间（）`

返回 `Number | null` -从纪元开始的毫秒数，如果信息不可用则返回`null`

指示应用程序的创建时间。 时间表示为自时代以来的毫秒数。 如果无法获得过程创建时间，则返回为空。

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

返回带有 V8 堆统计的对象。 备注：所有数据值以KB为单位

### `过程。获取链接记忆信息（）`

返回 ` Object `:

* `allocated` 整数 - 千字节中所有分配对象的大小。
* `marked` 整数 - 千字节中所有标记对象的大小。
* `total` 整数 - 千字节分配的空间总数。

返回带有闪烁内存信息的对象。 它可以用于调试渲染/DOM相关内存问题。 请注意，所有值均以千字节报告。

### `process.getProcessMemoryInfo()`

返回 `Promise<ProcessMemoryInfo>` - 解决与 [过程记忆信息](structures/process-memory-info.md)

返回一个对象，提供有关当前过程的内存使用统计数据。 请注意 ，所有统计数据均以千字节报告。 此api应在应用程序准备好后调用。

铬不提供 `residentSet` 价值的macOS。 这是因为 macOS 执行最近未使用的页面的内存压缩。 作为一个 结果，居民设定的大小值不是人们所期望的。 `private` 内存 更能代表 macOS 上 过程的实际预压缩内存使用情况。

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer _Windows_ _Linux_ - 系统交换内存容量（单位：千字节）。
* `swapFree` Integer _Windows_ _Linux_ - 系统可用交换内存大小（单位：千字节）。

返回一个对象，提供有关整个系统内存使用情况的统计数据。 请注意 ，所有统计数据均以千字节报告。

### `过程。获取系统转换（）`

返回 `String` - 主机操作系统的版本。

示例:

```js
康斯特版本=过程。get系统转换（）
控制台.log（版本）
//在macOS-> '10.13.6'
//在Windows上-> '10.0.17763'
//在Linux-> '4.15.0-45-通用'
```

**注意：** 它返回实际操作系统版本，而不是内核版本的macOS不像 `os.release()`。

### `process.takeHeapSnapshot(filePath)`

* `filePath` 字符串 - 输出文件的路径。

返回 `Boolean` - 指示快照是否已成功创建。

采取V8堆快照，并保存到 `filePath`。

### `process.hang()`

导致当前进程挂起的主线程。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

将文件描述符的软限制设置为 ` maxDescriptors ` 或 OS 硬限制, 其中以当前进程较低的值为准。
