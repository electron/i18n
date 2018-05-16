## 类：downloadItem

> 控制来自于远程资源的文件下载。

线程：[主线程](../glossary.md#main-process)

在Electron中，`DownloadItem` 是一个代表下载项目的`EventEmitter`。 它用于`will-download`事件以及`Session`类，并且允许用户控制下载项目。

```javascript
// 在主进程中.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // 设置保存路径,使Electron不提示保存对话框。
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download is paused')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully')
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
})
```

### 事件

#### 事件名: 'updated'

返回:

* `event` Event
* `state` String

当下载正在执行但还没完成的时候发出。

状态可以是以下之一：

* `progressing` - 下载正在进行中
* `interrupted` - 下载已经中断，可以恢复

#### 事件名: 'done'

返回:

* `event` Event
* `state` String

当下载文件已经到本地时发出。这包括一个完整的下载，取消下载（`downloadItem.cancel()`）和中断不可恢复的下载。

状态可以是以下之一：

* `completed` - 下载成功完成 
* `cancelled` - 下载已被取消
* `interrupted` - 下载已经中断，无法恢复

### 实例方法

`downloadItem` 对象具有以下方法：

#### `downloadItem.setSavePath(path)`

* `path` String - 设置下载项目的保存文件路径。

该API仅能在`will-download` 方法的回调中使用。 如果用户没有通过API设置保存路径，Electron将使用默认方式来确定保存路径（通常会提示保存对话框）。

#### `downloadItem.getSavePath()`

返回 `String` - 下载项目的保存路径。这将是通过`downloadItem.setSavePath(path)`设置的路径，或从显示的保存对话框中选择的路径。

#### `downloadItem.pause()`

暂停下载。

#### `downloadItem.isPaused()`

返回`Boolean` - 下载是否暂停。

#### `downloadItem.resume()`

恢复已暂停的下载。

**笔记：** 为了支持断点下载，必须要从支持范围内请求下载，并且提供`Last-Modified` 和 `ETag`的值。 否则，`resume()` 将关闭以前接收到的字节并从头开始重新开始下载。

#### `downloadItem.canResume()`

Resumes `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

取消下载操作。

#### `downloadItem.getURL()`

返回`String` - 从中​​下载项目的源URL。

#### `downloadItem.getMimeType()`

返回`String` - MIME类型的文件。

#### `downloadItem.hasUserGesture()`

返回`Boolean` - 下载是否具有用户手势。

#### `downloadItem.getFilename()`

返回`String` - 下载项目的文件名。

**笔记：**文件名与本地磁盘中保存的实际文件名不尽相同。 如果用户在提示的下载保存对话框中更改文件名称，保存的文件的实际名称将会不同。

#### `downloadItem.getTotalBytes()`

返回`Integer` - 下载项目的总大小（以字节为单位）。

如果大小未知，则返回0。

#### `downloadItem.getReceivedBytes()`

返回`Integer` - 下载项目的接收字节。

#### `downloadItem.getContentDisposition()`

返回`String` - 响应头中的Content-Disposition字段。

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**笔记：** 以下方法特别有助于在会话重新启动时恢复取消的项目。

#### `downloadItem.getURLChain()`

返回String [] - 包含任何重定向的项目的完整url链。

#### `downloadItem.getLastModifiedTime()`

返回String - Last-Modified的值。

#### `downloadItem.getETag()`

返回String - ETag的值。

#### `downloadItem.getStartTime()`

返回`Double` - 自下载开始时的UNIX纪元以来的秒数。