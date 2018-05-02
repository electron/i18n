# ipcMain

> 从主进程到渲染进程的异步通信。

线程：[主线程](../glossary.md#main-process)

ipcMain模块是EventEmitter类的一个实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

## 发送消息

当然也有可能从主进程向渲染进程发送消息，查阅webContents.send 获取更多信息。

* 发送消息时，事件名称为`channel `。
* 回复同步信息时，需要设置`event.returnValue`。
* 将异步消息发送回发件人，需要使用`event.sender.send(...)`。

下面是在渲染和主进程之间发送和处理消息的一个例子：

```javascript
// 在主进程中.
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
//在渲染器进程 (网页) 中。
const {ipcRenderer} = require('electron')
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

监听 channel, 当新消息到达，将通过 listener(event, args...) 调用 listener。

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

为事件添加一个一次性用的listener 函数.这个 listener 只有在下次的消息到达 channel 时被请求调用，之后就被删除了.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

为特定的 channel 从监听队列中删除特定的 listener 监听者.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

删除所有监听者，或特指的 channel 的所有监听者.

## 事件对象

传递给 callback 的 event 对象有如下方法:

### `event.returnValue`

将此设置为在一个同步消息中返回的值.

### `event.sender`

返回发送消息的 webContents ，你可以调用 event.sender.send 来回复异步消息，更多信息 webContents.send.