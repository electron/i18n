# ipcMain

> Асинхронно взаимодействуйте с процессами рендеринга из главного процесса.

Process: [Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). При использовании в основном процессе он обрабатывает асинхронные и синхронные сообщения, отправленные из процесса рендеринга (веб-страницы). Сообщения, отправленные из процесса рендеринга, будут направлены в этот модуль.

## Отправка сообщений

Кроме того, существует возможность пересылать сообщения из главного процесса в процессы рендеринга. Более подробно это описано в [webContents.send](web-contents.md#contentssendchannel-args).

* При отправке сообщения, событие именуется `channel`.
* Чтобы ответить на синхронное сообщение, нужно задать `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

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
* `listener` Function 
  * `event` IpcMainEvent
  * `...args` any[]

Слушает `channel`, когда приходит новое сообщение `listener` вызовется с `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String (Строка)
* `listener` Function 
  * `event` IpcMainEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)

Удаляет указанный `listener` из массива слушателей конкретного `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (optional)

Удаляет всех слушателей `channel`.

### `ipcMain.handle(channel, listener)`

* `channel` String (Строка)
* `listener` Function<Promise<void> | any> 
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

If `listener` returns a Promise, the eventual result of the promise will be returned as a reply to the remote caller. Otherwise, the return value of the listener will be used as the value of the reply.

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

The `event` that is passed as the first argument to the handler is the same as that passed to a regular event listener. It includes information about which WebContents is the source of the invoke request.

### `ipcMain.handleOnce(channel, listener)`

* `channel` String (Строка)
* `listener` Function<Promise<void> | any> 
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String (Строка)

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.