## 类：downloadItem

> 控制来自于远程资源的文件下载。

线程：[主线程](../glossary.md#main-process)

在Electron中，`DownloadItem` 是一个代表下载项目的`EventEmitter`。 它用于`will-download`事件以及`Session`类，并且允许用户控制下载项目。

```javascript
// 在主进程.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
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

恢复布尔值 - 是否可以恢复下载。

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

**Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.

#### `downloadItem.getTotalBytes()`

Returns `Integer` - The total size in bytes of the download item.

If the size is unknown, it returns 0.

#### `downloadItem.getReceivedBytes()`

Returns `Integer` - The received bytes of the download item.

#### `downloadItem.getContentDisposition()`

Returns `String` - The Content-Disposition field from the response header.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete url chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Returns `String` - Last-Modified header value.

#### `downloadItem.getETag()`

Returns `String` - ETag header value.

#### `downloadItem.getStartTime()`

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.