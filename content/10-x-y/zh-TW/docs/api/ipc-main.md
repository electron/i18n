# ipcMain

> 由主處理序到畫面轉譯處理序的非同步通訊。

處理序: [主處理序](../glossary.md#main-process)

`ipcMain` 模組是一個 [EventEmitter][event-emitter] 類別實例。 When used in the main process, it handles asynchronous and synchronous messages sent from a renderer process (web page). Messages sent from a renderer will be emitted to this module.

## 傳送訊息

要從主程序發送訊息給渲染程序也是可以的，請參閱 [webContents.send][web-contents-send]。

* When sending a message, the event name is the `channel`.
* To reply to a synchronous message, you need to set `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`.  This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

An example of sending and handling messages between the render and main processes:

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

The `ipcMain` module has the following method to listen for events:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

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

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (選用)

Removes listeners of the specified `channel`.

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

加入一個 handler 到 `invokable` 的 IPC。 每當渲染程序呼叫 `ipcRenderer.invoke(channel, ...args)` 時，將呼叫這個 handler。

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

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

接收一個 `invokeable` 的 IPC 訊息，接著移除該 listener。 請參閱 `ipcMain.handle(channel, listener)`。

### `ipcMain.removeHandler(channel)`

* `channel` String

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-arg1-arg2-
