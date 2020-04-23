# contentTracing

> Collect tracing data from Chromium to find performance bottlenecks and slow operations.

进程：[主进程](../glossary.md#main-process)

This module does not include a web interface. To view recorded traces, use [trace viewer](https://github.com/catapult-project/catapult/blob/master/tracing), available at `chrome://tracing` in Chrome.

**注意：**在应用程序模块的 `ready ` 事件触发之前，您不应该使用此模块。

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  (async () => {
    await contentTracing.startRecording({
      include_categories: ['*']
    })
    console.log('Tracing started')
    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
  })()
})
```

## 方法

`contentTracing`模块包含以下方法：

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached. See also the [list of built-in tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

* `value` Number
* `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state.
