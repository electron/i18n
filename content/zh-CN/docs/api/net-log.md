# netLog

> Logging network events for a session.

进程：[主进程](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async function () {
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

查看 [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) 记录应用生命周期的网络事件。

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## 方法

### `netLog.startLogging(path)`

* `path` String - 记录网络日志的文件路径。

开始记录网络事件日志到 `path`。

### `netLog.stopLogging([callback])`

* `callback` Function (可选) 
  * `path` String - 记录网络日志的文件路径。

停止网络事件日志的记录。 如果未被调用，net 记录将自动结束当 app 退出的时候。

**[马上将弃用](modernization/promisification.md)**

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

停止网络事件日志的记录。 如果未被调用，net 记录将自动结束当 app 退出的时候。

## 属性

### `netLog.currentlyLogging`

A `Boolean` property that indicates whether network logs are recorded.

### `netLog.currentlyLoggingPath`

A `String` property that returns the path to the current log file.