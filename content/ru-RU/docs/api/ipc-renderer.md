# ipcRenderer

> Communicate asynchronously from a renderer process to the main process.

Процесс: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). It provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process. You can also receive replies from the main process.

See [ipcMain](ipc-main.md) for code examples.

## Методы

Модуль `ipcRenderer` имеет следующие методы для прослушивания событий и отправки сообщений:

### `ipcRenderer.on(channel, listener)`

* `channel` String (Строка)
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

Слушает `channel`, когда приходит новое сообщение `listener` вызовется с `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String (Строка)
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String (Строка)
* `listener` Function 
  * `...args` any[]

Удаляет указанный `listener` из массива слушателей конкретного `channel`.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String (Строка)

Removes all listeners, or those of the specified `channel`.

### `ipcRenderer.send(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Например:

```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Примечание:** Отправка синхронного сообщения будет блокировать все процессы визуализации, если вы не знаете что делаете никогда не используйте его.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String (Строка)
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

## Объект события

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.