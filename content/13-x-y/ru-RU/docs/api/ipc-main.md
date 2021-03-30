# ipcMain

> Асинхронно взаимодействуйте с процессами рендеринга из главного процесса.

Процесс: [Основной](../glossary.md#main-process)

Модуль `ipcMain` представляет собой [Event Emitter][event-emitter]. При использовании в основном процессе он обрабатывает асинхронные и синхронные сообщения, отправленные из процесса рендеринга (веб-страницы). Сообщения, отправленные из процесса рендеринга, будут направлены в этот модуль.

## Отправка сообщений

Кроме того, существует возможность пересылать сообщения из главного процесса в процессы рендеринга. Более подробно это описано в [webContents.send][web-contents-send].

* При отправке сообщения, событие именуется `channel`.
* Чтобы ответить на синхронное сообщение, нужно задать `event.returnValue`.
* Чтобы отправить ассинхронное сообщение назад отправителю, используйте `event.reply(...)`.  Этот вспомогательный метод автоматически обрабатывает сообщения, поступающие из фреймов, которые не являются основным фреймом (например, iframe), в то время как `event.sender.send(...)` всегда будет посылать в основной фрейм.

Пример отправки и обработки сообщений между render и main процессами:

```javascript
// В main процессе.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// В renderer процессе (web страница).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Методы

Модуль `ipcMain` имеет следующие методы для прослушивая событий:

### `ipcMain.on(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)
  * `event` IpcMainEvent
  * `...args` any[]

Слушает `channel`, когда приходит новое сообщение `listener` вызовется с `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)
  * `event` IpcMainEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)
  * `...args` any[]

Удаляет указанный `listener` из массива слушателей конкретного `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (опционально)

Удаляет всех слушателей `channel`.

### `ipcMain.handle(channel, listener)`

* `channel` String (Строка)
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

Если `listener` возвращает Promise, то конечный результат Promise, будет возвращен в качестве ответа удаленному вызывающему объекту. В противном случае, возвращаемое значение слушателя будет использоваться как значение ответа.

```js
// Main process
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// Renderer process
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

`event`, которое передается обработчику в качестве первого аргумента, такое же, какое передается обычному прослушивателю событий. Оно включает информацию о том, какой WebContents является источником запроса на вызов.

Errors thrown through `handle` in the main process are not transparent as they are serialized and only the `message` property from the original error is provided to the renderer process. Please refer to [#24427](https://github.com/electron/electron/issues/24427) for details.

### `ipcMain.handleOnce(channel, listener)`

* `channel` String (Строка)
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String (Строка)

Удаляет обработчик для `channel`, если он присутствует.

## IpcMainEvent object

Документацию для объекта `event`, передаваемого в `callback`, можно найти в документации по структуре [`ipc-main-event`](structures/ipc-main-event.md).

## IpcMainInvokeEvent object

Документацию по объекту `event`, переданном обратным вызовом `handle`, можно найти в документации по структуре [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md).

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
