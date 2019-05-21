# ipcMain

> Асинхронно взаимодействуйте с процессами рендеринга из главного процесса.

Process: [Main](../glossary.md#main-process)

Модуль `ipcMain` является экземпляром класса [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). При использовании в основном процессе он обрабатывает асинхронные и синхронные сообщения, отправленные из процесса рендеринга (веб-страницы). Сообщения, отправленные из процесса рендеринга, будут направлены в этот модуль.

## Отправка сообщений

Кроме того, существует возможность пересылать сообщения из главного процесса в процессы рендеринга. Более подробно это описано в [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-).

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
* `listener` Function (Функция)

Слушает `channel`, когда приходит новое сообщение `listener` вызовется с `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String (Строка)
* `listener` Function (Функция)

Удаляет указанный `listener` из массива слушателей конкретного `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (Строка)

Удаляет всех слушателей `channel`.

## Объект события

Объект события (`event`) переданный, в функцию обратного вызова (`callback`) обладает следующими методами:

### `event.frameId`

An `Integer` representing the ID of the renderer frame that sent this message.

### `event.returnValue`

Установленное значение возращается в синхронном сообщении.

### `event.sender`

Возвращает `webContents` который послал сообщение. Вы можете вызвать `event.sender.send` чтобы ответить на асинхронное сообщение, [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) для дополнительной информации.

### `event.reply`

A function that will send an IPC message to the renderer frane that sent the original message that you are currently handling. You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.