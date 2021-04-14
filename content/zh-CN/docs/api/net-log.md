# netLog

> 为会话记录网络事件。

进程：[主进程](../glossary.md#main-process)

```javascript
康斯特 { netLog } =需要（"电子"）

应用程序。当已准备好时。然后（不对称（）=> =
  等待网络Log.开始登录（"/路径/到/网络日志"）
  //在某些网络事件
  持续路径之后=等待 netLog.stopLog（）
  控制台.log（"写入的网络日志"， 路径）
}）
```

查看 [`--log-net-log`](command-line-switches.md#--log-net-logpath) 记录应用生命周期的网络事件。

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## 方法

### `网络博客.开始博客（路径[，选项]）`

* `path` String - 记录网络日志的文件路径。
* `options` Object (可选)
  * `captureMode` 字符串（可选） - 应捕获哪些类型的数据。 通过 默认值，将只捕获有关请求的元数据。 将此设置为 `includeSensitive` 将包括 Cookie 和身份验证数据。 将其 设置为 `everything` 将包括插座上传输的所有字节。 可以 `default`， `includeSensitive` 或 `everything`。
  * `maxFileSize` 号（可选） - 当日志增长超过此大小时， 记录将自动停止。 默认为无限。

返回 `Promise<void>` - 当网络日志开始录制时解析。

开始记录网络事件日志到 `path`。

### `netLog.stopLogging()`

返回 `Promise<void>` - 当净日志被冲洗到磁盘时解析。

停止网络事件日志的记录。 如果未被调用，net 记录将自动结束当 app 退出的时候。

## Properties

### `netLog.currentlyLogging` _·里德利·_

表示当前是否记录网络日志的 `Boolean` 属性。
