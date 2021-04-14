# ipcMain

> 从主进程到渲染进程的异步通信。

进程：[主进程](../glossary.md#main-process)

`ipcRenderer` 是一个 [EventEmitter][event-emitter] 的实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

## 发送消息

也可以从主进程向渲染进程发送消息，查阅[ebContents.send][web-contents-send]获取更多信息。

* 发送消息时，事件名称为`channel `。
* 回复同步信息时，需要设置`event.returnValue`。
* 可以使用`event.reply(...)`将异步消息发送回发送者。  此帮手方法将自动处理来自不是主帧的帧（例如 iframes）的帧 的消息，而 `event.sender.send(...)` 始终会发送到主帧。

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
  * `event` 伊普克梅因事件
  * `...args` any[]

监听 `channel`，当接收到新的消息时 `listener` 会以 `listener(event, args...)` 的形式被调用。

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` 伊普克梅因事件
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

### `ipc马恩。手柄（频道，听众）`

* `channel` String
* `listener` 功能<Promise\<void> |有吗>
  * `event` 伊普克·梅因沃克事件
  * `...args` any[]

为一个 `invoke`able IPC 添加一个处理器。 每当一个渲染进程调用 `ipcRenderer.invoke(channel, ...args)` 时这个处理器就会被调用。

如果 `listener` 返回承诺，承诺的最终结果将 返回，作为对远程呼叫者的回应。 否则， 听众的返回值将用作回复值。

```js
主要过程
ipcmain. 手柄 （'我可调用的 ipc'， 不对称 （事件， ...args）=> {
  结果=等待一些希望（。。。args）
  返回结果
}）

//渲染器过程
不对称（）=> {
  结果=等待ipcRenderer.调用（"我调用的ipc"，arg1，arg2）
  //
}
```

作为第一个参数传递给处理程序的 `event` 与传递给常规事件侦听器的 相同。 它包括有关哪些 WebContents是调用请求的来源的信息。

### `ipc梅因。汉德翁斯（频道，听众）`

* `channel` String
* `listener` 功能<Promise\<void> |有吗>
  * `event` 伊普克·梅因沃克事件
  * `...args` any[]

处理单个 `invoke`能够 IPC 的消息，然后删除侦听器。 见 `ipcMain.handle(channel, listener)`。

### `ipc梅因。删除汉德勒（通道）`

* `channel` String

如果存在，请删除 `channel`的任何处理程序。

## Ipc最大事件对象

传递给 `callback` 的 `event` 对象的文档可以在 [`ipc-main-event`](structures/ipc-main-event.md) 结构文档中 找到。

## 伊普克·梅因沃基事件对象

传递给 `handle` 回调的 `event` 对象的文档可以在 [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) 结构文档中 找到。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
