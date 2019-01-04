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

获取一个类别组的集合。随着能访问的新的代码路径不一样，获取的类别组对象也会不一样。

一旦所有子进程确认`getCategories`请求之后，传递类别组数组参数的`callback`就会被调用。

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。 一旦所有子进程都确认了`startRecording`请求，`callback`就会被调用。

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function - 回调函数 
  * `resultFilePath` String

Stop recording on all processes.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This helps to minimize the runtime overhead of tracing since sending trace data over IPC can be an expensive operation. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### `contentTracing.startMonitoring(options, callback)`

* `参数` Object - 过滤器对象，包含过滤参数 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### `contentTracing.startMonitoring(options, callback)`

* `callback` Function

Stop monitoring on all processes.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### `contentTracing.startMonitoring(options, callback)`

* `resultFilePath` String
* `callback` Function - 回调函数 
  * `resultFilePath` String

Get the current monitoring traced data.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### `contentTracing.startMonitoring(options, callback)`

* `callback` Function - 回调函数 
  * `value` Number
  * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.