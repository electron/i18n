# ipcRenderer

> Асинхронное взаимодействие между процессом визуализации и основным процессом.

Процесс: [Графический](../glossary.md#renderer-process)

Модуль `ipcRenderer` представляет собой [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Он предоставляет несколько методов, чтобы вы могли отправлять синхронные и асинхронные сообщения из процесса визуализации (веб-страницы) в основной процесс. Вы также можете получать ответы от главного процесса.

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

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

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

Send an asynchronous message to the main process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

Основной процесс обрабатывает его путем прослушивания `channel` с модулем [`ipcMain`](ipc-main.md).

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `Promise<any>` - Разрешается с ответом от основного процесса.

Send a message to the main process via `channel` and expect a result asynchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

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

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `any` - Значение, отправленное обработчиком [`ipcMain`](ipc-main.md).

Send a message to the main process via `channel` and expect a result synchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

Основной процесс обрабатывает его, прослушивая `channel` с помощью модуля [`ipcMain`](ipc-main.md), и отвечая, установив `event.returnValue`.

> :warning: **WARNING**: Sending a synchronous message will block the whole renderer process until the reply is received, so use this method only as a last resort. It's much better to use the asynchronous version, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

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
