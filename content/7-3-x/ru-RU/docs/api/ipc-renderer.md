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

Отправить сообщение в основной процесс асинхронно через `channel`, также можно отправить произвольные аргументы. Аргументы будут упорядоченны внутри в формате JSON и поэтому не будут включены в функции или цепочки прототипов.

Основной процесс обрабатывает его путем прослушивания `channel` с модулем [`ipcMain`](ipc-main.md).

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `Promise<any>` - Разрешается с ответом от основного процесса.

Отправьте сообщение основному процессу асинхронно по `channel` и ожидайте асинхронного результата. Аргументы будут упорядоченны внутри в формате JSON и поэтому не будут включены в функции или цепочки прототипов.

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

Отправить сообщение в основной процесс синхронно через `channel`, также можно отправить произвольные аргументы. Аргументы будут упорядоченны внутри в формате JSON и поэтому не будут включены в функции или цепочки прототипов.

Основной процесс обрабатывает его, прослушивая `channel` с помощью модуля [`ipcMain`](ipc-main.md), и отвечая, установив `event.returnValue`.

**Примечание:** Отправка синхронного сообщения будет блокировать все процессы визуализации, если вы не знаете что делаете никогда не используйте его.

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
