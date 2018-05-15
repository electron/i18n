# 进程

> 处理对象的扩展

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

Electron's `process` 对象继承 [Node.js `process` object](https://nodejs.org/api/process.html)。 它新增了以下事件、属性和方法

## 事件

### Event: 'loaded'

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

### `process.mas`

` Boolean `类型，为 Mac App Store 生成, 此属性为 ` true `, 对于其他生成，则为 ` undefined `。

### `process.noAsar`

` Boolean `类型, 用于控制应用程序内的 ASAR 支持。将此设置为 ` true ` 将在Node的内置模块中禁用对 ` asar ` 的支持。

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.resourcesPath`

` String ` 类型， 表示资源目录的路径。

### `process.throwDeprecation`

`Boolean</ 0>类型，用于控制是否将弃用警告当做例外。 设置它为 <code>true` 时会抛出错误。 使用此属性而不是用 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

一个 ` Boolean `, 用于控制打印的 ` stderr ` 中是否包含其堆栈跟踪。 Setting this to `true` will print stack traces for deprecations. 此属性代替 `--trace-deprecation` 命令行标志。

### `process.traceProcessWarnings`

一个 ` Boolean `, 用于控制是否将进程的警告打印到包含堆栈跟踪的 ` stderr `中 。 Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

一个表示当前进程类型的 ` String `, 可以是 ` "browser" ` (即主进程) 或 ` "renderer" `。

### `process.versions.chrome`

` string `，一个表示 Chrome 版本的字符串。

### `process.versions.electron`

` string `，一个表示 Electron 版本的字符串。

### `process.windowsStore`

`Boolean`. 如果应用运行于 Windows 商店(appx), 改属性为`true`, 否则为 `undefined`.

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

导致当前进程崩溃的主线程。

### `process.getCPUUsage()`

返回 [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

返回 [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

返回 ` Object `:

* `workingSetSize` Integer- 当前占用的物理内存RAM总量
* `peakWorkingSetSize` Integer - 已被占用的物理内存最大值。
* `privateBytes` Integer - 独占内存，不被其他进程（如JavaScript堆或者HTML内容）共享的内存数量
* `sharedBytes` Integer -共享内存，在进程之间共享的内存数量，通常是Electron自身消耗的内存量.

返回一个对象, 它提供有关当前进程的内存使用情况统计信息。请注意, 所有统计信息都以千字节为单位报告。

### `process.getSystemMemoryInfo()`

返回 `Object`:

* `total` Integer - 系统可用的物理内存总量(Kb)。
* `free` Integer - 应用程序或磁盘缓存未使用的内存总量。
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

返回一个对象, 它提供有关当前进程的内存使用情况统计信息。请注意, 所有统计信息都以千字节为单位报告。

### `process.hang()`

导致当前进程挂起的主线程。

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

将文件描述符的软限制设置为 ` maxDescriptors ` 或 OS 硬限制, 其中以当前进程较低的值为准。