# ipcRenderer

> Асинхронное взаимодействие между процессом визуализации и основным процессом.

Процесс: [Графический](../glossary.md#renderer-process)

Модуль `ipcRenderer` представляет собой [EventEmitter][event-emitter]. Он предоставляет несколько методов, чтобы вы могли отправлять синхронные и асинхронные сообщения из процесса визуализации (веб-страницы) в основной процесс. Вы также можете получать ответы от главного процесса.

Примеры кода смотрите в [ipcMain](ipc-main.md).

## Методы

Модуль `ipcRenderer` имеет следующие методы для прослушивания событий и отправки сообщений:

### `ipcRenderer.on(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)
  * `event` IpcRendererEvent
  * `...args` any[]

Слушает `channel`, когда приходит новое сообщение `listener` вызовется с `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)
  * `event` IpcRendererEvent
  * `...args` any[]

Добавляет одно время `listener` функции для события. Этот `listener` вызывается только в следующий раз, когда сообщение отправляется `channel`, после чего оно удаляется.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)
  * `...args` any[]

Удаляет указанный `listener` из массива слушателей конкретного `channel`.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String (Строка)

Удаляет всех слушателей или слушателей из указанного `channel`.

### `ipcRenderer.send(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Send an asynchronous message to the main process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`window.postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE:** Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.
> 
> Since the main process does not have support for DOM objects such as `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over Electron's IPC to the main process, as the main process would have no way to decode them. Attempting to send such objects over IPC will result in an error.

Основной процесс обрабатывает его путем прослушивания `channel` с модулем [`ipcMain`](ipc-main.md).

If you need to transfer a [`MessagePort`][] to the main process, use [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

If you want to receive a single response from the main process, like the result of a method call, consider using [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args).

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `Promise<any>` - Разрешается с ответом от основного процесса.

Send a message to the main process via `channel` and expect a result asynchronously. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`window.postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE:** Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.
> 
> Since the main process does not have support for DOM objects such as `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over Electron's IPC to the main process, as the main process would have no way to decode them. Attempting to send such objects over IPC will result in an error.

Основной процесс должен прослушивать `channel` с [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

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

If you need to transfer a [`MessagePort`][] to the main process, use [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

If you do not need a response to the message, consider using [`ipcRenderer.send`](#ipcrenderersendchannel-args).

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `any` - Значение, отправленное обработчиком [`ipcMain`](ipc-main.md).

Send a message to the main process via `channel` and expect a result synchronously. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`window.postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE:** Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.
> 
> Since the main process does not have support for DOM objects such as `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over Electron's IPC to the main process, as the main process would have no way to decode them. Attempting to send such objects over IPC will result in an error.

Основной процесс обрабатывает его, прослушивая `channel` с помощью модуля [`ipcMain`](ipc-main.md), и отвечая, установив `event.returnValue`.

> :warning: **WARNING**: Sending a synchronous message will block the whole renderer process until the reply is received, so use this method only as a last resort. It's much better to use the asynchronous version, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.postMessage(channel, message, [transfer])`

* `channel` String (Строка)
* `message` any
* `transfer` MessagePort[] (optional)

Send a message to the main process, optionally transferring ownership of zero or more [`MessagePort`][] objects.

The transferred `MessagePort` objects will be available in the main process as [`MessagePortMain`](message-port-main.md) objects by accessing the `ports` property of the emitted event.

Например:

```js
// Renderer process
const { port1, port2 } = new MessageChannel()
ipcRenderer.postMessage('port', { message: 'hello' }, [port1])

// Main process
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

For more information on using `MessagePort` and `MessageChannel`, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel).

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String (Строка)
* `...args` any[]

Отправляет сообщение в окно с помощью `webContentsId` через `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Как `ipcRenderer.send`, но событие будет отправлено в элемент `<webview>` на главной странице вместо основного процесса.

## Объект события

Документацию для объекта `event`, передаваемого в `callback`, можно найти в документации по структуре [`ipc-renderer-event`](structures/ipc-renderer-event.md).

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
