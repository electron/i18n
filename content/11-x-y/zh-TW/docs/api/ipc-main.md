# ipcMain

> 由主處理序到畫面轉譯處理序的非同步通訊。

處理序: [主處理序](../glossary.md#main-process)

`ipcMain` 模組是一個 [EventEmitter][event-emitter] 類別實例。 當在主程序使用時，它能用來接收來自渲染程序（網頁）的同步與非同步訊息。 而從渲染程序送出的訊息將會被送往此模組。

## 傳送訊息

要從主程序發送訊息給渲染程序也是可以的，請參閱 [webContents.send][web-contents-send]。

* 當需要傳遞一個訊息時，事件名稱就是雙方的 `channel`。
* 為了回覆一個同步的訊息時，您需要對 `event.returnValue` 指定值。
* 若要送回非同步的訊息給發送者，您可以使用 `event.reply(...)`。  此方法將會自動的接收那些來自非 main frame（例如：iframes）的訊息，而 `event.sender.send(...)` 則總是把訊息傳送給 main frame。

以下是在主程序與渲染程序之間傳送和接收訊息的一個例子：

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

`ipcMain` 模組具有以下方法來監聽事件：

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

監聽 `channel`，當一個新的訊息抵達 `listener` 時會呼叫 `listener(event, args...)`。

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

對事件加入一次性的 `listener`。 此 `listener` 只有在下一次訊息發送到 `channel` 時才會被喚起，之後就會被移除。

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

從 `channel` 的 listener array 之中移除特定的 `listener`。

### `ipcMain.removeAllListeners([channel])`

* `channel` String (選用)

移除指定 `channel` 的所有 listener。

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

加入一個 handler 到 `invokable` 的 IPC。 每當渲染程序呼叫 `ipcRenderer.invoke(channel, ...args)` 時，將呼叫這個 handler。

假如 `listener` 返回值是一個 Promise，則最後 Promise 的結果將會被當作返回值回傳給 remote 的呼叫者。 否則，listener 的返回值將會被回覆。

```js
// 主程序中
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// 渲染程序中
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

傳遞給 handler 的第一個引數 `event` 與傳遞給一般 event listener 的引數是相同的。 它含有請求來源的 WebContents 的相關資訊。

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

接收一個 `invokeable` 的 IPC 訊息，接著移除該 listener。 請參閱 `ipcMain.handle(channel, listener)`。

### `ipcMain.removeHandler(channel)`

* `channel` String

從 `channel` 中移除 handler，假使它存在的話。

## IpcMainEvent object

傳遞給 `callback` 的 `event` 物件文件可以在 [`ipc-main-event`](structures/ipc-main-event.md) 的結構文件頁面中查閱。

## IpcMainInvokeEvent object

傳遞給 `handle` 回呼函式的 `event` 物件文件可以在 [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) 的結構文件頁面中查閱。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
