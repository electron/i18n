# contentTracing

> 从Chromium的内容模块收集跟踪数据，以查找性能瓶颈和缓慢的操作。

线程：[主线程](../glossary.md#main-process)

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

* `callback` Function 
  * `categories` String[]

获取一个类别组的集合。随着能访问的新的代码路径不一样，获取的类别组对象也会不一样。

一旦所有子进程确认`getCategories`请求之后，传递类别组数组参数的`callback`就会被调用。

### `contentTracing.startRecording(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。 一旦所有子进程都确认了`startRecording`请求，`callback`就会被调用。

`categoryFilter` 是一个用来控制哪些类别组需要被跟踪的过滤器。 过滤器可以有一个可选的`-`前缀来排除包含一个匹配类别的类别组。 同一个列表中，不支持既有包含的类别模式又有排除的类别模式。

示例:

* `test_MyTest*`,
* `test_MyTest*,test_OtherStuff`,
* `"-excluded_category1,-excluded_category2`

`traceOptions` 控制哪种跟踪模式被启用，该属性值是一个逗号分隔列表。可能选项有：

* `record-until-full`
* `record-continuously`
* `trace-to-console`
* `enable-sampling`
* `enable-systrace`

前3个选项是跟踪记录模式，因此是相互排斥的。 如果`traceOptions`字符串中出现多个跟踪记录模式，最后一个优先。 如果指定没有跟踪记录模式，那记录模式就是`record-until-full`。

在从`traceOptions`解析的选项应用于它之前，跟踪选项将首先被重置为默认选项(`record_mode` 设置为 `record-until-full`, `enable_sampling` 和 `enable_systrace` 设置为 `false`)。

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 所以，为了结束跟踪，我们必须异步地要求所有子进程清空任何等待跟踪数据。

一旦所有子进程确认了 `stopRecording`请求，将传递包含跟踪数据的文件作为参数调用`callback`。

如果`resultFilePath`不为空，则跟踪数据会被写入该路径，否则就被写入一个临时文件。实际的文件路径如果不为`null`的话就被传递给`callback`函数了。

### `contentTracing.startMonitoring(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

开始记录所有进程。

一旦收到` startMonitoring `请求，监控立即在本地和异步的子进程上立即开始。

一旦所有子进程都确认了 ` startMonitoring ` 请求, 就会调用 ` callback`。

### `contentTracing.startMonitoring(options, callback)`

* `callback` Function

停止对所有进程的监视。

一旦所有子进程都确认了 ` startMonitoring ` 请求, 就会调用 ` callback`。

### `contentTracing.startMonitoring(options, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

获取当前监控的跟踪数据

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据到主进程。 通过IPC发送跟踪数据可能是一个开销巨大的操作，我们想避免跟踪时不必要的运行时开销。 因此, 为了结束跟踪, 我们必须异步请求所有子进程刷新所有挂起的跟踪数据。

一旦所有子进程都确认了 ` captureMonitoringSnapshot ` 请求, 就会使用包含跟踪数据的文件来调用 ` callback `。

### `contentTracing.startMonitoring(options, callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

获取跟踪缓冲区进程的最大使用率，以百分比表示完整状态。当 TraceBufferUsage 值被确定后, 将调用 ` callback`。