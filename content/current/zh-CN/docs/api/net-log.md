# netLog

> Logging network events for a session.

进程：[主进程](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

查看 [`--log-net-log`](command-line-switches.md#--log-net-logpath) 记录应用生命周期的网络事件。

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## 方法

### `netLog.startLogging(path[, options])`

* `path` String - 记录网络日志的文件路径。
* `options` Object (optional)
  * `captureMode` String (optional) - What kinds of data should be captured. By default, only metadata about requests will be captured. Setting this to `includeSensitive` will include cookies and authentication data. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

开始记录网络事件日志到 `path`。

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

停止网络事件日志的记录。 如果未被调用，net 记录将自动结束当 app 退出的时候。

## 属性

### `netLog.currentlyLogging` _Readonly_

`Boolean` 类型的属性，指示网络日志是否被记录。

### `netLog.currentlyLoggingPath` _Readonly_ _Deprecated_

`String` 类型的属性，返回当前的日志文件路径。
