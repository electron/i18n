## 类：downloadItem

> 控制来自于远程资源的文件下载。

线程：[主线程](../glossary.md#main-process)

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. 它用于`will-download`事件以及`Session`类，并且允许用户控制下载项目。

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

当下载文件已经到本地时发出。这包括一个完整的下载，取消下载（`downloadItem.cancel()`）和中断不可恢复的下载。

状态可以是以下之一：

* `completed` - 下载成功完成 
* `cancelled` - 下载已被取消
* `interrupted` - 下载已经中断，无法恢复

### 实例方法

`downloadItem` 对象具有以下方法：

#### `downloadItem.setSavePath(path)`

* `path` String - 设置下载项目的保存文件路径。

该API仅能在`will-download` 方法的回调中使用。 If user doesn't set the save path via the API, Electron will use the original routine to determine the save path; this usually prompts a save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pauses the download.

#### `downloadItem.isPaused()`

Returns `Boolean` - Whether the download is paused.

#### `downloadItem.resume()`

Resumes the download that has been paused.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

Cancels the download operation.

#### `downloadItem.getURL()`

Returns `String` - The origin URL where the item is downloaded from.

#### `downloadItem.getMimeType()`

Returns `String` - The files mime type.

#### `downloadItem.hasUserGesture()`

Returns `Boolean` - Whether the download has user gesture.

#### `downloadItem.getFilename()`

Returns `String` - The file name of the download item.

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

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Returns `String` - Last-Modified header value.

#### `downloadItem.getETag()`

Returns `String` - ETag header value.

#### `downloadItem.getStartTime()`

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.

### 实例属性

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.