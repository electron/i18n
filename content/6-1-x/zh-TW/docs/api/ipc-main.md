# ipcMain

> 由主處理序到畫面轉譯處理序的非同步通訊。

进程: [主进程](../glossary.md#main-process)

The `ipcMain` module is an instance of the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class. 當在主進程使用時，它能用來接收來自渲染進程（網頁）的同步與非同步訊息， 而從渲染進程送出的訊息也會被送往此模組。

## 傳送訊息

要從主進程發送訊息給渲染進程也是可以的，詳情請見 [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-)。

* 當要傳遞一個訊息時，事件名稱就是雙方的 `溝通管道`。
* 為了回覆一個同步的訊息時，你需要對 `event.returnValue` 指定值。
* 若要送出一個非同步的訊息回給發送者，你可以使用 `event.reply(...)`。  此方法將會自主的接收那些來自非 main frame（例如：iframes）的訊息，而 `event.sender.send(...)` 則總是把訊息傳送給 main frame。

以下是在主進程與渲染進程之間傳送和接收訊息的一個例子：

```javascript
// 在主處理序裡。
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
// 在畫面轉譯處理序中 (網頁)。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // 印出 "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## 方法

`ipcMain` 模組具有以下方法來偵聽事件：

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

監聽 `channel`，當一個新的訊息抵達 `listener` 時將會呼叫 `listener(event, args...)`。

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

對事件加入一次性的 `listener`。 此 `listener` 只有在下一次訊息發送到 `channel` 時才會被調用，之後就會被移除。

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

從特定 `channel` 的 listener array 之中刪除特定的 `listener`。

### `ipcMain.removeAllListeners([channel])`

* `channel` String

刪除所有指定 `channel` 的 listener。

## Event 物件

傳遞 `event` object 到 `callback` 的文件描述在 [`ipc-main-event`](structures/ipc-main-event.md) 結構文件。