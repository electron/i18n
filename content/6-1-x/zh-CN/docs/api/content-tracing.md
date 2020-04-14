# contentTracing

> Collect tracing data from Chromium's content module for finding performance bottlenecks and slow operations.

进程：[主进程](../glossary.md#main-process)

This module does not include a web interface so you need to open `chrome://tracing/` in a Chrome browser and load the generated file to view the result.

**Note:** You should not use this module until the `ready` event of the app module is emitted.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
      })
    }, 5000)
  })
})
```

## 方法

`contentTracing`模块包含以下方法：

### `contentTracing.getCategories(callback)`

* `callback` Function
  * `categories` String[]

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[即将弃用](modernization/promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.


### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。 The `callback` will be called once all child processes have acknowledged the `startRecording` request.

**[即将弃用](modernization/promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function
  * `resultFilePath` String

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

**[即将弃用](modernization/promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.startMonitoring(options, callback)`

* `callback` Function
  * Object - 过滤器对象，包含过滤参数
    * `value` Number
    * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.

**[即将弃用](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

Get the maximum usage across processes of trace buffer as a percentage of the full state.
