## クラス: DownloadItem

> リモートソースからのファイルのダウンロードを制御します。

プロセス: [Main](../glossary.md#main-process)

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. これは `Session` クラスの `will-download` イベントで使用されており、ユーザーがダウンロードアイテムを制御できるようにします。

```javascript
// メインプロセス
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Electronが保存ダイアログを表示しないようにするために、保存先のパスを設定します。
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

### インスタンスイベント

#### イベント: 'updated'

戻り値:

* `event` Event
* `state` String - `progressing` か `interrupted` にできます。

ダウンロードが更新され、まだ未完了であるときに発生します。

`state` は、次のいずれかになります。

* `progressing` - ダウンロードが進行中です。
* `interrupted` - ダウンロードが中断されましたが、再開することができます。

#### イベント: 'done'

戻り値:

* `event` Event
* `state` String - `completed`、`cancelled` か `interrupted` にできます。

ダウンロードが終息状態になるときに発生します。これには、完了したダウンロード、(`downloadItem.cancel()` 経由で) キャンセルされたダウンロード、再開することができない中断されたダウンロードが含まれます。

`state` は、次のいずれかになります。

* `completed` - ダウンロードが正常に完了しました。
* `cancelled` - ダウンロードがキャンセルされました。
* `interrupted` - ダウンロードが中断され、再開することができません。

### インスタンスメソッド

`downloadItem` オブジェクトには以下のメソッドがあります

#### `downloadItem.setSavePath(path)`

* `path` String - ダウロードアイテムを保存するファイルパスを設定します。

このAPIは、セッションの `will-download` コールバック関数でのみ利用可能です。 If user doesn't set the save path via the API, Electron will use the original routine to determine the save path; this usually prompts a save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - ファイル保存ダイアログのオプションを設定します。 このオブジェクトは `options` パラメータ([`dialog.showSaveDialog()`](dialog.md)の)と同じプロパティを持ちます。

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

### インスタンスプロパティ

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.