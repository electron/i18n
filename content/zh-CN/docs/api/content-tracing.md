# contentTracing

> 从Chromium收集追踪数据以找到性能瓶颈和慢操作。

进程：[主进程](../glossary.md#main-process)

此模块不包括 Web 界面。 若要查看记录的轨迹，请使用[跟踪查看器][]，在Chrome上可以访问 `chrome://tracking` 。

**注意：**在应用程序模块的 `ready ` 事件触发之前，您不应该使用此模块。

```javascript
const { app, contentTracing } = require('electron')

app.whenReady().then(() => {
  (async () => {
    await contentTracing.startRecording({
      included_categories: ['*']
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

返回 `Promise<String[]>` - 一旦所有子进程都确认了 `getCategories` 请求，会 resolve 一个类别组的数组

获取一组类别组。 当到达新的代码路径时，类别组可能会更改。 另请参阅[内置跟踪类别列表](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h)。

> **注意：** Electron 添加了一个名为 `"electron"` 的非默认追踪类别。 此类别可以用于捕捉Electron特定的追踪事件。

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

返回 `Promise<void>` - 当所有子进程都确认了 `startRecording` 请求后 resolve.

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。

如果一个记录已经运行了，promise将立即resolve，因为一次只能进行一个跟踪操作。

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (可选)

返回 `Promise<String>` - 一旦所有子进程都确认了 `stopRecording` 请求，会 resolve 一个包含了追踪数据的文件路径

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 因此，为了结束跟踪，Chromium异步地要求所有子进程刷新所有挂起的跟踪数据。

追踪数据将被写入 `resultFilePath`。 如果 `resultFilePath` 是空的或未提供，追踪数据将被写入临时文件，并且路径将在promise中返回。

### `contentTracing.getTraceBufferUsage()`

返回 `Promise<Object>` - resolve一个包含了追踪缓冲器的 `value` 和 `percentage` 最大使用量的对象

* `value` Number
* `percentage` Number

获取追踪缓冲区在进程间的最大使用量（占全部状态的百分比）。

[跟踪查看器]: https://chromium.googlesource.com/catapult/+/HEAD/tracing/README.md
