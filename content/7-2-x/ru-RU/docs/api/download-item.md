## Class: DownloadItem

> Контроль загрузки файлов из удаленных источников.

Процесс: [Главный](../glossary.md#main-process)

`DownloadItem` это [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), который представляет элемент загрузки в Electron. Он используется в событии `will-download` класса `Session` и позволяет пользователям управлять элементом загрузки.

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

API доступен только в сессии `will-download` функции обратного вызова. Если пользователь не устанавливает путь сохранения через API, Electron будет использовать исходную процедуру для определения пути сохранения; здесь обычно вызывается диалоговое окно сохранения.

**[Устаревшее](modernization/property-updates.md): используйте вместо этого свойство `savePath`.**

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

**[Устаревшее](modernization/property-updates.md): используйте вместо этого свойство `savePath`.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Установите параметры диалога сохранения. Этот объект имеет те же свойства, что и параметры `options` в [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. API доступен только в сессии `will-download` функции обратного вызова.

#### `downloadItem.getSaveDialogOptions()`

Возвращает `SaveDialogOptions` - Возвращает ранее установленный объект `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Приостановить скачивание.

#### `downloadItem.isPaused()`

Возвращает `Boolean` - приостановлена ли загрузка.

#### `downloadItem.resume()`

Возобновляет загрузку, которая была приостановлена.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. В противном случае `resume()` удалит ранее полученные байты и перезапустит загрузку с начала.

#### `downloadItem.canResume()`

Возвращает `Boolean` - Может ли загрузка возобновиться.

#### `downloadItem.cancel()`

Отменяет операцию загрузки.

#### `downloadItem.getURL()`

Возвращает `String` - URL источника, из которого загружается элемент.

#### `downloadItem.getMimeType()`

Возвращает `String` - Файлы mime типа.

#### `downloadItem.hasUserGesture()`

Возвращает `Boolean` - Есть ли у загрузки пользовательский жест.

#### `downloadItem.getFilename()`

Возвращает `String` - Имя файла элемента загрузки.

**Note:** The file name is not always the same as the actual one saved in local disk. Если пользователь изменит имя файла в запрашиваемом диалоговом окне сохранения файла, то действительное имя файла будет отличаться.

#### `downloadItem.getTotalBytes()`

Возвращает `Integer` - Общий размер элемента загрузки в байтах.

Если размер неизвестен, он возвращает 0.

#### `downloadItem.getReceivedBytes()`

Возвращает `Integer` - Полученные байты элемента загрузки.

#### `downloadItem.getContentDisposition()`

Возвращает `String` - Поле Content-Disposition из заголовка ответа.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Возвращает `String[]` - полная URL-цепочка до элемента, включая любые перенаправления.

#### `downloadItem.getLastModifiedTime()`

Возвращает `String` - Последнее измененное значение заголовка.

#### `downloadItem.getETag()`

Возвращает `String` - значение ETag заголовка.

#### `downloadItem.getStartTime()`

Возвращает `Double` - Количество секунд с начала UNIX, когда началась загрузка.

### Свойства экземпляра

#### `downloadItem.savePath`

Свойство `String`, которое определяет путь к файлу сохранения элемента загрузки.

Свойство доступно только в сессии `will-download` функции обратного вызова. Если пользователь не устанавливает путь сохранения через свойство, Electron будет использовать исходную процедуру для определения пути сохранения; здесь обычно вызывается диалоговое окно сохранения.
