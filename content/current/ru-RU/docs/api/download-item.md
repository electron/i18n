## Class: DownloadItem

> Контроль загрузки файлов из удаленных источников.

Process: [Main](../glossary.md#main-process)

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

Возникает, когда загрузка находится в терминальном состоянии. Оно включает в себя завершенную загрузку, отмененную загрузку (через `downloadItem.cancel()`) и прерванная загрузка, которая не может быть возобновлена.

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

Возвращает `String` - путь сохранения элемента загрузки. Это будет либо путь, установленный через `downloadItem.setSavePath(path)`, либо путь, выбранный из показанного диалогового окна сохранения.

**[Устаревшее](modernization/property-updates.md): используйте вместо этого свойство `savePath`.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Установите параметры диалога сохранения. Этот объект имеет те же свойства, что и параметры `options` в [`dialog.showSaveDialog()`](dialog.md).

Этот API позволяет пользователю установить пользовательские параметры для диалогового окна сохранения, которое открывается для элемента загрузки по умолчанию. API доступен только в сессии `will-download` функции обратного вызова.

#### `downloadItem.getSaveDialogOptions()`

Возвращает `SaveDialogOptions` - Возвращает ранее установленный объект `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Приостановить скачивание.

#### `downloadItem.isPaused()`

Возвращает `Boolean` - приостановлена ли загрузка.

#### `downloadItem.resume()`

Возобновляет загрузку, которая была приостановлена.

**Примечание:** для включения возобновляемой загрузки сервер, с которого выполняется загрузка, должен поддерживать запросы диапазона и предоставлять значения заголовков `Last-Modified` и `ETag`. В противном случае `resume()` удалит ранее полученные байты и перезапустит загрузку с начала.

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

**Внимание:** Имя файла не всегда совпадает с именем файла, сохраненным на локальном диске. Если пользователь изменит имя файла в запрашиваемом диалоговом окне сохранения файла, то действительное имя файла будет отличаться.

#### `downloadItem.getTotalBytes()`

Возвращает `Integer` - Общий размер элемента загрузки в байтах.

Если размер неизвестен, он возвращает 0.

#### `downloadItem.getReceivedBytes()`

Возвращает `Integer` - Полученные байты элемента загрузки.

#### `downloadItem.getContentDisposition()`

Возвращает `String` - Поле Content-Disposition из заголовка ответа.

#### `downloadItem.getState()`

Возвращает `String` - текущее состояние. Может быть `progressing`, `completed`, `cancelled` или `interrupted`.

**Примечание:** Следующие методы особенно полезны для возобновления элемента `cancelled` при перезапуске сеанса.

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