## Class: DownloadItem

> Контроль загрузки файлов из удаленных источников.

Процесс: [Главный](../glossary.md#main-process)

`DownloadItem` is an `EventEmitter` that represents a download item in Electron. Он используется в событии `will-download` класса `Session` и позволяет пользователям управлять элементом загрузки.

```javascript
// В основном процессе.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Установите путь сохранения, чтобы Electron не отображал диалоговое окно сохранения.
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

### События экземпляра

#### Событие: 'updated'

Возвращает:

* Событие типа `event`
* `state` String - Может быть `progressing` или `interrupted`.

Возникает, когда загрузка была обновлена и не завершена.

`state` может быть одним из следующих:

* `progressing` - Загрузка находится в процессе загрузки.
* `interrupted` - загрузка прервалась и может быть возобновлена.

#### Событие: 'done'

Возвращает:

* `event` Event
* `state` String - может быть завершено `completed`, отменено `cancelled` или прервано `interrupted`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

`state` может быть одним из следующих:

* `completed` - Загрузка завершена успешно.
* `cancelled` - загрузка была отменена.
* `interrupted` - загрузка прервалась и не может быть возобновлена.

### Методы экземпляра

Объект `downloadItem` имеет следующие методы:

#### `downloadItem.setSavePath(path)`

* `path` String - Установить путь сохраняемого элемента загрузки.

API доступен только в сессии `will-download` функции обратного вызова. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path(Usually prompts a save dialog).

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Установите параметры диалога сохранения. Этот объект имеет те же свойства, что и параметры `options` в [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. API доступен только в сессии `will-download` функции обратного вызова.

#### `downloadItem.getSaveDialogOptions()`

Возвращает `SaveDialogOptions` - Возвращает ранее установленный объект `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Приостановить скачивание.

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

Returns `String` - The origin url where the item is downloaded from.

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

Returns `String[]` - The complete url chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Returns `String` - Last-Modified header value.

#### `downloadItem.getETag()`

Returns `String` - ETag header value.

#### `downloadItem.getStartTime()`

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.
