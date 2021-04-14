# contentTracing

> 从铬收集跟踪数据，以查找性能瓶颈和操作缓慢。

进程：[主进程](../glossary.md#main-process)

此模块不包括 Web 界面。 要查看记录的痕迹，请使用 [跟踪查看器][]，可在 Chrome 的 `chrome://tracing` 处找到。

**注意：**在应用程序模块的 `ready ` 事件触发之前，您不应该使用此模块。

```javascript
康斯特 { app, contentTracing } =需要（'电子'）

应用程序。当准备。然后）=> {
  （不对称（）=> {
    等待内容跟踪。 开始记录（{
      included_categories：['*]
    }）
    控制台.log（"跟踪开始"）
    等待新的承诺（解决=> 设置超时（解决， 5000））
    条路径=等待内容跟踪。停止记录（）
    控制台.log（"跟踪记录到"+路径的数据）
  }）
}）
```

## 方法

`contentTracing`模块包含以下方法：

### `内容跟踪。获取获取（）`

返回 `Promise<String[]>` - 一旦所有儿童过程都确认了 `getCategories` 请求，则使用一系列类别组解决

获取一组类别组。 类别组可以随着新代码路径 的到达而更改。 另请参阅</a>内置追踪 类别的

列表。</p> 



> **注意：** 电子公司添加了一个名为 `"electron"`的非默认跟踪类别。 此类别可用于捕获特定于电子的跟踪事件。



### `内容跟踪。开始记录（选项）`

* `options` （[追踪康菲格](structures/trace-config.md) | [追踪和](structures/trace-categories-and-options.md)）

返回 `Promise<void>` - 一旦所有儿童过程都确认了 `startRecording` 请求，退货问题就会得到解决。

在所有进程上开始记录

一旦收到EnableRecording请求，记录立即在本地开始进行，并在子进程上异步执行。

如果录音已经运行，承诺将立即得到解决，因为 一次只能进行一次跟踪操作。



### `内容跟踪。停止记录（[resultFilePath]）`

* `resultFilePath` 字符串（可选）

返回 `Promise<String>` - 一旦所有儿童过程都确认了 `stopRecording` 请求，就会使用包含跟踪数据的文件路径进行解析

停止所有进程记录。

子进程通常缓存跟踪数据，并且很少清空和发送跟踪数据回到主进程。 这有助于最小化运行时间开销，因为通过IPC发送跟踪数据可能是一个开销巨大的操作。 因此， 结束追踪时，Chromium 异步要求所有儿童过程冲洗任何 待处理的跟踪数据。

跟踪数据将被写入 `resultFilePath`。 如果 `resultFilePath` 是空的 或未提供，跟踪数据将被写入临时文件，路径 将在承诺中返回。



### `内容跟踪。获取跟踪使用（）`

返回 `Promise<Object>` - 使用包含微量缓冲区最大使用 `value` 和 `percentage` 的对象解决

* `value` Number
* `percentage` Number

以 全状态的百分比获得跟踪缓冲过程的最大使用量。

[跟踪查看器]: https://chromium.googlesource.com/catapult/+/HEAD/tracing/README.md
