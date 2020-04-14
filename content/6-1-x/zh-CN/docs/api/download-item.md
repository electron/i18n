## 类：downloadItem

> 控制来自于远程资源的文件下载。

进程：[主进程](../glossary.md#main-process)

在Electron中，`DownloadItem` 是一个代表下载项目的`EventEmitter`。 它用于`will-download`事件以及`Session`类，并且允许用户控制下载项目。

```javascript
// 在主进程中.
const { BrowserWindow } = require('electron')
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
* `state` String - 可以是 `progressing` 或 `interrupted`.

当下载正在执行但还没完成的时候发出。

状态可以是以下之一：

* `progressing` - 下载正在进行中
* `interrupted` - 下载已经中断，可以恢复

#### 事件名: 'done'

返回:

* `event` Event
* `state` String - 可以是 `completed`, `cancelled` 或 `interrupted`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

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

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. 该API仅能在`will-download` 方法的回调中使用。

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

暂停下载。

#### `downloadItem.isPaused()`

Returns `Boolean` - Whether the download is paused.

#### `downloadItem.resume()`

Resumes the download that has been paused.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. 否则，`resume()` 将关闭以前接收到的字节并从头开始重新开始下载。

#### `downloadItem.canResume()`

返回`Boolean` - 下载是否可以恢复。

#### `downloadItem.cancel()`

取消下载操作。

#### `downloadItem.getURL()`

返回`String` - 从中​​下载项目的源URL。

#### `downloadItem.getMimeType()`

返回`String` - MIME类型的文件。

#### `downloadItem.hasUserGesture()`

返回`Boolean`  - 下载是否具有用户手势。

#### `downloadItem.getFilename()`

返回`String` - 下载项目的文件名。

**Note:** The file name is not always the same as the actual one saved in local disk. 如果用户在提示的下载保存对话框中更改文件名称，保存的文件的实际名称将会不同。

#### `downloadItem.getTotalBytes()`

返回`Integer`  - 下载项目的总大小（以字节为单位）。

如果大小未知，则返回0。

#### `downloadItem.getReceivedBytes()`

返回`Integer` - 下载项目的接收字节。

#### `downloadItem.getContentDisposition()`

返回`String`  - 响应头中的Content-Disposition字段。

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

返回String [] - 包含任何重定向的项目的完整url链。

#### `downloadItem.getLastModifiedTime()`

返回String - Last-Modified的值。

#### `downloadItem.getETag()`

返回String - ETag的值。

#### `downloadItem.getStartTime()`

返回`Double`  - 自下载开始时的UNIX纪元以来的秒数。
