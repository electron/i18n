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

Отправить асинхронное сообщение к основному процессу через `channel`, наряду с аргументами. Аргументы будут сериализованы с [клонов алгоритм][SCA], как [`window.postMessage`][], так что прототип цепи не будут включены. Функции отправки, обещания, символы, WeakMaps или WeakSets вы можете сделать исключение.

> **ПРИМЕЧАНИЕ:** отправка нестандартных типов JavaScript, таких как объекты DOM или специальные объекты Electron, станет исключением.
> 
> Поскольку основной процесс не имеет поддержки объектов DOM, таких как `ImageBitmap`, `File`, `DOMMatrix` и так далее, такие объекты не могут быть отправлены на IPC Electron в основной процесс, так как основной процесс не будет иметь никакого способа расшифровать них. Попытка отправить такие объекты через МПК приведет к ошибке.

Основной процесс обрабатывает его путем прослушивания `channel` с модулем [`ipcMain`](ipc-main.md).

Если вам нужно перевести [`MessagePort`][] основной процесс, используйте [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Если вы хотите получить один ответ от основного процесса, например, результат вызова метода, рассмотрите возможность использования [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args).

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `Promise<any>` - Разрешается с ответом от основного процесса.

Отправить сообщение на основной процесс через `channel` и ожидать результата асинхронно. Аргументы будут сериализованы с [клонов алгоритм][SCA], как [`window.postMessage`][], так что прототип цепи не будут включены. Функции отправки, обещания, символы, WeakMaps или WeakSets вы можете сделать исключение.

> **ПРИМЕЧАНИЕ:** отправка нестандартных типов JavaScript, таких как объекты DOM или специальные объекты Electron, станет исключением.
> 
> Поскольку основной процесс не имеет поддержки объектов DOM, таких как `ImageBitmap`, `File`, `DOMMatrix` и так далее, такие объекты не могут быть отправлены на IPC Electron в основной процесс, так как основной процесс не будет иметь никакого способа расшифровать них. Попытка отправить такие объекты через МПК приведет к ошибке.

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

Если вам нужно перевести [`MessagePort`][] основной процесс, используйте [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Если вам не нужен ответ на сообщение, рассмотрите возможность использования [`ipcRenderer.send`](#ipcrenderersendchannel-args).

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `any` - Значение, отправленное обработчиком [`ipcMain`](ipc-main.md).

Отправить сообщение на основной процесс через `channel` и ожидать синхронно. Аргументы будут сериализованы с [клонов алгоритм][SCA], как [`window.postMessage`][], так что прототип цепи не будут включены. Функции отправки, обещания, символы, WeakMaps или WeakSets вы можете сделать исключение.

> **ПРИМЕЧАНИЕ:** отправка нестандартных типов JavaScript, таких как объекты DOM или специальные объекты Electron, станет исключением.
> 
> Поскольку основной процесс не имеет поддержки объектов DOM, таких как `ImageBitmap`, `File`, `DOMMatrix` и так далее, такие объекты не могут быть отправлены на IPC Electron в основной процесс, так как основной процесс не будет иметь никакого способа расшифровать них. Попытка отправить такие объекты через МПК приведет к ошибке.

Основной процесс обрабатывает его, прослушивая `channel` с помощью модуля [`ipcMain`](ipc-main.md), и отвечая, установив `event.returnValue`.

> :warning: **ВНИМАНИЕ**: Отправка синхронного сообщения будет блокировать весь процесс рендерера до получения ответа, поэтому используйте этот метод только в крайнем случае. Гораздо лучше использовать асинхронную версию, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.postMessage (канал, сообщение, [transfer])`

* `channel` String (Строка)
* `message` any
* `transfer` MessagePort (по желанию)

Отправить сообщение на основной процесс, факультативно передавая право собственности на нулевую или более [`MessagePort`][] объектов.

Переданные `MessagePort` объекты будут доступны в основном процессе в [`MessagePortMain`](message-port-main.md) объектов, `ports` к   свойства испускаемого события.

Например:

```js
Процесс renderer
const { port1, port2 } - новый канал сообщений ()
ipcRenderer.postMessage ('порт', { message: 'hello' }, [port1])

// Основной процесс
ipcMain.on ('port', (e, msg) ->
  const [port] - e.ports
  // ...
})
```

Для получения дополнительной информации об использовании `MessagePort` и `MessageChannel`, см. [MDN документации](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel).

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
