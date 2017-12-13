# ipcMain

> 从主进程到渲染进程的异步通信。

线程：[主线程](../glossary.md#main-process)

ipcMain模块是EventEmitter类的一个实例。 在主进程使用时，它处理异步并且接收来自于渲染进程（网页）的同步信息。 从渲染器进程发送的消息将被发送到该模块。

## 发送消息

当然也有可能从主进程向渲染进程发送消息，查阅webContents.send 获取更多信息。

* 发送消息时，事件名称为`channel `。
* 回复同步信息时，需要设置`event.returnValue`。
* 将异步消息发送回发件人，需要使用`event.sender.send(...)`。

An example of sending and handling messages between the render and main processes:

```javascript
// In main process.
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// In renderer process (web page).
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## 方法

The `ipcMain` module has the following method to listen for events:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Removes listeners of the specified `channel`.

## Event object

The `event` object passed to the `callback` has the following methods:

### `event.returnValue`

Set this to the value to be returned in a synchronous message.

### `event.sender`

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.