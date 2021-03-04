# ipcMain

> 从主进程到渲染进程的异步通信。

进程：[主进程](../glossary.md#main-process)

`ipcRenderer` 是一个 [EventEmitter][event-emitter] 的实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

## 发送消息

也可以从主进程向渲染进程发送消息，查阅[ebContents.send][web-contents-send]获取更多信息。

* 发送消息时，事件名称为`channel `。
* 回复同步信息时，需要设置`event.returnValue`。
* 可以使用`event.reply(...)`将异步消息发送回发送者。  This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

下面是在渲染和主进程之间发送和处理消息的一个例子：

```javascript
// 在主进程中.
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
//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## 方法

IpcMain模块有以下方法来侦听事件：

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

监听 `channel`，当接收到新的消息时 `listener` 会以 `listener(event, args...)` 的形式被调用。

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

添加一次性 `listener` 函数。 这个 `listener` 只会在 `channel`下一次收到消息的时候被调用，之后这个监听器会被移除。

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

从监听器数组中移除监听 `channel` 的指定 `listener`。

### `ipcMain.removeAllListeners([channel])`

* `channel` String (optional)

删除所有监听者，或特指的 channel 的所有监听者.

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

为一个 `invoke`able IPC 添加一个处理器。 每当一个渲染进程调用 `ipcRenderer.invoke(channel, ...args)` 时这个处理器就会被调用。

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

Errors thrown through `handle` in the main process are not transparent as they are serialized and only the `message` property from the original error is provided to the renderer process. Please refer to [#24427](https://github.com/electron/electron/issues/24427) for details.

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
