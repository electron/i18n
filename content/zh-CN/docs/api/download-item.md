## 类：downloadItem

> 控制来自于远程资源的文件下载。

进程：[主进程](../glossary.md#main-process)

在Electron中，`DownloadItem` 是一个代表下载项目的[EventEmitter][event-emitter]。 它用于`will-download`事件以及`Session`类，并且允许用户控制下载项目。

```javascript
// 在主进程中.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Set the save path, making Electron not to prompt a save dialog.
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

### 实例事件

#### 事件名: 'updated'

返回:

* `event` Event
* `state` String - 可以是 `progressing` 或 `interrupted`.

当下载正在执行但还没完成的时候发出。

状态可以是以下之一：

* `progressing` - 下载正在进行中
* `interrupted` - 下载已经中断，可以恢复

#### 事件名: 'done'

返回:

* `event` Event
* `state` String - 可以是 `completed`, `cancelled` 或 `interrupted`.

当下载处于终止态时触发。 包括下载完成，取消下载 (通过 `downloadItem.cancel()`)，以及无法恢复的中断下载。

状态可以是以下之一：

* `completed` - 下载成功完成
* `cancelled` - 下载已被取消
* `interrupted` - 下载已经中断，无法恢复

### 实例方法

`downloadItem` 对象具有以下方法：

#### `downloadItem.setSavePath(path)`

* `path` String - 设置下载项目的保存文件路径。

该API仅能在`will-download` 方法的回调中使用。 如果 `path` 不存在，Electron 将尝试递归创建目录。 如果用户没有通过这个API设置保存路径，Electron 将使用默认方式决定保存路径；通常弹出保存对话框。

#### `downloadItem.getSavePath()`

返回`String` - 下载项的保存路径。 该值为通过 `downloadItem.setSavePath(path)` 设置的路径或通过显示的保存对话框选择的路径。

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - 设置保存文件对话框选项。 这个对象与 [`dialog.showSaveDialog()`](dialog.md) 的 `options` 参数有相同属性。

此 API 允许用户为下载项默认打开的保存对话框设置自定义选项。 该API仅能在`will-download` 方法的回调中使用。

#### `downloadItem.getSaveDialogOptions()`

返回 `SaveDialogOptions` - 返回之前通过 `downloadItem.setSaveDialogOptions(options)` 设置的对象。

#### `downloadItem.pause()`

暂停下载。

#### `downloadItem.isPaused()`

返回`Boolean` - 下载是否暂停。

#### `downloadItem.resume()`

恢复已暂停的下载。

**注意：** 为了支持断点续传，必须要从支持范围请求的服务器下载，并且提供`Last-Modified` 和 `ETag`的头部值。 否则，`resume()` 将关闭以前接收到的字节并从头开始重新开始下载。

#### `downloadItem.canResume()`

返回`Boolean` - 下载是否可以恢复。

#### `downloadItem.cancel()`

取消下载操作。

#### `downloadItem.getURL()`

返回`String` - 下载项的源URL。

#### `downloadItem.getMimeType()`

返回`String` - MIME类型的文件。

#### `downloadItem.hasUserGesture()`

返回`Boolean`  - 下载是否具有用户手势。

#### `downloadItem.getFilename()`

返回`String` - 下载项目的文件名。

**注意：** 文件名并不总是和实际保存到本地磁盘中的文件名相同。 如果用户在提示的下载保存对话框中更改文件名称，保存的文件的实际名称将会不同。

#### `downloadItem.getTotalBytes()`

返回`Integer`  - 下载项目的总大小（以字节为单位）。

如果大小未知，则返回0。

#### `downloadItem.getReceivedBytes()`

返回`Integer` - 下载项目的接收字节。

#### `downloadItem.getContentDisposition()`

返回`String`  - 响应头中的Content-Disposition字段。

#### `downloadItem.getState()`

返回 `String` - 当前状态。 可以是 `progressing`、 `completed`、 `cancelled` 或 `interrupted`。

**注意：** 以下方法尤其对于当会话重启后恢复 `取消了的` 项目非常有用。

#### `downloadItem.getURLChain()`

返回 `String[]` - 项目的完整URL链，包括任何重定向。

#### `downloadItem.getLastModifiedTime()`

返回String - Last-Modified的值。

#### `downloadItem.getETag()`

返回String - ETag的值。

#### `downloadItem.getStartTime()`

返回`Double`  - 自下载开始时的UNIX纪元以来的秒数。

### 实例属性

#### `downloadItem.savePath`

一个 `String` 属性，决定了下载项的保存文件路径。

该属性仅在会话的 `will-download` 回调函数中可用。 如果用户未通过属性设置保存路径，Electron将使用默认方式决定保存路径；通常为弹出保存对话框。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
