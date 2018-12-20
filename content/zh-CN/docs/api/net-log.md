# netLog

> Logging network events for a session.

进程：[主进程](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', function () {
  netLog.startLogging('/path/to/net-log')
  // After some network events
  netLog.stopLogging(path => {
    console.log('Net-logs written to', path)
  })
})
```

查看 [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) 记录应用生命周期的网络事件。

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## 方法

### `netLog.startLogging(path)`

* `path` String - 记录网络日志的文件路径。

Starts recording network events to `path`.

### `netLog.stopLogging([callback])`

* `callback` Function (可选) 
  * `path` String - 记录网络日志的文件路径。

Stops recording network events. If not called, net logging will automatically end when app quits.

## 属性

### `netLog.currentlyLogging`

A `Boolean` property that indicates whether network logs are recorded.

### `netLog.currentlyLoggingPath`

A `String` property that returns the path to the current log file.