# contentTracing

> 从Chromium的内容模块收集跟踪数据，以查找性能瓶颈和缓慢的操作。

进程：[主进程](../glossary.md#main-process)

该模块不包含网页接口，所以你需要在Chrome浏览器打开`chrome://tracing/`页面，然后加载生成的文件来查看结果。

**注意：**在应用程序模块的 `ready ` 事件触发之前，您不应该使用此模块。

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

* `callback` Function - 回调函数 
  * `categories` String[]

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Deprecated Soon](promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。 一旦所有子进程都确认了`startRecording`请求，`callback`就会被调用。

**[Deprecated Soon](promisification.md)**

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

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 所以，为了结束跟踪，我们必须异步地要求所有子进程清空任何等待跟踪数据。

一旦所有子进程确认了 `stopRecording`请求，将传递包含跟踪数据的文件作为参数调用`callback`。

如果`resultFilePath`不为空，则跟踪数据会被写入该路径，否则就被写入一个临时文件。实际的文件路径如果不为`null`的话就被传递给`callback`函数了。

**[Deprecated Soon](promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 所以，为了结束跟踪，我们必须异步地要求所有子进程清空任何等待跟踪数据。

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.startMonitoring(options, callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

获取跟踪缓冲区进程的最大使用率，以百分比表示完整状态。当 TraceBufferUsage 值被确定后, 将调用 ` callback`。