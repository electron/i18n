# ipcMain

> 从主进程到渲染进程的异步通信。

进程：[主进程](../glossary.md#main-process)

`ipcRenderer` 是一个 [EventEmitter][event-emitter] 的实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

## 发送消息

也可以从主进程向渲染进程发送消息，查阅[ebContents.send][web-contents-send]获取更多信息。

* 发送消息时，事件名称为`channel `。
* 回复同步信息时，需要设置`event.returnValue`。
* 可以使用`event.reply(...)`将异步消息发送回发送者。  此方法将自动处理从非主 frame 发送的消息(比如： iframes)。相应的发送方法是: `event.sender.send(...)` 它将总是把消息发送到主 frame

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
// NB. Electron APIs are only accessible from preload, unless contextIsolation is disabled.
// See https://www.electronjs.org/docs/tutorial/process-model#preload-scripts for more details.
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

监听 channel, 当新消息到达，将通过 listener(event, args...) 调用 listener。

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

为特定的 channel 从监听队列中删除特定的 listener 监听者.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (optional)

移除所有指定 channel 的监听器； 若未指定 channel，则移除所有监听器。

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

为一个 `invokeable`的IPC 添加一个handler。 每当一个渲染进程调用 `ipcRenderer.invoke(channel, ...args)` 时这个处理器就会被调用。

如果 `listener` 返回一个 Promise，那么 Promise 的最终结果就是远程调用的返回值。 否则， 监听器的返回值将被用来作为应答值。

```js
// 主进程
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// 渲染进程
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

传递给处理器的第一个参数的 `event` 与传递给常规事件侦听器的相同。 里面包含了哪些 WebContents 是调用请求的来源

通过`handle`在主线程抛出的异常并不易读，那是因为他们已经被序列化了。只有原始错误中的 `message` 属性可提供给渲染进程。 详情请参阅 [#24427](https://github.com/electron/electron/issues/24427)

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

处理单个 `invoke`able 可触发的 IPC 消息，然后移除侦听器。 详见 `ipcMain.handle(channel, listener)`

### `ipcMain.removeHandler(channel)`

* `channel` String

移除 `channel`的所有处理程序，若存在。

## IpcMainEvent object

`callback` 的参数 `event` 对象文档可以在 [`ipc-main-event`](structures/ipc-main-event.md) 一节找到。

## IpcMainInvokeEvent object

`handle`回调参数`event`对象文档可以在[`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md)一节找到

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
