# 进程

> 处理对象的扩展

进程： [Main](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) 进程

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

`Boolean` 类型，控制是否将弃用警告打印到`stderr`。将其设置为`true`会使弃用警告无效。 使用此属性代替 `-no-deprecation ` 命令行标志。

### `process.resourcesPath`

` String ` 类型， 表示资源目录的路径。

### `process.throwDeprecation`

`Boolean</ 0>类型，用于控制是否将弃用警告当做例外。  设置它为 <code>true` 时会抛出错误。 使用此属性而不是用 `--throw-deprecation ` 命令行标志。

### `process.traceDeprecation`

一个 ` Boolean `, 用于控制打印的 ` stderr ` 中是否包含其堆栈跟踪。 将此设置为 ` true ` 将会打印堆栈跟踪。 This property is instead of the `--trace-deprecation` command line flag.

### `process.traceProcessWarnings`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process) or `"renderer"`.

### `process.versions.chrome`

A `String` representing Chrome's version string.

### `process.versions.electron`

A `String` representing Electron's version string.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## 方法

` process ` 对象具有以下方法:

### `process.crash()`

引起当前进程的主线程崩溃。

### `process.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Returns [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

返回 ` Object `:

* `workingSetSize` Integer- 当前占用的物理内存RAM总量
* `peakWorkingSetSize` Integer - 已被占用的物理内存最大值。
* `privateBytes` Integer - 独占内存，不被其他进程（如JavaScript堆或者HTML内容）共享的内存数量
* `sharedBytes` Integer -共享内存，在进程之间共享的内存数量，通常是Electron自身消耗的内存量

返回一个对象, 它提供有关当前进程的内存使用情况统计信息。请注意, 所有统计信息都以千字节为单位报告。

### `process.getSystemMemoryInfo()`

返回 ` Object `:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer - The total amount of swap memory in Kilobytes available to the system. *Windows* *Linux*
* `swapFree` Integer - The free amount of swap memory in Kilobytes available to the system. *Windows* *Linux*

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.